// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImpactCard from "../components/ImpactCard";

// Hero images stored in public/images/
const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero5.jpg",
  "/images/hero6.jpg",
];

// Features to display
const features = [
  {
    icon: "🍽️",
    title: "Rescue Food",
    description: "Recover excess food from donors to feed communities efficiently.",
    details: "Connect with local restaurants, supermarkets, and donors to collect surplus food and distribute to communities in need.",
    action: "/donor",
    actionText: "Donate Food",
  },
  {
    icon: "🤝",
    title: "Connect Volunteers",
    description: "Engage passionate volunteers to support food distribution efforts.",
    details: "Sign up as a volunteer to help pick up, sort, and deliver food to communities, making a tangible impact every day.",
    action: "/volunteer",
    actionText: "Volunteer Now",
  },
  {
    icon: "🏦",
    title: "Support Food Banks",
    description: "Partner with NGOs and food banks to maximize impact.",
    details: "Join our network of food banks and NGOs to manage donations efficiently and reach more people in need.",
    action: "/foodbank",
    actionText: "Partner With Us",
  },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] flex items-center justify-center text-center overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 transform
              ${index === currentImage ? "opacity-100 scale-100 z-10 translate-y-0" : "opacity-0 scale-105 blur-sm z-0 translate-y-2"}
              hover:scale-105 hover:translate-y-0
            `}
            style={{ backgroundImage: `url(${img})`, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          ></div>
        ))}

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 md:bg-opacity-20"></div>

        {/* Hero Text */}
        <div className="relative z-20 px-4 sm:px-6 md:px-8 text-white max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg animate-fadeIn">
            Fighting Hunger, One Meal at a Time
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 drop-shadow-md animate-fadeIn delay-200">
            Join our community of donors, volunteers, and food banks to reduce food waste and support those in need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 animate-fadeIn delay-400">
            <Link
              to="/register"
              className="bg-green-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="bg-transparent border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-green-700 transition shadow-md"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Our Platform Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {features.map((feature, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 bg-green-50 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setActiveFeature(feature)}
              >
                <div className="text-4xl sm:text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for active feature */}
        {activeFeature && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                onClick={() => setActiveFeature(null)}
              >
                &times;
              </button>
              <div className="text-5xl mb-4">{activeFeature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{activeFeature.title}</h3>
              <p className="text-gray-700 mb-6">{activeFeature.details}</p>
              <Link
                to={activeFeature.action}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold"
                onClick={() => setActiveFeature(null)}
              >
                {activeFeature.actionText}
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Impact Section */}
      <section className="py-16 sm:py-20 bg-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <ImpactCard
              title="Food Donated"
              value="12,500 kg"
              description="Amount of food rescued and delivered to communities in need."
            />
            <ImpactCard
              title="Volunteers"
              value="1,200+"
              description="People actively contributing to fight hunger across the country."
            />
            <ImpactCard
              title="Food Banks Supported"
              value="45"
              description="Partnered food banks and NGOs receiving regular support."
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-base sm:text-lg mb-6">
            Join FoodAid today as a donor, volunteer, or food bank partner. Together, we can eliminate hunger.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/register"
              className="bg-white text-green-700 px-5 py-2 rounded font-semibold hover:bg-gray-100 transition shadow-md"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="bg-transparent border border-white px-5 py-2 rounded hover:bg-white hover:text-green-700 transition shadow-md"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
