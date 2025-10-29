import React, { useState, useEffect, useContext } from "react";
import API from "../api/foodaidApi";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function FoodBankDashboard() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState("all"); // "all" | "pending" | "picked-up" | "delivered"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDonations = async () => {
      try {
        const res = await API.get("/donations"); // fetch all donations for the food bank
        setDonations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  if (authLoading) return <Loader />;

  const filteredDonations =
    filter === "all" ? donations : donations.filter((d) => d.status === filter);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Food Bank Dashboard</h1>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        {["all", "pending", "picked-up", "delivered"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded font-semibold transition
              ${filter === status ? "bg-green-600 text-white" : "bg-white text-green-600 border border-green-600 hover:bg-green-100"}
            `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Donations Grid */}
      {loading ? (
        <Loader />
      ) : filteredDonations.length === 0 ? (
        <p className="text-gray-600">No donations found for this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-green-800">{donation.title}</h2>
              <p className="text-gray-700 mt-2">Quantity: {donation.quantity}</p>
              <p className="text-gray-700 mt-1">Pickup Location: {donation.location}</p>
              <p className="text-gray-500 mt-2 text-sm">
                Created: {new Date(donation.createdAt).toLocaleString()}
              </p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  donation.status === "pending"
                    ? "text-yellow-600"
                    : donation.status === "picked-up"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                Status: {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
              </p>

              {/* Assign volunteer button */}
              {donation.status === "pending" && (
                <button
                  onClick={async () => {
                    try {
                      await API.post(`/donations/assign-volunteer/${donation._id}`, {
                        volunteerId: user._id,
                      });
                      setDonations((prev) =>
                        prev.map((d) =>
                          d._id === donation._id ? { ...d, status: "picked-up" } : d
                        )
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Assign to Myself
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
