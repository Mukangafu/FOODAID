import express from "express";
import { createFoodBank, getFoodBanks } from "../controllers/foodbankController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFoodBank);
router.get("/", getFoodBanks);

export default router;
