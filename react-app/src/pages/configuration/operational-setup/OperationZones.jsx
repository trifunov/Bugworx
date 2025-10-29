import React, { useState, useEffect } from 'react';
import { getOperationalZones, saveOperationalZones } from '../../../utils/localStorage';

const OperationalZones = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ zoneName: '', description: '', assignedClients: '', assignedSites: '' });

    useEffect(() => setItems(getOperationalZones()), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.zoneName.trim()) return;
        const updated = [...items, {
            id: Date.now(),
            zoneName: form.zoneName,
            description: form.description,
            assignedClients: form.assignedClients.split(',').map(s => s.trim()).filter(Boolean),
            assignedSites: form.assignedSites.split(',').map(s => s.trim()).filter(Boolean)
        }];
        setItems(updated);
        saveOperationalZones(updated);
        setForm({ zoneName: '', description: '', assignedClients: '', assignedSites: '' });
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveOperationalZones(updated);
    };

    return (
        <div className="card">
            <div className="card-header">Operational Zones</div>
            <div className="card-body">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Zone Name</label>
                        <input className="form-control" name="zoneName" value={form.zoneName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" name="description" value={form.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Assigned Clients (comma separated)</label>
                        <input className="form-control" name="assignedClients" value={form.assignedClients} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Assigned Sites (comma separated)</label>
                        <input className="form-control" name="assignedSites" value={form.assignedSites} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={addItem}>Add Zone</button>
                </div>

                <hr />

                <table className="table table-striped">
                    <thead><tr><th>Zone</th><th>Clients</th><th>Sites</th><th>Actions</th></tr></thead>
                    <tbody>
                        {items.map(i => (
                            <tr key={i.id}>
                                <td>{i.zoneName}</td>
                                <td>{(i.assignedClients || []).join(', ')}</td>
                                <td>{(i.assignedSites || []).join(', ')}</td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => removeItem(i.id)}>Remove</button></td>
                            </tr>
                        ))}
                        {items.length === 0 && <tr><td colSpan="4" className="text-muted">No operational zones defined.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default OperationalZones;