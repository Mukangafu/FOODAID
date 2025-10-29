import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/foodaidApi";
import { useNavigate } from "react-router-dom";

export default function ProfileCompletion() {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [country, setCountry] = useState(user.country || "");
  const [organization, setOrganization] = useState(user.organization || "");
  const [address, setAddress] = useState(user.address || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const updatedData = {
        name,
        phone,
        country,
        ...(user.role === "foodbank" && { organization, address }),
      };

      const res = await API.patch(`/users/${user._id}`, updatedData);
      updateUser(res.data); // Update context with latest user info
      navigate(`/${user.role}`); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl mb-6 font-bold text-center text-green-700">
          Complete Your Profile
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Conditional for Food Bank */}
        {user.role === "foodbank" && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Organization Name"
              className="w-full p-2 border rounded"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Organization Address"
              className="w-full p-2 border rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full mt-6 p-3 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
