import FoodBank from "../models/FoodBank.js";

export const createFoodBank = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;
    const foodBank = await FoodBank.create({
      name,
      location,
      capacity,
      manager: req.user._id,
    });
    res.status(201).json(foodBank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFoodBanks = async (req, res) => {
  try {
    const banks = await FoodBank.find().populate("manager", "name email");
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
