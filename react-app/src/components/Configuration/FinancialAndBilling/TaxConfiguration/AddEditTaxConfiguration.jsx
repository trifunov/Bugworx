import React from 'react';

const AddEditTaxConfiguration = ({ isOpen, formData: initialFormData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Tax Configuration' : 'Add New Tax Configuration'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Tax Name</label>
              <input
                name='taxName'
                className='form-control'
                required
                value={formData.taxName || ''}
                onChange={handleChange}
                placeholder='e.g., State Sales Tax'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Tax Rate (%)</label>
              <input
                name='taxRate'
                type='number'
                step='0.01'
                className='form-control'
                required
                value={formData.taxRate || ''}
                onChange={handleChange}
                placeholder='e.g., 8.25'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Region</label>
              <input
                name='region'
                className='form-control'
                value={formData.region || ''}
                onChange={handleChange}
                placeholder='e.g., California, NYC'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Applies To</label>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='appliesToServices'
                  name='appliesToServices'
                  checked={formData.appliesToServices || false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='appliesToServices'>
                  Services
                </label>
              </div>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='appliesToProducts'
                  name='appliesToProducts'
                  checked={formData.appliesToProducts || false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='appliesToProducts'>
                  Products / Materials
                </label>
              </div>
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='tax-config-active-check'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='tax-config-active-check'>
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

export default AddEditTaxConfiguration;
