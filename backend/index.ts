import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";

import cookieParser from "cookie-parser";
import cors from "cors";

// Importing routes
import userRoute from "./routes/userroutes";
import restaurantRoute from "./routes/restaurantroutes";
import menuRoutes from "./routes/menuroutes";
import orderRoutes from "./routes/orderroutes";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();

// Middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);

app.use(express.static(path.join(DIRNAME, "frontend/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.join(DIRNAME, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running at port ${PORT}`);
});
