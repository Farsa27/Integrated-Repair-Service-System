# RepairHub MERN Stack - Complete Implementation Guide

## 📋 Project Overview

RepairHub is a full-stack MERN (MongoDB, Express, React, Node.js) application that connects customers with verified repair and maintenance service professionals. It features a professional UI/UX, secure authentication, appointment booking, and price negotiation.

## 🎯 What's Included

### ✅ Completed Features
1. **Authentication System**
   - Email/password signup & login
   - Google OAuth 2.0 integration
   - JWT-based session management
   - Separate admin login portal

2. **Service Management**
   - 10+ service categories (Electrical, Sanitary, Gas, Gardening, Welding, Wood, Plumbing, Carpentry, Painting, Cleaning)
   - Dynamic service listing
   - Price range for each service
   - Service descriptions and icons

3. **Professional Management**
   - Professional profiles with bio and experience
   - Rating and review system
   - Weekly availability scheduling
   - Service specialization tracking
   - Contact information management

4. **Appointment System**
   - Book appointments with date/time selection
   - Location-based services
   - Status tracking (pending, confirmed, in-progress, completed, cancelled)
   - Price negotiation flow
   - Customer reviews and ratings

5. **Admin Dashboard**
   - Dashboard with key metrics
   - User management
   - Professional verification system
   - Appointment monitoring
   - Service reports and analytics

6. **Responsive Design**
   - Tailwind CSS styling
   - Mobile-first approach
   - Professional color scheme
   - Smooth animations and transitions

### 🔧 Technical Stack

**Backend**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Google OAuth 2.0 SDK
- bcryptjs for password hashing
- CORS enabled

**Frontend**
- React 18
- React Router v6 for navigation
- Tailwind CSS for styling
- Axios for API calls
- React Icons for UI elements
- Context API for state management

**Database**
- MongoDB Atlas (cloud)
- Collections: Users, Services, Professionals, Appointments, Admins

**Deployment**
- Render.com (free tier)
- GitHub for version control
- Environment-based configuration

## 📁 Project Structure

```
Integrated-Repair-Service-System-/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Professional.js
│   │   ├── Appointment.js
│   │   └── Admin.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── serviceController.js
│   │   ├── professionalController.js
│   │   ├── appointmentController.js
│   │   └── adminController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── professionalRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .env.production
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ServiceCard.js
│   │   │   ├── ProfessionalCard.js
│   │   │   └── GoogleLoginButton.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── AdminLogin.js
│   │   │   ├── ProfessionalsList.js
│   │   │   ├── BookAppointment.js
│   │   │   ├── MyAppointments.js
│   │   │   └── AdminDashboard.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   │
│   │   ├── data/
│   │   │   └── services.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.development
│   └── .env.production
│
├── .gitignore
├── render.yaml
├── setup.sh
├── seeds.mongodb.js
├── README.md
├── QUICKSTART.md
└── IMPLEMENTATION_GUIDE.md (this file)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free: mongodb.com/cloud/atlas)
- Google Cloud project with OAuth credentials
- Git

### Step 1: Setup MongoDB

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user with strong password
4. Whitelist all IP (0.0.0.0/0) for development
5. Copy connection string

### Step 2: Setup Google OAuth

1. Visit [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application type)
5. Add authorized redirect URIs:
   - http://localhost:3000/
   - http://localhost:3000/login
6. Copy Client ID and Client Secret

### Step 3: Local Development Setup

```bash
# Clone repository
git clone <your-repo-url>
cd Integrated-Repair-Service-System-

# Backend Setup
cd backend
npm install
cp .env.example .env

# Edit .env with your credentials:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/repair-services
# JWT_SECRET=<generate random string>
# GOOGLE_CLIENT_ID=<from Google Console>
# GOOGLE_CLIENT_SECRET=<from Google Console>

cd ..

# Frontend Setup
cd frontend
npm install
cp .env.development .env.development

