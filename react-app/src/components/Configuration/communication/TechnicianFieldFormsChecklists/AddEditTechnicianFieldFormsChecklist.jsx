import React from 'react';

const FORM_TYPES = [
  'Checklist',
  'Inspection Form',
  'Service Report',
  'Safety Audit',
  'Pre-Service Form',
  'Post-Service Form',
  'Quality Assurance Form',
];

const SERVICE_TYPES = [
  'General Pest Control',
  'Rodent Control',
  'Termite Treatment',
  'Bed Bug Treatment',
  'Fumigation',
  'Mosquito Control',
  'Flying Insect Control',
  'Wildlife Control',
  'Sanitation Inspection',
  'Preventive Maintenance',
  'Emergency Call',
  'Any / All Services',
];

const FREQUENCIES = ['Per Visit', 'Monthly', 'Quarterly', 'Annually', 'First Visit Only', 'On Demand'];

const AddEditTechnicianFieldFormsChecklist = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
      <div className='offcanvas offcanvas-end show' style={{ width: '520px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Field Form / Checklist' : 'Add Field Form / Checklist'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Form Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Form Name <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Residential Rodent Inspection Checklist'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Form Type */}
            <div className='mb-3'>
              <label className='form-label'>Form Type</label>
              <select name='formType' className='form-select' value={formData.formType || 'Checklist'} onChange={handleChange}>
                {FORM_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Applies to Service Type */}
            <div className='mb-3'>
              <label className='form-label'>Applies to Service Type</label>
              <select name='serviceType' className='form-select' value={formData.serviceType || 'General Pest Control'} onChange={handleChange}>
                {SERVICE_TYPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Usage Frequency */}
            <div className='mb-3'>
              <label className='form-label'>Usage Frequency</label>
              <select name='frequency' className='form-select' value={formData.frequency || 'Per Visit'} onChange={handleChange}>
                {FREQUENCIES.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
              <div className='form-text'>How often this form should be completed by technicians.</div>
            </div>

            {/* Description */}
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                rows={3}
                placeholder='Briefly describe the purpose of this form and when technicians should use it...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Checklist Items / Sections */}
            <div className='mb-3'>
              <label className='form-label'>Checklist Items / Sections</label>
              <textarea
                name='checklistItems'
                className='form-control'
                rows={6}
                placeholder={
                  '1. Check all entry points for gaps or damage\n' +
                  '2. Inspect bait stations — record activity level\n' +
                  '3. Check snap traps — reset or replace as needed\n' +
                  '4. Inspect attic / crawl space for droppings\n' +
                  '5. Note any new conducive conditions'
                }
                value={formData.checklistItems || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one checklist item or section per line. Technicians will step through these on-site.</div>
            </div>

            {/* Instructions for Technician */}
            <div className='mb-3'>
              <label className='form-label'>Instructions for Technician</label>
              <textarea
                name='technicianInstructions'
                className='form-control'
                rows={3}
                placeholder='e.g. Complete this form before leaving the property. Take photos of any active infestations...'
                value={formData.technicianInstructions || ''}
                onChange={handleChange}
              />
            </div>

            {/* Estimated Completion Time */}
            <div className='mb-3'>
              <label className='form-label'>Estimated Completion Time (minutes)</label>
              <input
                type='number'
                name='estimatedMinutes'
                className='form-control'
                min={1}
                placeholder='e.g. 15'
                value={formData.estimatedMinutes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Version */}
            <div className='mb-3'>
              <label className='form-label'>Version</label>
              <input name='version' className='form-control' placeholder='e.g. v1.0' value={formData.version || ''} onChange={handleChange} />
              <div className='form-text'>Track revisions to this template over time.</div>
            </div>

            {/* Internal Notes */}
            <div className='mb-3'>
              <label className='form-label'>Internal Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Internal guidance or notes for managers about this form...'
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
                  id='tff-signature'
                  name='signatureRequired'
                  checked={formData.signatureRequired === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='tff-signature'>
                  Customer Signature Required
                </label>
                <div className='form-text'>Technician must obtain a customer signature before completing the form.</div>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='tff-photo'
                  name='photoRequired'
                  checked={formData.photoRequired === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='tff-photo'>
                  Photo / Attachment Required
                </label>
                <div className='form-text'>Technician must attach at least one photo before submitting.</div>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='tff-supervisor'
                  name='requiresSupervisorReview'
                  checked={formData.requiresSupervisorReview === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='tff-supervisor'>
                  Requires Supervisor Review
                </label>
                <div className='form-text'>Completed forms must be reviewed and approved by a supervisor.</div>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='tff-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='tff-active'>
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

export default AddEditTechnicianFieldFormsChecklist;
