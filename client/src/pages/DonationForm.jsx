import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/foodaidApi";

export default function DonationForm() {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      // Send donation data to backend
      const res = await API.post("/donations", {
        title,
        quantity,
        location,
        donorId: user._id,
      });
      setSuccess("Donation created successfully!");
      setTitle("");
      setQuantity("");
      setLocation("");
    } catch (err) {
      console.error(err);
      setSuccess("Failed to create donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create a Donation</h2>

      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Donation Title"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Quantity (kg/items)"
          className="w-full p-2 mb-4 border rounded"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full p-2 mb-4 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Donation"}
        </button>
      </form>
    </div>
  );
}
