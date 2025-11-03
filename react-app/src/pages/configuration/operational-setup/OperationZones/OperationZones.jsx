import React from 'react';
import { useOperationZones } from './useOperationZones';

const OperationalZones = () => {
    const { items, form, handleChange, addItem, removeItem } = useOperationZones();

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