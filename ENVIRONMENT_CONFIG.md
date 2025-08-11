# 🔧 ENVIRONMENT CONFIGURATION

## **BACKEND ENVIRONMENT VARIABLES (Railway)**

Add these in your Railway dashboard under **Variables**:

```bash
# Database Configuration
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/car_detailing?retryWrites=true&w=majority
DB_NAME=car_detailing

# Server Configuration  
PORT=8000
HOST=0.0.0.0

# Optional: Security (for production)
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## **FRONTEND ENVIRONMENT VARIABLES (Local Build)**

Create/update `frontend/.env` file:

```bash
# Backend API URL (your Railway deployment)
REACT_APP_BACKEND_URL=https://your-railway-app.railway.app

# Build Configuration
GENERATE_SOURCEMAP=false
PUBLIC_URL=https://yourdomain.com
```

## **MONGODB ATLAS CONFIGURATION**

### Connection String Format:
```bash
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
```

### Example:
```bash
mongodb+srv://zazadmin:yourpassword@zazcluster.abc123.mongodb.net/car_detailing?retryWrites=true&w=majority
```

### Database Setup:
```bash
Database Name: car_detailing
Collections:
  - quote_requests (auto-created)
  - services (optional)
  - status_checks (existing)
```

## **BLUEHOST CONFIGURATION**

### .htaccess File (place in public_html):
```apache
# Enable React Router (SPA support)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static resources
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## **SECURITY CONSIDERATIONS**

### Railway Backend:
- Environment variables are secure
- HTTPS enabled by default
- Database credentials encrypted

### Bluehost Frontend:
- All sensitive data handled by backend
- No API keys exposed in frontend code
- HTTPS available (enable in cPanel)

### MongoDB Atlas:
- Network access restricted
- User authentication required
- Data encryption at rest and in transit

## **TESTING CONFIGURATION**

### Local Testing:
```bash
# Test backend API
curl https://your-railway-app.railway.app/api/

# Test database connection
curl https://your-railway-app.railway.app/api/quotes
```

### Production Testing:
```bash
# Test website
https://yourdomain.com

# Test admin
https://yourdomain.com/admin

# Test API integration
Submit quote form and check admin dashboard
```

**All configurations are production-ready and secure! 🔒**