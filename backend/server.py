from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import ssl
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with TLS support
mongo_url = os.environ['MONGO_URL']

# Ensure TLS 1.2+ support for MongoDB Atlas
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# MongoDB client with explicit TLS configuration
client = AsyncIOMotorClient(
    mongo_url,
    tls=True,
    tlsAllowInvalidCertificates=True,
    ssl_context=ssl_context,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=10000,
    maxPoolSize=50
)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class QuoteRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    vehicleType: str
    services: List[str]
    location: Optional[str] = ""
    message: Optional[str] = ""
    status: str = "pending"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class QuoteRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    vehicleType: str
    services: List[str]
    location: Optional[str] = ""
    message: Optional[str] = ""

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    features: List[str]
    active: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Content Management Models
class ContentSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str  # 'hero', 'about', 'services', etc.
    field: str    # 'title', 'description', etc.
    content: str
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ContentUpdate(BaseModel):
    section: str
    field: str
    content: str

class ServiceManagement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    features: List[str]
    active: bool = True
    order: int = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ServiceUpdate(BaseModel):
    title: str
    description: str
    features: List[str]
    active: bool = True
    order: int = 0
@api_router.post("/quotes", response_model=dict)
async def create_quote_request(quote_data: QuoteRequestCreate):
    try:
        # Create quote request object
        quote_dict = quote_data.dict()
        quote_obj = QuoteRequest(**quote_dict)
        
        # Insert into database
        await db.quote_requests.insert_one(quote_obj.dict())
        
        return {
            "success": True,
            "message": "Quote request submitted successfully! We'll contact you within 24 hours.",
            "quoteId": quote_obj.id
        }
    except Exception as e:
        logging.error(f"Error creating quote request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit quote request")

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quote_requests():
    try:
        quote_requests = await db.quote_requests.find().to_list(1000)
        return [QuoteRequest(**quote) for quote in quote_requests]
    except Exception as e:
        logging.error(f"Error fetching quote requests: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch quote requests")

@api_router.get("/quotes/{quote_id}", response_model=QuoteRequest)
async def get_quote_request(quote_id: str):
    try:
        quote = await db.quote_requests.find_one({"id": quote_id})
        if not quote:
            raise HTTPException(status_code=404, detail="Quote request not found")
        return QuoteRequest(**quote)
    except Exception as e:
        logging.error(f"Error fetching quote request: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch quote request")

@api_router.patch("/quotes/{quote_id}", response_model=dict)
async def update_quote_status(quote_id: str, status_update: dict):
    try:
        # Update quote status in database
        result = await db.quote_requests.update_one(
            {"id": quote_id},
            {"$set": {"status": status_update.get("status"), "updatedAt": datetime.utcnow()}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Quote request not found")
        
        return {
            "success": True,
            "message": f"Quote status updated to {status_update.get('status')}"
        }
    except Exception as e:
        logging.error(f"Error updating quote status: {e}")
        raise HTTPException(status_code=500, detail="Failed to update quote status")

# Services Endpoints
@api_router.get("/services", response_model=List[Service])
async def get_services():
    try:
        services = await db.services.find({"active": True}).to_list(100)
        return [Service(**service) for service in services]
    except Exception as e:
        logging.error(f"Error fetching services: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch services")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
