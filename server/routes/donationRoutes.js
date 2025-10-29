// server/routes/donationRoutes.js
import express from "express";
import { createDonation, getDonations, getMyDonations } from "../controllers/donationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createDonation); // Create donation
router.get("/", getDonations); // Get all donations
router.get("/my", protect, getMyDonations); // Get logged-in user's donations

export default router;
