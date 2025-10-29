// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  const dashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case "donor":
        return { name: "Dashboard", path: "/donor" };
      case "foodbank":
        return { name: "Dashboard", path: "/foodbank" };
      case "volunteer":
        return { name: "Dashboard", path: "/volunteer" };
      case "admin":
        return { name: "Dashboard", path: "/admin" };
      default:
        return null;
    }
  };

  return (
    <nav className="bg-green-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                F
              </div>
              <span className="text-green-800 font-bold text-xl tracking-wide">
                FoodAid
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-green-800 font-medium hover:text-green-600 transition ${
                    isActive ? "underline underline-offset-4" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user && dashboardLink() && (
              <NavLink
                to={dashboardLink().path}
                className="text-green-800 font-semibold hover:text-green-600 transition"
              >
                {dashboardLink().name}
              </NavLink>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="bg-green-300 text-green-800 px-3 py-1 rounded hover:bg-green-400 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-green-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-100 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="block text-green-800 font-medium hover:text-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {user && dashboardLink() && (
            <NavLink
              to={dashboardLink().path}
              className="block text-green-800 font-semibold hover:text-green-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {dashboardLink().name}
            </NavLink>
          )}

          {user ? (
            <button
              onClick={logout}
              className="w-full text-left bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block bg-green-300 text-green-800 px-3 py-1 rounded hover:bg-green-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
