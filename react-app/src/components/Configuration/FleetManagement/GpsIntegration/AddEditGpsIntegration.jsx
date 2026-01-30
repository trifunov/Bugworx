import React from 'react';

const AddEditGpsIntegration = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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

  const providers = ['GPS.io', 'Track-It-All', 'FleetFinder', 'Custom API'];

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
              <select name='providerName' className='form-select' required value={formData.providerName || ''} onChange={handleChange}>
                <option value=''>Select a Provider</option>
                {providers.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label className='form-label'>API Key</label>
              <input
                name='apiKey'
                type='password'
                className='form-control'
                required
                value={formData.apiKey || ''}
                onChange={handleChange}
                placeholder='Enter provider API key'
              />
            </div>

            {formData.providerName === 'Custom API' && (
              <div className='mb-3'>
                <label className='form-label'>API Endpoint URL</label>
                <input
                  name='apiEndpoint'
                  className='form-control'
                  value={formData.apiEndpoint || ''}
                  onChange={handleChange}
                  placeholder='https://api.custom.com/v1/vehicles'
                />
              </div>
            )}

            <div className='mb-3'>
              <label className='form-label'>Sync Frequency (minutes)</label>
              <input name='syncFrequency' type='number' className='form-control' value={formData.syncFrequency || '15'} onChange={handleChange} />
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='gps-active-check'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='gps-active-check'>
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

export default AddEditGpsIntegration;
