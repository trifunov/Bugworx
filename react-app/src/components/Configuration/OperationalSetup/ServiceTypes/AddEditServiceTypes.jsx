import React, { useState, useEffect } from 'react';

const AddEditServiceType = ({
  isOpen,
  onClose,
  onSave,
  formData,
  onUpdateFieldHandle,
  isSaving,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const isEditing = formData && formData.id;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsMounted(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateFieldHandle(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={`offcanvas offcanvas-end ${isMounted ? 'show' : ''}`} style={{ width: '400px' }} tabIndex="-1">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{isEditing ? 'Edit Service Type' : 'Add New Service Type'}</h5>
          <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close" disabled={isSaving}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control"
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Template Type</label>
              <select
                name="templateType"
                className="form-select"
                value={formData.templateType || 'Scheduled Visit'}
                onChange={handleChange}
              >
                <option>Scheduled Visit</option>
                <option>Inspection</option>
                <option>Treatment</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (mins)</label>
              <input
                name="durationMins"
                type="number"
                className="form-control"
                value={formData.durationMins || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <input
                name="notes"
                className="form-control"
                value={formData.notes || ''}
                onChange={handleChange}
              />
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
      <div className={`offcanvas-backdrop fade ${isMounted ? 'show' : ''}`} onClick={isSaving ? undefined : onClose}></div>
    </>
  );
};

export default AddEditServiceType;