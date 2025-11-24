import React, { useEffect } from 'react';
import { useMaterialSetup } from './useMaterialSetup';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const MaterialSetup = () => {
    const { items, form, handleChange, addItem, removeItem } = useMaterialSetup();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Material Setup',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Service Inspection', path: '/configuration/service-inspection' },
                { label: 'Material Setup', active: true },
            ],
        });
    }, [setPageSubHeader]);

    return (
        <div className="configuration-page">
            <div className="page-header">
                <p>Link chemicals and materials to inventory and safety data.</p>
            </div>
            <div className="card form-card">
                <div className="card-header">Add New Material/Chemical</div>
                <div className="card-body">
                    <form onSubmit={e => { e.preventDefault(); addItem(); }} className="configuration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Material Name</label>
                                <input 
                                    className="form-control"
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Maxforce FC Magnum" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Inventory ID/SKU</label>
                                <input 
                                    className="form-control"
                                    name="inventoryId" 
                                    value={form.inventoryId} 
                                    onChange={handleChange} 
                                    placeholder="Link to inventory item"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Safety Data Sheet (SDS) URL</label>
                                <input 
                                    type="url"
                                    className="form-control"
                                    name="sdsUrl" 
                                    value={form.sdsUrl} 
                                    onChange={handleChange} 
                                    placeholder="https://example.com/sds.pdf"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Material</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card list-card">
                <div className="card-header">Existing Materials</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Material Name</th>
                                <th>Inventory ID/SKU</th>
                                <th>SDS</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No materials defined.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.inventoryId}</td>
                                        <td>
                                            {item.sdsUrl ? (
                                                <a href={item.sdsUrl} target="_blank" rel="noopener noreferrer">View SDS</a>
                                            ) : 'N/A'}
                                        </td>
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

export default MaterialSetup;