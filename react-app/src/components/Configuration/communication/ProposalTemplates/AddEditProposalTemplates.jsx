import React from 'react';

const PROPOSAL_TYPES = ['Standard', 'Recurring', 'One-Time', 'Contract Renewal', 'Upsell / Add-on', 'Emergency'];
const PRICING_FORMATS = ['Per Service', 'Monthly', 'Quarterly', 'Annual', 'Fixed Price', 'Custom'];
const APPROVAL_WORKFLOWS = ['None', 'Manager Approval', 'Senior Manager Approval', 'Client Signature Required', 'Internal + Client Approval'];
const VALIDITY_OPTIONS = ['7 days', '14 days', '30 days', '60 days', '90 days', 'Custom'];

const AddEditProposalTemplates = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
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
      <div className='offcanvas offcanvas-end show' style={{ width: '480px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Proposal Template' : 'Add New Proposal Template'}</h5>
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
                placeholder='e.g. Residential Annual Pest Control Proposal'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Proposal Type */}
            <div className='mb-3'>
              <label className='form-label'>Proposal Type</label>
              <select name='proposalType' className='form-select' value={formData.proposalType || 'Standard'} onChange={handleChange}>
                {PROPOSAL_TYPES.map((t) => (
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
                placeholder='Brief description of this proposal template...'
                value={formData.description || ''}
                onChange={handleChange}
              />
            </div>

            {/* Predefined Text Blocks (Introduction) */}
            <div className='mb-3'>
              <label className='form-label'>Introduction / Opening Text</label>
              <textarea
                name='introductionText'
                className='form-control'
                rows={4}
                placeholder='e.g. Thank you for the opportunity to provide our pest control services. We are pleased to present the following proposal...'
                value={formData.introductionText || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Predefined opening text block shown at the top of the proposal.</div>
            </div>

            {/* Scope of Services */}
            <div className='mb-3'>
              <label className='form-label'>Scope of Services</label>
              <textarea
                name='scopeOfServices'
                className='form-control'
                rows={4}
                placeholder='Describe the services included, e.g.&#10;- Monthly inspection and treatment&#10;- Rodent exclusion&#10;- Bait station maintenance'
                value={formData.scopeOfServices || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Enter one scope item per line.</div>
            </div>

            {/* Standard Pricing Format */}
            <div className='mb-3'>
              <label className='form-label'>Standard Pricing Format</label>
              <select name='pricingFormat' className='form-select' value={formData.pricingFormat || 'Per Service'} onChange={handleChange}>
                {PRICING_FORMATS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Default Terms & Conditions */}
            <div className='mb-3'>
              <label className='form-label'>Default Terms & Conditions</label>
              <textarea
                name='termsAndConditions'
                className='form-control'
                rows={4}
                placeholder='e.g. Payment is due within 30 days of invoice. Services are subject to cancellation with 30 days written notice...'
                value={formData.termsAndConditions || ''}
                onChange={handleChange}
              />
            </div>

            {/* Default Disclaimers */}
            <div className='mb-3'>
              <label className='form-label'>Default Disclaimers</label>
              <textarea
                name='disclaimers'
                className='form-control'
                rows={3}
                placeholder='e.g. Results may vary depending on severity of infestation. Guarantee applies only when all recommended actions are followed...'
                value={formData.disclaimers || ''}
                onChange={handleChange}
              />
            </div>

            {/* Closing / Call to Action Text */}
            <div className='mb-3'>
              <label className='form-label'>Closing / Call to Action Text</label>
              <textarea
                name='closingText'
                className='form-control'
                rows={3}
                placeholder='e.g. We look forward to the opportunity to serve you. Please sign and return to proceed...'
                value={formData.closingText || ''}
                onChange={handleChange}
              />
            </div>

            {/* Proposal Validity */}
            <div className='mb-3'>
              <label className='form-label'>Proposal Validity</label>
              <select name='validityPeriod' className='form-select' value={formData.validityPeriod || '30 days'} onChange={handleChange}>
                {VALIDITY_OPTIONS.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Approval Workflow */}
            <div className='mb-3'>
              <label className='form-label'>Approval Workflow</label>
              <select name='approvalWorkflow' className='form-select' value={formData.approvalWorkflow || 'None'} onChange={handleChange}>
                {APPROVAL_WORKFLOWS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className='mb-3'>
              <label className='form-label'>Internal Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={2}
                placeholder='Internal notes or usage instructions for this template...'
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
                  id='pt-require-signature'
                  name='requireClientSignature'
                  checked={formData.requireClientSignature === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='pt-require-signature'>
                  Require Client Signature
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='pt-include-pricing'
                  name='includePricingBreakdown'
                  checked={formData.includePricingBreakdown !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='pt-include-pricing'>
                  Include Pricing Breakdown
                </label>
              </div>
              <div className='form-check mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='pt-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='pt-active'>
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

export default AddEditProposalTemplates;
