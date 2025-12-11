import React, { useState, useEffect } from 'react';

const AddEditEquipmentDevices = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
      <div className='offcanvas offcanvas-end show' style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Equipment' : 'Add New Equipment'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Device Name</label>
              <input
                name='name'
                className='form-control'
                required
                value={formData.name || ''}
                onChange={handleChange}
                placeholder='e.g., Rodent Bait Station'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Device Type</label>
              <input
                name='type'
                className='form-control'
                required
                value={formData.type || ''}
                onChange={handleChange}
                placeholder='e.g., Trap, Station, Sensor'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                value={formData.description || ''}
                onChange={handleChange}
                rows='3'
                placeholder='A short description of the device'
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
      <div className='offcanvas-backdrop fade show' onClick={isSaving ? undefined : onClose}></div>
    </>
  );
};

export default AddEditEquipmentDevices;
