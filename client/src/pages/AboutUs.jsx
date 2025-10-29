import React from "react";
import ImpactCard from "../components/ImpactCard"; // Optional: highlight key stats

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          About FoodAid
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            FoodAid is dedicated to fighting hunger and food waste by connecting donors,
            food banks, and volunteers. Our platform ensures that surplus food reaches
            those who need it most efficiently, supporting the United Nations'
            Sustainable Development Goals SDG2 (Zero Hunger) and SDG12 (Responsible Consumption).
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a world where no one goes hungry, and every food donation is
            used responsibly. By streamlining food distribution and empowering local
            communities, we aim to eliminate food insecurity sustainably.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Transparency:</strong> We are accountable for every donation.</li>
            <li><strong>Collaboration:</strong> Working together with donors, food banks, and volunteers.</li>
            <li><strong>Empathy:</strong> Compassion guides every action we take.</li>
            <li><strong>Efficiency:</strong> Ensuring food reaches those in need quickly.</li>
            <li><strong>Sustainability:</strong> Reducing waste and promoting responsible consumption.</li>
          </ul>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ImpactCard title="500+" subtitle="Donors Participating" />
            <ImpactCard title="120+" subtitle="Food Banks Connected" />
            <ImpactCard title="10,000+" subtitle="Meals Distributed" />
          </div>
        </div>

        <div className="text-center text-gray-600">
          <p>
            Join us in making a difference. Whether you're a donor, volunteer, or
            food bank, your contribution matters.
          </p>
        </div>
      </section>
    </div>
  );
}
