import React from 'react';
import { getSites, getSitesByAccountId } from '../../../../utils/localStorage';

const AddEditFacility = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave, accountId }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    const sites = accountId ? getSitesByAccountId(accountId) : getSites();

    return (
        <>
            <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{formData.id && formData.id !== 0 ? 'Edit Facility' : 'Add Facility'}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body offcanvas-scrollable">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="facilityName" className="form-label">Facility Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="facilityName"
                                value={formData.name || ''}
                                onChange={(e) => onUpdateField('name', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="siteId" className="form-label">Service address</label>
                            <select
                                className={`form-select ${errors.siteId ? 'is-invalid' : ''}`}
                                id="siteId"
                                value={formData.siteId ?? ''}
                                onChange={(e) => onUpdateField('siteId', e.target.value)}
                                disabled={isSaving}
                            >
                                <option value="">Select a service address</option>
                                {sites.map(site => (
                                    <option key={site.id} value={site.id}>{site.address}</option>
                                ))}
                            </select>
                            {errors.siteId && <div className="invalid-feedback">{errors.siteId}</div>}
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
                                    formData.id && formData.id !== 0 ? 'Edit Facility' : 'Add Facility'
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

export default AddEditFacility;