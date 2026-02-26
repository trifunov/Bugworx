import React from 'react';

const TYPES = ['Zone', 'Location', 'Area', 'Sub-Zone', 'Perimeter'];

const APPLICABLE_TO = ['Facility', 'Building', 'Floor', 'Room / Space', 'Outdoor Area', 'Storage Unit', 'Vehicle / Mobile Unit', 'Any'];

const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const INSPECTION_PRIORITIES = ['Standard', 'Priority', 'Critical — Every Visit'];

const COMMON_PEST_CONCERNS = ['Rodents', 'Cockroaches', 'Ants', 'Termites', 'Bed Bugs', 'Flying Insects', 'Stored Product Pests', 'Wildlife'];

const AddEditLocationsZonesTemplate = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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

  const selectedPests = formData.pestConcerns ? formData.pestConcerns.split(',').map((s) => s.trim()) : [];

  const togglePest = (pest) => {
    const updated = selectedPests.includes(pest) ? selectedPests.filter((p) => p !== pest) : [...selectedPests, pest];
    onUpdateFieldHandle('pestConcerns', updated.join(', '));
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '500px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Location / Zone Template' : 'Add Location / Zone Template'}</h5>
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
                placeholder='e.g. Kitchen Zone, Loading Dock, Perimeter North'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Type + Applicable To — side by side */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Type</label>
                <select name='type' className='form-select' value={formData.type || 'Zone'} onChange={handleChange}>
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Applicable To</label>
                <select name='applicableTo' className='form-select' value={formData.applicableTo || 'Facility'} onChange={handleChange}>
                  {APPLICABLE_TO.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                rows={3}
                placeholder='Describe this location or zone and what it typically covers...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Risk Level + Inspection Priority — side by side */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Risk Level</label>
                <select name='riskLevel' className='form-select' value={formData.riskLevel || 'Medium'} onChange={handleChange}>
                  {RISK_LEVELS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Inspection Priority</label>
                <select name='inspectionPriority' className='form-select' value={formData.inspectionPriority || 'Standard'} onChange={handleChange}>
                  {INSPECTION_PRIORITIES.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Common Pest Concerns */}
            <div className='mb-3'>
              <label className='form-label'>Common Pest Concerns</label>
              <div className='d-flex flex-wrap gap-2 mt-1'>
                {COMMON_PEST_CONCERNS.map((pest) => (
                  <div
                    key={pest}
                    className={`badge font-size-12 ${selectedPests.includes(pest) ? 'badge-soft-primary' : 'badge-soft-secondary'}`}
                    style={{ cursor: 'pointer', padding: '6px 10px' }}
                    onClick={() => togglePest(pest)}
                  >
                    {selectedPests.includes(pest) && <i className='ri-check-line me-1' />}
                    {pest}
                  </div>
                ))}
              </div>
              <div className='form-text'>Click to toggle pest types typically found in this location / zone.</div>
            </div>

            {/* Default Inspection Points */}
            <div className='mb-3'>
              <label className='form-label'>Default Inspection Points</label>
              <textarea
                name='defaultInspectionPoints'
                className='form-control'
                rows={4}
                placeholder={
                  'e.g.\nDoor frames and entry gaps\nUnder sinks and behind equipment\nDrain covers\nCeiling voids / suspended tiles\nCorners and wall junctions'
                }
                value={formData.defaultInspectionPoints || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one inspection point per line. Pre-populated for technicians when this zone is selected.</div>
            </div>

            {/* Recommended Treatments */}
            <div className='mb-3'>
              <label className='form-label'>Recommended Treatments</label>
              <textarea
                name='recommendedTreatments'
                className='form-control'
                rows={3}
                placeholder='e.g. Crack & crevice spray, bait gel application, glue board placement'
                value={formData.recommendedTreatments || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one treatment per line.</div>
            </div>

            {/* Access Notes */}
            <div className='mb-3'>
              <label className='form-label'>Access & Entry Notes</label>
              <textarea
                name='accessNotes'
                className='form-control'
                rows={2}
                placeholder='e.g. Requires site manager escort. Access restricted during production hours 06:00–14:00.'
                value={formData.accessNotes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Special Handling / Safety Notes */}
            <div className='mb-3'>
              <label className='form-label'>Safety / Handling Notes</label>
              <textarea
                name='safetyNotes'
                className='form-control'
                rows={2}
                placeholder='e.g. PPE required. Avoid chemical application within 1m of food contact surfaces.'
                value={formData.safetyNotes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Internal Notes */}
            <div className='mb-3'>
              <label className='form-label'>Internal Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Internal usage notes for this template...'
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
                  id='lzt-requires-inspection'
                  name='requiresInspection'
                  checked={formData.requiresInspection !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='lzt-requires-inspection'>
                  Requires Inspection on Every Visit
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='lzt-photo'
                  name='requiresPhotoOnVisit'
                  checked={formData.requiresPhotoOnVisit === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='lzt-photo'>
                  Requires Photo Documentation on Each Visit
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='lzt-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='lzt-active'>
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

export default AddEditLocationsZonesTemplate;
