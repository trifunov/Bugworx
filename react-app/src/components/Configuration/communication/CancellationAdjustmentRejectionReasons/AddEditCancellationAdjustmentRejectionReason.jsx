import React from 'react';

const TYPES = ['Cancellation', 'Adjustment', 'Rejection'];

const APPLIES_TO_OPTIONS = {
  Cancellation: ['Service', 'Program', 'Contract', 'Appointment', 'Any'],
  Adjustment: ['Service', 'Program', 'Invoice', 'Pricing', 'Any'],
  Rejection: ['Proposal', 'Call / Lead', 'Quote', 'Any'],
};

const FOLLOW_UP_ACTIONS = [
  'None',
  'Schedule Callback',
  'Send Email Notification',
  'Reassign to Another Technician',
  'Flag for Manager Review',
  'Create Follow-up Task',
];

const AddEditCancellationAdjustmentRejectionReason = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
  if (!isOpen) return null;

  const isEditing = formData && formData.id;
  const currentType = formData.type || 'Cancellation';
  const appliesToOptions = APPLIES_TO_OPTIONS[currentType] || APPLIES_TO_OPTIONS['Cancellation'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'type') {
      // Reset appliesTo when type changes, as options differ
      onUpdateFieldHandle('appliesTo', APPLIES_TO_OPTIONS[value]?.[0] || 'Any');
    }
    onUpdateFieldHandle(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '500px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Reason' : 'Add New Reason'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Reason Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Reason Name <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Customer Request, Price Disagreement, Scheduling Conflict'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <div className='mb-3'>
              <label className='form-label'>Type</label>
              <select name='type' className='form-select' value={currentType} onChange={handleChange}>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <div className='form-text'>
                <span className={`badge badge-soft-danger me-1`}>Cancellation</span> — Programs or Services.&nbsp;
                <span className={`badge badge-soft-warning me-1`}>Adjustment</span> — Programs or Services.&nbsp;
                <span className={`badge badge-soft-secondary`}>Rejection</span> — Proposals or Calls.
              </div>
            </div>

            {/* Applies To */}
            <div className='mb-3'>
              <label className='form-label'>Applies To</label>
              <select name='appliesTo' className='form-select' value={formData.appliesTo || appliesToOptions[0]} onChange={handleChange}>
                {appliesToOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <div className='form-text'>Specify which entity this reason is used for.</div>
            </div>

            {/* Description */}
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                rows={3}
                placeholder='Provide a detailed explanation of when this reason should be used...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Internal Code */}
            <div className='mb-3'>
              <label className='form-label'>Internal Code</label>
              <input
                name='internalCode'
                className='form-control'
                placeholder='e.g. CUST-REQ, PRICE-DIF, SCHED-CONF'
                value={formData.internalCode || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Short reference code used in reporting and system logs.</div>
            </div>

            {/* Follow-Up Action */}
            <div className='mb-3'>
              <label className='form-label'>Trigger Follow-Up Action</label>
              <select name='followUpAction' className='form-select' value={formData.followUpAction || 'None'} onChange={handleChange}>
                {FOLLOW_UP_ACTIONS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <div className='form-text'>Automated action to trigger when this reason is selected.</div>
            </div>

            {/* Chargeable — only sensible for Cancellation / Adjustment */}
            {(currentType === 'Cancellation' || currentType === 'Adjustment') && (
              <div className='mb-3'>
                <div className='form-check mb-2'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='carr-chargeable'
                    name='isChargeable'
                    checked={formData.isChargeable === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='carr-chargeable'>
                    Chargeable (cancellation / adjustment fee applies)
                  </label>
                </div>

                {formData.isChargeable && (
                  <div className='mt-2'>
                    <input
                      name='chargeDetails'
                      className='form-control'
                      placeholder='e.g. $25 flat fee, 10% of service cost'
                      value={formData.chargeDetails || ''}
                      onChange={handleChange}
                    />
                    <div className='form-text'>Describe the fee or charge that applies.</div>
                  </div>
                )}
              </div>
            )}

            {/* Refund Policy — only for Cancellation */}
            {currentType === 'Cancellation' && (
              <div className='mb-3'>
                <label className='form-label'>Refund Policy</label>
                <textarea
                  name='refundPolicy'
                  className='form-control'
                  rows={2}
                  placeholder='e.g. Full refund within 7 days. No refund after service has commenced.'
                  value={formData.refundPolicy || ''}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Checkboxes */}
            <div className='mb-3'>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='carr-approval'
                  name='requiresApproval'
                  checked={formData.requiresApproval === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='carr-approval'>
                  Requires Manager Approval
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='carr-notes'
                  name='requiresNotes'
                  checked={formData.requiresNotes === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='carr-notes'>
                  Requires Comments / Notes from User
                </label>
                <div className='form-text'>Force the user to enter a comment when selecting this reason.</div>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='carr-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='carr-active'>
                  Active
                </label>
              </div>
            </div>

            {/* Internal Notes */}
            <div className='mb-3'>
              <label className='form-label'>Internal Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Internal guidance or usage instructions for staff...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            <div className='d-flex gap-2 mt-2'>
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

export default AddEditCancellationAdjustmentRejectionReason;
