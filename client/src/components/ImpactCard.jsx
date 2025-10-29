// src/components/ImpactCard.jsx
import React from "react";

export default function ImpactCard({ title, value, description }) {
  return (
    <div className="bg-white shadow-md rounded p-6 text-center hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-3xl font-extrabold text-green-700 mb-2">{value}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
