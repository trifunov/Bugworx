import React, { useEffect } from 'react';
import { usePestTypes } from './usePestTypes';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const PestTypes = () => {
    const { items, form, handleChange, addItem, removeItem } = usePestTypes();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Pest Types',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Service Inspection', path: '/configuration/service-inspection' },
                { label: 'Pest Types', active: true },
            ],
        });
    }, [setPageSubHeader]);

    return (
        <div className="configuration-page">
            <div className="page-header">
                <p>Maintain a database of pests, risk levels, and categories.</p>
            </div>

            <div className="card form-card">
                <div className="card-header">Add New Pest Type</div>
                <div className="card-body">
                    <form onSubmit={e => { e.preventDefault(); addItem(); }} className="configuration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Pest Name</label>
                                <input 
                                    className="form-control"
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange} 
                                    placeholder="e.g., German Cockroach" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input 
                                    className="form-control"
                                    name="category" 
                                    value={form.category} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Insect, Rodent" 
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Risk Level</label>
                                <select 
                                    className="form-control"
                                    name="riskLevel" 
                                    value={form.riskLevel} 
                                    onChange={handleChange}
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Pest</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card list-card">
                <div className="card-header">Existing Pest Types</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Pest Name</th>
                                <th>Category</th>
                                <th>Risk Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No pest types defined.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.riskLevel}</td>
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

export default PestTypes;