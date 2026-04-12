import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./src/database/db.js";
import productRoutes from "./src/routes/product-routes.js";
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle different Exceptions and Rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

// Uncaught synchronous exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(0);
});

// Cloud/container shutdown (Heroku, Docker, PM2...)
process.on("SIGTERM", () => {
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

// Local shutdown (Ctrl+C, nodemon restarts)
process.on("SIGINT", () => {
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
