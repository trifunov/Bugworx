import React, { useEffect, useState } from 'react';
import { getVehicleTypes, getTechnicians } from '../../../../utils/localStorage';

const AddEditVehicle = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setVehicleTypes(getVehicleTypes());
      setTechnicians(getTechnicians());
    }
  }, [isOpen]);

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
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Vehicle Name</label>
              <input name='name' className='form-control' required value={formData.name || ''} onChange={handleChange} placeholder='e.g., Truck 1' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Vehicle Type</label>
              <select name='vehicleTypeId' className='form-select' value={formData.vehicleTypeId || ''} onChange={handleChange} required>
                <option value=''>Select Type</option>
                {vehicleTypes.map((vt) => (
                  <option key={vt.id} value={vt.id}>
                    {vt.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Assigned Technician</label>
              <select name='technicianId' className='form-select' value={formData.technicianId || ''} onChange={handleChange}>
                <option value=''>Select Technician</option>
                {technicians.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>License Plate</label>
              <input name='licensePlate' className='form-control' required value={formData.licensePlate || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Make</label>
              <input name='make' className='form-control' value={formData.make || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Model</label>
              <input name='model' className='form-control' value={formData.model || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Year</label>
              <input name='year' type='number' className='form-control' value={formData.year || ''} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>VIN</label>
              <input name='vin' className='form-control' value={formData.vin || ''} onChange={handleChange} />
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

export default AddEditVehicle;
