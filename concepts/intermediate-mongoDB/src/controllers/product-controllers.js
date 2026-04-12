import { handleBadRequest } from "../helpers/handleBadRequest.js";
import Product from "../models/product.js";

const sampleProducts = [
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
];

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
    const insertedProducts = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      data: insertedProducts,
    });
  } catch (err) {
    handleBadRequest(res, err, "Failed to insert sample products");
  }
};

export { getAllProducts, insertSampleProducts };
