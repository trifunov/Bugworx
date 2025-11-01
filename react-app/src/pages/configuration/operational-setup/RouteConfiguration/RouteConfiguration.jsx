import React from 'react';
import { useRouteConfiguration } from './useRouteConfiguration';

const RouteConfiguration = () => {
    const { items, zones, form, handleChange, addItem, removeItem } = useRouteConfiguration();

    return (
        <div className="card">
            <div className="card-header">Route Configuration</div>
            <div className="card-body">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Route Name</label>
                        <input className="form-control" name="routeName" value={form.routeName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Zone</label>
                        <select className="form-control" name="zone" value={form.zone} onChange={handleChange}>
                            <option value="">-- Select Zone --</option>
                            {zones.map(z => <option key={z.id} value={z.zoneName}>{z.zoneName}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Default Technician</label>
                        <input className="form-control" name="defaultTechnician" value={form.defaultTechnician} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Stops (comma separated site ids/names)</label>
                        <input className="form-control" name="stops" value={form.stops} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={addItem}>Add Route</button>
                </div>

                <hr />

                <table className="table table-striped">
                    <thead><tr><th>Route</th><th>Zone</th><th>Technician</th><th>Stops</th><th>Actions</th></tr></thead>
                    <tbody>
                        {items.map(i => (
                            <tr key={i.id}>
                                <td>{i.routeName}</td>
                                <td>{i.zone}</td>
                                <td>{i.defaultTechnician}</td>
                                <td>{(i.stops || []).join(', ')}</td>
                                <td><button className="btn btn-sm btn-danger" onClick={() => removeItem(i.id)}>Remove</button></td>
                            </tr>
                        ))}
                        {items.length === 0 && <tr><td colSpan="5" className="text-muted">No routes configured.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default RouteConfiguration;