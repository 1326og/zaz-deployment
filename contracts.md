# API Contracts - Zaz Precision Auto Detailing Website

## Backend API Endpoints to Implement

### 1. Quote Request Management

**POST /api/quotes**
- **Purpose**: Submit a new quote request
- **Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required)",
  "vehicleType": "string (required)",
  "services": ["string"] (required, array of service names),
  "location": "string (optional)",
  "message": "string (optional)"
}
```
- **Response**: 
```json
{
  "success": true,
  "message": "Quote request submitted successfully!",
  "quoteId": "string"
}
```

**GET /api/quotes**
- **Purpose**: Retrieve all quote requests (for admin use)
- **Response**: Array of quote objects

### 2. Services Information

**GET /api/services**
- **Purpose**: Retrieve all available services
- **Response**: Array of service objects with details

## Database Models

### QuoteRequest Model
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string", 
  "phone": "string",
  "vehicleType": "string",
  "services": ["string"],
  "location": "string",
  "message": "string",
  "status": "string (pending/contacted/completed)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Service Model
```json
{
  "_id": "ObjectId", 
  "title": "string",
  "description": "string",
  "features": ["string"],
  "active": "boolean",
  "createdAt": "Date"
}
```

## Frontend Integration Points

### Mock Data to Replace:
- **Quote Form Submission**: Currently uses mock.js `submitQuoteRequest()` function
- **Services Display**: Currently uses mock.js `mockServices` array

### Integration Steps:
1. Replace `submitQuoteRequest()` in QuoteForm.jsx with actual API call to `/api/quotes`
2. Add services fetching from `/api/services` endpoint (optional - can keep static for now)
3. Update form validation to match backend requirements
4. Handle API errors and success states properly

## Services Available:
1. **Reset Detail (Premium)** - Complete transformation package
2. **Full Interior & Exterior Detailing** - Standard comprehensive service
3. **Paint Correction** - Professional paint restoration
4. **Paint Enhancement** - Paint finish improvement
5. **Headlight Restoration** - Clarity restoration service

## Business Information:
- **Business**: Zaz Precision Auto Detailing LLC
- **Phone**: (973) 534-0023
- **Email**: zazprecisionautodetailingllc@gmail.com
- **Service Type**: Mobile only (requires water spigot + electricity)

## Notes:
- All form submissions should be stored in MongoDB for client to review
- Email notifications to business owner can be added later if needed
- Mobile-responsive design already implemented
- Gallery uses client's actual before/after photos