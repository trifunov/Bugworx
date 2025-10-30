const AddEditSite = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            {formData.id && formData.id !== 0 ? 'Edit Service Address' : 'Add Service Address'}
          </h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="siteName" className="form-label">Service Address Name</label>
              <input
                type="text"
                className={`form-control ${errors.siteName ? 'is-invalid' : ''}`}
                id="siteName"
                value={formData.siteName || ''}
                onChange={(e) => onUpdateField('siteName', e.target.value)}
                disabled={isSaving}
              />
              {errors.siteName && <div className="invalid-feedback">{errors.siteName}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="siteType" className="form-label">Property Type</label>
              <select
                className={`form-select ${errors.siteType ? 'is-invalid' : ''}`}
                id="siteType"
                value={formData.siteType || ''}
                onChange={(e) => onUpdateField('siteType', e.target.value)}
                disabled={isSaving}
              >
                <option value="">Select type...</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Residential building">Residential building</option>
              </select>
              {errors.siteType && <div className="invalid-feedback">{errors.siteType}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                id="address"
                value={formData.address || ''}
                onChange={(e) => onUpdateField('address', e.target.value)}
                disabled={isSaving}
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => onUpdateField('city', e.target.value)}
                  disabled={isSaving}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  value={formData.state || ''}
                  onChange={(e) => onUpdateField('state', e.target.value)}
                  disabled={isSaving}
                  maxLength="2"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip" className="form-label">ZIP</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  value={formData.zip || ''}
                  onChange={(e) => onUpdateField('zip', e.target.value)}
                  disabled={isSaving}
                />
              </div>
            </div>

            <h6 className="mt-4 mb-3">Service Address Contact</h6>

            <div className="mb-3">
              <label htmlFor="contactName" className="form-label">Contact Name</label>
              <input
                type="text"
                className={`form-control ${errors.contactName ? 'is-invalid' : ''}`}
                id="contactName"
                value={formData.contactName || ''}
                onChange={(e) => onUpdateField('contactName', e.target.value)}
                disabled={isSaving}
              />
              {errors.contactName && <div className="invalid-feedback">{errors.contactName}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactPhone" className="form-label">Contact Phone</label>
              <input
                type="tel"
                className={`form-control ${errors.contactPhone ? 'is-invalid' : ''}`}
                id="contactPhone"
                value={formData.contactPhone || ''}
                onChange={(e) => onUpdateField('contactPhone', e.target.value)}
                disabled={isSaving}
              />
              {errors.contactPhone && <div className="invalid-feedback">{errors.contactPhone}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactEmail" className="form-label">Contact Email</label>
              <input
                type="email"
                className="form-control"
                id="contactEmail"
                value={formData.contactEmail || ''}
                onChange={(e) => onUpdateField('contactEmail', e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isActive"
                checked={formData.isActive || false}
                onChange={(e) => onUpdateField('isActive', e.target.checked)}
                disabled={isSaving}
              />
              <label className="form-check-label" htmlFor="isActive">
                Active Service Address
              </label>
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
                  formData.id && formData.id !== 0 ? 'Edit Service Address' : 'Add Service Address'
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

export default AddEditSite;
