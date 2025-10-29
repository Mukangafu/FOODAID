import mongoose from "mongoose";

const foodBankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    capacity: { type: Number, required: true },
    currentStock: { type: Number, default: 0 },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
  },
  { timestamps: true }
);

export default mongoose.model("FoodBank", foodBankSchema);
