// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import impactRoutes from "./routes/impactRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";  // ✅ Volunteers
import foodbankRoutes from "./routes/foodbankRoutes.js";    // ✅ Food Banks
import dashboardRoutes from "./routes/dashboardRoutes.js";  // ✅ Dashboard

dotenv.config();

// Initialize app
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/impact", impactRoutes);
app.use("/api/volunteers", volunteerRoutes);   // ✅ Register volunteer routes
app.use("/api/foodbanks", foodbankRoutes);     // ✅ Register food bank routes
app.use("/api/dashboard", dashboardRoutes);    // ✅ Register dashboard route

// Root route (sanity check)
app.get("/", (req, res) => {
  res.send("🍲 FoodAid API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
