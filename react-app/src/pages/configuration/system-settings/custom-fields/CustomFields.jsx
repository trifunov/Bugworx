import React from 'react';
import { useCustomFields } from './useCustomFields';

const CustomFields = () => {
    const {
        customFields,
        customFieldLabelRef,
        customFieldAppliesRef,
        customFieldTypeRef,
        addCustomField,
        deleteCustomField,
        editCustomField
    } = useCustomFields();

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <p className="text-muted">Add user-defined fields for Customers, Service Addresses, or Work Orders.</p>

                        <div className="mb-3">
                            <label className="form-label">Apply to</label>
                            <select ref={customFieldAppliesRef} className="form-select" defaultValue="Customers">
                                <option>Customers</option>
                                <option>Service Addresses</option>
                                <option>Work Orders</option>
                            </select>
                        </div>

                        <div className="row align-items-end">
                            <div className="col-md-5 mb-3">
                                <label className="form-label">Field Label</label>
                                <input ref={customFieldLabelRef} className="form-control" placeholder="e.g. Customer Type" />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Field Type</label>
                                <select ref={customFieldTypeRef} className="form-select" defaultValue="Text">
                                    <option>Text</option>
                                    <option>Number</option>
                                    <option>Date</option>
                                    <option>Dropdown</option>
                                    <option>Checkbox</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-3 text-end">
                                <button type="button" onClick={addCustomField} className="btn btn-primary">Add Field</button>
                            </div>
                        </div>

                        <hr />

                        <h6>Existing Fields</h6>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Type</th>
                                        <th>Applies To</th>
                                        <th style={{ width: '120px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customFields.map(f => (
                                        <tr key={f.id}>
                                            <td>{f.label}</td>
                                            <td>{f.type}</td>
                                            <td>{f.applies}</td>
                                            <td>
                                                <button onClick={() => editCustomField(f.id)} className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                                                <button onClick={() => deleteCustomField(f.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomFields;