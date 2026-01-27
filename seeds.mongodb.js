# RepairHub - MongoDB Initialization Script

# Use this script to initialize your MongoDB database with sample data

db.createCollection("services");
db.createCollection("users");
db.createCollection("professionals");
db.createCollection("appointments");
db.createCollection("admins");

# Insert sample services
db.services.insertMany([
  {
    "name": "Electrical Services",
    "description": "Professional electrical repair, installation, and maintenance services for homes and offices",
    "icon": "⚡",
    "category": "electrical",
    "basePriceRange": { "min": 300, "max": 1500 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Sanitary Services",
    "description": "Expert plumbing, bathroom fixtures, water system repairs and maintenance",
    "icon": "🚰",
    "category": "sanitary",
    "basePriceRange": { "min": 400, "max": 2000 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Gas & Cylinder Services",
    "description": "Safe LPG cylinder delivery, stove repair, and gas system maintenance",
    "icon": "🔥",
    "category": "gas",
    "basePriceRange": { "min": 200, "max": 800 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Gardening & Landscaping",
    "description": "Garden design, maintenance, pruning, and landscaping services",
    "icon": "🌿",
    "category": "gardening",
    "basePriceRange": { "min": 500, "max": 2500 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Welding & Soldering Services",
    "description": "Metal welding, fabrication, and soldering work for various applications",
    "icon": "🔗",
    "category": "welding",
    "basePriceRange": { "min": 400, "max": 2000 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Wood Services",
    "description": "Furniture repair, woodcraft, carpentry, and wood finishing services",
    "icon": "🪵",
    "category": "wood",
    "basePriceRange": { "min": 500, "max": 3000 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Plumbing Services",
    "description": "Complete plumbing solutions including pipe repair, installation, and maintenance",
    "icon": "🔧",
    "category": "plumbing",
    "basePriceRange": { "min": 300, "max": 1500 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Carpentry Services",
    "description": "Skilled carpentry for doors, windows, cabinets, and wooden structures",
    "icon": "🪚",
    "category": "carpentry",
    "basePriceRange": { "min": 500, "max": 2500 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Painting Services",
    "description": "Interior and exterior painting, wall finishing, and decorative work",
    "icon": "🎨",
    "category": "painting",
    "basePriceRange": { "min": 200, "max": 1000 },
    "isActive": true,
    "createdAt": new Date()
  },
  {
    "name": "Cleaning Services",
    "description": "Professional cleaning for homes, offices, and commercial spaces",
    "icon": "🧹",
    "category": "cleaning",
    "basePriceRange": { "min": 500, "max": 2000 },
    "isActive": true,
    "createdAt": new Date()
  }
]);

print("✓ 10 services inserted successfully");
print("Script completed!");
