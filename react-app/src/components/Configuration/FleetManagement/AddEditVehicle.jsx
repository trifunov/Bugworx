import React from 'react';

const AddEditVehicle = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Vehicle Name/ID</label>
              <input name='name' className='form-control' required value={formData.name || ''} onChange={handleChange} placeholder='e.g., Truck-01' />
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Make</label>
                <input name='make' className='form-control' value={formData.make || ''} onChange={handleChange} placeholder='e.g., Ford' />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Model</label>
                <input name='model' className='form-control' value={formData.model || ''} onChange={handleChange} placeholder='e.g., Transit' />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Year</label>
                <input
                  name='year'
                  type='number'
                  className='form-control'
                  value={formData.year || ''}
                  onChange={handleChange}
                  placeholder='e.g., 2023'
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>License Plate</label>
                <input name='licensePlate' className='form-control' value={formData.licensePlate || ''} onChange={handleChange} />
              </div>
            </div>
            <div className='mb-3'>
              <label className='form-label'>VIN</label>
              <input name='vin' className='form-control' value={formData.vin || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Status</label>
              <select name='status' className='form-select' value={formData.status || 'Active'} onChange={handleChange}>
                <option>Active</option>
                <option>In-Shop</option>
                <option>Decommissioned</option>
              </select>
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

export default AddEditVehicle;
