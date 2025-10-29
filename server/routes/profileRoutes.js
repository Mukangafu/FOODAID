import express from "express";
import Profile from "../models/Profile.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create or update profile
router.post("/", protect, async (req, res) => {
  try {
    const { phone, address, organizationName, availability, donationPreferences, bio } = req.body;

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          phone,
          address,
          organizationName,
          availability,
          donationPreferences,
          bio,
        },
        { new: true }
      );
    } else {
      // Create new profile
      profile = await Profile.create({
        user: req.user._id,
        role: req.user.role,
        phone,
        address,
        organizationName,
        availability,
        donationPreferences,
        bio,
      });
    }

    res.json(profile);
  } catch (error) {
    console.error("Profile creation error:", error);
    res.status(500).json({ message: "Server error creating profile" });
  }
});

// Get logged-in user's profile
router.get("/me", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", "name email role");
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

export default router;
