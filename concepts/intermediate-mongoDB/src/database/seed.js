import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./db.js";
dotenv.config();

const sampleProducts = [
  // --- Random assortment of products across multiple categories with overlapping tags and varying price ranges ---
  {
    name: "Laptop",
    category: "Electronics",
    price: 999,
    inStock: true,
    tags: ["computer", "tech"],
  },
  {
    name: "Smartphone",
    category: "Electronics",
    price: 699,
    inStock: true,
    tags: ["mobile", "tech"],
  },
  {
    name: "Headphones",
    category: "Electronics",
    price: 199,
    inStock: false,
    tags: ["audio", "tech"],
  },
  {
    name: "Running Shoes",
    category: "Sports",
    price: 89,
    inStock: true,
    tags: ["footwear", "running"],
  },
  {
    name: "Novel",
    category: "Books",
    price: 15,
    inStock: true,
    tags: ["fiction", "bestseller"],
  },
  {
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 49,
    inStock: false,
    tags: ["kitchen", "coffee"],
  },
  {
    name: "Office Chair",
    category: "Furniture",
    price: 149,
    inStock: true,
    tags: ["office", "comfort"],
  },
  {
    name: "Yoga Mat",
    category: "Sports",
    price: 25,
    inStock: true,
    tags: ["fitness", "yoga"],
  },
  {
    name: "Blender",
    category: "Home Appliances",
    price: 59,
    inStock: true,
    tags: ["kitchen", "smoothies"],
  },
  {
    name: "E-book Reader",
    category: "Electronics",
    price: 129,
    inStock: false,
    tags: ["books", "tech"],
  },
  {
    name: "Gaming Console",
    category: "Electronics",
    price: 399,
    inStock: true,
    tags: ["gaming", "tech"],
  },

  // --- ELECTRONICS (High price variance, specific tech tags) ---
  {
    name: "Pro Wireless Mouse",
    category: "Electronics",
    price: 79.99,
    inStock: true,
    tags: ["tech", "peripheral", "wireless"],
  },
  {
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 129.5,
    inStock: true,
    tags: ["tech", "peripheral", "gaming"],
  },
  {
    name: "USB-C Hub",
    category: "Electronics",
    price: 45.0,
    inStock: false,
    tags: ["tech", "accessory"],
  },
  {
    name: "4K Monitor",
    category: "Electronics",
    price: 349.99,
    inStock: true,
    tags: ["tech", "peripheral", "display"],
  },
  {
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 299.0,
    inStock: true,
    tags: ["tech", "audio", "wireless"],
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 55.0,
    inStock: true,
    tags: ["tech", "audio", "wireless"],
  },
  {
    name: "Webcam 1080p",
    category: "Electronics",
    price: 89.0,
    inStock: true,
    tags: ["tech", "video"],
  },
  {
    name: "Gaming Headset",
    category: "Electronics",
    price: 110.0,
    inStock: false,
    tags: ["tech", "audio", "gaming"],
  },

  // --- FITNESS (Recurring 'healthy' and 'outdoor' tags) ---
  {
    name: "Yoga Mat",
    category: "Fitness",
    price: 25.0,
    inStock: true,
    tags: ["healthy", "indoor", "exercise"],
  },
  {
    name: "Dumbbell Set 10kg",
    category: "Fitness",
    price: 60.0,
    inStock: true,
    tags: ["exercise", "heavy"],
  },
  {
    name: "Resistance Bands",
    category: "Fitness",
    price: 15.99,
    inStock: true,
    tags: ["exercise", "accessory"],
  },
  {
    name: "Running Shoes",
    category: "Fitness",
    price: 120.0,
    inStock: true,
    tags: ["healthy", "outdoor", "apparel"],
  },
  {
    name: "Protein Shaker",
    category: "Fitness",
    price: 12.0,
    inStock: true,
    tags: ["healthy", "accessory"],
  },
  {
    name: "Smart Fitness Watch",
    category: "Fitness",
    price: 199.0,
    inStock: true,
    tags: ["tech", "healthy", "wearable"],
  },
  {
    name: "Kettlebell 15lb",
    category: "Fitness",
    price: 45.0,
    inStock: false,
    tags: ["exercise", "heavy"],
  },
  {
    name: "Jump Rope",
    category: "Fitness",
    price: 10.0,
    inStock: true,
    tags: ["exercise", "cardio"],
  },

  // --- HOME OFFICE (Overlap with Electronics and Furniture) ---
  {
    name: "Ergonomic Chair",
    category: "Home Office",
    price: 250.0,
    inStock: true,
    tags: ["furniture", "office"],
  },
  {
    name: "Standing Desk",
    category: "Home Office",
    price: 450.0,
    inStock: true,
    tags: ["furniture", "office"],
  },
  {
    name: "Desk Lamp",
    category: "Home Office",
    price: 35.0,
    inStock: true,
    tags: ["accessory", "lighting"],
  },
  {
    name: "Cable Organizer",
    category: "Home Office",
    price: 12.5,
    inStock: true,
    tags: ["accessory", "office"],
  },
  {
    name: "Notebook Planner",
    category: "Home Office",
    price: 18.0,
    inStock: true,
    tags: ["office", "stationary"],
  },
  {
    name: "Monitor Stand",
    category: "Home Office",
    price: 40.0,
    inStock: false,
    tags: ["accessory", "office"],
  },
  {
    name: "Fountain Pen",
    category: "Home Office",
    price: 25.0,
    inStock: true,
    tags: ["office", "stationary"],
  },
  {
    name: "Wall Calendar",
    category: "Home Office",
    price: 15.0,
    inStock: true,
    tags: ["office", "stationary"],
  },

  // --- KITCHEN (Shared 'home' and 'gadget' tags) ---
  {
    name: "Air Fryer",
    category: "Kitchen",
    price: 120.0,
    inStock: true,
    tags: ["appliance", "home", "cooking"],
  },
  {
    name: "Electric Kettle",
    category: "Kitchen",
    price: 45.0,
    inStock: true,
    tags: ["appliance", "home"],
  },
  {
    name: "Chef Knife",
    category: "Kitchen",
    price: 85.0,
    inStock: true,
    tags: ["cooking", "professional"],
  },
  {
    name: "Wooden Cutting Board",
    category: "Kitchen",
    price: 30.0,
    inStock: true,
    tags: ["cooking", "home"],
  },
  {
    name: "Coffee Grinder",
    category: "Kitchen",
    price: 65.0,
    inStock: false,
    tags: ["appliance", "gadget", "coffee"],
  },
  {
    name: "Espresso Machine",
    category: "Kitchen",
    price: 499.0,
    inStock: true,
    tags: ["appliance", "gadget", "coffee"],
  },
  {
    name: "Silicon Spatula Set",
    category: "Kitchen",
    price: 22.0,
    inStock: true,
    tags: ["cooking", "accessory"],
  },
  {
    name: "Toaster",
    category: "Kitchen",
    price: 35.0,
    inStock: true,
    tags: ["appliance", "home"],
  },

  // --- APPAREL (Shared 'style' and 'outdoor' tags) ---
  {
    name: "Cotton T-Shirt",
    category: "Apparel",
    price: 20.0,
    inStock: true,
    tags: ["clothing", "casual"],
  },
  {
    name: "Denim Jacket",
    category: "Apparel",
    price: 85.0,
    inStock: true,
    tags: ["clothing", "style", "outdoor"],
  },
  {
    name: "Leather Belt",
    category: "Apparel",
    price: 40.0,
    inStock: true,
    tags: ["accessory", "style"],
  },
  {
    name: "Wool Beanie",
    category: "Apparel",
    price: 25.0,
    inStock: true,
    tags: ["clothing", "outdoor"],
  },
  {
    name: "Canvas Backpack",
    category: "Apparel",
    price: 55.0,
    inStock: false,
    tags: ["accessory", "outdoor", "travel"],
  },
  {
    name: "Running Shorts",
    category: "Apparel",
    price: 30.0,
    inStock: true,
    tags: ["clothing", "healthy", "exercise"],
  },
  {
    name: "Sunglasses",
    category: "Apparel",
    price: 150.0,
    inStock: true,
    tags: ["accessory", "style"],
  },
  {
    name: "Rain Coat",
    category: "Apparel",
    price: 95.0,
    inStock: true,
    tags: ["clothing", "outdoor"],
  },
];

// Create a connection to the database and seed it with sample products

async function seedDatabase() {
  console.log("Seeding database with sample products...");
  try {
    await Product.insertMany(sampleProducts);
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

connectDB()
  .then(() => seedDatabase())
  .then(() => disconnectDB());
