import os
from pathlib import Path
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException, Form
from fastapi.responses import HTMLResponse, PlainTextResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel, EmailStr, Field
import bcrypt
from motor.motor_asyncio import AsyncIOMotorClient

app = FastAPI()

# Session and CORS configuration
SESSION_SECRET = os.environ.get("SESSION_SECRET", "change-me")
app.add_middleware(SessionMiddleware, secret_key=SESSION_SECRET, same_site="lax", https_only=True)

ALLOWED_ORIGINS = [o.strip() for o in os.environ.get("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=ALLOWED_ORIGINS or [],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Static files setup
ROOT = Path(__file__).resolve().parent
PUBLIC_DIR = ROOT / "frontend" / "public"

if PUBLIC_DIR.exists():
    assets = PUBLIC_DIR / "assets"
    if assets.exists():
        app.mount("/assets", StaticFiles(directory=assets), name="assets")

@app.get("/", response_class=HTMLResponse)
def index():
    idx = PUBLIC_DIR / "index.html"
    if idx.exists():
        return HTMLResponse(idx.read_text(encoding="utf-8"))
    return HTMLResponse("<h1>Zaz Precision Auto Detailing</h1>", status_code=200)

# Database configuration
MONGODB_URI = os.environ.get("MONGODB_URI")
DB_NAME = os.environ.get("DB_NAME", "zaz_detailing")
COLLECTION_NAME = os.environ.get("COLLECTION_NAME", "quotes")
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI not set")
client = AsyncIOMotorClient(
       MONGODB_URI,
    serverSelectionTimeoutMS=10000,
    connectTimeoutMS=10000,
    maxPoolSize=50,
)
db = client[DB_NAME]
quotes_col = db[COLLECTION_NAME]

# Quotes endpoint
class QuoteIn(BaseModel):
    name: str
    phone: str
    email: EmailStr | None = None
    vehicle: str | None = None
    service: str | None = None
    notes: str | None = None

@app.options("/api/quotes")
def quotes_options():
    return Response(status_code=204)

@app.post("/api/quotes")
async def create_quote(payload: QuoteIn, request: Request):
    doc = {
        "name": payload.name.strip(),
        "phone": payload.phone.strip(),
        "email": payload.email,
        "vehicle": payload.vehicle,
        "service": payload.service,
        "notes": payload.notes,
        "source": "website-quote",
        "createdAt": datetime.utcnow(),
        "ip": request.client.host if request.client else None,
        "ua": request.headers.get("user-agent"),
    }
    res = await quotes_col.insert_one(doc)
    return {"ok": True, "id": str(res.inserted_id)}

# Admin endpoints
ADMIN_USER = os.environ.get("ADMIN_USER", "admin")
ADMIN_PASS_HASH = os.environ.get("ADMIN_PASS_HASH", "")

ADMIN_HTML = """<!doctype html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Admin</title></head><body>
<h1>Admin</h1>{content}</body></html>"""

def is_admin(request: Request) -> bool:
    return request.session.get("admin_auth") is True

@app.get("/admin", response_class=HTMLResponse)
async def admin_home(request: Request):
    if is_admin(request):
        count = await quotes_col.count_documents({})
        return HTMLResponse(ADMIN_HTML.format(content=f"<p>Logged in as <b>{ADMIN_USER}</b>. Quotes: {count}</p>"))
    form = (
        '<form method="POST" action="/admin/login">'
        '<label>User <input name="username"></label><br>'
        '<label>Pass <input type="password" name="password"></label><br>'
        '<button type="submit">Login</button></form>'
    )
    return HTMLResponse(ADMIN_HTML.format(content=form))

@app.post("/admin/login", response_class=HTMLResponse)
async def admin_login(request: Request, username: str = Form(...), password: str = Form(...)):
    if username != ADMIN_USER or not ADMIN_PASS_HASH:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not bcrypt.checkpw(password.encode(), ADMIN_PASS_HASH.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    request.session["admin_auth"] = True
    return HTMLResponse('<meta http-equiv="refresh" content="0;url=/admin">')

@app.post("/admin/logout", response_class=HTMLResponse)
async def admin_logout(request: Request):
    request.session.clear()
    return HTMLResponse('<meta http-equiv="refresh" content="0;url=/admin">')

# SEO and health endpoints
HOMEPAGE = "https://www.zazprecisionautodetailing.com"
SERVICE_PATHS = ["/"]  # extend later

@app.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return f"User-agent: *\nDisallow: /admin/\nSitemap: {HOMEPAGE}/sitemap.xml\n"

@app.get("/sitemap.xml", response_class=PlainTextResponse)
def sitemap():
    urls = "".join(
        f"<url><loc>{HOMEPAGE.rstrip('/')}{p}</loc><changefreq>weekly</changefreq><priority>{'1.0' if p=='/' else '0.8'}</priority></url>"
        for p in SERVICE_PATHS
 
    )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"{urls}</urlset>"
    )

@app.get("/.we
ll-known/health", response_class=PlainTextResponse)
async def health():
    try:
        await db.command("ping")
        return "ok"

    except Exception as e:
        return PlainTextResponse(f"db-fail:{e}", status_code=500)


