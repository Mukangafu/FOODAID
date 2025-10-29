// server/controllers/profileController.js
import Profile from "../models/Profile.js";
import User from "../models/User.js";

// ✅ @desc Get logged-in user profile
// ✅ @route GET /api/profile/me
// ✅ @access Private
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", "-password");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ @desc Update logged-in user profile
// ✅ @route PUT /api/profile/update
// ✅ @access Private
export const updateMyProfile = async (req, res) => {
  try {
    const { phone, bio, address } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.phone = phone || profile.phone;
    profile.bio = bio || profile.bio;
    profile.address = address || profile.address;

    const updatedProfile = await profile.save();
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
