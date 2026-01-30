import React from 'react';

const AddEditVehicleType = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  if (!isOpen) return null;

  const isEditing = formData && formData.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdateFieldHandle(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Vehicle Type' : 'Add New Vehicle Type'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Name</label>
              <input
                name='name'
                className='form-control'
                required
                value={formData.name || ''}
                onChange={handleChange}
                placeholder='Enter vehicle type name'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Capacity (lbs)</label>
              <input
                name='capacity'
                type='number'
                className='form-control'
                value={formData.capacity || ''}
                onChange={handleChange}
                placeholder='Enter capacity'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Fuel Type</label>
              <input
                name='fuelType'
                className='form-control'
                value={formData.fuelType || ''}
                onChange={handleChange}
                placeholder='e.g., Gasoline, Diesel'
              />
            </div>
            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='vehicle-active-check'
                name='active'
                checked={formData.active || false}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='vehicle-active-check'>
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

export default AddEditVehicleType;
