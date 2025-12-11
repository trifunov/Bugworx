import React from 'react';

const AddEditTreatmentType = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Treatment Type' : 'Add New Treatment Type'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Method</label>
              <input
                name='method'
                className='form-control'
                required
                value={formData.method || ''}
                onChange={handleChange}
                placeholder='e.g., Baiting, Spraying'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Chemicals</label>
              <input
                name='chemicals'
                className='form-control'
                value={formData.chemicals || ''}
                onChange={handleChange}
                placeholder='e.g., Fipronil, Boric Acid'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Protocols</label>
              <textarea
                name='protocols'
                className='form-control'
                value={formData.protocols || ''}
                onChange={handleChange}
                rows='4'
                placeholder='Describe the treatment protocol...'
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

export default AddEditTreatmentType;
