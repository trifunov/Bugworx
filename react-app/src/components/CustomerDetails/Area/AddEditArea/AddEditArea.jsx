import React from 'react';
import { getFacilitiesByCustomerId } from '../../../../utils/localStorage';

const AddEditArea = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave, customerId }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    const facilities = getFacilitiesByCustomerId(customerId) || [];

    return (
        <>
            <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{formData.id && formData.id !== 0 ? 'Edit Area' : 'Add Area'}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body offcanvas-scrollable">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="areaName" className="form-label">Area Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="areaName"
                                value={formData.name || ''}
                                onChange={(e) => onUpdateField('name', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="facilityId" className="form-label">Facility</label>
                            <select
                                className={`form-select ${errors.facilityId ? 'is-invalid' : ''}`}
                                id="facilityId"
                                value={formData.facilityId ?? ''}
                                onChange={(e) => onUpdateField('facilityId', e.target.value)}
                                disabled={isSaving}
                            >
                                <option value="">Select a facility</option>
                                {facilities.map((facility) => (
                                    <option key={facility.id} value={facility.id}>{facility.name}</option>
                                ))}
                            </select>
                            {errors.facilityId && <div className="invalid-feedback">{errors.facilityId}</div>}
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
                                    formData.id && formData.id !== 0 ? 'Edit Area' : 'Add Area'
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

export default AddEditArea;