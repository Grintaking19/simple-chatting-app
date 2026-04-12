import { handleBadRequest } from "../helpers/handleBadRequest.js";
import Product from "../models/product.js";

// const sampleProducts = [
//   {
//     name: "Laptop",
//     category: "Electronics",
//     price: 999,
//     inStock: true,
//     tags: ["computer", "tech"],
//   },
//   {
//     name: "Smartphone",
//     category: "Electronics",
//     price: 699,
//     inStock: true,
//     tags: ["mobile", "tech"],
//   },
//   {
//     name: "Headphones",
//     category: "Electronics",
//     price: 199,
//     inStock: false,
//     tags: ["audio", "tech"],
//   },
//   {
//     name: "Running Shoes",
//     category: "Sports",
//     price: 89,
//     inStock: true,
//     tags: ["footwear", "running"],
//   },
//   {
//     name: "Novel",
//     category: "Books",
//     price: 15,
//     inStock: true,
//     tags: ["fiction", "bestseller"],
//   },
//   {
//     name: "Coffee Maker",
//     category: "Home Appliances",
//     price: 49,
//     inStock: false,
//     tags: ["kitchen", "coffee"],
//   },
//   {
//     name: "Office Chair",
//     category: "Furniture",
//     price: 149,
//     inStock: true,
//     tags: ["office", "comfort"],
//   },
//   {
//     name: "Yoga Mat",
//     category: "Sports",
//     price: 25,
//     inStock: true,
//     tags: ["fitness", "yoga"],
//   },
//   {
//     name: "Blender",
//     category: "Home Appliances",
//     price: 59,
//     inStock: true,
//     tags: ["kitchen", "smoothies"],
//   },
//   {
//     name: "E-book Reader",
//     category: "Electronics",
//     price: 129,
//     inStock: false,
//     tags: ["books", "tech"],
//   },
//   {
//     name: "Gaming Console",
//     category: "Electronics",
//     price: 399,
//     inStock: true,
//     tags: ["gaming", "tech"],
//   },
// ];

// const sampleProducts2 = [
//   // --- ELECTRONICS (High price variance, specific tech tags) ---
//   { name: "Pro Wireless Mouse", category: "Electronics", price: 79.99, inStock: true, tags: ["tech", "peripheral", "wireless"] },
//   { name: "Mechanical Keyboard", category: "Electronics", price: 129.50, inStock: true, tags: ["tech", "peripheral", "gaming"] },
//   { name: "USB-C Hub", category: "Electronics", price: 45.00, inStock: false, tags: ["tech", "accessory"] },
//   { name: "4K Monitor", category: "Electronics", price: 349.99, inStock: true, tags: ["tech", "peripheral", "display"] },
//   { name: "Noise Cancelling Headphones", category: "Electronics", price: 299.00, inStock: true, tags: ["tech", "audio", "wireless"] },
//   { name: "Bluetooth Speaker", category: "Electronics", price: 55.00, inStock: true, tags: ["tech", "audio", "wireless"] },
//   { name: "Webcam 1080p", category: "Electronics", price: 89.00, inStock: true, tags: ["tech", "video"] },
//   { name: "Gaming Headset", category: "Electronics", price: 110.00, inStock: false, tags: ["tech", "audio", "gaming"] },

//   // --- FITNESS (Recurring 'healthy' and 'outdoor' tags) ---
//   { name: "Yoga Mat", category: "Fitness", price: 25.00, inStock: true, tags: ["healthy", "indoor", "exercise"] },
//   { name: "Dumbbell Set 10kg", category: "Fitness", price: 60.00, inStock: true, tags: ["exercise", "heavy"] },
//   { name: "Resistance Bands", category: "Fitness", price: 15.99, inStock: true, tags: ["exercise", "accessory"] },
//   { name: "Running Shoes", category: "Fitness", price: 120.00, inStock: true, tags: ["healthy", "outdoor", "apparel"] },
//   { name: "Protein Shaker", category: "Fitness", price: 12.00, inStock: true, tags: ["healthy", "accessory"] },
//   { name: "Smart Fitness Watch", category: "Fitness", price: 199.00, inStock: true, tags: ["tech", "healthy", "wearable"] },
//   { name: "Kettlebell 15lb", category: "Fitness", price: 45.00, inStock: false, tags: ["exercise", "heavy"] },
//   { name: "Jump Rope", category: "Fitness", price: 10.00, inStock: true, tags: ["exercise", "cardio"] },

//   // --- HOME OFFICE (Overlap with Electronics and Furniture) ---
//   { name: "Ergonomic Chair", category: "Home Office", price: 250.00, inStock: true, tags: ["furniture", "office"] },
//   { name: "Standing Desk", category: "Home Office", price: 450.00, inStock: true, tags: ["furniture", "office"] },
//   { name: "Desk Lamp", category: "Home Office", price: 35.00, inStock: true, tags: ["accessory", "lighting"] },
//   { name: "Cable Organizer", category: "Home Office", price: 12.50, inStock: true, tags: ["accessory", "office"] },
//   { name: "Notebook Planner", category: "Home Office", price: 18.00, inStock: true, tags: ["office", "stationary"] },
//   { name: "Monitor Stand", category: "Home Office", price: 40.00, inStock: false, tags: ["accessory", "office"] },
//   { name: "Fountain Pen", category: "Home Office", price: 25.00, inStock: true, tags: ["office", "stationary"] },
//   { name: "Wall Calendar", category: "Home Office", price: 15.00, inStock: true, tags: ["office", "stationary"] },

//   // --- KITCHEN (Shared 'home' and 'gadget' tags) ---
//   { name: "Air Fryer", category: "Kitchen", price: 120.00, inStock: true, tags: ["appliance", "home", "cooking"] },
//   { name: "Electric Kettle", category: "Kitchen", price: 45.00, inStock: true, tags: ["appliance", "home"] },
//   { name: "Chef Knife", category: "Kitchen", price: 85.00, inStock: true, tags: ["cooking", "professional"] },
//   { name: "Wooden Cutting Board", category: "Kitchen", price: 30.00, inStock: true, tags: ["cooking", "home"] },
//   { name: "Coffee Grinder", category: "Kitchen", price: 65.00, inStock: false, tags: ["appliance", "gadget", "coffee"] },
//   { name: "Espresso Machine", category: "Kitchen", price: 499.00, inStock: true, tags: ["appliance", "gadget", "coffee"] },
//   { name: "Silicon Spatula Set", category: "Kitchen", price: 22.00, inStock: true, tags: ["cooking", "accessory"] },
//   { name: "Toaster", category: "Kitchen", price: 35.00, inStock: true, tags: ["appliance", "home"] },

//   // --- APPAREL (Shared 'style' and 'outdoor' tags) ---
//   { name: "Cotton T-Shirt", category: "Apparel", price: 20.00, inStock: true, tags: ["clothing", "casual"] },
//   { name: "Denim Jacket", category: "Apparel", price: 85.00, inStock: true, tags: ["clothing", "style", "outdoor"] },
//   { name: "Leather Belt", category: "Apparel", price: 40.00, inStock: true, tags: ["accessory", "style"] },
//   { name: "Wool Beanie", category: "Apparel", price: 25.00, inStock: true, tags: ["clothing", "outdoor"] },
//   { name: "Canvas Backpack", category: "Apparel", price: 55.00, inStock: false, tags: ["accessory", "outdoor", "travel"] },
//   { name: "Running Shorts", category: "Apparel", price: 30.00, inStock: true, tags: ["clothing", "healthy", "exercise"] },
//   { name: "Sunglasses", category: "Apparel", price: 150.00, inStock: true, tags: ["accessory", "style"] },
//   { name: "Rain Coat", category: "Apparel", price: 95.00, inStock: true, tags: ["clothing", "outdoor"] }
// ];

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to fetch products");
  }
};

const insertSampleProducts = async (req, res) => {
  try {
    const insertedProducts = await Product.insertMany(sampleProducts2);
    res.status(201).json({
      success: true,
      data: insertedProducts,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to insert sample products");
  }
};

// Aggregation pipeline examples for product stats and category-based queries
const getProductStats = async (req, res) => {
  try {

  }
  catch (err) {
    handleBadRequest(res, err, "Failed to get product stats");
  }
}

//Tag based Trend analysis - Which tags are most common among in-stock products?


// Price distribution - How many products fall into different price ranges (e.g., $0-50, $51-100, etc.)?
// (Price Tiers) - Identify how many products are in different price tiers (e.g., budget, mid-range, premium).

// Lost Revenue Restock Analysis - Find why categories with out-of-stock products have higher average prices, indicating potential lost revenue.


// Executive Dashboard Metrics - Create an endpoint that provides key metrics for executives, such as total products, average price, and stock status breakdown.
// (Use facet aggregation to calculate multiple metrics in a single query).







export { getAllProducts, insertSampleProducts, getProductStats };
