import React from 'react';

const AddEditInvoiceTemplate = ({ isOpen, formData: initialFormData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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
      <div className={`offcanvas offcanvas-end show`} style={{ width: '500px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Invoice Template' : 'Add New Invoice Template'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Template Name</label>
              <input
                name='templateName'
                className='form-control'
                required
                value={formData.templateName || ''}
                onChange={handleChange}
                placeholder='e.g., Standard Invoice'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Header Content</label>
              <textarea
                name='headerContent'
                className='form-control'
                value={formData.headerContent || ''}
                onChange={handleChange}
                rows='3'
                placeholder='e.g., Your Company Logo and Address'
              ></textarea>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Footer Content</label>
              <textarea
                name='footerContent'
                className='form-control'
                value={formData.footerContent || ''}
                onChange={handleChange}
                rows='3'
                placeholder='e.g., Payment terms and thank you note'
              ></textarea>
            </div>

            <h6 className='mt-4'>Invoice Numbering</h6>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Prefix</label>
                <input
                  name='numberingPrefix'
                  className='form-control'
                  value={formData.numberingPrefix || ''}
                  onChange={handleChange}
                  placeholder='e.g., INV-'
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Next Number</label>
                <input name='nextNumber' type='number' className='form-control' value={formData.nextNumber || ''} onChange={handleChange} />
              </div>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Suffix</label>
              <input
                name='numberingSuffix'
                className='form-control'
                value={formData.numberingSuffix || ''}
                onChange={handleChange}
                placeholder='e.g., -2024'
              />
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='isDefault-template-check'
                name='isDefault'
                checked={formData.isDefault || false}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='isDefault-template-check'>
                Default Template
              </label>
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='template-active-check'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='template-active-check'>
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

export default AddEditInvoiceTemplate;
