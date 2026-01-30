import React from 'react';

const AddEditDriverAssignmentRule = ({ isOpen, formData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
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

  // Mock data for dropdowns
  const certifications = ['Pest Control Applicator License', 'CDL Class B', 'Fumigation Specialist'];
  const vehicleTypes = ['Standard Truck', 'Sprayer Rig', 'Compact Van', 'Hazmat Vehicle'];
  const zones = ['North Zone', 'South Zone', 'City Center', 'Industrial Park'];

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Rule' : 'Add New Rule'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Rule Name</label>
              <input
                name='ruleName'
                className='form-control'
                required
                value={formData.ruleName || ''}
                onChange={handleChange}
                placeholder='e.g., Certified Techs for Sprayers'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Technician Certification</label>
              <select name='technicianCertification' className='form-select' value={formData.technicianCertification || ''} onChange={handleChange}>
                <option value=''>Any Certification</option>
                {certifications.map((cert) => (
                  <option key={cert} value={cert}>
                    {cert}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Vehicle Type</label>
              <select name='vehicleType' className='form-select' value={formData.vehicleType || ''} onChange={handleChange}>
                <option value=''>Any Vehicle Type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Service Zone</label>
              <select name='serviceZone' className='form-select' value={formData.serviceZone || ''} onChange={handleChange}>
                <option value=''>Any Zone</option>
                {zones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Priority</label>
              <input
                name='priority'
                type='number'
                className='form-control'
                value={formData.priority || 10}
                onChange={handleChange}
                placeholder='Lower number = higher priority'
              />
            </div>

            <div className='form-check form-switch mb-3'>
              <input
                type='checkbox'
                className='form-check-input'
                id='rule-active-check'
                name='active'
                checked={formData.active === undefined ? true : formData.active}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='rule-active-check'>
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

export default AddEditDriverAssignmentRule;
