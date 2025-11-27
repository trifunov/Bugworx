import React, { useState, useEffect } from 'react';

const AddEditRoute = ({
    isOpen,
    onClose,
    onSave,
    formData,
    onUpdateFieldHandle,
    isSaving,
    zones = []
}) => {

    if (!isOpen) {
        return null;
    }

    const isEditing = formData && formData.id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        onUpdateFieldHandle(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    return (
        <>
            <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex="-1">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{isEditing ? 'Edit Route' : 'Add New Route'}</h5>
                    <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close" disabled={isSaving}></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Route Name</label>
                            <input name="routeName" className="form-control" required value={formData.routeName || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Zone</label>
                            <select name="zone" className="form-select" value={formData.zone || ''} onChange={handleChange}>
                                <option value="">-- Select Zone --</option>
                                {zones.map(z => <option key={z.id} value={z.zoneName}>{z.zoneName}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Default Technician</label>
                            <input name="defaultTechnician" className="form-control" value={formData.defaultTechnician || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stops</label>
                            <textarea name="stops" className="form-control" value={formData.stops || ''} onChange={handleChange} rows="3" placeholder="Enter site IDs or names, separated by commas" />
                        </div>
                        <div className="d-flex gap-2 mt-4">
                            <button type="submit" className="btn btn-primary w-sm" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" className="btn btn-light w-sm" onClick={onClose} disabled={isSaving}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`offcanvas-backdrop fade show`} onClick={isSaving ? undefined : onClose}></div>
        </>
    );
};

export default AddEditRoute;