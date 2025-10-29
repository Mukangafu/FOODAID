import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: String, enum: ["full-time", "part-time"], default: "part-time" },
    assignedDonations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
  },
  { timestamps: true }
);

export default mongoose.model("Volunteer", volunteerSchema);
