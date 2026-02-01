import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/alerts";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({
    country: "",
    city: "",
    visaType: "Tourist",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setAlerts(res.data);
    } catch (err) {
      console.error("API Error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending default status as 'Active' for new alerts
      await axios.post(API_URL, { ...form, status: "Active" });
      setForm({ country: "", city: "", visaType: "Tourist" });
      fetchData();
    } catch (err) {
      console.error("Post Error", err);
    }
  };

  // --- 1. Fix: Delete Functionality ---
  const deleteAlert = async (id) => {
    if (window.confirm("Are you sure you want to delete this alert?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchData(); // List refresh karein
      } catch (err) {
        console.error("Delete Error", err);
      }
    }
  };

  // --- 2. Fix: Update/Cycle Status Functionality ---
  const updateStatus = async (id, currentStatus) => {
    let nextStatus = "Active";
    if (currentStatus === "Active") nextStatus = "Booked";
    else if (currentStatus === "Booked") nextStatus = "Expired";

    try {
      await axios.put(`${API_URL}/${id}`, { status: nextStatus });
      fetchData(); // List refresh karein
    } catch (err) {
      console.error("Update Error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            🐼 PandaSlot Tracker
          </h1>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            Internal Tool v1.0
          </span>
        </header>

        {/* Action Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Create New Visa Alert</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              required
            />
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
              value={form.visaType}
              onChange={(e) => setForm({ ...form, visaType: e.target.value })}
            >
              <option>Tourist</option>
              <option>Business</option>
              <option>Student</option>
            </select>
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Alert
            </button>
          </form>
        </div>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Filter by Country..."
            className="px-4 py-2 border rounded-lg text-sm"
            onChange={async (e) => {
              const res = await axios.get(
                `${API_URL}?country=${e.target.value}`,
              );
              setAlerts(res.data);
            }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 text-white text-sm uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Location</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Live Status</th>
                <th className="px-6 py-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-indigo-50/30 transition-colors duration-200"
                >
                  <td className="px-6 py-5">
                    <div className="font-semibold text-gray-800">
                      {alert.city}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-tight">
                      {alert.country}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">
                      {alert.visaType}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {/* Status Badge can now be clicked to cycle status */}
                    <button
                      onClick={() => updateStatus(alert.id, alert.status)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter cursor-pointer hover:opacity-80 transition ${
                        alert.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : alert.status === "Booked"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 mr-2 rounded-full animate-pulse ${
                          alert.status === "Active"
                            ? "bg-emerald-500"
                            : alert.status === "Booked"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      ></span>
                      {alert.status}
                    </button>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white p-2 rounded-lg transition-all duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
