import React, { useState, useEffect, useContext } from "react";
import API from "../api/foodaidApi";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (authLoading) return <Loader />;

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (userId, isActive) => {
    try {
      await API.patch(`/users/${userId}/status`, { active: !isActive });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, active: !isActive } : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>

      {loading ? (
        <Loader />
      ) : users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4 capitalize">{u.role}</td>
                  <td className="py-3 px-4">
                    {u.active ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="donor">Donor</option>
                      <option value="foodbank">Food Bank</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="admin">Admin</option>
                    </select>

                    <button
                      onClick={() => toggleActive(u._id, u.active)}
                      className={`px-2 py-1 rounded font-semibold transition ${
                        u.active
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {u.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
