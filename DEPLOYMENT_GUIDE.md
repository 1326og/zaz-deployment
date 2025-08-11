# ZAZ Precision Auto Detailing - Hybrid Deployment Guide

## 🎯 **DEPLOYMENT OVERVIEW**
- **Frontend**: Static files on Bluehost (your domain)
- **Backend**: Python API on Railway/Render (external service)
- **Database**: MongoDB Atlas (cloud database)
- **Admin Dashboard**: Fully functional at yourdomain.com/admin

---

## 📦 **PART 1: BACKEND DEPLOYMENT (Railway - Recommended)**

### **Step 1: Create Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### **Step 2: Deploy Backend**
1. Click **"New Project"** in Railway
2. Select **"Deploy from GitHub repo"**
3. Choose your `zaz-auto-detailing-website` repository
4. Railway will auto-detect it's a Python app

### **Step 3: Configure Environment Variables**
In Railway dashboard, go to **Variables** and add:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/car_detailing
DB_NAME=car_detailing
PORT=8000
```

### **Step 4: Get Your Backend URL**
- Railway will provide a URL like: `https://your-app-name.railway.app`
- **Copy this URL** - you'll need it for frontend configuration

---

## 🌐 **PART 2: FRONTEND DEPLOYMENT (Bluehost)**

### **Step 1: Build Static Files**
From your GitHub repository, you need to:
1. **Clone the repository** to your local computer
2. **Navigate to frontend folder**: `cd frontend`
3. **Install dependencies**: `npm install` or `yarn install`
4. **Update backend URL** in `.env` file:
   ```
   REACT_APP_BACKEND_URL=https://your-railway-app.railway.app
   ```
5. **Build static files**: `npm run build` or `yarn build`

### **Step 2: Upload to Bluehost**
1. **Access cPanel** in your Bluehost account
2. **Open File Manager**
3. **Navigate to public_html** folder
4. **Delete default index.html** if present
5. **Upload all files** from the `build` folder to `public_html`
6. **Extract files** if uploaded as ZIP

### **File Structure on Bluehost:**
```
public_html/
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── manifest.json
├── robots.txt
└── sitemap.xml
```

---

## 🗄️ **PART 3: DATABASE SETUP (MongoDB Atlas)**

### **Step 1: Create MongoDB Atlas Account**
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Sign up** for free account
3. **Create new cluster** (free tier available)

### **Step 2: Configure Database**
1. **Create database** named `car_detailing`
2. **Create database user** with read/write permissions
3. **Whitelist IP addresses** (add `0.0.0.0/0` for all IPs)
4. **Get connection string**

### **Step 3: Import Existing Data**
Your current quote requests can be exported from the development database:
- Use MongoDB Compass or mongodump to export data
- Import to your new Atlas cluster

---

## ⚙️ **PART 4: FINAL CONFIGURATION**

### **Update Frontend Environment**
Make sure your frontend `.env` file has:
```
REACT_APP_BACKEND_URL=https://your-railway-app.railway.app
```

### **Test Deployment**
1. **Visit your domain** - website should load
2. **Test quote form** - should submit successfully  
3. **Access admin** at `yourdomain.com/admin`
4. **Login credentials**:
   - Username: `admin`
   - Password: `zaz2025!`

---

## 💰 **COST BREAKDOWN**
- **Bluehost Plus**: $5.95/month (your existing hosting)
- **Railway Backend**: $0-5/month (free tier: 500 hours/month)
- **MongoDB Atlas**: $0-9/month (free tier: 512MB storage)
- **Domain**: $12-15/year (if new domain needed)
- **Total**: ~$6-20/month

---

## 🚀 **QUICK START CHECKLIST**

### **Backend (Railway):**
- [ ] Sign up at railway.app
- [ ] Connect GitHub repository
- [ ] Deploy backend service
- [ ] Configure environment variables
- [ ] Get Railway app URL

### **Database (MongoDB Atlas):**
- [ ] Create Atlas account
- [ ] Create cluster and database
- [ ] Configure user and network access
- [ ] Get connection string
- [ ] Import existing data

### **Frontend (Bluehost):**
- [ ] Clone GitHub repository locally
- [ ] Update backend URL in .env
- [ ] Build static files (`npm run build`)
- [ ] Upload to Bluehost public_html
- [ ] Test website functionality

### **Final Testing:**
- [ ] Website loads on your domain
- [ ] Quote form submits successfully
- [ ] Admin dashboard accessible
- [ ] All services and content display correctly

---

## 🆘 **TROUBLESHOOTING**

**Common Issues:**
- **CORS errors**: Check backend URL configuration
- **Admin not accessible**: Ensure routing is configured for SPA
- **Form not submitting**: Verify backend deployment and environment variables
- **Images not loading**: Check static file paths after build

**Need Help?**
- Railway has excellent documentation
- MongoDB Atlas has step-by-step guides
- Bluehost support can help with file uploads

Your website will be fully functional with professional hosting while maintaining all features including the admin dashboard!