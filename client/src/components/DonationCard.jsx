import React from "react";
import { formatDate } from "../utils/formatDate";

// Status colors for display
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "picked-up": "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
};

export default function DonationCard({ donation }) {
  const status = donation.status.toLowerCase();

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{donation.title}</h3>
          <p className="text-gray-600">Quantity: {donation.quantity}</p>
          <p className="text-gray-600">Location: {donation.location}</p>
          {donation.donorName && (
            <p className="text-gray-500 text-sm">Donor: {donation.donorName}</p>
          )}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
        >
          {donation.status}
        </span>
      </div>
      <p className="text-gray-400 text-xs mt-2">
        Created: {formatDate(donation.createdAt)}
      </p>
    </div>
  );
}
