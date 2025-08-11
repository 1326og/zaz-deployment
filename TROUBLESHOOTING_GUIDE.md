# 🔧 TROUBLESHOOTING GUIDE - ZAZ Auto Detailing

## **COMMON DEPLOYMENT ISSUES**

### **❌ Backend Issues (Railway)**

**Problem**: Railway build fails
```bash
Solution:
1. Check Python version in backend/requirements.txt
2. Ensure all dependencies are listed
3. Check Railway build logs for specific errors
```

**Problem**: Database connection fails
```bash
Solution:
1. Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
2. Check connection string format
3. Ensure database user has read/write permissions
```

**Problem**: API endpoints return 404
```bash
Solution:
1. Check Railway deployment URL
2. Ensure FastAPI is running on correct port (8000)
3. Verify /api prefix is configured correctly
```

### **❌ Frontend Issues (Bluehost)**

**Problem**: Website shows blank page
```bash
Solution:
1. Check browser console for JavaScript errors
2. Verify all build files uploaded correctly
3. Ensure index.html is in public_html root
4. Check .htaccess configuration for SPA routing
```

**Problem**: Quote form doesn't submit
```bash
Solution:
1. Verify REACT_APP_BACKEND_URL in .env during build
2. Check browser network tab for API call failures  
3. Ensure backend is running and accessible
4. Check CORS configuration
```

**Problem**: Admin page not accessible (/admin)
```bash
Solution:
1. Add .htaccess file for React Router support
2. Ensure SPA routing is enabled
3. Check file permissions on Bluehost
```

### **❌ Database Issues (MongoDB Atlas)**

**Problem**: Connection timeout
```bash
Solution:
1. Add 0.0.0.0/0 to IP Access List
2. Check cluster status (should be green)
3. Verify connection string includes correct password
```

**Problem**: Authentication failed
```bash
Solution:
1. Check database username/password
2. Ensure user has atlasAdmin or readWrite privileges
3. Re-generate password if special characters cause issues
```

### **❌ CORS Issues**

**Problem**: CORS policy errors in browser
```bash
Solution:
1. Check backend CORS configuration allows your domain
2. Verify frontend is making requests to correct backend URL
3. Ensure protocol match (https/https)
```

## **🔍 DEBUGGING STEPS**

### **Step 1: Check Backend Health**
```bash
# Test in browser or curl
https://your-railway-app.railway.app/api/

# Expected response: {"message": "Hello World"}
```

### **Step 2: Test Database Connection**
```bash
# Check if API can fetch quotes
https://your-railway-app.railway.app/api/quotes

# Should return array of quotes (may be empty)
```

### **Step 3: Verify Frontend Build**
```bash
# In local frontend folder
npm run build

# Check if build folder created with:
# - index.html
# - static/css/
# - static/js/
```

### **Step 4: Test Full Integration**
```bash
1. Visit yourdomain.com - website loads ✅
2. Fill quote form - submits successfully ✅  
3. Visit yourdomain.com/admin - login works ✅
4. Check admin dashboard - quote appears ✅
```

## **📱 MOBILE TESTING**

Test on mobile devices:
- Responsive design works
- Touch interactions function
- Form submission works
- Admin dashboard accessible

## **🚀 PERFORMANCE OPTIMIZATION**

### **Frontend (Bluehost)**
- Enable gzip compression (.htaccess)
- Set proper cache headers
- Optimize images (already done)
- Enable HTTPS in cPanel

### **Backend (Railway)**  
- Railway automatically optimizes
- CDN included by default
- Auto-scaling enabled

### **Database (Atlas)**
- Free tier has performance limits
- Consider upgrading for high traffic
- Index optimization (automatic)

## **🆘 GETTING HELP**

### **Railway Support**
- Dashboard has built-in logs
- Community Discord very active
- Documentation comprehensive

### **MongoDB Atlas**
- Support chat available
- Extensive documentation  
- Community forums

### **Bluehost Support**
- 24/7 chat/phone support
- cPanel tutorials available
- File Manager help

## **🔧 MAINTENANCE TIPS**

### **Regular Tasks:**
- Monitor Railway usage (500 hours/month free)
- Check MongoDB storage (512MB free tier)
- Review quote submissions weekly
- Backup database monthly

### **Security Updates:**
- Change admin password regularly
- Monitor failed login attempts
- Keep dependencies updated (via GitHub)

## **📊 MONITORING**

### **What to Monitor:**
- Website uptime (use UptimeRobot free)
- API response times
- Database storage usage
- Monthly hosting costs

### **Success Metrics:**
- Quote form submissions
- Website traffic (Google Analytics)
- Customer inquiries converted
- Admin dashboard usage

**Your deployment should be rock solid! 💪**