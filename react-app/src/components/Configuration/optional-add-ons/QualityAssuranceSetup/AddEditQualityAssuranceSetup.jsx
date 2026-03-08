import React from 'react';

const CHECK_TYPES = [
  'Inspection Scoring',
  'Service Quality Audit',
  'Technician Performance Review',
  'Customer Satisfaction Check',
  'Chemical Application Accuracy',
  'Route Compliance Check',
  'Documentation Review',
  'Equipment Condition Check',
];

const SCORING_METHODS = ['Percentage', 'Points-Based', 'Pass / Fail', 'Star Rating (1–5)', 'Weighted Criteria'];

const FREQUENCIES = ['Per Visit', 'Weekly', 'Monthly', 'Quarterly', 'Annually', 'Random Sampling', 'On Complaint'];

const REVIEW_ACTIONS = [
  'No Action',
  'Notify Supervisor',
  'Require Re-training',
  'Schedule Re-inspection',
  'Escalate to Manager',
  'Document & Archive',
];

const CRITERIA_CATEGORIES = [
  'Pest Activity Control',
  'Service Documentation',
  'Customer Communication',
  'PPE Compliance',
  'Chemical Handling',
  'Equipment Condition',
  'Timeliness',
  'Route Adherence',
];

const AddEditQualityAssuranceSetup = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
  if (!isOpen) return null;

  const isEditing = formData && formData.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdateFieldHandle(name, type === 'checkbox' ? checked : value);
  };

  const handleCriteriaChange = (category) => {
    const current = formData.criteriaCategories || [];
    const updated = current.includes(category) ? current.filter((c) => c !== category) : [...current, category];
    onUpdateFieldHandle('criteriaCategories', updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '520px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Quality Assurance Entry' : 'Add New Quality Assurance Entry'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Entry Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Entry Name <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Monthly Technician Inspection Audit'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Check Type */}
            <div className='mb-3'>
              <label className='form-label'>Check Type</label>
              <select name='checkType' className='form-select' value={formData.checkType || 'Inspection Scoring'} onChange={handleChange}>
                {CHECK_TYPES.map((t) => (
                  <option key={t}>{t}</option>
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
                placeholder='Brief description of what this QA check evaluates...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Scoring Method */}
            <div className='mb-3'>
              <label className='form-label'>Scoring Method</label>
              <select name='scoringMethod' className='form-select' value={formData.scoringMethod || 'Percentage'} onChange={handleChange}>
                {SCORING_METHODS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Pass Threshold */}
            <div className='mb-3'>
              <label className='form-label'>Pass Threshold</label>
              <div className='input-group'>
                <input
                  name='passThreshold'
                  type='number'
                  className='form-control'
                  min='0'
                  max='100'
                  placeholder='e.g. 80'
                  value={formData.passThreshold || ''}
                  onChange={handleChange}
                />
                <span className='input-group-text'>
                  {formData.scoringMethod === 'Points-Based' ? 'pts' : formData.scoringMethod === 'Star Rating (1–5)' ? '/ 5' : '%'}
                </span>
              </div>
              <div className='form-text'>Minimum score required to mark this check as passed.</div>
            </div>

            {/* Fail Threshold / Critical Fail */}
            <div className='mb-3'>
              <label className='form-label'>Critical Fail Threshold</label>
              <div className='input-group'>
                <input
                  name='criticalFailThreshold'
                  type='number'
                  className='form-control'
                  min='0'
                  max='100'
                  placeholder='e.g. 50'
                  value={formData.criticalFailThreshold || ''}
                  onChange={handleChange}
                />
                <span className='input-group-text'>
                  {formData.scoringMethod === 'Points-Based' ? 'pts' : formData.scoringMethod === 'Star Rating (1–5)' ? '/ 5' : '%'}
                </span>
              </div>
              <div className='form-text'>Score below this value triggers an immediate escalation action.</div>
            </div>

            {/* Criteria Categories */}
            <div className='mb-3'>
              <label className='form-label'>Criteria Categories</label>
              <div className='row'>
                {CRITERIA_CATEGORIES.map((cat) => (
                  <div className='col-6' key={cat}>
                    <div className='form-check mb-2'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id={`criteria-${cat}`}
                        checked={(formData.criteriaCategories || []).includes(cat)}
                        onChange={() => handleCriteriaChange(cat)}
                      />
                      <label className='form-check-label' htmlFor={`criteria-${cat}`}>
                        {cat}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspection Frequency */}
            <div className='mb-3'>
              <label className='form-label'>Inspection Frequency</label>
              <select name='frequency' className='form-select' value={formData.frequency || 'Monthly'} onChange={handleChange}>
                {FREQUENCIES.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Assigned Reviewer Role */}
            <div className='mb-3'>
              <label className='form-label'>Assigned Reviewer Role</label>
              <input
                name='reviewerRole'
                className='form-control'
                placeholder='e.g. QA Manager, Branch Supervisor'
                value={formData.reviewerRole || ''}
                onChange={handleChange}
              />
            </div>

            {/* On-Fail Action */}
            <div className='mb-3'>
              <label className='form-label'>On-Fail Action</label>
              <select name='onFailAction' className='form-select' value={formData.onFailAction || 'Notify Supervisor'} onChange={handleChange}>
                {REVIEW_ACTIONS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* On-Critical Fail Action */}
            <div className='mb-3'>
              <label className='form-label'>On-Critical Fail Action</label>
              <select
                name='onCriticalFailAction'
                className='form-select'
                value={formData.onCriticalFailAction || 'Escalate to Manager'}
                onChange={handleChange}
              >
                {REVIEW_ACTIONS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Scoring Criteria / Rubric */}
            <div className='mb-3'>
              <label className='form-label'>Scoring Criteria / Rubric</label>
              <textarea
                name='scoringRubric'
                className='form-control'
                rows={4}
                placeholder={`e.g.\n- Pest activity found: -20 pts\n- Missing documentation: -10 pts\n- PPE not worn: Immediate fail`}
                value={formData.scoringRubric || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Define deduction rules or criteria used to calculate the final score.</div>
            </div>

            {/* Corrective Action Instructions */}
            <div className='mb-3'>
              <label className='form-label'>Corrective Action Instructions</label>
              <textarea
                name='correctiveActionInstructions'
                className='form-control'
                rows={3}
                placeholder='Instructions to follow when a check fails or reaches critical fail threshold...'
                value={formData.correctiveActionInstructions || ''}
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
                placeholder='Internal notes for reviewers or administrators...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Switches */}
            <div className='mb-4'>
              <div className='form-check form-switch mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='qa-require-photo'
                  name='requirePhotoEvidence'
                  checked={formData.requirePhotoEvidence === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='qa-require-photo'>
                  Require Photo Evidence
                </label>
              </div>
              <div className='form-check form-switch mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='qa-notify-tech'
                  name='notifyTechnicianOnFail'
                  checked={formData.notifyTechnicianOnFail === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='qa-notify-tech'>
                  Notify Technician on Fail
                </label>
              </div>
              <div className='form-check form-switch mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='qa-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='qa-active'>
                  Active
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className='d-flex justify-content-end gap-2 border-top pt-3'>
              <button type='button' className='btn btn-light' onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary' disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className='spinner-border spinner-border-sm me-1' role='status' aria-hidden='true' />
                    Saving...
                  </>
                ) : isEditing ? (
                  'Save Changes'
                ) : (
                  'Add Entry'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='offcanvas-backdrop fade show' onClick={!isSaving ? onClose : undefined} />
    </>
  );
};

export default AddEditQualityAssuranceSetup;
