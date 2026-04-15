import express from "express";
import {
  getAllProducts,
  insertSampleProducts,
  getProductStats,
  getTagTrends,
  getOutOfStockRevenueLoss,
  getPriceDistribution,
  getCategoryPriceTiers,
  getExecutiveDashboardMetrics,
} from "../controllers/product-controllers.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add-samples", insertSampleProducts);

// 1. Product statistics
router.get("/stats", getProductStats);

// 2. Tag trends
router.get("/tags", getTagTrends);

// 3. Out of stock revenue loss
router.get("/out-of-stock-revenue-loss", getOutOfStockRevenueLoss);

// 4. Price distribution
router.get("/price-distribution", getPriceDistribution);
router.get("/category-price-tiers", getCategoryPriceTiers);

// 5. Executive dashboard metrics
router.get("/executive-dashboard-metrics", getExecutiveDashboardMetrics);

export default router;
