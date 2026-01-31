import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/alerts';

function App() {
    const [alerts, setAlerts] = useState([]);
    const [form, setForm] = useState({ country: '', city: '', visaType: 'Tourist' });

    // Fetch alerts on load
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(API_URL);
            setAlerts(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(API_URL, form);
        setForm({ country: '', city: '', visaType: 'Tourist' });
        fetchData();
    };

    const updateStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'Active' ? 'Booked' : 'Expired';
        await axios.put(`${API_URL}/${id}`, { status: nextStatus });
        fetchData();
    };

    const deleteAlert = async (id) => {
        if (window.confirm("Delete this alert?")) {
            await axios.delete(`${API_URL}/${id}`);
            fetchData();
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial' }}>
            <h1>🐼 Flying Panda | Slot Tracker</h1>
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
                <input placeholder="Country" value={form.country} onChange={e => setForm({...form, country: e.target.value})} required />
                <input placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} required />
                <select value={form.visaType} onChange={e => setForm({...form, visaType: e.target.value})}>
                    <option>Tourist</option>
                    <option>Business</option>
                    <option>Student</option>
                </select>
                <button type="submit">Create Alert</button>
            </form>

            {/* List Section */}
            <table width="100%" border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f4f4f4' }}>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map(alert => (
                        <tr key={alert.id}>
                            <td>{alert.city}, {alert.country}</td>
                            <td>{alert.visaType}</td>
                            <td><strong>{alert.status}</strong></td>
                            <td>
                                <button onClick={() => updateStatus(alert.id, alert.status)}>Cycle Status</button>
                                <button onClick={() => deleteAlert(alert.id)} style={{ color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;