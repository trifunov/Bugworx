import React from 'react';

const AddEditFuelTypeAndCapacity = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  if (!isOpen) {
    return null;
  }

  const { name, capacity } = formData || {};
  const isEditing = formData && formData.id;
  const title = isEditing ? 'Edit Fuel Type & Capacity' : 'Add Fuel Type & Capacity';

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{title}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Fuel Type</label>
              <input
                type='text'
                className='form-control'
                placeholder='e.g., Gasoline, Diesel'
                value={name || ''}
                onChange={(e) => onUpdateFieldHandle('name', e.target.value)}
                required
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Capacity</label>
              <input
                type='text'
                className='form-control'
                placeholder='e.g., 50 liters, 15 gallons'
                value={capacity || ''}
                onChange={(e) => onUpdateFieldHandle('capacity', e.target.value)}
              />
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

export default AddEditFuelTypeAndCapacity;
