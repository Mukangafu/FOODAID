import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createImpact,
  getAllImpact,
  getDonorImpact,
} from "../controllers/impactController.js";

const router = express.Router();

// Create impact (auth required)
router.post("/", protect, createImpact);

// Get all impacts (admin only — for now we’ll leave open)
router.get("/", getAllImpact);

// Get donor’s personal impact summary
router.get("/my-impact", protect, getDonorImpact);

export default router;
