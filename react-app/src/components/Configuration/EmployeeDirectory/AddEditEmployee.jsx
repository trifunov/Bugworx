import React, { useState, useEffect } from 'react';

const AddEditEmployee = ({
  isOpen,
  onClose,
  onSave,
  formData,
  onUpdateFieldHandle,
  isSaving,
  teams = []
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
          <h5 className="offcanvas-title">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h5>
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
              <label className="form-label">Position</label>
              <input
                name="position"
                className="form-control"
                value={formData.position || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Team</label>
              <select
                name="team"
                className="form-control"
                value={formData.team || ''}
                onChange={handleChange}
                required
              >
                <option value="">-- Select team --</option>
                {teams.map(t => (
                  <option key={t.id ?? t.name} value={t.name ?? t.title ?? t.id}>
                    {t.name ?? t.title ?? t.id}
                  </option>
                ))}
              </select>
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

export default AddEditEmployee;