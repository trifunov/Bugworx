import React, { useState, useEffect } from 'react';

const AddEditUser = ({
  isOpen,
  onClose,
  onSave,
  formData,
  onUpdateFieldHandle,
  isSaving,
  roles = []
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const isEditing = formData && formData.id;

  useEffect(() => {
    if (isOpen) {
      // Delay mounting to allow for CSS transition
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
          <h5 className="offcanvas-title">{isEditing ? 'Edit User' : 'Add New User'}</h5>
          <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close" disabled={isSaving}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                name="username"
                className="form-control"
                required
                value={formData.username || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                className="form-control"
                type="email"
                required
                value={formData.email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                className="form-control"
                type="password"
                required={!isEditing}
                value={formData.password || ''}
                onChange={handleChange}
                placeholder={isEditing ? 'Leave blank to keep current password' : ''}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role || ''}
                onChange={handleChange}
                required
              >
                <option value="">-- Select role --</option>
                {roles.map(r => (
                  <option key={r.id ?? r.name} value={r.name ?? r.title ?? r.role}>
                    {r.name ?? r.title ?? r.role}
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

export default AddEditUser;