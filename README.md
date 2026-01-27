# RepairHub - MERN Repair Services Platform

A full-stack MERN application for connecting customers with verified repair and maintenance service professionals.

## Features

- ✅ **User Authentication**: Email/password signup, login with JWT
- ✅ **Google OAuth Integration**: One-click login with Google
- ✅ **Admin Login Portal**: Separate secure admin interface
- ✅ **Service Categories**: 10+ service categories (Electrical, Sanitary, Gas, Gardening, Welding, Wood, Plumbing, Carpentry, Painting, Cleaning)
- ✅ **Professional Profiles**: Verified professionals with ratings and reviews
- ✅ **Professional Availability**: Set weekly availability schedules
- ✅ **Appointment Booking**: Book appointments with date/time and location
- ✅ **Price Negotiation**: Contact professionals via phone to negotiate pricing
- ✅ **Admin Dashboard**: Manage users, professionals, appointments, and view reports
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB
- JWT Authentication
- Google OAuth 2.0
- Mongoose

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios
- React Icons

### Deployment
- Render (Free Tier Compatible)

## Project Structure

```
.
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   ├── server.js           # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Route pages
│   │   ├── context/        # Auth context
│   │   ├── App.js          # Main app
│   │   └── index.js        # Entry point
│   └── package.json
│
└── render.yaml             # Render deployment config
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (MongoDB Atlas for free)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Integrated-Repair-Service-System-
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Create .env.development file
cp .env.development .env.development
```

4. **Start Development Servers**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

Visit `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/repair-services
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.development)
```
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_API_URL=http://localhost:5000
```

## Deployment on Render

### Step 1: Prepare Repository
1. Push code to GitHub
2. Create `render.yaml` (already included)

### Step 2: Create Render Account
1. Sign up at [render.com](https://render.com)
2. Connect your GitHub account

### Step 3: Deploy Backend
1. Create New → Web Service
2. Select your repository
3. Set Build Command: `cd backend && npm install`
4. Set Start Command: `cd backend && npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string
   - `GOOGLE_CLIENT_ID`: From Google Cloud Console
   - `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
   - `FRONTEND_URL`: Your Render frontend URL

### Step 4: Deploy Frontend
1. Create New → Web Service
2. Select your repository
3. Set Build Command: `cd frontend && npm install && npm run build`
4. Set Start Command: `cd frontend && npm start`
5. Add environment variables:
   - `REACT_APP_GOOGLE_CLIENT_ID`: Same as backend
   - `REACT_APP_API_URL`: Your Render backend URL

### Step 5: Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - `http://localhost:3000/` (local)
   - `https://your-frontend.onrender.com/` (production)

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google-login` - Login with Google
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `GET /api/services/category/:category` - Get services by category

### Professionals
- `GET /api/professionals/service/:serviceId` - Get professionals for a service
- `GET /api/professionals/:id` - Get professional details
- `POST /api/professionals/register` - Register as professional
- `PUT /api/professionals/:id/availability` - Update availability

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/customer/my-appointments` - Get customer appointments
- `GET /api/appointments/professional/my-appointments` - Get professional appointments
- `PUT /api/appointments/:id/quote` - Send price quote
- `PUT /api/appointments/:id/review` - Add review

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - List all users
- `GET /api/admin/professionals` - List all professionals
- `GET /api/admin/appointments` - List all appointments
- `PUT /api/admin/professionals/:id/verify` - Verify professional

## Usage Guide

### For Customers
1. Sign up or login with Google
2. Browse service categories on home page
3. Click on a service to see available professionals
4. Filter by rating if needed
5. Click "Book Now" to schedule appointment
6. Enter service date, time, and location
7. Professional will contact you to negotiate price

### For Professionals
1. Sign up as "Service Professional"
2. Complete professional profile with services and availability
3. Wait for admin verification
4. Receive appointment requests
5. Send price quotes to customers
6. Manage appointments and reviews

### For Admins
1. Login at `/admin-login`
2. View dashboard with key metrics
3. Verify pending professionals
4. Monitor all appointments
5. Manage users and services

## Features Highlight

### Professional UI/UX
- Clean, modern design with Tailwind CSS
- Responsive layout for mobile and desktop
- Smooth transitions and animations
- Professional color scheme (Blue & Indigo)
- Intuitive navigation

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Admin-only endpoints
- Secure CORS configuration

### Scalability
- Modular component structure
- Centralized state management with Context API
- RESTful API design
- MongoDB for scalable data storage

## Troubleshooting

### MongoDB Connection Failed
- Verify MongoDB Atlas cluster IP whitelist
- Check connection string format
- Ensure network access is enabled

### Google OAuth Not Working
- Verify Client ID matches in code and Google Console
- Check authorized redirect URIs
- Clear browser cache and cookies

### Deployment Issues on Render
- Check build logs for errors
- Verify environment variables are set
- Ensure package.json scripts are correct
- Check for node_modules in .gitignore

## Future Enhancements

- Payment gateway integration (Razorpay/Stripe)
- Real-time chat between customers and professionals
- Email notifications
- SMS notifications
- Advanced filtering and search
- Service provider ratings and certifications
- Work portfolio images
- Service warranty options

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue on GitHub.

---

**Made with ❤️ for connecting customers with trusted repair professionals**
