# RepairHub - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1️⃣ Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free)
- Google Cloud Console project

### 2️⃣ Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd Integrated-Repair-Service-System-

# Run setup script
chmod +x setup.sh
./setup.sh
```

### 3️⃣ Configure Environment Variables

**Backend (.env)**
```bash
cd backend
```
Edit `.env` with:
- MongoDB URI from MongoDB Atlas
- Generate JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Google OAuth credentials from Google Cloud Console

**Frontend (.env.development)**
```bash
cd ../frontend
```
Set REACT_APP_GOOGLE_CLIENT_ID from Google Cloud Console

### 4️⃣ Start Development Servers

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### 5️⃣ Test the Application

1. Visit http://localhost:3000
2. Sign up as a customer
3. Browse services (default data will be loaded)
4. Click on a service to see professionals
5. Admin access: http://localhost:3000/admin-login (use admin credentials)

## 🌐 Deploy to Render

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 2: Create Render Services
1. Visit [render.com](https://render.com)
2. Create new Web Service
3. Select your GitHub repository

### Step 3: Backend Configuration
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Environment Variables**: (Copy from .env.production)

### Step 4: Frontend Configuration
- **Build Command**: `cd frontend && npm install && npm run build`
- **Start Command**: `cd frontend && npm start`
- **Environment Variables**: (Copy from .env.production with Render URLs)

### Step 5: Google OAuth Setup
Add authorized redirect URIs in Google Cloud Console:
- http://localhost:3000/
- https://your-render-frontend-url.onrender.com/

## 📱 Key Features Ready to Use

✅ User signup/login with email
✅ Google OAuth authentication
✅ Admin separate login portal
✅ 10+ repair service categories
✅ Professional profiles with ratings
✅ Appointment booking system
✅ Price negotiation via phone
✅ Professional availability management
✅ Admin dashboard with analytics
✅ Fully responsive design

## 🔐 Default Admin Setup

To create an admin account:
1. Sign up normally with email/password
2. Manually update user role in MongoDB to 'admin'
3. Use `/admin-login` with those credentials

```javascript
// MongoDB command to create admin
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📚 File Structure

```
backend/
├── models/          # Database schemas
├── controllers/     # Business logic
├── routes/         # API endpoints
├── middleware/     # Auth & CORS
└── server.js       # Express app

frontend/
├── components/     # Reusable UI
├── pages/         # Route components
├── context/       # Auth state
└── App.js         # Main app
```

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB connection string
- Ensure PORT 5000 is free
- Run `npm install` again

**Frontend shows blank?**
- Clear browser cache
- Check REACT_APP_API_URL in .env.development
- Ensure backend is running

**Google Login not working?**
- Verify Client ID matches
- Check redirect URIs in Google Console
- Test in incognito window

## 📞 Support

Issues? Check:
1. README.md for detailed docs
2. .env files are properly configured
3. MongoDB Atlas cluster is running
4. Port 5000 & 3000 are available

## ✨ Next Steps

1. Customize branding (colors, logos)
2. Add payment integration
3. Implement email notifications
4. Add service provider certifications
5. Create mobile app

---

**Happy coding! 🚀 Your RepairHub is ready!**
