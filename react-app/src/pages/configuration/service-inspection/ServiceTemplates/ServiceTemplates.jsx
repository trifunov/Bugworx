import React, { useEffect } from 'react';
import { useServiceTemplates } from './useServiceTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const ServiceTemplates = () => {
    const { items, form, handleChange, addItem, removeItem } = useServiceTemplates();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Service Templates',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Service Inspection', path: '/configuration/service-inspection' },
                { label: 'Service Templates', active: true },
            ],
        });
    }, [setPageSubHeader]);

    return (
        <div className="configuration-page">
            <div className="page-header">
                <p>Predefine inspection or service checklists for consistent service delivery.</p>
            </div>

            <div className="card form-card">
                <div className="card-header">Add New Service Template</div>
                <div className="card-body">
                    <form onSubmit={e => { e.preventDefault(); addItem(); }} className="configuration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Template Name</label>
                                <input 
                                    className="form-control"
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Quarterly Pest Inspection" 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input 
                                    className="form-control"
                                    name="description" 
                                    value={form.description} 
                                    onChange={handleChange} 
                                    placeholder="A short description of the template"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group full-width">
                                <label>Checklist Items</label>
                                <textarea 
                                    className="form-control"
                                    name="checklist" 
                                    value={form.checklist} 
                                    onChange={handleChange} 
                                    placeholder="Enter one checklist item per line..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Template</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card list-card">
                <div className="card-header">Existing Service Templates</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Template Name</th>
                                <th>Description</th>
                                <th>Checklist Items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">No service templates defined.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <ul className="list-unstyled mb-0">
                                                {item.checklist.map((check, index) => (
                                                    <li key={index}>{check}</li>
                                                ))}
                                            </ul>
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

export default ServiceTemplates;