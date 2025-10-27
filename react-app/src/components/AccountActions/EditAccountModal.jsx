const EditAccountModal = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Edit Account</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="accountName" className="form-label">Account Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="accountName"
                value={formData.name || ''}
                onChange={(e) => onUpdateField('name', e.target.value)}
                disabled={isSaving}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="accountNum" className="form-label">Account Number</label>
              <input
                type="text"
                className="form-control"
                id="accountNum"
                value={formData.accountNum || ''}
                onChange={(e) => onUpdateField('accountNum', e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="accountType" className="form-label">Account Type</label>
              <select
                className="form-select"
                id="accountType"
                value={formData.accountType || ''}
                onChange={(e) => onUpdateField('accountType', parseInt(e.target.value))}
                disabled={isSaving}
              >
                <option value="">Select type...</option>
                <option value="1">Residential</option>
                <option value="2">Commercial</option>
              </select>
            </div>

            <h6 className="mt-4 mb-3">Billing Contact</h6>

            <div className="mb-3">
              <label htmlFor="contactName" className="form-label">Contact Name</label>
              <input
                type="text"
                className="form-control"
                id="contactName"
                value={formData.billingContact?.name || ''}
                onChange={(e) => onUpdateField('billingContact', { ...formData.billingContact, name: e.target.value })}
                disabled={isSaving}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contactEmail" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="contactEmail"
                value={formData.billingContact?.email || ''}
                onChange={(e) => onUpdateField('billingContact', { ...formData.billingContact, email: e.target.value })}
                disabled={isSaving}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactPhone" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="contactPhone"
                value={formData.billingContact?.phone || ''}
                onChange={(e) => onUpdateField('billingContact', { ...formData.billingContact, phone: e.target.value })}
                disabled={isSaving}
              />
            </div>

            {errors.submit && (
              <div className="alert alert-danger" role="alert">
                {errors.submit}
              </div>
            )}

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
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

export default EditAccountModal;
