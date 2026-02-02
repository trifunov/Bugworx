import React from 'react';

const AddEditUsagePolicy = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Policy' : 'Add New Policy'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Policy Name</label>
              <input
                name='policyName'
                type='text'
                className='form-control'
                required
                value={formData.policyName || ''}
                onChange={handleChange}
                placeholder='e.g., Standard Vehicle Use'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                rows='3'
                value={formData.description || ''}
                onChange={handleChange}
                placeholder='Briefly describe the purpose of this policy'
              ></textarea>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Policy Rules</label>
              <textarea
                name='rules'
                className='form-control'
                rows='6'
                value={formData.rules || ''}
                onChange={handleChange}
                placeholder='Detail the rules, e.g.,&#10;- Personal use restrictions...&#10;- Fueling procedures...&#10;- Accident reporting...'
              ></textarea>
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='policy-active-check'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='policy-active-check'>
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

export default AddEditUsagePolicy;
