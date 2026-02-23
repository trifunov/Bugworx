import React from 'react';

const CHANNELS = ['Email', 'SMS', 'Both'];
const TRIGGER_EVENTS = [
  'Appointment Reminder',
  'Appointment Confirmation',
  'Appointment Cancellation',
  'Service Completed',
  'Invoice Due',
  'Invoice Overdue',
  'Payment Received',
  'Proposal Sent',
  'Contract Renewal',
  'Service Overdue',
  'Follow-up',
  'Custom',
];
const RECIPIENT_TYPES = ['Customer', 'Technician', 'Admin', 'All'];
const TIMING_UNITS = ['Minutes', 'Hours', 'Days'];
const TIMING_DIRECTIONS = ['Before', 'After', 'On The Day'];

const AddEmailAndSMSTemplates = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  if (!isOpen || !formData) return null;

  const isEditing = Boolean(formData.id);
  const showSubject = formData.channel === 'Email' || formData.channel === 'Both';

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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Email & SMS Template' : 'Add New Email & SMS Template'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>

        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Template Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Template Name <span className='text-danger'>*</span>
              </label>
              <input
                name='templateName'
                className='form-control'
                required
                value={formData.templateName || ''}
                onChange={handleChange}
                placeholder='e.g., 24h Appointment Reminder'
              />
            </div>

            {/* Channel */}
            <div className='mb-3'>
              <label className='form-label'>
                Channel <span className='text-danger'>*</span>
              </label>
              <select name='channel' className='form-select' value={formData.channel || 'Email'} onChange={handleChange}>
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Trigger Event */}
            <div className='mb-3'>
              <label className='form-label'>
                Trigger Event <span className='text-danger'>*</span>
              </label>
              <select name='triggerEvent' className='form-select' value={formData.triggerEvent || ''} onChange={handleChange}>
                {TRIGGER_EVENTS.map((e) => (
                  <option key={e} value={e}>
                    {e}
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

            {/* Send Timing */}
            <div className='mb-3'>
              <label className='form-label'>Send Timing</label>
              <div className='d-flex gap-2 align-items-center'>
                <select
                  name='sendTimingDirection'
                  className='form-select flex-shrink-0'
                  style={{ width: '130px' }}
                  value={formData.sendTimingDirection || 'Before'}
                  onChange={handleChange}
                >
                  {TIMING_DIRECTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {formData.sendTimingDirection !== 'On The Day' && (
                  <>
                    <input
                      type='number'
                      min='1'
                      name='sendTimingValue'
                      className='form-control'
                      style={{ width: '80px' }}
                      value={formData.sendTimingValue ?? 1}
                      onChange={handleChange}
                    />
                    <select
                      name='sendTimingUnit'
                      className='form-select flex-shrink-0'
                      style={{ width: '110px' }}
                      value={formData.sendTimingUnit || 'Days'}
                      onChange={handleChange}
                    >
                      {TIMING_UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>

            {/* Subject – Email only */}
            {showSubject && (
              <div className='mb-3'>
                <label className='form-label'>Subject {formData.channel === 'Email' && <span className='text-danger'>*</span>}</label>
                <input
                  name='subject'
                  className='form-control'
                  required={formData.channel === 'Email'}
                  value={formData.subject || ''}
                  onChange={handleChange}
                  placeholder='e.g., Your appointment is tomorrow'
                />
              </div>
            )}

            {/* Message Body */}
            <div className='mb-3'>
              <label className='form-label'>
                Message Body <span className='text-danger'>*</span>
              </label>
              <textarea
                name='body'
                className='form-control'
                required
                rows='5'
                value={formData.body || ''}
                onChange={handleChange}
                placeholder='Use {{customer_name}}, {{appointment_date}}, {{technician_name}} as placeholders…'
              />
              <div className='form-text'>
                Available placeholders: <code>{'{{customer_name}}'}</code>, <code>{'{{appointment_date}}'}</code>,{' '}
                <code>{'{{technician_name}}'}</code>, <code>{'{{service_address}}'}</code>, <code>{'{{invoice_amount}}'}</code>
              </div>
            </div>

            {/* Active toggle */}
            <div className='form-check form-switch mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                id='email-sms-template-active'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='email-sms-template-active'>
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

export default AddEmailAndSMSTemplates;
