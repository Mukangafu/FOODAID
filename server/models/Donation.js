// server/models/Donation.js
import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Food", "Drinks", "Funds", "Other"],
      default: "Food",
    },
    quantity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String, // for optional photo of donated food
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
