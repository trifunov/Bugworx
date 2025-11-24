import React, { useEffect } from 'react';
import { useTreatmentTypes } from './useTreatmentTypes';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const TreatmentTypes = () => {
    const { items, form, handleChange, addItem, removeItem } = useTreatmentTypes();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Treatment Types',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Service Inspection', path: '/configuration/service-inspection' },
                { label: 'Treatment Types', active: true },
            ],
        });
    }, [setPageSubHeader]);

    return (
        <div className="configuration-page">
            <div className="page-header">
                <p>Configure treatment methods, chemicals, and protocols.</p>
            </div>

            <div className="card form-card">
                <div className="card-header">Add New Treatment Type</div>
                <div className="card-body">
                    <form onSubmit={e => { e.preventDefault(); addItem(); }} className="configuration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Method</label>
                                <input 
                                    className="form-control"
                                    name="method" 
                                    value={form.method} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Baiting, Spraying" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Chemicals</label>
                                <input 
                                    className="form-control"
                                    name="chemicals" 
                                    value={form.chemicals} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Fipronil, Boric Acid"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>Protocols</label>
                                <textarea 
                                    className="form-control"
                                    name="protocols" 
                                    value={form.protocols} 
                                    onChange={handleChange} 
                                    placeholder="Describe the treatment protocol..."
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Treatment</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card list-card">
                <div className="card-header">Existing Treatment Types</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>Chemicals</th>
                                <th>Protocols</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No treatment types defined.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.method}</td>
                                        <td>{item.chemicals}</td>
                                        <td>{item.protocols}</td>
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

export default TreatmentTypes;