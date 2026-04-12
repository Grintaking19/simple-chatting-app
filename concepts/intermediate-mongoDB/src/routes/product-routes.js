import express from "express";
import { getAllProducts, insertSampleProducts } from "../controllers/product-controllers.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add-samples", insertSampleProducts);


export default router;