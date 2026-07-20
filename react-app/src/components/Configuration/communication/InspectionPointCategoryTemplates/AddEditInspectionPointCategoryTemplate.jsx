import React from 'react';

const INSPECTION_TYPES = ['Interior', 'Exterior', 'Both'];

const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const APPLICABLE_PEST_TYPES = [
  'Rodents',
  'Cockroaches',
  'Ants',
  'Termites',
  'Bed Bugs',
  'Flying Insects',
  'Stored Product Pests',
  'Wildlife',
  'Spiders',
  'Wasps / Bees',
  'Mosquitoes',
  'Fleas / Ticks',
];

const FREQUENCY_OPTIONS = ['Every Visit', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Bi-Annually', 'Annually', 'As Required'];

const AddEditInspectionPointCategoryTemplate = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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

  const selectedPests = formData.applicablePestTypes
    ? formData.applicablePestTypes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const togglePest = (pest) => {
    const updated = selectedPests.includes(pest) ? selectedPests.filter((p) => p !== pest) : [...selectedPests, pest];
    onUpdateFieldHandle('applicablePestTypes', updated.join(', '));
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '520px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Inspection Point Category' : 'Add Inspection Point Category'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Category Name <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Rodent Entry Points, Flying Insect Harbourage, Perimeter Drains'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Category Code + Sort Order */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Category Code</label>
                <input
                  name='code'
                  className='form-control'
                  placeholder='e.g. ROD, COCK, FLY'
                  maxLength={10}
                  value={formData.code || ''}
                  onChange={handleChange}
                />
                <div className='form-text'>Short identifier used in reports and forms.</div>
              </div>
              <div className='col-6'>
                <label className='form-label'>Sort Order</label>
                <input
                  name='sortOrder'
                  type='number'
                  className='form-control'
                  placeholder='e.g. 1, 2, 3...'
                  min={0}
                  value={formData.sortOrder || ''}
                  onChange={handleChange}
                />
                <div className='form-text'>Controls display order in lists and dropdowns.</div>
              </div>
            </div>

            {/* Description */}
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                rows={3}
                placeholder='Describe what this category covers and when it applies...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Inspection Type + Default Risk Level */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Inspection Type</label>
                <select name='inspectionType' className='form-select' value={formData.inspectionType || 'Both'} onChange={handleChange}>
                  {INSPECTION_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Default Risk Level</label>
                <select name='defaultRiskLevel' className='form-select' value={formData.defaultRiskLevel || 'Medium'} onChange={handleChange}>
                  {RISK_LEVELS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Default Inspection Frequency */}
            <div className='mb-3'>
              <label className='form-label'>Default Inspection Frequency</label>
              <select name='defaultFrequency' className='form-select' value={formData.defaultFrequency || 'Every Visit'} onChange={handleChange}>
                {FREQUENCY_OPTIONS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Applicable Pest Types */}
            <div className='mb-3'>
              <label className='form-label'>Applicable Pest Types</label>
              <div className='d-flex flex-wrap gap-2 mt-1'>
                {APPLICABLE_PEST_TYPES.map((pest) => (
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
              <div className='form-text'>Click to toggle pest types associated with this category.</div>
            </div>

            {/* Default Inspection Points */}
            <div className='mb-3'>
              <label className='form-label'>Default Inspection Points</label>
              <textarea
                name='defaultInspectionPoints'
                className='form-control'
                rows={4}
                placeholder={'e.g.\nDoor sweeps and base gaps\nAround pipe penetrations\nBehind wall-mounted equipment\nUnder pallets and racking'}
                value={formData.defaultInspectionPoints || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one inspection point per line. Pre-filled for technicians when this category is used.</div>
            </div>

            {/* Recommended Treatments */}
            <div className='mb-3'>
              <label className='form-label'>Recommended Treatments</label>
              <textarea
                name='recommendedTreatments'
                className='form-control'
                rows={3}
                placeholder='e.g. Bait station placement, crack & crevice spray, glue board monitoring'
                value={formData.recommendedTreatments || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one treatment per line.</div>
            </div>

            {/* Documentation Requirements */}
            <div className='mb-3'>
              <label className='form-label'>Documentation Requirements</label>
              <div className='d-flex flex-wrap gap-3 mt-1'>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='ipct-photo'
                    name='requiresPhoto'
                    checked={formData.requiresPhoto === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='ipct-photo'>
                    Photo Required
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='ipct-signature'
                    name='requiresSignature'
                    checked={formData.requiresSignature === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='ipct-signature'>
                    Signature Required
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='ipct-written-report'
                    name='requiresWrittenReport'
                    checked={formData.requiresWrittenReport === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='ipct-written-report'>
                    Written Report
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='ipct-measurement'
                    name='requiresMeasurement'
                    checked={formData.requiresMeasurement === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='ipct-measurement'>
                    Measurement / Count
                  </label>
                </div>
              </div>
            </div>

            {/* Technical Notes / Guidance */}
            <div className='mb-3'>
              <label className='form-label'>Technical Guidance</label>
              <textarea
                name='technicalGuidance'
                className='form-control'
                rows={3}
                placeholder='e.g. Check for gnaw marks, droppings, grease trails, and nesting material. Use UV torch in low-light areas.'
                value={formData.technicalGuidance || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Shown to technicians as guidance notes when conducting inspections in this category.</div>
            </div>

            {/* Internal Notes */}
            <div className='mb-3'>
              <label className='form-label'>Internal Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Internal usage notes visible only to staff...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Active */}
            <div className='mb-3'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='ipct-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='ipct-active'>
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

export default AddEditInspectionPointCategoryTemplate;