# Edit .env.development:
# REACT_APP_GOOGLE_CLIENT_ID=<from Google Console>
# REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Server will run on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm start
# App will run on http://localhost:3000
```

Visit `http://localhost:3000` to see your app!

## 🧪 Testing the Application

### As Customer
1. Click "Sign Up" on home page
2. Register with email/password or Google
3. Select "Customer" role
4. Browse available services
5. Click on service to see professionals
6. Click "Book Now" on a professional
7. Fill appointment details
8. Submit booking

### As Professional
1. Sign up with "Service Professional" role
2. Complete professional profile
3. Add services you provide
4. Set weekly availability
5. Wait for admin verification
6. Receive and manage appointments
7. Send price quotes to customers

### As Admin
1. Navigate to `/admin-login`
2. Login with admin credentials (must be created manually in DB)
3. View dashboard with metrics
4. Approve/reject pending professionals
5. Monitor all appointments
6. View user statistics

## 📡 API Endpoints

### Authentication (POST)
- `/api/auth/signup` - Register user
- `/api/auth/login` - Login with email
- `/api/auth/google-login` - Google OAuth
- `/api/auth/admin-login` - Admin login
- `/api/auth/profile` - Get profile (GET)
- `/api/auth/profile` - Update profile (PUT)

### Services (GET)
- `/api/services` - All services
- `/api/services/:id` - Service details
- `/api/services/category/:category` - By category

### Services (Admin Only - POST/PUT/DELETE)
- `/api/services` - Create service
- `/api/services/:id` - Update service
- `/api/services/:id` - Delete service

### Professionals (GET)
- `/api/professionals/service/:serviceId` - By service
- `/api/professionals/:id` - Professional details
- `/api/professionals/search` - Search with filters

### Professionals (POST/PUT - Auth Required)
- `/api/professionals/register` - Register as professional
- `/api/professionals/:id` - Update profile
- `/api/professionals/:id/availability` - Update availability

### Appointments (POST/GET/PUT)
- `/api/appointments` - Create appointment
- `/api/appointments/:id` - Get details
- `/api/appointments/customer/my-appointments` - Customer's bookings
- `/api/appointments/professional/my-appointments` - Professional's bookings
- `/api/appointments/:id/quote` - Send price quote
- `/api/appointments/:id/accept-quote` - Accept quote
- `/api/appointments/:id/review` - Add review
- `/api/appointments/:id/cancel` - Cancel appointment

### Admin (GET)
- `/api/admin/dashboard` - Dashboard metrics
- `/api/admin/users` - All users
- `/api/admin/professionals` - All professionals
- `/api/admin/appointments` - All appointments
- `/api/admin/reports/services` - Service analytics

### Admin (PUT - Admin Only)
- `/api/admin/professionals/:id/verify` - Verify professional
- `/api/admin/professionals/:id/reject` - Reject professional

## 🌐 Deployment on Render

### Step 1: Prepare for Deployment

```bash
# Update .env.production with Render URLs
# Backend .env.production:
MONGODB_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<generate new random secret>
GOOGLE_CLIENT_ID=<your Google client ID>
GOOGLE_CLIENT_SECRET=<your Google client secret>
FRONTEND_URL=https://your-frontend.onrender.com
NODE_ENV=production
PORT=5000

# Frontend .env.production:
REACT_APP_GOOGLE_CLIENT_ID=<your Google client ID>
REACT_APP_API_URL=https://your-api.onrender.com
```

### Step 2: Push to GitHub

```bash
git remote add origin https://github.com/your-username/your-repo.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 3: Create Render Account

1. Sign up at [render.com](https://render.com)
2. Connect GitHub account
3. Create new project from your repository

### Step 4: Deploy Backend

1. Click "New" → "Web Service"
2. Select your GitHub repository
3. Configure:
   - **Name**: repair-service-api
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - FRONTEND_URL
   - NODE_ENV=production
5. Click Deploy

### Step 5: Deploy Frontend

1. Click "New" → "Web Service"
2. Select same repository
3. Configure:
   - **Name**: repair-service-frontend
   - **Environment**: Node
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm start`
4. Add environment variables:
   - REACT_APP_GOOGLE_CLIENT_ID
   - REACT_APP_API_URL=<your backend Render URL>
