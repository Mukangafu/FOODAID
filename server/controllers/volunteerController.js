import Volunteer from "../models/Volunteer.js";

// Register volunteer
export const registerVolunteer = async (req, res) => {
  try {
    const { phone, location, availability } = req.body;
    const volunteer = await Volunteer.create({
      user: req.user._id,
      phone,
      location,
      availability,
    });
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all volunteers
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate("user", "name email");
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
