import React from 'react';

const SERVICE_TYPES = ['Inspection', 'Treatment', 'Maintenance', 'General', 'Re-treatment', 'Follow-up'];
const DURATION_UNITS = ['minutes', 'hours'];
const TECHNICIAN_ROLES = ['Technician', 'Senior Technician', 'Team Lead', 'Inspector', 'Supervisor', 'Any'];
const PROPERTY_TYPES = ['Residential', 'Commercial', 'Industrial', 'Institutional', 'Agricultural', 'Mixed-Use'];

const AddEditServiceProgramTemplate = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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

  const handlePropertyTypeToggle = (type) => {
    const current = formData.applicablePropertyTypes
      ? formData.applicablePropertyTypes
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const updated = current.includes(type) ? current.filter((t) => t !== type) : [...current, type];
    onUpdateFieldHandle('applicablePropertyTypes', updated.join(', '));
  };

  const selectedPropertyTypes = formData.applicablePropertyTypes
    ? formData.applicablePropertyTypes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '480px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Service / Program Template' : 'Add New Service / Program Template'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Template Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Template Name <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Monthly Residential Inspection'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Service Type */}
            <div className='mb-3'>
              <label className='form-label'>Service Type</label>
              <select name='serviceType' className='form-select' value={formData.serviceType || 'Inspection'} onChange={handleChange}>
                {SERVICE_TYPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                rows={3}
                placeholder='Brief description of this service / program template...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Standard Duration */}
            <div className='mb-3'>
              <label className='form-label'>Standard Duration</label>
              <div className='input-group'>
                <input
                  name='standardDuration'
                  type='number'
                  min='1'
                  className='form-control'
                  placeholder='e.g. 60'
                  value={formData.standardDuration || ''}
                  onChange={handleChange}
                />
                <select
                  name='standardDurationUnit'
                  className='form-select'
                  style={{ maxWidth: '110px' }}
                  value={formData.standardDurationUnit || 'minutes'}
                  onChange={handleChange}
                >
                  {DURATION_UNITS.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Technician Role Assignment */}
            <div className='mb-3'>
              <label className='form-label'>Technician Role Assignment</label>
              <select name='technicianRole' className='form-select' value={formData.technicianRole || 'Technician'} onChange={handleChange}>
                {TECHNICIAN_ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Default Checklist Items */}
            <div className='mb-3'>
              <label className='form-label'>Default Checklist Items</label>
              <textarea
                name='defaultChecklistItems'
                className='form-control'
                rows={4}
                placeholder='Enter each checklist item on a new line, e.g.&#10;Check entry points&#10;Inspect bait stations&#10;Document pest activity'
                value={formData.defaultChecklistItems || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one checklist item per line.</div>
            </div>

            {/* Required Tools / Materials */}
            <div className='mb-3'>
              <label className='form-label'>Required Tools / Materials</label>
              <textarea
                name='requiredToolsMaterials'
                className='form-control'
                rows={3}
                placeholder='e.g. Bait stations, Spray solution, Protective gloves (comma-separated)'
                value={formData.requiredToolsMaterials || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter tools and materials separated by commas.</div>
            </div>

            {/* Pest Types Covered */}
            <div className='mb-3'>
              <label className='form-label'>Pest Types Covered</label>
              <input
                name='pestTypesCovered'
                className='form-control'
                placeholder='e.g. Ants, Cockroaches, Rodents (comma-separated)'
                value={formData.pestTypesCovered || ''}
                onChange={handleChange}
              />
            </div>

            {/* Applicable Property Types */}
            <div className='mb-3'>
              <label className='form-label'>Applicable Property Types</label>
              <div className='d-flex flex-wrap gap-2'>
                {PROPERTY_TYPES.map((type) => (
                  <div key={type} className='form-check form-check-inline'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={`prop-type-${type}`}
                      checked={selectedPropertyTypes.includes(type)}
                      onChange={() => handlePropertyTypeToggle(type)}
                    />
                    <label className='form-check-label' htmlFor={`prop-type-${type}`}>
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className='mb-3'>
              <label className='form-label'>Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Any additional notes or special instructions...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Active */}
            <div className='form-check mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                id='spt-active-check'
                name='active'
                checked={formData.active !== false}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='spt-active-check'>
                Active
              </label>
            </div>

            <div className='d-flex gap-2 mt-2'>
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
      <div className='offcanvas-backdrop fade show' onClick={isSaving ? undefined : onClose} />
    </>
  );
};

export default AddEditServiceProgramTemplate;
