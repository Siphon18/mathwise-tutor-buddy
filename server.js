import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/backend/config/db.js";
import authRoutes from "./src/backend/Routes/authRoutes.js";
import openRouterRoutes from "./src/backend/Routes/OpenRouterRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5020;

// Connect to MongoDB (needed for auth routes)
connectDB();

app.use(cors());
app.use(express.json());

// Mount authentication routes
app.use("/api/auth", authRoutes);

// Mount OpenRouter (Deepseek) routes
app.use("/api", openRouterRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  // Optionally log more details such as req.url or req.method if needed:
  console.error(`Error on ${req.method} ${req.url}`);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: err.stack, // remove in production if you don't want to expose details
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
