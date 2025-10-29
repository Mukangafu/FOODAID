import Impact from "../models/Impact.js";

// Create new impact record
export const createImpact = async (req, res) => {
  try {
    const { donation, beneficiariesReached, region, message } = req.body;
    const impact = await Impact.create({
      donor: req.user.id,
      donation,
      beneficiariesReached,
      region,
      message,
    });
    res.status(201).json(impact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all impact records
export const getAllImpact = async (req, res) => {
  try {
    const impacts = await Impact.find().populate("donor donation", "name title");
    res.status(200).json(impacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get impact summary per donor
export const getDonorImpact = async (req, res) => {
  try {
    const donorId = req.user.id;
    const impacts = await Impact.find({ donor: donorId });
    const totalBeneficiaries = impacts.reduce(
      (sum, i) => sum + i.beneficiariesReached,
      0
    );
    res.status(200).json({
      totalImpacts: impacts.length,
      totalBeneficiaries,
      impacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
