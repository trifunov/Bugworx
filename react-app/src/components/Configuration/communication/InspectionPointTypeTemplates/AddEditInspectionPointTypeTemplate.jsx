import React from 'react';

const INSPECTION_METHODS = ['Visual', 'Touch / Probe', 'Device / Sensor', 'Trap', 'Sample Collection', 'Camera / Photo Only'];

const RESULT_TYPES = ['Pass / Fail', 'Severity Level', 'Count', 'Score (0–10)', 'Measurement', 'Notes Only'];

const SEVERITY_OPTIONS = ['None', 'Low', 'Medium', 'High', 'Critical'];

const ENVIRONMENT_OPTIONS = ['Indoor', 'Outdoor', 'Both'];

const FREQUENCY_OPTIONS = ['Every Visit', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Bi-Annually', 'Annually', 'As Required'];

const MEASUREMENT_UNITS = ['pcs', 'mg', 'g', 'kg', 'cm', 'm', 'mm', '%', 'drops', 'count'];

const AddEditInspectionPointTypeTemplate = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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

  const showMeasurementUnit = formData.resultType === 'Measurement' || formData.requiresMeasurement === true;

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '520px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Inspection Point Type' : 'Add Inspection Point Type'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Type Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Type Name <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Rodent Entry Gap, Drain Cover, Glue Board Station'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Type Code + Sort Order */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Type Code</label>
                <input
                  name='code'
                  className='form-control'
                  placeholder='e.g. REG, DCO, GBS'
                  maxLength={10}
                  value={formData.code || ''}
                  onChange={handleChange}
                />
                <div className='form-text'>Short identifier used in reports.</div>
              </div>
              <div className='col-6'>
                <label className='form-label'>Sort Order</label>
                <input
                  name='sortOrder'
                  type='number'
                  className='form-control'
                  placeholder='e.g. 1, 2, 3…'
                  min={0}
                  value={formData.sortOrder || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Parent Category */}
            <div className='mb-3'>
              <label className='form-label'>Parent Category</label>
              <input
                name='parentCategory'
                className='form-control'
                placeholder='e.g. Rodent Entry Points, Flying Insect Harbourage'
                value={formData.parentCategory || ''}
                onChange={handleChange}
              />
              <div className='form-text'>The inspection point category this type belongs to.</div>
            </div>

            {/* Description */}
            <div className='mb-3'>
              <label className='form-label'>Description</label>
              <textarea
                name='description'
                className='form-control'
                rows={3}
                placeholder='Describe what this inspection point type covers and how it is typically identified...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Inspection Method + Result Type */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Inspection Method</label>
                <select name='inspectionMethod' className='form-select' value={formData.inspectionMethod || 'Visual'} onChange={handleChange}>
                  {INSPECTION_METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Result Type</label>
                <select name='resultType' className='form-select' value={formData.resultType || 'Pass / Fail'} onChange={handleChange}>
                  {RESULT_TYPES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <div className='form-text'>How technicians record findings for this type.</div>
              </div>
            </div>

            {/* Default Severity + Applicable Environment */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Default Severity</label>
                <select name='defaultSeverity' className='form-select' value={formData.defaultSeverity || 'None'} onChange={handleChange}>
                  {SEVERITY_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Applicable Environment</label>
                <select name='applicableEnvironment' className='form-select' value={formData.applicableEnvironment || 'Both'} onChange={handleChange}>
                  {ENVIRONMENT_OPTIONS.map((e) => (
                    <option key={e}>{e}</option>
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

            {/* Measurement Unit — shown when result type is Measurement or requiresMeasurement */}
            {showMeasurementUnit && (
              <div className='mb-3'>
                <label className='form-label'>Measurement Unit</label>
                <select name='measurementUnit' className='form-select' value={formData.measurementUnit || 'pcs'} onChange={handleChange}>
                  {MEASUREMENT_UNITS.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Standard Procedure / Protocol */}
            <div className='mb-3'>
              <label className='form-label'>Standard Inspection Procedure</label>
              <textarea
                name='standardProcedure'
                className='form-control'
                rows={4}
                placeholder={
                  'e.g.\n1. Identify all gaps at floor/wall junctions\n2. Check for gnaw marks and grease smears\n3. Record location and severity\n4. Place or check bait station if applicable'
                }
                value={formData.standardProcedure || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Step-by-step procedure shown to technicians when logging this type.</div>
            </div>

            {/* Pass/Fail Criteria */}
            <div className='mb-3'>
              <label className='form-label'>Pass / Fail Criteria</label>
              <textarea
                name='passFailCriteria'
                className='form-control'
                rows={2}
                placeholder='e.g. Pass: No active signs. Fail: Evidence of gnawing, droppings, or live pest activity.'
                value={formData.passFailCriteria || ''}
                onChange={handleChange}
              />
            </div>

            {/* Corrective Action Guidance */}
            <div className='mb-3'>
              <label className='form-label'>Corrective Action Guidance</label>
              <textarea
                name='correctiveAction'
                className='form-control'
                rows={2}
                placeholder='e.g. Seal gap with expanding foam, reposition bait station, log for follow-up treatment.'
                value={formData.correctiveAction || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Recommended steps when this inspection point fails or is flagged.</div>
            </div>

            {/* Technical Guidance */}
            <div className='mb-3'>
              <label className='form-label'>Technical Guidance</label>
              <textarea
                name='technicalGuidance'
                className='form-control'
                rows={2}
                placeholder='e.g. Use UV torch to identify urine trails. Check for smear marks along skirtings.'
                value={formData.technicalGuidance || ''}
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
                placeholder='Internal usage notes visible only to staff...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Documentation & Behaviour Flags */}
            <div className='mb-3'>
              <label className='form-label'>Flags</label>
              <div className='d-flex flex-wrap gap-3 mt-1'>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='iptt-photo'
                    name='requiresPhoto'
                    checked={formData.requiresPhoto === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='iptt-photo'>
                    Photo Required
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='iptt-signature'
                    name='requiresSignature'
                    checked={formData.requiresSignature === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='iptt-signature'>
                    Signature Required
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='iptt-measurement'
                    name='requiresMeasurement'
                    checked={formData.requiresMeasurement === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='iptt-measurement'>
                    Requires Measurement
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='iptt-followup'
                    name='triggerFollowUp'
                    checked={formData.triggerFollowUp === true}
                    onChange={handleChange}
                  />
                  <label className='form-check-label' htmlFor='iptt-followup'>
                    Triggers Follow-Up Job on Fail
                  </label>
                </div>
              </div>
            </div>

            {/* Active */}
            <div className='mb-3'>
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='iptt-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='iptt-active'>
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

export default AddEditInspectionPointTypeTemplate;
