import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-12">
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">FoodAid</h2>
          <p className="text-gray-200 text-sm">
            Connecting donors, food banks, and volunteers to fight hunger efficiently.
            Our mission supports SDG2 (Zero Hunger) & SDG12 (Responsible Consumption).
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-200 text-sm">
            <li>
              <Link to="/" className="hover:text-gray-300 transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link to="/donor" className="hover:text-gray-300 transition-colors duration-200">Donor Dashboard</Link>
            </li>
            <li>
              <Link to="/foodbank" className="hover:text-gray-300 transition-colors duration-200">Food Bank Dashboard</Link>
            </li>
            <li>
              <Link to="/volunteer" className="hover:text-gray-300 transition-colors duration-200">Volunteer Dashboard</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300 transition-colors duration-200">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="text-gray-200 text-sm space-y-1">
            <li>Email: <a href="mailto:info@foodaid.org" className="underline hover:text-gray-300 transition">info@foodaid.org</a></li>
            <li>Phone: <a href="tel:+254111292444" className="underline hover:text-gray-300 transition">+254 111 292 444</a></li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-green-800 text-gray-200 text-sm text-center py-3 border-t border-green-600">
        © 2025 FoodAid. All rights reserved.
      </div>
    </footer>
  );
}
