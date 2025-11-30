import React from 'react';

const AddEditPestType = ({
  isOpen,
  onClose,
  onSave,
  formData,
  onUpdateFieldHandle,
  isSaving,
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
          <h5 className="offcanvas-title">{isEditing ? 'Edit Pest Type' : 'Add New Pest Type'}</h5>
          <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close" disabled={isSaving}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Pest Name</label>
              <input
                name="name"
                className="form-control"
                required
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="e.g., German Cockroach"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                name="category"
                className="form-control"
                value={formData.category || ''}
                onChange={handleChange}
                placeholder="e.g., Insect, Rodent, Bird"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Risk Level</label>
              <select
                name="riskLevel"
                className="form-select"
                value={formData.riskLevel || 'Medium'}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
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
      <div className={`offcanvas-backdrop fade show`} onClick={isSaving ? undefined : onClose}></div>
    </>
  );
};

export default AddEditPestType;