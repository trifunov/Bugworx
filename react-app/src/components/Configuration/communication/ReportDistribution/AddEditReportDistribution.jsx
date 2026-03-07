import React from 'react';

const REPORT_TYPES = [
  'Inspection Report',
  'Service Completion Report',
  'Pest Activity Report',
  'Treatment Summary',
  'Invoice Summary',
  'Monthly Activity Report',
  'Contract Summary',
  'Custom',
];

const DELIVERY_CHANNELS = ['Email', 'SMS', 'Portal Upload'];
const RECIPIENT_TYPES = ['Customer', 'Manager', 'Admin', 'Custom Email List'];
const SCHEDULES = ['Immediately After Service', 'Scheduled'];
const SCHEDULE_UNITS = ['Hours', 'Days'];
const FILE_FORMATS = ['PDF', 'Excel', 'CSV'];

const AddEditReportDistribution = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  if (!isOpen || !formData) return null;

  const isEditing = Boolean(formData.id);
  const isScheduled = formData.schedule === 'Scheduled';
  const showEmailFields = formData.deliveryChannel === 'Email';
  const showCustomEmails = formData.recipientType === 'Custom Email List';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdateFieldHandle(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '480px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Report Distribution' : 'Add New Report Distribution'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>

        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Distribution Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Distribution Name <span className='text-danger'>*</span>
              </label>
              <input
                name='distributionName'
                className='form-control'
                required
                value={formData.distributionName || ''}
                onChange={handleChange}
                placeholder='e.g., Post-Service Inspection Email'
              />
            </div>

            {/* Report Type */}
            <div className='mb-3'>
              <label className='form-label'>
                Report Type <span className='text-danger'>*</span>
              </label>
              <select name='reportType' className='form-select' value={formData.reportType || ''} onChange={handleChange}>
                {REPORT_TYPES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Channel */}
            <div className='mb-3'>
              <label className='form-label'>
                Delivery Channel <span className='text-danger'>*</span>
              </label>
              <select name='deliveryChannel' className='form-select' value={formData.deliveryChannel || 'Email'} onChange={handleChange}>
                {DELIVERY_CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient Type */}
            <div className='mb-3'>
              <label className='form-label'>Recipient</label>
              <select name='recipientType' className='form-select' value={formData.recipientType || 'Customer'} onChange={handleChange}>
                {RECIPIENT_TYPES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom email list */}
            {showCustomEmails && (
              <div className='mb-3'>
                <label className='form-label'>
                  Email Addresses <span className='text-danger'>*</span>
                </label>
                <input
                  name='recipientEmails'
                  className='form-control'
                  required
                  value={formData.recipientEmails || ''}
                  onChange={handleChange}
                  placeholder='email1@example.com, email2@example.com'
                />
                <div className='form-text'>Separate multiple addresses with a comma.</div>
              </div>
            )}

            {/* Send Schedule */}
            <div className='mb-3'>
              <label className='form-label'>Send Schedule</label>
              <select name='schedule' className='form-select' value={formData.schedule || 'Immediately After Service'} onChange={handleChange}>
                {SCHEDULES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {isScheduled && (
              <div className='mb-3'>
                <label className='form-label'>Send After</label>
                <div className='d-flex gap-2'>
                  <input
                    type='number'
                    min='1'
                    name='scheduleValue'
                    className='form-control'
                    style={{ width: '90px' }}
                    value={formData.scheduleValue ?? 1}
                    onChange={handleChange}
                  />
                  <select name='scheduleUnit' className='form-select' value={formData.scheduleUnit || 'Days'} onChange={handleChange}>
                    {SCHEDULE_UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* File Format */}
            <div className='mb-3'>
              <label className='form-label'>File Format</label>
              <select name='fileFormat' className='form-select' value={formData.fileFormat || 'PDF'} onChange={handleChange}>
                {FILE_FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Content options */}
            <div className='mb-3'>
              <label className='form-label'>Include in Report</label>
              <div className='d-flex flex-column gap-2'>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='rd-include-photos'
                    name='includePhotos'
                    checked={formData.includePhotos ?? true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='rd-include-photos'>
                    Photos
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='rd-include-tech-sig'
                    name='includeTechnicianSignature'
                    checked={formData.includeTechnicianSignature ?? true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='rd-include-tech-sig'>
                    Technician Signature
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='rd-include-cust-sig'
                    name='includeCustomerSignature'
                    checked={formData.includeCustomerSignature ?? false}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='rd-include-cust-sig'>
                    Customer Signature
                  </label>
                </div>
              </div>
            </div>

            {/* Email subject & message */}
            {showEmailFields && (
              <>
                <div className='mb-3'>
                  <label className='form-label'>
                    Email Subject <span className='text-danger'>*</span>
                  </label>
                  <input
                    name='subject'
                    className='form-control'
                    required
                    value={formData.subject || ''}
                    onChange={handleChange}
                    placeholder='e.g., Your inspection report is ready'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email Message</label>
                  <textarea
                    name='message'
                    className='form-control'
                    rows='4'
                    value={formData.message || ''}
                    onChange={handleChange}
                    placeholder='Use {{customer_name}}, {{service_date}}, {{technician_name}} as placeholders…'
                  />
                  <div className='form-text'>
                    Placeholders: <code>{'{{customer_name}}'}</code>, <code>{'{{service_date}}'}</code>, <code>{'{{technician_name}}'}</code>,{' '}
                    <code>{'{{report_link}}'}</code>
                  </div>
                </div>
              </>
            )}

            {/* Active toggle */}
            <div className='form-check form-switch mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                id='rd-active'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='rd-active'>
                Active
              </label>
            </div>

            <div className='d-flex gap-2'>
              <button type='submit' className='btn btn-primary w-sm' disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button type='button' className='btn btn-light w-sm' onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='offcanvas-backdrop fade show' onClick={isSaving ? undefined : onClose} />
    </>
  );
};

export default AddEditReportDistribution;
