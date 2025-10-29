// server/controllers/dashboardController.js
import User from "../models/User.js";
import Donation from "../models/Donation.js";
import Impact from "../models/Impact.js";

export const getDashboardSummary = async (req, res) => {
  try {
    // ✅ Count totals
    const [totalUsers, totalDonations, totalImpacts] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
      Impact.countDocuments(),
    ]);

    // ✅ Sum beneficiaries
    const beneficiariesData = await Impact.aggregate([
      { $group: { _id: null, total: { $sum: "$beneficiaries" } } },
    ]);
    const totalBeneficiaries = beneficiariesData[0]?.total || 0;

    // ✅ Fetch latest donations (5)
    const latestDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title quantity location createdAt")
      .lean();

    // ✅ Format dates
    latestDonations.forEach(d => {
      d.createdAt = new Date(d.createdAt).toLocaleDateString();
    });

    // ✅ Fetch recent impacts (5)
    const recentImpacts = await Impact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("donation", "title")
      .select("beneficiaries description createdAt")
      .lean();

    recentImpacts.forEach(i => {
      i.createdAt = new Date(i.createdAt).toLocaleDateString();
    });

    // ✅ Response
    res.status(200).json({
      success: true,
      summary: {
        totalUsers,
        totalDonations,
        totalImpacts,
        totalBeneficiaries,
      },
      latestDonations,
      recentImpacts,
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard summary.",
      error: error.message,
    });
  }
};
