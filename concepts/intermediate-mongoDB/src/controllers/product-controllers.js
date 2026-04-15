import { handleBadRequest } from "../helpers/handleBadRequest.js";
import Product from "../models/product.js";

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

const insertProducts = async (req, res) => {
  try {
    const productsData = req.body;
    if (!Array.isArray(productsData) || productsData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a non-empty array of products",
      });
    }
    const insertedProducts = await Product.insertMany(productsData);
    res.status(201).json({
      success: true,
      data: insertedProducts,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to insert products");
  }
};

// Aggregation pipeline examples for product stats and category-based queries
const getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          products: { $push: "$name" },
          productCount: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          inStockCount: { $sum: { $cond: ["$inStock", 1, 0] } },
          outOfStockCount: { $sum: { $cond: ["$inStock", 0, 1] } },
        },
      },
      {
        $project: {
          products: 1,
          productCount: 1,
          avgPrice: { $round: ["$avgPrice", 2] },
          minPrice: 1,
          maxPrice: 1,
          inStockCount: 1,
          outOfStockCount: 1,
        },
      },
      { $sort: { productCount: -1 } },
    ]);
    res.status(200).json({
      success: true,
      data: stats,
    });
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
          _id: "$tags",
          productCount: { $sum: 1 },
          avgPrice: { $avg: "$price" },
        },
      },
      // Approximate avgPrice to 2 decimal places
      {
        $project: {
          _id: 1,
          productCount: 1,
          avgPrice: { $round: ["$avgPrice", 2] },
        },
      },
      // Sort by most frequent tags used first
      { $sort: { productCount: -1 } },
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
  insertProducts,
  getProductStats,
  getTagTrends,
  getOutOfStockRevenueLoss,
  getPriceDistribution,
  getCategoryPriceTiers,
  getExecutiveDashboardMetrics,
};
