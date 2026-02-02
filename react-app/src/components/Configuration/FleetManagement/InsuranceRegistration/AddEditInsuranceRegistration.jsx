import React from 'react';
import { getVehicleList } from '../../../../utils/localStorage';

const AddEditInsuranceRegistration = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  if (!isOpen) return null;

  const isEditing = formData && formData.id;
  const vehicles = getVehicleList();

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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Record' : 'Add New Record'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Vehicle</label>
              <select name='vehicleId' className='form-select' required value={formData.vehicleId || ''} onChange={handleChange}>
                <option value=''>Select a Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.vin})
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Insurance Provider</label>
              <input
                name='insuranceProvider'
                type='text'
                className='form-control'
                required
                value={formData.insuranceProvider || ''}
                onChange={handleChange}
                placeholder='e.g., Progressive'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Policy Number</label>
              <input
                name='policyNumber'
                type='text'
                className='form-control'
                required
                value={formData.policyNumber || ''}
                onChange={handleChange}
                placeholder='Enter policy number'
              />
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Policy Start Date</label>
                <input name='policyStartDate' type='date' className='form-control' value={formData.policyStartDate || ''} onChange={handleChange} />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Policy Expiry Date</label>
                <input name='policyExpiryDate' type='date' className='form-control' value={formData.policyExpiryDate || ''} onChange={handleChange} />
              </div>
            </div>

            <hr className='my-4' />

            <div className='mb-3'>
              <label className='form-label'>Registration Number</label>
              <input
                name='registrationNumber'
                type='text'
                className='form-control'
                value={formData.registrationNumber || ''}
                onChange={handleChange}
                placeholder='Enter registration or plate number'
              />
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Registration State</label>
                <input
                  name='registrationState'
                  type='text'
                  className='form-control'
                  value={formData.registrationState || ''}
                  onChange={handleChange}
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Registration Expiry</label>
                <input
                  name='registrationExpiryDate'
                  type='date'
                  className='form-control'
                  value={formData.registrationExpiryDate || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='record-active-check'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='record-active-check'>
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

export default AddEditInsuranceRegistration;