5. Click Deploy

### Step 6: Update Google OAuth

1. Go to Google Cloud Console
2. Update authorized redirect URIs:
   - Add `https://your-frontend.onrender.com/`
   - Add `https://your-frontend.onrender.com/login`

### Step 7: Verify Deployment

- Backend should be accessible at `https://your-api.onrender.com/api/health`
- Frontend should load at `https://your-frontend.onrender.com`
- Google login should work

## 🔑 Creating an Admin Account

After deployment:

```javascript
// Using MongoDB Atlas UI or mongo shell:
use repair-services;

// First create a regular user through signup
// Then update the role:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
);
```

Then login at `/admin-login`

## 🎨 Customization Guide

### Change Brand Colors
Edit [frontend/tailwind.config.js](frontend/tailwind.config.js):
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Add New Service Categories
1. Update [backend/models/Service.js](backend/models/Service.js) category enum
2. Add to [frontend/src/data/services.js](frontend/src/data/services.js)
3. Add icon in the service card

### Customize Email Templates
Create email templates in backend and use Nodemailer (already in dependencies)

### Add Payment Gateway
1. Install Razorpay: `npm install razorpay`
2. Add payment route in backend
3. Integrate with appointment confirmation

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection fails | Check connection string format, IP whitelist, network access |
| Google login doesn't work | Verify Client ID, check redirect URIs, clear browser cache |
| Backend won't start | Check PORT not in use, verify .env file, run `npm install` |
| Frontend shows blank | Check API_URL in .env, ensure backend is running, clear cache |
| Render deployment fails | Check build logs, verify environment variables, ensure package.json exists |

## 📚 Database Schemas

### User
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  profilePicture: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  googleId: String,
  role: 'customer'|'professional'|'admin',
  isVerified: Boolean,
  createdAt: Date
}
```

### Service
```javascript
{
  name: String (unique),
  description: String,
  icon: String,
  category: String,
  basePriceRange: { min, max },
  isActive: Boolean,
  createdAt: Date
}
```

### Professional
```javascript
{
  userId: ObjectId (ref: User),
  services: [ObjectId] (ref: Service),
  businessName: String,
  bio: String,
  experience: Number,
  rating: Number (0-5),
  totalReviews: Number,
  phoneNumber: String,
  availability: {
    monday: { start, end, isAvailable },
    tuesday: { start, end, isAvailable },
    ...
  },
  isVerified: Boolean,
  createdAt: Date
}
```

### Appointment
```javascript
{
  customerId: ObjectId (ref: User),
  professionalId: ObjectId (ref: Professional),
  serviceId: ObjectId (ref: Service),
  appointmentDate: Date,
  preferredTime: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  description: String,
  quotedPrice: Number,
  finalPrice: Number,
  status: 'pending'|'confirmed'|'in-progress'|'completed'|'cancelled',
  rating: Number (1-5),
  review: String,
  createdAt: Date
}
```

## ✨ Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Real-time chat (Socket.io)
- [ ] Email & SMS notifications
- [ ] Advanced search & filtering
- [ ] Service certificates upload
- [ ] Work portfolio images
- [ ] Service packages
- [ ] Referral system
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push: `git push origin feature/feature-name`
5. Create Pull Request

## 📞 Support & Documentation

- **Full README**: See [README.md](README.md)
- **Quick Start**: See [QUICKSTART.md](QUICKSTART.md)
- **Issues**: Create GitHub issue for bugs
- **Features**: Request via discussions

---

**Your RepairHub is ready for development and deployment! Happy coding! 🚀**
