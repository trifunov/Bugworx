import React from 'react';

const TRIGGER_EVENTS = [
  'Missed Service',
  'New Work Order',
  'Work Order Completed',
  'Appointment Overdue',
  'Appointment Cancelled',
  'Technician Late Check-In',
  'Invoice Overdue',
  'Payment Received',
  'Low Inventory',
  'Contract Expiring Soon',
  'Customer Complaint Submitted',
  'Custom',
];

const CHANNELS = ['In-App', 'Email', 'SMS', 'Push Notification'];
const RECIPIENT_TYPES = ['Admin', 'Manager', 'Technician', 'Customer', 'All Staff'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const CONDITION_OPERATORS = ['Greater Than', 'Less Than', 'Equal To', 'Not Equal To'];
const CONDITION_UNITS = ['Minutes', 'Hours', 'Days', 'Occurrences'];

const AddEditNotificationRules = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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

  const PRIORITY_COLORS = { Low: 'success', Medium: 'warning', High: 'danger', Critical: 'dark' };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '480px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Notification Rule' : 'Add New Notification Rule'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>

        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Rule Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Rule Name <span className='text-danger'>*</span>
              </label>
              <input
                name='ruleName'
                className='form-control'
                required
                value={formData.ruleName || ''}
                onChange={handleChange}
                placeholder='e.g., Missed Service Alert'
              />
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

            {/* Condition */}
            <div className='mb-3'>
              <label className='form-label'>Trigger Condition</label>
              <div className='d-flex gap-2'>
                <select name='conditionOperator' className='form-select' value={formData.conditionOperator || 'Greater Than'} onChange={handleChange}>
                  {CONDITION_OPERATORS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <input
                  type='number'
                  min='0'
                  name='conditionValue'
                  className='form-control'
                  style={{ width: '90px' }}
                  value={formData.conditionValue ?? ''}
                  onChange={handleChange}
                  placeholder='0'
                />
                <select name='conditionUnit' className='form-select' value={formData.conditionUnit || 'Hours'} onChange={handleChange}>
                  {CONDITION_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-text'>Leave value blank to trigger immediately on event.</div>
            </div>

            {/* Notification Channel */}
            <div className='mb-3'>
              <label className='form-label'>
                Notification Channel <span className='text-danger'>*</span>
              </label>
              <select name='notificationChannel' className='form-select' value={formData.notificationChannel || 'In-App'} onChange={handleChange}>
                {CHANNELS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient */}
            <div className='mb-3'>
              <label className='form-label'>Recipient</label>
              <select name='recipientType' className='form-select' value={formData.recipientType || 'Admin'} onChange={handleChange}>
                {RECIPIENT_TYPES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className='mb-3'>
              <label className='form-label'>Priority</label>
              <select name='priority' className='form-select' value={formData.priority || 'Medium'} onChange={handleChange}>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {formData.priority && (
                <div className='mt-1'>
                  <span className={`badge badge-soft-${PRIORITY_COLORS[formData.priority]}`}>{formData.priority}</span>
                </div>
              )}
            </div>

            {/* Message */}
            <div className='mb-3'>
              <label className='form-label'>Notification Message</label>
              <textarea
                name='message'
                className='form-control'
                rows='4'
                value={formData.message || ''}
                onChange={handleChange}
                placeholder='Use {{technician_name}}, {{customer_name}}, {{service_date}} as placeholders…'
              />
              <div className='form-text'>
                Placeholders: <code>{'{{technician_name}}'}</code>, <code>{'{{customer_name}}'}</code>, <code>{'{{service_date}}'}</code>,{' '}
                <code>{'{{work_order_id}}'}</code>
              </div>
            </div>

            {/* Active toggle */}
            <div className='form-check form-switch mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                id='notification-rule-active'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='notification-rule-active'>
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

export default AddEditNotificationRules;
