import os
from datetime import datetime
from pathlib import Path
from fastapi import FastAPI, Request, HTTPException, status, Form
from fastapi.responses import JSONResponse, HTMLResponse, FileResponse, PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt

MONGODB_URI = os.environ.get("MONGODB_URI")
DB_NAME = os.environ.get("DB_NAME", "zaz_detailing")
COLLECTION_NAME = os.environ.get("COLLECTION_NAME", "quotes")
ADMIN_USER = os.environ.get("ADMIN_USER", "admin")
ADMIN_PASS_HASH = os.environ.get("ADMIN_PASS_HASH", "")
SESSION_SECRET = os.environ.get("SESSION_SECRET", "change-me")
ALLOWED_ORIGINS = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "").split(",") if o.strip()]

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=SESSION_SECRET, same_site="lax", https_only=True)
app.add_middleware(

    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET","POST","OPTIONS"],
    allow_headers=["*"],
)

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI not set")
client = AsyncIOMotorClient(
    MONGODB_URI,
    tls=True,
    tlsAllowInvalidCertificates=False,
    serverSelectionTimeoutMS=10000,
    connectTimeoutMS=10000,
)
db = client[DB_NAME]
quotes_col = db[COLLECTION_NAME]
PUBLIC_DIR = Path(__file__).parent / "frontend" / "public"
if PUBLIC_DIR.exists():
    assets_dir = PUBLIC_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")    

class QuoteIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    phone: str = Field(min_length=7, max_length=30)
    email: EmailStr | None = None
    vehicle: str | None = None
    service: str | None = None
    notes: str | None = None

from fastapi import Response

@app.options("/api/quotes")
async def quotes_options():
    return Response(status_code=204)

@app.post("/api/quotes")
async def create_quote(payload: QuoteIn, request: Request):
    doc = {
        "name": payload.name.strip(),
        "phone": payload.phone.strip(),
        "email": payload.email or None,
        "vehicle": payload.vehicle or None,
        "service": payload.service or None,
        "notes": payload.notes or None,
        "source": "website-quote",
        "createdAt": datetime.utcnow(),
        "ip": request.client.host if request.client else None,
        "ua": request.headers.get("user-agent"),
    }
    res = await quotes_col.insert_one(doc)
    return {"ok": True, "id": str(res.inserted_id)}

ADMIN_TEMPLATE = """<!doctype html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Admin</title></head><body>
<h1>Admin</h1>{content}</body></html>"""

def logged_in(request: Request) -> bool:
    return bool(request.session.get("admin_auth") is True)

@app.get("/admin", response_class=HTMLResponse)
async def admin_home(request: Request):
    if logged_in(request):
        count = await quotes_col.count_documents({})
        return HTMLResponse(ADMIN_TEMPLATE.format(content=f"<p>Logged in as <b>{ADMIN_USER}</b>. Quotes: {count}</p><form method='post' action='/admin/logout'><button type='submit'>Logout</button></form>"))
    form = """<form method="POST" action="/admin/login">
<label>Username <input name="username"></label><br>
<label>Password <input type="password" name="password"></label><br>
<button type="submit">Login</button></form>"""
    return HTMLResponse(ADMIN_TEMPLATE.format(content=form))

@app.post("/admin/login")
async def admin_login(request: Request, username: str = Form(...), password: str = Form(...)):
    if username != ADMIN_USER:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not ADMIN_PASS_HASH:
        raise HTTPException(status_code=500, detail="Admin hash not configured")
    ok = bcrypt.checkpw(password.encode(), ADMIN_PASS_HASH.encode())
    if not ok:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    request.session["admin_auth"] = True
    return HTMLResponse('<meta http-equiv="refresh" content="0;url=/admin">')

@app.post("/admin/logout")
async def admin_logout(request: Request):
    request.session.clear()
    return HTMLResponse('<meta http-equiv="refresh" content="0;url=/admin">')

HOMEPAGE = "https://www.zazprecisionautodetailing.com"
SERVICE_PATHS = ["/"]

@app.get("/robots.txt", response_class=PlainTextResponse)
async def robots():
    return f"User-agent: *\\nDisallow: /admin/\\nSitemap: {HOMEPAGE}/sitemap.xml\\n"

@app.get("/sitemap.xml", response_class=PlainTextResponse)
async def sitemap():
    urls = "".join(
        f"<url><loc>{HOMEPAGE.rstrip('/')}{p}</loc><changefreq>weekly</changefreq><priority>{'1.0' if p=='/' else '0.8'}</priority></url>"
        for p in SERVICE_PATHS
    )
    return f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>'

LOCALBUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "name": "Zaz Precision Auto Detailing",
  "url": HOMEPAGE,
  "areaServed": ["Bolivia, NC","Leland, NC","Brunswick County, NC"],
  "serviceType": ["Exterior detailing","Interior detailing","Paint correction","Ceramic coating","Headlight restoration"],
  "sameAs": ["https://www.instagram.com/your-handle","https://www.youtube.com/@your-channel"]
}

@app.get("/json-ld/localbusiness", response_class=JSONResponse)
async def jsonld():
    return JSONResponse(LOCALBUSINESS_JSONLD)

@app.get("/.well-known/health", response_class=PlainTextResponse)
async def health():
    try:
        await db.command("ping")
        return "ok"
    except Exception as e:
        return PlainTextResponse(f"db-fail:{e}", status_code=500)

@app.get("/{full_path:path}", response_class=HTMLResponse)
async def serve_spa(full_path: str):
    index_file = PUBLIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return HTMLResponse("Site is building…", status_code=503)
