# Environment Variables Setup Guide

## 🔐 Backend Environment Variables

### Development (.env)

Create a file named `.env` in the backend folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/repair-services

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_12345678

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Optional: Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Production (.env.production)

For Render deployment, set these environment variables in the Render dashboard:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/repair-services
JWT_SECRET=generate_a_new_strong_secret_key_here_min_32_chars
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=https://your-frontend-app.onrender.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🎨 Frontend Environment Variables

### Development (.env.development)

Create a file named `.env.development` in the frontend folder:

```env
# Google OAuth Client ID
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# API URL
REACT_APP_API_URL=http://localhost:5000
```

### Production (.env.production)

For Render deployment:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
REACT_APP_API_URL=https://your-api-app.onrender.com
```

---

## 📝 How to Get Each Value

### 1. MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `repair-services` with your database name

Example:
```
mongodb+srv://repairhub:MyPassword123@cluster.mongodb.net/repair-services
```

### 2. JWT Secret

Generate a strong random string. In terminal:

```bash
# On Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# On Mac/Linux
openssl rand -base64 32
```

Or use Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Example output:
```
5f7e8c9d1a2b3c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d
```

### 3. Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Enable Google+ API:
   - Click "Enable APIs and Services"
   - Search for "Google+ API"
   - Click "Enable"
4. Create OAuth 2.0 Credentials:
   - Go to "Credentials" in left sidebar
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - Development: `http://localhost:3000`
     - Development: `http://localhost:3000/login`
     - Production: `https://your-frontend-app.onrender.com`
     - Production: `https://your-frontend-app.onrender.com/login`
   - Click "Create"
   - Copy Client ID and Client Secret

Example:
```
GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrst
```

### 4. Cloudinary Credentials (Optional)

For image uploads:

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - API Secret

---

## 🚀 Render Deployment Environment Variables

When deploying to Render, add these variables in the Render Dashboard:

### For Backend Service:

| Variable | Value |
|----------|-------|
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB connection string |
| `JWT_SECRET` | Generate new: `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Your Google Client ID |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret |
| `FRONTEND_URL` | `https://your-frontend.onrender.com` |

### For Frontend Service:

| Variable | Value |
|----------|-------|
| `REACT_APP_GOOGLE_CLIENT_ID` | Same as backend |
| `REACT_APP_API_URL` | `https://your-api.onrender.com` |

---

## ✅ Verification Checklist

Before running the application, verify:

- [ ] MongoDB cluster is created and whitelist includes your IP (or 0.0.0.0/0)
- [ ] Google OAuth credentials are created
- [ ] Authorized redirect URIs are added in Google Console
- [ ] `.env` file exists in backend folder
- [ ] `.env.development` file exists in frontend folder
- [ ] All required variables are filled in
- [ ] No sensitive keys are committed to GitHub (check .gitignore)
- [ ] MongoDB username and password don't contain special characters or use URL encoding

---

## 🔒 Security Best Practices

1. **Never commit .env files** - Already in .gitignore ✓
2. **Use strong JWT_SECRET** - Min 32 characters, random
3. **Generate new JWT_SECRET for production**
4. **Keep Google Client Secret safe** - Only use in backend
5. **Don't hardcode sensitive values** - Always use environment variables
6. **Rotate secrets periodically** - Especially after deployment
7. **Use HTTPS in production** - Render provides free SSL
8. **Whitelist specific IPs for MongoDB** - If possible (not 0.0.0.0/0 in production)

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```
MongooseError: Cannot connect to database
```
**Solution:**
- Check connection string format
- Verify username and password
- Check IP whitelist in MongoDB Atlas
- Ensure database name is correct

### Google OAuth Error
```
Error: invalid_client
```
**Solution:**
- Verify Client ID matches in .env and Google Console
- Check authorized redirect URIs
- Clear browser cache and cookies
- Test in incognito window

### JWT Error
```
JsonWebTokenError: invalid token
```
**Solution:**
- Verify JWT_SECRET is the same as when token was created
- Check token hasn't expired (7 days default)
- Ensure Authorization header format: `Bearer <token>`

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
- Change PORT in .env to 5001
- Or kill process using port 5000
- Windows: `netstat -ano | findstr :5000`
- Mac/Linux: `lsof -i :5000`

---

## 📚 Environment Variables by Feature

### Authentication
- `JWT_SECRET` - Signing JWT tokens
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth backend

### Database
- `MONGODB_URI` - MongoDB connection

### API
- `PORT` - Server port
- `FRONTEND_URL` - CORS origin
- `REACT_APP_API_URL` - Frontend API endpoint

### File Storage (Optional)
- `CLOUDINARY_CLOUD_NAME` - Image uploads
- `CLOUDINARY_API_KEY` - Image uploads
- `CLOUDINARY_API_SECRET` - Image uploads

---

**All set! Your environment is configured and ready to go! 🚀**
