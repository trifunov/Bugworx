import React from 'react';
import { useServiceTypes } from './useServiceTypes';

const ServiceTypes = () => {
    const { items, form, handleChange, addItem, removeItem } = useServiceTypes();

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