const CreateInvoiceModal = ({ isOpen, formData, errors, isSaving, completedAppointments, onUpdateField, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden', width: '600px' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Create Invoice</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="invoiceDate" className="form-label">Invoice Date <span className="text-danger">*</span></label>
              <input
                type="date"
                className={`form-control ${errors.invoiceDate ? 'is-invalid' : ''}`}
                id="invoiceDate"
                value={formData.invoiceDate || ''}
                onChange={(e) => onUpdateField('invoiceDate', e.target.value)}
                disabled={isSaving}
              />
              {errors.invoiceDate && <div className="invalid-feedback">{errors.invoiceDate}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">Due Date <span className="text-danger">*</span></label>
              <input
                type="date"
                className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
                id="dueDate"
                value={formData.dueDate || ''}
                onChange={(e) => onUpdateField('dueDate', e.target.value)}
                disabled={isSaving}
                min={formData.invoiceDate || ''}
              />
              {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="relatedServiceId" className="form-label">Related Service</label>
              <select
                className="form-select"
                id="relatedServiceId"
                value={formData.relatedServiceId || ''}
                onChange={(e) => onUpdateField('relatedServiceId', parseInt(e.target.value) || '')}
                disabled={isSaving}
              >
                <option value="">Choose service...</option>
                {completedAppointments && completedAppointments.map(apt => (
                  <option key={apt.id} value={apt.id}>
                    {apt.serviceType} - {apt.scheduledDate}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount <span className="text-danger">*</span></label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                  id="amount"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.amount || ''}
                  onChange={(e) => onUpdateField('amount', e.target.value)}
                  disabled={isSaving}
                />
                {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Invoice description..."
                value={formData.description || ''}
                onChange={(e) => onUpdateField('description', e.target.value)}
                disabled={isSaving}
              ></textarea>
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
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="bx bx-check me-1"></i>
                    Create Invoice
                  </>
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

export default CreateInvoiceModal;
