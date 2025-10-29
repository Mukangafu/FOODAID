import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["donor", "volunteer", "foodbank"],
      required: true,
    },
    phone: String,
    address: String,
    organizationName: String, // for food banks
    availability: String, // for volunteers
    donationPreferences: String, // for donors
    bio: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
