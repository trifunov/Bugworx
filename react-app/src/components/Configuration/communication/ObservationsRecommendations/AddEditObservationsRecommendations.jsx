import React from 'react';

const TYPES = ['Observation', 'Recommendation'];

const CATEGORIES = [
  'Rodent',
  'Cockroach',
  'Ant',
  'Termite',
  'Bed Bug',
  'Stored Product Pest',
  'Flying Insect',
  'Wildlife',
  'Sanitation',
  'Structural',
  'Chemical / Product',
  'General Pest',
  'Other',
];

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

const RISK_RATINGS = ['No Risk', 'Minor', 'Moderate', 'Significant', 'Severe'];

const AddEditObservationsRecommendations = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
      <div className='offcanvas offcanvas-end show' style={{ width: '500px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Observation / Recommendation' : 'Add Observation / Recommendation'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className='mb-3'>
              <label className='form-label'>
                Title <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Rodent droppings detected near entry point'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <div className='mb-3'>
              <label className='form-label'>Type</label>
              <select name='type' className='form-select' value={formData.type || 'Observation'} onChange={handleChange}>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <div className='form-text'>
                <em>Observation</em> — something found on-site. <em>Recommendation</em> — an action for the technician to perform.
              </div>
            </div>

            {/* Category */}
            <div className='mb-3'>
              <label className='form-label'>Category</label>
              <select name='category' className='form-select' value={formData.category || 'Rodent'} onChange={handleChange}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className='mb-3'>
              <label className='form-label'>
                Description / Template Text <span className='text-danger'>*</span>
              </label>
              <textarea
                name='description'
                className='form-control'
                rows={4}
                required
                placeholder={
                  formData.type === 'Recommendation'
                    ? 'e.g. Set 2 bait stations along the perimeter wall near the entry door.'
                    : 'e.g. Active rodent droppings observed near the kitchen area, indicating recent activity.'
                }
                value={formData.description || ''}
                onChange={handleChange}
              />
              <div className='form-text'>This standardized text will be pre-filled in the technician's field report.</div>
            </div>

            {/* Priority / Risk Rating — side by side */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Priority</label>
                <select name='priority' className='form-select' value={formData.priority || 'Medium'} onChange={handleChange}>
                  {PRIORITIES.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Risk Rating</label>
                <select name='riskRating' className='form-select' value={formData.riskRating || 'Moderate'} onChange={handleChange}>
                  {RISK_RATINGS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Recommended Action (visible for Observations) */}
            {(formData.type === 'Observation' || !formData.type) && (
              <div className='mb-3'>
                <label className='form-label'>Recommended Action</label>
                <textarea
                  name='recommendedAction'
                  className='form-control'
                  rows={3}
                  placeholder='e.g. Place 2 snap traps along the identified runway and seal visible entry gaps.'
                  value={formData.recommendedAction || ''}
                  onChange={handleChange}
                />
                <div className='form-text'>Optional follow-up action linked to this observation.</div>
              </div>
            )}

            {/* Default Setup / Quantity (visible for Recommendations) */}
            {formData.type === 'Recommendation' && (
              <div className='mb-3'>
                <label className='form-label'>Default Quantity / Setup Detail</label>
                <input
                  name='defaultSetup'
                  className='form-control'
                  placeholder='e.g. Set 2 bait stations, apply 50 ml per station'
                  value={formData.defaultSetup || ''}
                  onChange={handleChange}
                />
                <div className='form-text'>Standardized quantity or setup instruction pre-filled for technicians.</div>
              </div>
            )}

            {/* Product / Treatment Suggestion */}
            <div className='mb-3'>
              <label className='form-label'>Suggested Product / Treatment</label>
              <input
                name='suggestedProduct'
                className='form-control'
                placeholder='e.g. Contrac Blox, Ditrac Pellets'
                value={formData.suggestedProduct || ''}
                onChange={handleChange}
              />
            </div>

            {/* Location Hint */}
            <div className='mb-3'>
              <label className='form-label'>Common Location / Area Hint</label>
              <input
                name='locationHint'
                className='form-control'
                placeholder='e.g. Kitchen / storage room / perimeter wall'
                value={formData.locationHint || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Helps technicians quickly identify where this typically applies.</div>
            </div>

            {/* Internal Notes */}
            <div className='mb-3'>
              <label className='form-label'>Internal Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Internal guidance or usage instructions for this template...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Checkboxes */}
            <div className='mb-3'>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='or-photo-placeholder'
                  name='includePhotoPlaceholder'
                  checked={formData.includePhotoPlaceholder === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='or-photo-placeholder'>
                  Include Photo / Attachment Placeholder
                </label>
                <div className='form-text'>Prompt technician to attach a photo when using this template.</div>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='or-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='or-active'>
                  Active
                </label>
              </div>
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

export default AddEditObservationsRecommendations;
