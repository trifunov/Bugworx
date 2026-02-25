import React from 'react';

const AddEditAccountingPeriod = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Accounting Period' : 'Add New Accounting Period'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Period Name</label>
              <input name='name' className='form-control' required value={formData.name || ''} onChange={handleChange} placeholder='e.g., Q1 2026' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Start Date</label>
              <input name='startDate' type='date' className='form-control' required value={formData.startDate || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>End Date</label>
              <input name='endDate' type='date' className='form-control' required value={formData.endDate || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Status</label>
              <select name='status' className='form-select' value={formData.status || 'Future'} onChange={handleChange}>
                <option value='Future'>Future</option>
                <option value='Open'>Open</option>
                <option value='Closed'>Closed</option>
              </select>
            </div>
            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='isCurrent'
                name='isCurrent'
                checked={formData.isCurrent || false}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='isCurrent'>
                Set as Current Period
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

export default AddEditAccountingPeriod;
