// server/controllers/donationController.js
import Donation from "../models/Donation.js";

// Create new donation
export const createDonation = async (req, res) => {
  try {
    const { title, description, category, quantity, location, image } = req.body;

    const donation = await Donation.create({
      donor: req.user._id,
      title,
      description,
      category,
      quantity,
      location,
      image,
    });

    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("donor", "name email");
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donor’s own donations
export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
