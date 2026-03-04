import React from 'react';

const FACILITY_TYPES = ['Commercial', 'Residential', 'Industrial', 'Government / Municipal', 'Healthcare', 'Educational', 'Hospitality', 'Other'];

const INDUSTRY_CATEGORIES = [
  'Food & Beverage',
  'Warehouse / Storage',
  'Retail',
  'Office / Corporate',
  'Healthcare / Medical',
  'Hospitality / Hotel',
  'Restaurant / Kitchen',
  'School / Educational',
  'Government / Public',
  'Industrial / Manufacturing',
  'Residential Multi-Unit',
  'Residential Single-Family',
  'Agricultural',
  'Other',
];

const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];

const INSPECTION_FREQUENCIES = ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual', 'On Demand'];

const DEFAULT_PEST_TARGETS = ['Rodents', 'Cockroaches', 'Ants', 'Termites', 'Bed Bugs', 'Flying Insects', 'Stored Product Pests', 'Wildlife'];

const AddEditFacilityTemplate = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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

  // Multi-select pest targets stored as comma-separated string
  const selectedPests = formData.defaultPestTargets ? formData.defaultPestTargets.split(',').map((s) => s.trim()) : [];

  const togglePest = (pest) => {
    const updated = selectedPests.includes(pest) ? selectedPests.filter((p) => p !== pest) : [...selectedPests, pest];
    onUpdateFieldHandle('defaultPestTargets', updated.join(', '));
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '520px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Facility Template' : 'Add Facility Template'}</h5>
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
                placeholder='e.g. Commercial Restaurant — High Risk'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Facility Type + Industry Category — side by side */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Facility Type</label>
                <select name='facilityType' className='form-select' value={formData.facilityType || 'Commercial'} onChange={handleChange}>
                  {FACILITY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Industry Category</label>
                <select
                  name='industryCategory'
                  className='form-select'
                  value={formData.industryCategory || 'Food & Beverage'}
                  onChange={handleChange}
                >
                  {INDUSTRY_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
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
                placeholder='Describe the typical facility profile this template covers...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Risk Level + Inspection Frequency — side by side */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Default Risk Level</label>
                <select name='riskLevel' className='form-select' value={formData.riskLevel || 'Medium'} onChange={handleChange}>
                  {RISK_LEVELS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label className='form-label'>Default Inspection Frequency</label>
                <select name='inspectionFrequency' className='form-select' value={formData.inspectionFrequency || 'Monthly'} onChange={handleChange}>
                  {INSPECTION_FREQUENCIES.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Default Pest Targets */}
            <div className='mb-3'>
              <label className='form-label'>Default Pest Targets</label>
              <div className='d-flex flex-wrap gap-2 mt-1'>
                {DEFAULT_PEST_TARGETS.map((pest) => (
                  <div
                    key={pest}
                    className={`badge font-size-12 cursor-pointer ${selectedPests.includes(pest) ? 'badge-soft-primary' : 'badge-soft-secondary'}`}
                    style={{ cursor: 'pointer', padding: '6px 10px' }}
                    onClick={() => togglePest(pest)}
                  >
                    {selectedPests.includes(pest) && <i className='ri-check-line me-1' />}
                    {pest}
                  </div>
                ))}
              </div>
              <div className='form-text'>Click to toggle which pest types are typically addressed at this facility type.</div>
            </div>

            {/* Default Inspection Areas / Zones */}
            <div className='mb-3'>
              <label className='form-label'>Default Inspection Areas / Zones</label>
              <textarea
                name='defaultInspectionAreas'
                className='form-control'
                rows={4}
                placeholder={'e.g.\nKitchen / Food Prep\nStorage Room\nLoading Dock\nDining Area\nRestrooms\nPerimeter'}
                value={formData.defaultInspectionAreas || ''}
                onChange={handleChange}
              />
              <div className='form-text'>
                Enter one area per line. These will be pre-populated when technicians create inspections for this facility type.
              </div>
            </div>

            {/* Default Service Types */}
            <div className='mb-3'>
              <label className='form-label'>Default Service Types</label>
              <textarea
                name='defaultServiceTypes'
                className='form-control'
                rows={3}
                placeholder='e.g. Baiting, Trapping, Crack & Crevice Treatment, Exterior Perimeter Spray'
                value={formData.defaultServiceTypes || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one service type per line.</div>
            </div>

            {/* Regulatory / Compliance Notes */}
            <div className='mb-3'>
              <label className='form-label'>Regulatory / Compliance Notes</label>
              <textarea
                name='regulatoryNotes'
                className='form-control'
                rows={3}
                placeholder='e.g. Must comply with local health department requirements. Log all treatments. Avoid certain chemicals near food preparation areas.'
                value={formData.regulatoryNotes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Special Instructions for Technicians */}
            <div className='mb-3'>
              <label className='form-label'>Special Instructions for Technicians</label>
              <textarea
                name='technicianInstructions'
                className='form-control'
                rows={3}
                placeholder='e.g. Always wear PPE in food production areas. Notify site manager before commencing treatment...'
                value={formData.technicianInstructions || ''}
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
                  id='ft-regulatory-cert'
                  name='requiresRegulatoryCertificate'
                  checked={formData.requiresRegulatoryCertificate === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='ft-regulatory-cert'>
                  Requires Regulatory / Pesticide Use Certificate
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='ft-floor-plan'
                  name='requiresFloorPlan'
                  checked={formData.requiresFloorPlan === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='ft-floor-plan'>
                  Requires Floor Plan / Site Map
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='ft-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='ft-active'>
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

export default AddEditFacilityTemplate;
