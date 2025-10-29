import express from "express";
import { registerVolunteer, getVolunteers } from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerVolunteer);
router.get("/", getVolunteers);

export default router;
