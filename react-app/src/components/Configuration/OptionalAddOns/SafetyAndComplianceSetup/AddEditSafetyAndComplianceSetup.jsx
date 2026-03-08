import React from 'react';

const COMPLIANCE_TYPES = [
  'Chemical/Pesticide Safety',
  'PPE Requirements',
  'Site Safety',
  'Emergency Procedures',
  'Regulatory Compliance',
  'Environmental Safety',
  'Biological Hazard',
  'Other',
];

const HAZARD_CLASSIFICATIONS = ['None', 'Flammable', 'Toxic', 'Corrosive', 'Irritant', 'Environmental Hazard', 'Biohazard', 'Oxidizer', 'Explosive'];

const PPE_OPTIONS = [
  'Gloves',
  'Safety Goggles',
  'Respirator / Mask',
  'Chemical Suit',
  'Safety Boots',
  'Hard Hat',
  'Face Shield',
  'Hearing Protection',
];

const AddEditSafetyAndComplianceSetup = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
  if (!isOpen) return null;

  const isEditing = formData && formData.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdateFieldHandle(name, type === 'checkbox' ? checked : value);
  };

  const handlePpeChange = (ppe) => {
    const current = formData.ppeRequired || [];
    const updated = current.includes(ppe) ? current.filter((p) => p !== ppe) : [...current, ppe];
    onUpdateFieldHandle('ppeRequired', updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '520px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Safety & Compliance Entry' : 'Add New Safety & Compliance Entry'}</h5>
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
                placeholder='e.g. Rodent Bait Safety Protocol'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Compliance Type */}
            <div className='mb-3'>
              <label className='form-label'>Compliance Type</label>
              <select
                name='complianceType'
                className='form-select'
                value={formData.complianceType || 'Chemical/Pesticide Safety'}
                onChange={handleChange}
              >
                {COMPLIANCE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Hazard Code */}
            <div className='mb-3'>
              <label className='form-label'>Hazard Code(s)</label>
              <input
                name='hazardCode'
                className='form-control'
                placeholder='e.g. H301, H311, H331'
                value={formData.hazardCode || ''}
                onChange={handleChange}
              />
              <div className='form-text'>GHS / UN hazard statement codes, separated by commas.</div>
            </div>

            {/* Hazard Classification */}
            <div className='mb-3'>
              <label className='form-label'>Hazard Classification</label>
              <select name='hazardClassification' className='form-select' value={formData.hazardClassification || 'None'} onChange={handleChange}>
                {HAZARD_CLASSIFICATIONS.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </div>

            {/* MSDS / SDS Link */}
            <div className='mb-3'>
              <label className='form-label'>MSDS / SDS Link</label>
              <input
                name='msdsLink'
                type='url'
                className='form-control'
                placeholder='https://example.com/msds/product-name.pdf'
                value={formData.msdsLink || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Link to the Material Safety Data Sheet or Safety Data Sheet.</div>
            </div>

            {/* Applicable Materials / Products */}
            <div className='mb-3'>
              <label className='form-label'>Applicable Materials / Products</label>
              <textarea
                name='applicableMaterials'
                className='form-control'
                rows={3}
                placeholder='e.g. Contrac Blox, Bromadiolone 0.005%, Rodenticide Bait'
                value={formData.applicableMaterials || ''}
                onChange={handleChange}
              />
              <div className='form-text'>List the chemical products or equipment this entry applies to.</div>
            </div>

            {/* PPE Required */}
            <div className='mb-3'>
              <label className='form-label'>PPE Required</label>
              <div className='row'>
                {PPE_OPTIONS.map((ppe) => (
                  <div className='col-6' key={ppe}>
                    <div className='form-check mb-2'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        id={`ppe-${ppe}`}
                        checked={(formData.ppeRequired || []).includes(ppe)}
                        onChange={() => handlePpeChange(ppe)}
                      />
                      <label className='form-check-label' htmlFor={`ppe-${ppe}`}>
                        {ppe}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Instructions */}
            <div className='mb-3'>
              <label className='form-label'>Safety Instructions</label>
              <textarea
                name='safetyInstructions'
                className='form-control'
                rows={4}
                placeholder='e.g. Keep away from children and pets. Do not contaminate water sources. Use in well-ventilated areas only...'
                value={formData.safetyInstructions || ''}
                onChange={handleChange}
              />
            </div>

            {/* First Aid Instructions */}
            <div className='mb-3'>
              <label className='form-label'>First Aid Instructions</label>
              <textarea
                name='firstAidInstructions'
                className='form-control'
                rows={4}
                placeholder='e.g. If inhaled: move to fresh air. If on skin: wash thoroughly with soap and water. If in eyes: rinse with water for 15 minutes...'
                value={formData.firstAidInstructions || ''}
                onChange={handleChange}
              />
            </div>

            {/* Emergency Contact */}
            <div className='mb-3'>
              <label className='form-label'>Emergency Contact</label>
              <input
                name='emergencyContact'
                className='form-control'
                placeholder='e.g. Poison Control: 1-800-222-1222'
                value={formData.emergencyContact || ''}
                onChange={handleChange}
              />
            </div>

            {/* Regulatory Reference */}
            <div className='mb-3'>
              <label className='form-label'>Regulatory Reference</label>
              <input
                name='regulatoryReference'
                className='form-control'
                placeholder='e.g. EPA Reg. No. 432-1234 | OSHA 1910.1200 | CFR 40 Part 156'
                value={formData.regulatoryReference || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Applicable EPA, OSHA, or other regulatory references.</div>
            </div>

            {/* Review Date */}
            <div className='mb-3'>
              <label className='form-label'>Next Review Date</label>
              <input name='reviewDate' type='date' className='form-control' value={formData.reviewDate || ''} onChange={handleChange} />
            </div>

            {/* Internal Notes */}
            <div className='mb-3'>
              <label className='form-label'>Internal Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Additional internal notes or instructions for technicians...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Active */}
            <div className='mb-4'>
              <div className='form-check form-switch'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='scs-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='scs-active'>
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

export default AddEditSafetyAndComplianceSetup;
