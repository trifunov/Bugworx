import React, { useState, useEffect } from 'react';
import { getServiceTypesSetup, saveServiceTypes } from '../../../utils/localStorage';

const ServiceTypes = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', templateType: 'Scheduled Visit', durationMins: 60, notes: '' });

    useEffect(() => setItems(getServiceTypesSetup()), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'durationMins' ? Number(value) : value }));
    };

    const addItem = () => {
        if (!form.name.trim()) return;
        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        saveServiceTypes(updated);
        setForm({ name: '', templateType: 'Scheduled Visit', durationMins: 60, notes: '' });
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveServiceTypes(updated);
    };

    return (
        <div className="card">
            <div className="card-header">Service Types</div>
            <div className="card-body">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Template Type</label>
                        <select className="form-control" name="templateType" value={form.templateType} onChange={handleChange}>
                            <option>Scheduled Visit</option>
                            <option>Inspection</option>
                            <option>Treament</option>
                            <option>Treatment</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Duration (mins)</label>
                        <input className="form-control" type="number" name="durationMins" value={form.durationMins} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <input className="form-control" name="notes" value={form.notes} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={addItem}>Add Service Type</button>
                </div>

                <hr />

                <table className="table table-striped">
                    <thead>
                        <tr><th>Name</th><th>Type</th><th>Duration</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {items.map(i => (
                            <tr key={i.id}>
                                <td>{i.name}</td>
                                <td>{i.templateType}</td>
                                <td>{i.durationMins} mins</td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => removeItem(i.id)}>Remove</button></td>
                            </tr>
                        ))}
                        {items.length === 0 && <tr><td colSpan="4" className="text-muted">No service types defined.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ServiceTypes;