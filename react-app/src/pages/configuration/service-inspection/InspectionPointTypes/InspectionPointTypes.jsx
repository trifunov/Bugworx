import React from 'react';
import { useState, useEffect } from 'react';
import { useInspectionPointTypes } from './useInspectionPointTypes';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const InspectionPointTypes = () => {
    const { items, form, handleChange, addItem, removeItem } = useInspectionPointTypes();
    const { setPageSubHeader } = usePageSubHeader();

      useEffect(() => {
        setPageSubHeader({
            title: 'Inspection Point Types',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Service Inspection', path: '/configuration/service-inspection' },
                { label: 'Inspection Point Types', isActive: true },
            ],
        });
    }, [setPageSubHeader]);

    return (
        <div className="configuration-page">
            <div className="page-header">
                <p>Define inspection categories, target pests, and required equipment.</p>
            </div>

            <div className="card form-card">
                <div className="card-header">Add New Inspection Point Type</div>
                <div className="card-body">
                    <form onSubmit={e => { e.preventDefault(); addItem(); }} className="configuration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Target Pests</label>
                                <input 
                                    className="form-control"
                                    name="targetPests" 
                                    value={form.targetPests} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Rodents, Insects" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Materials</label>
                                <input 
                                    className="form-control"
                                    name="materials" 
                                    value={form.materials} 
                                    onChange={handleChange} 
                                    placeholder="Required materials" 
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Equipment</label>
                                <input 
                                    className="form-control"
                                    name="equipment" 
                                    value={form.equipment} 
                                    onChange={handleChange} 
                                    placeholder="Required equipment" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Application Methods</label>
                                <input 
                                    className="form-control"
                                    name="applicationMethods" 
                                    value={form.applicationMethods} 
                                    onChange={handleChange} 
                                    placeholder="Methods used" 
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Reasons</label>
                                <input 
                                    className="form-control"
                                    name="reasons" 
                                    value={form.reasons} 
                                    onChange={handleChange} 
                                    placeholder="Inspection reasons" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Observations</label>
                                <input 
                                    className="form-control"
                                    name="observations" 
                                    value={form.observations} 
                                    onChange={handleChange} 
                                    placeholder="Standard observations" 
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Type</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card list-card">
                <div className="card-header">Existing Types</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Target Pests</th>
                                <th>Materials</th>
                                <th>Equipment</th>
                                <th>Methods</th>
                                <th>Reasons</th>
                                <th>Observations</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">No inspection point types defined.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.targetPests}</td>
                                        <td>{item.materials}</td>
                                        <td>{item.equipment}</td>
                                        <td>{item.applicationMethods}</td>
                                        <td>{item.reasons}</td>
                                        <td>{item.observations}</td>
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

export default InspectionPointTypes;