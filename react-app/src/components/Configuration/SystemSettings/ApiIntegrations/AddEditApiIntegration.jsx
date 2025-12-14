import React from 'react';

const AddEditApiIntegration = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
  if (!isOpen) {
    return null;
  }

  const isEditing = formData && formData.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateFieldHandle(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Integration' : 'Add New Integration'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Provider Name</label>
              <input
                name='name'
                className='form-control'
                required
                value={formData.name || ''}
                onChange={handleChange}
                placeholder='e.g., Samsara, QuickBooks'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Integration Type</label>
              <select name='type' className='form-select' value={formData.type || 'GPS'} onChange={handleChange}>
                <option>GPS</option>
                <option>HRMS</option>
                <option>Accounting</option>
                <option>Other</option>
              </select>
            </div>
            <hr className='my-4' />
            <h6 className='mb-3'>Credentials</h6>
            <div className='mb-3'>
              <label className='form-label'>Client ID</label>
              <input name='clientId' className='form-control' value={formData.clientId || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Client Secret</label>
              <input name='clientSecret' type='password' className='form-control' value={formData.clientSecret || ''} onChange={handleChange} autoComplete="new-password" />
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

export default AddEditApiIntegration;
