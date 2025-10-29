import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api/foodaidApi";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function DonorDashboard() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDonations = async () => {
      try {
        const res = await API.get(`/donations/donor/${user._id}`);
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

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Donor Dashboard</h1>

      <Link
        to="/donation/create"
        className="inline-block mb-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        + Create Donation
      </Link>

      {loading ? (
        <Loader />
      ) : donations.length === 0 ? (
        <p className="text-gray-600">You haven't made any donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
