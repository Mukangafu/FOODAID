import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const countries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Other"];

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name,
        email,
        password,
        role,
        phone,
        country,
        ...(role === "foodbank" && { organization, address }),
      };

      const user = await register(userData);
      navigate(`/${user.role}`);
    } catch (err) {
      setError(err.message || "Registration failed");
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
        <h2 className="text-3xl mb-6 font-bold text-center text-green-700">Create Account</h2>

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
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
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

        <div className="mt-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="donor">Donor</option>
            <option value="foodbank">Food Bank / NGO</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {/* Conditional Fields for Food Bank */}
        {role === "foodbank" && (
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
