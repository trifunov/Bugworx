import { getAccounts } from '../../utils/localStorage';
import SearchableSelect from '../Common/SearchableSelect';

const AddEditProposalModal = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave, onFileUpload, onRemoveAttachment }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await onFileUpload(files);
      e.target.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return 'mdi mdi-file-image';
    if (fileType === 'application/pdf') return 'mdi mdi-file-pdf-box';
    if (fileType.includes('word') || fileType.includes('document')) return 'mdi mdi-file-word';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'mdi mdi-file-excel';
    return 'mdi mdi-file-document';
  };

  const accounts = getAccounts();
  const statuses = ['Draft', 'Sent', 'Accepted', 'Rejected', 'Withdrawn'];

  const accountOptions = accounts.map(account => ({
    value: account.id,
    label: account.accountName || account.name || `${account.firstName} ${account.lastName}`,
    accountNum: account.accountNum,
    address: account.address || account.billingAddress?.street || '',
    phone: account.phone
  }));

  return (
    <>
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden', width: '700px' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{formData.id ? 'Edit Proposal' : 'New Proposal'}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="customerId" className="form-label">Customer <span className="text-danger">*</span></label>
              <SearchableSelect
                options={accountOptions}
                value={formData.customerId || ''}
                onChange={(value) => onUpdateField('customerId', value)}
                placeholder="Search by name, address, or account number..."
                displayKey="label"
                valueKey="value"
                searchKeys={['accountNum', 'address', 'phone']}
                disabled={isSaving}
                error={errors.customerId}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="proposalTitle" className="form-label">Proposal Title <span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control ${errors.proposalTitle ? 'is-invalid' : ''}`}
                id="proposalTitle"
                placeholder="Enter proposal title"
                value={formData.proposalTitle || ''}
                onChange={(e) => onUpdateField('proposalTitle', e.target.value)}
                disabled={isSaving}
              />
              {errors.proposalTitle && <div className="invalid-feedback">{errors.proposalTitle}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="scopeOfWork" className="form-label">Scope of Work <span className="text-danger">*</span></label>
              <textarea
                className={`form-control ${errors.scopeOfWork ? 'is-invalid' : ''}`}
                id="scopeOfWork"
                rows="4"
                placeholder="Describe the scope of work..."
                value={formData.scopeOfWork || ''}
                onChange={(e) => onUpdateField('scopeOfWork', e.target.value)}
                disabled={isSaving}
              ></textarea>
              {errors.scopeOfWork && <div className="invalid-feedback">{errors.scopeOfWork}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="servicesProposed" className="form-label">Programs/Services Proposed</label>
              <textarea
                className="form-control"
                id="servicesProposed"
                rows="3"
                placeholder="List programs and services included..."
                value={formData.servicesProposed || ''}
                onChange={(e) => onUpdateField('servicesProposed', e.target.value)}
                disabled={isSaving}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="pricing" className="form-label">Pricing <span className="text-danger">*</span></label>
              <textarea
                className={`form-control ${errors.pricing ? 'is-invalid' : ''}`}
                id="pricing"
                rows="3"
                placeholder="Enter pricing details..."
                value={formData.pricing || ''}
                onChange={(e) => onUpdateField('pricing', e.target.value)}
                disabled={isSaving}
              ></textarea>
              {errors.pricing && <div className="invalid-feedback">{errors.pricing}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="statusProposal" className="form-label">Status</label>
              <select
                className="form-select"
                id="statusProposal"
                value={formData.status || 'Draft'}
                onChange={(e) => onUpdateField('status', e.target.value)}
                disabled={isSaving}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="termsAndConditions" className="form-label">Terms and Conditions</label>
              <textarea
                className="form-control"
                id="termsAndConditions"
                rows="4"
                placeholder="Enter terms and conditions..."
                value={formData.termsAndConditions || ''}
                onChange={(e) => onUpdateField('termsAndConditions', e.target.value)}
                disabled={isSaving}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="attachments" className="form-label">Attachments</label>
              <input
                type="file"
                className={`form-control ${errors.attachments ? 'is-invalid' : ''}`}
                id="attachments"
                onChange={handleFileChange}
                disabled={isSaving}
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              />
              {errors.attachments && <div className="invalid-feedback d-block">{errors.attachments}</div>}
              <small className="form-text text-muted">
                Upload service plans, contracts, photos, etc.
              </small>

              {formData.attachments && formData.attachments.length > 0 && (
                <div className="mt-3">
                  <label className="form-label">Uploaded Files:</label>
                  <div className="list-group">
                    {formData.attachments.map((file) => (
                      <div key={file.id} className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center flex-grow-1">
                          <i className={`${getFileIcon(file.fileType)} font-size-20 text-primary me-2`}></i>
                          <div className="flex-grow-1">
                            <div className="fw-medium">{file.fileName}</div>
                            <small className="text-muted">{formatFileSize(file.fileSize)}</small>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => onRemoveAttachment(file.id)}
                          disabled={isSaving}
                          title="Remove file"
                        >
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  <>
                    <i className="bx bx-save me-1"></i>
                    {formData.id ? 'Update Proposal' : 'Save Proposal'}
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

export default AddEditProposalModal;
