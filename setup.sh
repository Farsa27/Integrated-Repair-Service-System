#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}RepairHub - Setup Script${NC}"
echo -e "${BLUE}=====================================${NC}\n"

# Check Node.js
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${NC}\n"

# Setup Backend
echo -e "${YELLOW}Setting up Backend...${NC}"
cd backend
echo -e "${BLUE}Installing backend dependencies...${NC}"
npm install
echo -e "${BLUE}Creating .env file...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠ .env file created. Please fill in your configuration:${NC}"
    echo -e "  - MONGODB_URI: Your MongoDB Atlas connection string"
    echo -e "  - JWT_SECRET: Generate a random secret key"
    echo -e "  - GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET from Google Cloud Console"
fi
echo -e "${GREEN}✓ Backend setup complete${NC}\n"

# Setup Frontend
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd ../frontend
echo -e "${BLUE}Installing frontend dependencies...${NC}"
npm install
echo -e "${BLUE}Creating .env.development file...${NC}"
if [ ! -f .env.development ]; then
    cp .env.development .env.development
    echo -e "${YELLOW}⚠ .env.development file created. Update your Google Client ID${NC}"
fi
echo -e "${GREEN}✓ Frontend setup complete${NC}\n"

cd ..

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}=====================================${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Update backend/.env with your MongoDB and Google OAuth credentials"
echo -e "2. Update frontend/.env.development with your Google Client ID"
echo -e "3. Start backend: cd backend && npm run dev"
echo -e "4. Start frontend: cd frontend && npm start"
echo -e "\n${BLUE}For deployment:${NC}"
echo -e "1. Push code to GitHub"
echo -e "2. Create services on Render.com"
echo -e "3. Configure environment variables in Render dashboard"
echo -e "4. Deploy!\n"
