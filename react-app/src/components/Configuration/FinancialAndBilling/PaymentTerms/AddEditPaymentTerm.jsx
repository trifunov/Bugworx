import React from 'react';
import useAddEditPaymentTerm from './useAddEditPaymentTerm';

const AddEditPaymentTerm = ({ isOpen, formData, isSaving, onClose, onSave }) => {
  const { termData, handleFieldChange, handleSubmit } = useAddEditPaymentTerm(formData, onSave);

  if (!isOpen) return null;

  const isEditing = termData && termData.id;

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Payment Term' : 'Add New Payment Term'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='termName' className='form-label'>
                Term Name
              </label>
              <input
                id='termName'
                name='termName'
                className='form-control'
                placeholder='e.g., Net 30'
                value={termData.termName || ''}
                onChange={handleFieldChange}
                required
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='daysUntilDue' className='form-label'>
                Days Until Due
              </label>
              <input
                id='daysUntilDue'
                name='daysUntilDue'
                type='number'
                className='form-control'
                placeholder='e.g., 30'
                value={termData.daysUntilDue === undefined ? '' : termData.daysUntilDue}
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
                rows='3'
                placeholder='e.g., Payment is due within 30 days of the invoice date.'
                value={termData.description || ''}
                onChange={handleFieldChange}
              ></textarea>
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                id='isDefault'
                name='isDefault'
                type='checkbox'
                className='form-check-input'
                checked={termData.isDefault || false}
                onChange={handleFieldChange}
              />
              <label className='form-check-label' htmlFor='isDefault'>
                Default Term
              </label>
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                id='active'
                name='active'
                type='checkbox'
                className='form-check-input'
                checked={termData.active === undefined ? true : termData.active}
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
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`offcanvas-backdrop fade show`} onClick={isSaving ? undefined : onClose}></div>
    </>
  );
};

export default AddEditPaymentTerm;
