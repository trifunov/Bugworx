import React from 'react';
import useAddEditBatchProcessing from './useAddEditBatchProcessing';

const AddEditBatchProcessing = ({ isOpen, formData, isSaving, onClose, onSave }) => {
  const { setupData, handleFieldChange, handleSubmit } = useAddEditBatchProcessing(formData, onSave);

  if (!isOpen) return null;

  const isEditing = setupData && setupData.id;

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '500px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Batch Processing Rule' : 'Add New Batch Processing Rule'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='batchName' className='form-label'>
                Batch Name
              </label>
              <input
                id='batchName'
                name='batchName'
                className='form-control'
                placeholder='e.g., Daily Invoice Run'
                value={setupData.batchName || ''}
                onChange={handleFieldChange}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Description (Optional)
              </label>
              <textarea
                id='description'
                name='description'
                className='form-control'
                rows='2'
                placeholder='Describe the purpose of this batch job'
                value={setupData.description || ''}
                onChange={handleFieldChange}
              ></textarea>
            </div>

            <div className='mb-3'>
              <label htmlFor='transactionType' className='form-label'>
                Transaction Type
              </label>
              <select
                id='transactionType'
                name='transactionType'
                className='form-select'
                value={setupData.transactionType || ''}
                onChange={handleFieldChange}
                required
              >
                <option value=''>Select a type...</option>
                <option value='Invoices'>Invoices</option>
                <option value='Payments'>Payments</option>
                <option value='Late Fees'>Late Fees</option>
                <option value='Contract Renewals'>Contract Renewals</option>
              </select>
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='frequency' className='form-label'>
                  Frequency
                </label>
                <select id='frequency' name='frequency' className='form-select' value={setupData.frequency || 'Manual'} onChange={handleFieldChange}>
                  <option>Manual</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              {setupData.frequency !== 'Manual' && (
                <div className='col-md-6 mb-3'>
                  <label htmlFor='scheduledTime' className='form-label'>
                    Scheduled Time
                  </label>
                  <input
                    id='scheduledTime'
                    name='scheduledTime'
                    type='time'
                    className='form-control'
                    value={setupData.scheduledTime || '02:00'}
                    onChange={handleFieldChange}
                  />
                </div>
              )}
            </div>

            <div className='mb-3'>
              <label className='form-label'>Posting Rule</label>
              <select name='postingRule' className='form-select' value={setupData.postingRule || 'Auto-post'} onChange={handleFieldChange}>
                <option value='Auto-post'>Automatically Post Transactions</option>
                <option value='Review'>Create Drafts for Review</option>
              </select>
              <div className='form-text'>Determines if transactions are posted automatically or held for manual review.</div>
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                id='active'
                name='active'
                type='checkbox'
                className='form-check-input'
                checked={setupData.active === undefined ? true : setupData.active}
                onChange={handleFieldChange}
              />
              <label className='form-check-label' htmlFor='active'>
                Active
              </label>
            </div>

            <div className='d-flex justify-content-end gap-2 mt-4'>
              <button type='button' className='btn btn-light' onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary' disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Rule'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`offcanvas-backdrop fade show`} onClick={isSaving ? undefined : onClose}></div>
    </>
  );
};

export default AddEditBatchProcessing;
