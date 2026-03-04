import React from 'react';

const CATEGORIES = ['Residential', 'Commercial', 'Industrial', 'Institutional', 'Agricultural', 'Mixed-Use'];
const FREQUENCIES = ['Weekly', 'Bi-Weekly', 'Monthly', 'Bi-Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];
const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const AddEditPropertyTypeTemplate = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
      <div className='offcanvas offcanvas-end show' style={{ width: '460px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Property Type Template' : 'Add New Property Type Template'}</h5>
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
                placeholder='e.g. Residential Single-Family'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Property Category */}
            <div className='mb-3'>
              <label className='form-label'>Property Category</label>
              <select name='category' className='form-select' value={formData.category || 'Residential'} onChange={handleChange}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
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
                placeholder='Brief description of this property type...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Typical Size */}
            <div className='mb-3'>
              <label className='form-label'>Typical Size / Sq Footage</label>
              <input
                name='typicalSize'
                className='form-control'
                placeholder='e.g. 1,000 – 3,000 sq ft'
                value={formData.typicalSize || ''}
                onChange={handleChange}
              />
            </div>

            {/* Default Service Frequency */}
            <div className='mb-3'>
              <label className='form-label'>Default Service Frequency</label>
              <select
                name='defaultServiceFrequency'
                className='form-select'
                value={formData.defaultServiceFrequency || 'Quarterly'}
                onChange={handleChange}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Typical Pest Risk Level */}
            <div className='mb-3'>
              <label className='form-label'>Typical Pest Risk Level</label>
              <select name='pestRiskLevel' className='form-select' value={formData.pestRiskLevel || 'Medium'} onChange={handleChange}>
                {RISK_LEVELS.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Common Pest Types */}
            <div className='mb-3'>
              <label className='form-label'>Common Pest Types</label>
              <input
                name='commonPestTypes'
                className='form-control'
                placeholder='e.g. Ants, Cockroaches, Rodents (comma-separated)'
                value={formData.commonPestTypes || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter pest types separated by commas.</div>
            </div>

            {/* Default Access Instructions */}
            <div className='mb-3'>
              <label className='form-label'>Default Access Instructions</label>
              <textarea
                name='defaultAccessInstructions'
                className='form-control'
                rows={3}
                placeholder='e.g. Ring doorbell, access gate code required...'
                value={formData.defaultAccessInstructions || ''}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div className='mb-3'>
              <label className='form-label'>Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Any additional notes for this template...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Active */}
            <div className='form-check mb-4'>
              <input
                type='checkbox'
                className='form-check-input'
                id='property-type-active-check'
                name='active'
                checked={formData.active !== false}
                onChange={handleChange}
              />
              <label className='form-check-label' htmlFor='property-type-active-check'>
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

export default AddEditPropertyTypeTemplate;
