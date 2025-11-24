import React, { useEffect } from 'react';
import { useEquipmentDevices } from './useEquipmentDevices';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const EquipmentDevices = () => {
    const { items, form, handleChange, addItem, removeItem } = useEquipmentDevices();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Equipment & Devices',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Service Inspection', path: '/configuration/service-inspection' },
                { label: 'Equipment & Devices', active: true },
            ],
        });
    }, [setPageSubHeader]);

    return (
        <div className="configuration-page">
            <div className="page-header">
                <p>Manage devices like traps, stations, and sensors.</p>
            </div>

            <div className="card form-card">
                <div className="card-header">Add New Equipment/Device</div>
                <div className="card-body">
                    <form onSubmit={e => { e.preventDefault(); addItem(); }} className="configuration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Device Name</label>
                                <input 
                                    className="form-control"
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Rodent Bait Station" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Device Type</label>
                                <input 
                                    className="form-control"
                                    name="type" 
                                    value={form.type} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Trap, Station, Sensor"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea 
                                    className="form-control"
                                    name="description" 
                                    value={form.description} 
                                    onChange={handleChange} 
                                    placeholder="A short description of the device"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Device</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card list-card">
                <div className="card-header">Existing Equipment & Devices</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Device Name</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No equipment or devices defined.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm" 
                                                onClick={() => removeItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EquipmentDevices;