import React from 'react';

const AddEditCurrency = ({ isOpen, formData: initialFormData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  const formData = initialFormData || {};

  if (!isOpen) return null;

  const isEditing = formData && formData.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    onUpdateFieldHandle(name, newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Currency' : 'Add New Currency'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Currency Name</label>
              <input
                name='currencyName'
                className='form-control'
                required
                value={formData.currencyName || ''}
                onChange={handleChange}
                placeholder='e.g., US Dollar'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Currency Code</label>
              <input
                name='currencyCode'
                className='form-control'
                required
                value={formData.currencyCode || ''}
                onChange={handleChange}
                placeholder='e.g., USD'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Symbol</label>
              <input name='symbol' className='form-control' required value={formData.symbol || ''} onChange={handleChange} placeholder='e.g., $' />
            </div>
            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='isDefault-check'
                name='isDefault'
                checked={formData.isDefault || false}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='isDefault-check'>
                Default Currency
              </label>
            </div>
            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='currency-active-check'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='currency-active-check'>
                Active
              </label>
            </div>
            <div className='d-flex gap-2 mt-4'>
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
      <div className={`offcanvas-backdrop fade show`} onClick={isSaving ? undefined : onClose}></div>
    </>
  );
};

export default AddEditCurrency;
