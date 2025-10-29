import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import FoodBankDashboard from "./pages/FoodBankDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AboutUs from "./pages/AboutUs";
import ProfileCompletion from "./pages/ProfileCompletion"; // <-- Added

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Protected Dashboards */}
            <Route
              path="/donor"
              element={
                <ProtectedRoute allowedRoles={["donor"]}>
                  <DonorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/foodbank"
              element={
                <ProtectedRoute allowedRoles={["foodbank"]}>
                  <FoodBankDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteer"
              element={
                <ProtectedRoute allowedRoles={["volunteer"]}>
                  <VolunteerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Profile Completion Route */}
            <Route
              path="/complete-profile"
              element={
                <ProtectedRoute allowedRoles={["donor", "foodbank", "volunteer"]}>
                  <ProfileCompletion />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
