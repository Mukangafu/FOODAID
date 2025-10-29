import React, { useState, useEffect, useContext } from "react";
import API from "../api/foodaidApi";
import DonationCard from "../components/DonationCard";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

export default function VolunteerDashboard() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchDonations = async () => {
      try {
        const res = await API.get("/donations");
        const available = res.data.filter(
          (d) => d.status.toLowerCase() === "pending" || d.status.toLowerCase() === "picked-up"
        );
        setDonations(available);
        setFiltered(available);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  if (authLoading) return <Loader />;

  // Search by title, location, or donor
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(
      donations.filter(
        (d) =>
          d.title.toLowerCase().includes(value) ||
          d.location.toLowerCase().includes(value) ||
          d.donorName?.toLowerCase().includes(value)
      )
    );
  };

  // Update donation status
  const markAssisted = async (id) => {
    try {
      await API.patch(`/donations/${id}/status`, { status: "Picked-Up" });
      setDonations((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status: "Picked-Up" } : d
        )
      );
      setFiltered((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status: "Picked-Up" } : d
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Volunteer Dashboard</h1>

      <input
        type="text"
        placeholder="Search by title, location, donor"
        value={search}
        onChange={handleSearch}
        className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">No donations available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((donation) => (
            <div key={donation._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <DonationCard donation={donation} />
              {donation.status.toLowerCase() === "pending" && (
                <button
                  onClick={() => markAssisted(donation._id)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Mark as Assisted
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
