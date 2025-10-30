import React from 'react';
import { getAccounts, getServiceTypes } from '../../../utils/localStorage';
import { employees, sources, leadStatuses } from '../../../data/mockData';

// Offcanvas form for adding/editing a Lead
// Props mirror other Add/Edit components
const AddEditLead = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    const accounts = getAccounts() || [];
    const serviceTypes = getServiceTypes() || [];

    return (
        <>
            <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{formData.id && formData.id !== 0 ? 'Edit Lead' : 'Add Lead'}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body offcanvas-scrollable">
                    <form onSubmit={handleSubmit}>
                        {/* Lead Name */}
                        <div className="mb-3">
                            <label htmlFor="leadName" className="form-label">Lead Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="leadName"
                                value={formData.name || ''}
                                onChange={(e) => onUpdateField('name', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        {/* Customer */}
                        <div className="mb-3">
                            <label htmlFor="customerId" className="form-label">Customer</label>
                            <select
                                className={`form-select ${errors.customerId ? 'is-invalid' : ''}`}
                                id="customerId"
                                value={formData.customerId ?? ''}
                                onChange={(e) => onUpdateField('customerId', Number(e.target.value))}
                                disabled={isSaving}
                            >
                                <option value="">Select a customer</option>
                                {accounts.map((acc) => (
                                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                                ))}
                            </select>
                            {errors.customerId && <div className="invalid-feedback">{errors.customerId}</div>}
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label htmlFor="leadStatus" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="leadStatus"
                                value={formData.status ?? 1}
                                onChange={(e) => onUpdateField('status', Number(e.target.value))}
                                disabled={isSaving}
                            >
                                {leadStatuses.map((s) => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Service Interest */}
                        <div className="mb-3">
                            <label htmlFor="serviceInterest" className="form-label">Service Interest</label>
                            <select
                                className="form-select"
                                id="serviceInterest"
                                value={formData.serviceInterest || ''}
                                onChange={(e) => onUpdateField('serviceInterest', e.target.value)}
                                disabled={isSaving}
                            >
                                <option value="">Select a service</option>
                                {serviceTypes.map((st, idx) => (
                                    <option key={idx} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>

                        {/* Assigned Sales Rep */}
                        <div className="mb-3">
                            <label htmlFor="assignedSalesRep" className="form-label">Assigned Sales Rep</label>
                            <select
                                className="form-select"
                                id="assignedSalesRep"
                                value={formData.assignedSalesRep ?? ''}
                                onChange={(e) => onUpdateField('assignedSalesRep', Number(e.target.value))}
                                disabled={isSaving}
                            >
                                <option value="">Select a sales rep</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Source */}
                        <div className="mb-3">
                            <label htmlFor="sourceId" className="form-label">Source</label>
                            <select
                                className="form-select"
                                id="sourceId"
                                value={formData.sourceId ?? ''}
                                onChange={(e) => onUpdateField('sourceId', Number(e.target.value))}
                                disabled={isSaving}
                            >
                                <option value="">Select a source</option>
                                {sources.map((src) => (
                                    <option key={src.id} value={src.id}>{src.name}</option>
                                ))}
                            </select>
                        </div>

                        {errors.submit && (
                            <div className="alert alert-danger" role="alert">
                                {errors.submit}
                            </div>
                        )}

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success" disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Saving...
                                    </>
                                ) : (
                                    formData.id && formData.id !== 0 ? 'Edit Lead' : 'Add Lead'
                                )}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isOpen && <div className="offcanvas-backdrop fade show" onClick={onClose}></div>}
        </>
    );
};

export default AddEditLead;
