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
  } catch (err) {
    handleBadRequest(res, err, "Failed to get product stats");
  }
};

//Tag based Trend analysis - Which tags are most common among in-stock products?
const getTagTrends = async (req, res) => {
  try {
    const tagTrends = await Product.aggregate([
      // Unwind the tags array to analyze individual tags
      { $unwind: "$tags" },
      // Group by tags and count how many products have each tag
      {
        $group: {
          _id: "$tags0",
          productCount: { $sum: 1 },
          avgPrice: { $avg: "$price" },
        },
      },
      // Remove the _id and approximate avgPrice to 2 decimal places
      {
        $project: {
          _id: 0,
          productCount: 1,
          avgPrice: { $round: ["$avgPrice", 2] },
        },
      },
      // Sort by most frequent tags used first
      { $sort: { productCount: -1 } },
      // limit to top 5 trending tags
      { $limit: 5 },
    ]);
    res.status(200).json({
      success: true,
      data: tagTrends,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to get tag trends");
  }
};
// Price distribution - How many products fall into different price ranges (e.g., $0-50, $51-100, etc.)?
// (Price Tiers) - Identify how many products are in different price tiers (e.g., budget, mid-range, premium).
const getPriceDistribution = async (req, res) => {
  try {
    const priceDistribution = await Product.aggregate([
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 50, 100, 200, 500, 1000],
          default: "Ultra Luxury",
          output: {
            productCount: { $sum: 1 },
            products: { $push: "$name" },
            avgPrice: { $avg: "$price" },
            categoriesRepresented: { $addToSet: "$category" },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: priceDistribution,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to get price distribution");
  }
};

const getCategoryPriceTiers = async (req, res) => {
  try {
    const priceCategoriesTiers = await Product.aggregate([
      // Group products by category and price tiers (e.g., $0-99, $100-199, etc.)
      {
        $group: {
          _id: {
            category: "$category",
            priceTiers: { $subtract: ["$price", { $mod: ["$price", 100] }] },
          },
          productCount: { $sum: 1 },
          products: { $push: "$name" },
        },
      },
      // Regroup by category to get price tier distribution within each category
      {
        $group: {
          _id: "$_id.category",
          priceTiers: {
            $push: {
              rangeStart: "$_id.priceTiers",
              rangeEnd: { $add: ["$_id.priceTiers", 99] },
              productCount: "$productCount",
              products: "$products",
            },
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: priceCategoriesTiers,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to get category price variance");
  }
};

// Lost Revenue Restock Analysis - Find why categories with out-of-stock products have higher average prices, indicating potential lost revenue.
const getOutOfStockRevenueLoss = async (req, res) => {
  try {
    const revenueLoss = await Product.aggregate([
      // Match only out-of-stock products
      { $match: { inStock: false } },
      // Group by category and calculate lost revenue from sum of prices and count of out-of-stock products
      {
        $group: {
          _id: "$category",
          outOfStockProducts: { $push: "$name" },
          outOfStockCount: { $sum: 1 },
          missingRevenuePotential: { $sum: "$price" },
        },
      },
      // Sort by potential lost revenue in descending order
      { $sort: { missingRevenuePotential: -1 } },
    ]);
    res.status(200).json({
      success: true,
      data: revenueLoss,
    });
  } catch (err) {
    handleBadRequest(
      res,
      err,
      "Failed to analyze lost revenue from out-of-stock products",
    );
  }
};

// Executive Dashboard Metrics - Create an endpoint that provides key metrics for executives, such as total products, average price, and stock status breakdown.
// (Use facet aggregation to calculate multiple metrics in a single query).
const getExecutiveDashboardMetrics = async (req, res) => {
  try {
    const dashboardMetrics = await Product.aggregate([
      // $facet for multiple queries in parallel
      {
        $facet: {
          categorySummary: [
            {
              $group: {
                _id: "$category",
                totalProducts: { $sum: 1 },
                avgPrice: { $avg: "$price" },
                inStockCount: { $sum: { $cond: ["$inStock", 1, 0] } },
                outOfStockCount: { $sum: { $cond: ["$inStock", 0, 1] } },
                inventoryValue: { $sum: { $cond: ["$inStock", "$price", 0] } },
              },
            },
            {
              $sort: { totalProducts: -1 },
            },
          ],

          premiumProducts: [
            { $match: { inStock: true } },
            { $sort: { price: -1 } },
            { $limit: 5 },
            { $project: { name: 1, category: 1, price: 1, tags: 1, _id: 0 } },
          ],
        },
      },
    ]);
    res.status(200).json({
      success: true,
      data: dashboardMetrics,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to get executive dashboard metrics");
  }
};

export {
  getAllProducts,
  insertSampleProducts,
  getProductStats,
  getTagTrends,
  getOutOfStockRevenueLoss,
  getPriceDistribution,
  getCategoryPriceTiers,
  getExecutiveDashboardMetrics,
};
