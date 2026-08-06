import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import blogRoutes from "./src/routes/blog.routes.js";
import flashSaleRoutes from "./src/routes/flashSale.routes.js";
import errorMiddleware from "./src/middleware/error.middleware.js";

const app = express();

// Reflects whatever origin the request came from (works regardless of
// which port Vite happens to be running on — 5173, 5174, etc.)
app.use(cors({ origin: true, credentials: true }));

// Increase timeout for file uploads
app.use((req, res, next) => {
  req.setTimeout(120000); // 120 seconds
  res.setTimeout(120000);
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/flash-sales", flashSaleRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Authentication API Running Successfully",
  });
});

app.use(errorMiddleware);

export default app;