import React, { useEffect } from 'react';
import { useInspectionPointCategories } from './useInspectionPointCategories';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const InspectionPointCategories = () => {
    const { items, form, handleChange, addItem, removeItem } = useInspectionPointCategories();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Inspection Point Categories',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Service Inspection', path: '/configuration/service-inspection' },
                { label: 'Inspection Point Categories', active: true },
            ],
        });
    }, [setPageSubHeader]);

    return (
        <div className="configuration-page">
            <div className="page-header">
                <p>Manage categories of inspection points that can be added, edited, or removed.</p>
            </div>

            <div className="card form-card">
                <div className="card-header">Add New Category</div>
                <div className="card-body">
                    <form onSubmit={e => { e.preventDefault(); addItem(); }} className="configuration-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Category Name</label>
                                <input 
                                    className="form-control"
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange} 
                                    placeholder="e.g., Rodent Station, Fly Light" 
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
                                    placeholder="A short description of the category"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">Add Category</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card list-card">
                <div className="card-header">Existing Categories</div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center">No inspection point categories defined.</td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
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

export default InspectionPointCategories;