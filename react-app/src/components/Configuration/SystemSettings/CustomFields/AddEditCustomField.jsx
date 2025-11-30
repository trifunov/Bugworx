import React from 'react';

const AddEditCustomField = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Custom Field' : 'Add New Custom Field'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Field Label</label>
              <input
                name='label'
                className='form-control'
                required
                value={formData.label || ''}
                onChange={handleChange}
                placeholder='e.g., Gate Code'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Applies To</label>
              <select name='applies' className='form-select' value={formData.applies || 'Customers'} onChange={handleChange}>
                <option>Customers</option>
                <option>Service Addresses</option>
                <option>Work Orders</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Field Type</label>
              <select name='type' className='form-select' value={formData.type || 'Text'} onChange={handleChange}>
                <option>Text</option>
                <option>Number</option>
                <option>Date</option>
                <option>Dropdown</option>
                <option>Checkbox</option>
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

export default AddEditCustomField;
