import React from 'react';
import { useContractTypes } from './useContractTypes';

const ContractTypes = () => {
    const { items, form, handleChange, addItem, removeItem } = useContractTypes();

    return (
        <div className="card">
            <div className="card-header">Contract Types</div>
            <div className="card-body">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Billing Cycle</label>
                        <select className="form-control" name="billingCycle" value={form.billingCycle} onChange={handleChange}>
                            <option>Monthly</option>
                            <option>Annual</option>
                            <option>One-time</option>
                            <option>Term</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input className="form-control" name="description" value={form.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Active</label>
                        <div>
                            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} /> Active
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn btn-primary" onClick={addItem}>Add Contract Type</button>
                </div>

                <hr />

                <table className="table table-striped">
                    <thead>
                        <tr><th>Name</th><th>Billing</th><th>Active</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {items.map(i => (
                            <tr key={i.id}>
                                <td>{i.name}</td>
                                <td>{i.billingCycle}</td>
                                <td>{i.active ? 'Yes' : 'No'}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => removeItem(i.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && <tr><td colSpan="4" className="text-muted">No contract types defined.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default ContractTypes;