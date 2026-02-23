import React from 'react';

const CATEGORIES = [
  'Status Label',
  'Error Message',
  'Success Message',
  'Warning Message',
  'Info Message',
  'Email Footer',
  'Portal Banner',
  'Terms & Conditions',
  'Custom',
];

const CONTEXTS = [
  'Work Order',
  'Appointment',
  'Invoice',
  'Payment',
  'Proposal',
  'Contract',
  'Customer Portal',
  'Technician App',
  'Login Page',
  'General',
];

const CATEGORY_COLORS = {
  'Status Label': 'info',
  'Error Message': 'danger',
  'Success Message': 'success',
  'Warning Message': 'warning',
  'Info Message': 'primary',
  'Email Footer': 'secondary',
  'Portal Banner': 'dark',
  'Terms & Conditions': 'secondary',
  Custom: 'secondary',
};

const AddEditSystemMessage = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  if (!isOpen || !formData) return null;

  const isEditing = Boolean(formData.id);

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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit System Message' : 'Add New System Message'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>

        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Message Key */}
            <div className='mb-3'>
              <label className='form-label'>
                Message Key <span className='text-danger'>*</span>
              </label>
              <input
                name='messageKey'
                className='form-control font-monospace'
                required
                value={formData.messageKey || ''}
                onChange={handleChange}
                placeholder='e.g., work_order.status.completed'
              />
              <div className='form-text'>Unique identifier used to reference this message in the system. Use lowercase with dots or underscores.</div>
            </div>

            {/* Category */}
            <div className='mb-3'>
              <label className='form-label'>
                Category <span className='text-danger'>*</span>
              </label>
              <select name='category' className='form-select' value={formData.category || 'Status Label'} onChange={handleChange}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {formData.category && (
                <div className='mt-1'>
                  <span className={`badge badge-soft-${CATEGORY_COLORS[formData.category] || 'secondary'}`}>{formData.category}</span>
                </div>
              )}
            </div>

            {/* Context */}
            <div className='mb-3'>
              <label className='form-label'>Context</label>
              <select name='context' className='form-select' value={formData.context || 'General'} onChange={handleChange}>
                {CONTEXTS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className='form-text'>Where in the application this message appears.</div>
            </div>

            {/* Message Text */}
            <div className='mb-3'>
              <label className='form-label'>
                Message Text <span className='text-danger'>*</span>
              </label>
              <textarea
                name='messageText'
                className='form-control'
                required
                rows='4'
                value={formData.messageText || ''}
                onChange={handleChange}
                placeholder='Enter the message text displayed to users…'
              />
              <div className='form-text'>
                Supports placeholders: <code>{'{{customer_name}}'}</code>, <code>{'{{technician_name}}'}</code>, <code>{'{{date}}'}</code>,{' '}
                <code>{'{{status}}'}</code>
              </div>
            </div>

            {/* Internal Description */}
            <div className='mb-3'>
              <label className='form-label'>Internal Description</label>
              <textarea
                name='description'
                className='form-control'
                rows='2'
                value={formData.description || ''}
                onChange={handleChange}
                placeholder='Notes for admins — not shown to end users'
              />
            </div>

            {/* Active toggle */}
            <div className='form-check form-switch mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                id='system-message-active'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='system-message-active'>
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

export default AddEditSystemMessage;
