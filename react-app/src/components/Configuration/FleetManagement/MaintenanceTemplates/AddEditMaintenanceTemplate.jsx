import React, { useState } from 'react';

const AddEditMaintenanceTemplate = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Template' : 'Add New Template'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Template Name</label>
              <input name='name' className='form-control' required value={formData.name || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea name='description' className='form-control' value={formData.description || ''} onChange={handleChange} rows='2'></textarea>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Frequency</label>
              <div className='input-group'>
                <input
                  name='frequencyValue'
                  type='number'
                  className='form-control'
                  value={formData.frequencyValue || ''}
                  onChange={handleChange}
                  style={{ flex: '1' }}
                />
                <select
                  name='frequencyUnit'
                  className='form-select'
                  value={formData.frequencyUnit || 'Days'}
                  onChange={handleChange}
                  style={{ flex: '2' }}
                >
                  <option>Days</option>
                  <option>Weeks</option>
                  <option>Months</option>
                  <option>Years</option>
                </select>
              </div>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Tasks</label>
              <textarea
                name='tasks'
                className='form-control'
                value={formData.tasks || ''}
                onChange={handleChange}
                rows='4'
                placeholder='Enter tasks, separated by commas'
              ></textarea>
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

export default AddEditMaintenanceTemplate;
