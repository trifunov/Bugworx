import { useState, useEffect } from 'react';
import { getCustomers, getServiceAddressesByCustomerId, getContractsByServiceAddressId, getServicesByProgramId, getContracts, getPrograms } from '../../utils/localStorage';
import SearchableSelect from '../Common/SearchableSelect';

const AddEditProposalModal = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave, onFileUpload, onRemoveAttachment }) => {
  const [availableContracts, setAvailableContracts] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);

  useEffect(() => {
    if (formData.serviceAddressId) {
      const contracts = getContractsByServiceAddressId(parseInt(formData.serviceAddressId));
      setAvailableContracts(contracts);
    } else {
      setAvailableContracts([]);
    }
  }, [formData.serviceAddressId]);

  useEffect(() => {
    if (formData.contractIds && formData.contractIds.length > 0) {
      const allContracts = getContracts();
      const selectedContracts = allContracts.filter(c => formData.contractIds.includes(c.id));
      const programIds = selectedContracts.map(c => c.programId);
      const uniqueProgramIds = [...new Set(programIds)];
      const services = uniqueProgramIds.flatMap(programId => getServicesByProgramId(programId));
      setAvailableServices(services);
    } else {
      setAvailableServices([]);
    }
  }, [formData.contractIds]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const handleContractSelection = (contractId) => {
    const currentIds = formData.contractIds || [];
    if (currentIds.includes(contractId)) {
      onUpdateField('contractIds', currentIds.filter(id => id !== contractId));
    } else {
      onUpdateField('contractIds', [...currentIds, contractId]);
    }
  };

  const handleServiceSelection = (serviceId) => {
    const currentServices = formData.selectedServices || [];
    const serviceExists = currentServices.find(s => s.id === serviceId);

    if (serviceExists) {
      onUpdateField('selectedServices', currentServices.filter(s => s.id !== serviceId));
    } else {
      const service = availableServices.find(s => s.id === serviceId);
      if (service) {
        onUpdateField('selectedServices', [...currentServices, {
          id: service.id,
          name: service.name,
          productionPrice: service.productionPrice,
          salesPrice: service.salesPrice,
          taxType: service.taxType,
          taxValue: service.taxValue
        }]);
      }
    }
  };

  const handleServicePriceChange = (serviceId, field, value) => {
    const currentServices = formData.selectedServices || [];
    const updatedServices = currentServices.map(s => {
      if (s.id === serviceId) {
        return { ...s, [field]: parseFloat(value) || 0 };
      }
      return s;
    });
    onUpdateField('selectedServices', updatedServices);
  };

  const calculateTotalPricing = () => {
    const services = formData.selectedServices || [];
    const subtotal = services.reduce((sum, s) => sum + (s.salesPrice || 0), 0);
    const taxAmount = services.reduce((sum, s) => sum + ((s.salesPrice || 0) * (s.taxValue || 0) / 100), 0);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
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

  const customers = getCustomers();
  const statuses = ['Draft', 'Sent', 'Accepted', 'Rejected', 'Withdrawn'];
  const programs = getPrograms();

  const customerOptions = customers.map(customer => ({
    value: customer.id,
    label: customer.customerName || customer.name || `${customer.firstName} ${customer.lastName}`,
    customerNum: customer.customerNum,
    address: customer.address || customer.billingAddress?.street || '',
    phone: customer.phone
  }));

  const serviceAddresses = formData.customerId ? getServiceAddressesByCustomerId(parseInt(formData.customerId)) : [];

  const getProgramName = (programId) => {
    const program = programs.find(p => p.id === programId);
    return program ? program.name : 'Unknown Program';
  };

  const { subtotal, taxAmount, total } = calculateTotalPricing();

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
                options={customerOptions}
                value={formData.customerId || ''}
                onChange={(value) => onUpdateField('customerId', value)}
                placeholder="Search by name, address, or customer number..."
                displayKey="label"
                valueKey="value"
                searchKeys={['customerNum', 'address', 'phone']}
                disabled={isSaving || formData.id}
                error={errors.customerId}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="serviceAddressId" className="form-label">Service Address <span className="text-danger">*</span></label>
              <select
                className={`form-select ${errors.serviceAddressId ? 'is-invalid' : ''}`}
                id="serviceAddressId"
                value={formData.serviceAddressId || ''}
                onChange={(e) => onUpdateField('serviceAddressId', e.target.value)}
                disabled={isSaving || !formData.customerId}
              >
                <option value="">Select Service Address...</option>
                {serviceAddresses.map(addr => (
                  <option key={addr.id} value={addr.id}>
                    {addr.serviceAddressName}
                  </option>
                ))}
              </select>
              {errors.serviceAddressId && <div className="invalid-feedback">{errors.serviceAddressId}</div>}
              {!formData.customerId && (
                <small className="text-muted">Please select a customer first</small>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Contracts <span className="text-danger">*</span></label>
              <div className={`border rounded p-3 ${errors.contractIds ? 'border-danger' : ''}`}>
                {availableContracts.length === 0 ? (
                  <div className="text-muted text-center py-2">
                    {formData.serviceAddressId ? 'No contracts found for this service address' : 'Please select a service address first'}
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {availableContracts.map(contract => (
                      <div key={contract.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`contract-${contract.id}`}
                          checked={formData.contractIds?.includes(contract.id) || false}
                          onChange={() => handleContractSelection(contract.id)}
                          disabled={isSaving}
                        />
                        <label className="form-check-label" htmlFor={`contract-${contract.id}`}>
                          {contract.contractNumber} - {getProgramName(contract.programId)}
                          <small className="text-muted ms-2">
                            ({contract.status} - {contract.startDate} to {contract.endDate})
                          </small>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.contractIds && <div className="text-danger small mt-1">{errors.contractIds}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Services <span className="text-danger">*</span></label>
              <div className={`border rounded p-3 ${errors.selectedServices ? 'border-danger' : ''}`}>
                {availableServices.length === 0 ? (
                  <div className="text-muted text-center py-2">
                    {formData.contractIds?.length > 0 ? 'No services found for selected contracts' : 'Please select at least one contract first'}
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {availableServices.map(service => (
                      <div key={service.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`service-${service.id}`}
                          checked={formData.selectedServices?.some(s => s.id === service.id) || false}
                          onChange={() => handleServiceSelection(service.id)}
                          disabled={isSaving}
                        />
                        <label className="form-check-label" htmlFor={`service-${service.id}`}>
                          {service.name}
                          <small className="text-muted ms-2">
                            (${service.salesPrice})
                          </small>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.selectedServices && <div className="text-danger small mt-1">{errors.selectedServices}</div>}
            </div>

            {formData.selectedServices && formData.selectedServices.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Pricing Details</label>
                <div className="table-responsive">
                  <table className="table table-bordered table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Service</th>
                        <th>Production Price</th>
                        <th>Sales Price</th>
                        <th>Tax Type</th>
                        <th>Tax %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.selectedServices.map(service => (
                        <tr key={service.id}>
                          <td>{service.name}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={service.productionPrice || ''}
                              onChange={(e) => handleServicePriceChange(service.id, 'productionPrice', e.target.value)}
                              disabled={isSaving}
                              step="0.01"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              value={service.salesPrice || ''}
                              onChange={(e) => handleServicePriceChange(service.id, 'salesPrice', e.target.value)}
                              disabled={isSaving}
                              step="0.01"
                            />
                          </td>
                          <td>{service.taxType}</td>
                          <td>{service.taxValue}%</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="text-end fw-bold">Subtotal:</td>
                        <td className="fw-bold">${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-end fw-bold">Tax:</td>
                        <td className="fw-bold">${taxAmount.toFixed(2)}</td>
                      </tr>
                      <tr className="table-primary">
                        <td colSpan="4" className="text-end fw-bold">Total:</td>
                        <td className="fw-bold">${total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

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
