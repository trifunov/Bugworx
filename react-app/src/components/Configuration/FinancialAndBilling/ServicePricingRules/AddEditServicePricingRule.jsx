import React from 'react';

const AddEditServicePricingRule = ({ isOpen, formData: initialFormData, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
  const formData = initialFormData || {};

  if (!isOpen) return null;

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdateFieldHandle(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex='-1'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{formData?.id ? 'Edit Service Pricing Rule' : 'Add New Service Pricing Rule'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving}></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-12 mb-3'>
                <label htmlFor='ruleName' className='form-label'>
                  Rule Name
                </label>
                <input
                  id='ruleName'
                  name='ruleName'
                  className='form-control'
                  placeholder='e.g., Commercial Quarterly Pest Control'
                  value={formData.ruleName || ''}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div className='col-md-12 mb-3'>
                <label htmlFor='serviceType' className='form-label'>
                  Service Type
                </label>
                <select id='serviceType' name='serviceType' className='form-select' value={formData.serviceType || ''} onChange={handleFieldChange}>
                  <option value=''>Select Service Type...</option>
                  <option value='General Pest Control'>General Pest Control</option>
                  <option value='Termite Treatment'>Termite Treatment</option>
                  <option value='Rodent Control'>Rodent Control</option>
                  <option value='Bed Bug Treatment'>Bed Bug Treatment</option>
                </select>
              </div>
              <div className='col-md-12 mb-3'>
                <label htmlFor='pestType' className='form-label'>
                  Pest Type (Optional)
                </label>
                <select id='pestType' name='pestType' className='form-select' value={formData.pestType || ''} onChange={handleFieldChange}>
                  <option value=''>Any</option>
                  <option value='Ants'>Ants</option>
                  <option value='Cockroaches'>Cockroaches</option>
                  <option value='Spiders'>Spiders</option>
                  <option value='Rodents'>Rodents</option>
                </select>
              </div>
              <div className='col-md-12 mb-3'>
                <label htmlFor='clientTier' className='form-label'>
                  Client Tier (Optional)
                </label>
                <select id='clientTier' name='clientTier' className='form-select' value={formData.clientTier || ''} onChange={handleFieldChange}>
                  <option value=''>Any</option>
                  <option value='Residential'>Residential</option>
                  <option value='Commercial'>Commercial</option>
                  <option value='VIP'>VIP</option>
                </select>
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='pricingMethod' className='form-label'>
                  Pricing Method
                </label>
                <select
                  id='pricingMethod'
                  name='pricingMethod'
                  className='form-select'
                  value={formData.pricingMethod || 'Flat Rate'}
                  onChange={handleFieldChange}
                >
                  <option>Flat Rate</option>
                  <option>Per Unit</option>
                  <option>Per Hour</option>
                </select>
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='price' className='form-label'>
                  Price
                </label>
                <input
                  id='price'
                  name='price'
                  type='number'
                  className='form-control'
                  placeholder='0.00'
                  value={formData.price || 0}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              {formData.pricingMethod === 'Per Unit' && (
                <div className='col-md-12 mb-3'>
                  <label htmlFor='unitLabel' className='form-label'>
                    Unit Label
                  </label>
                  <input
                    id='unitLabel'
                    name='unitLabel'
                    className='form-control'
                    placeholder='e.g., per sq ft, per device'
                    value={formData.unitLabel || ''}
                    onChange={handleFieldChange}
                  />
                </div>
              )}
              <div className='col-md-12 mb-3'>
                <div className='form-check form-switch'>
                  <input
                    id='active'
                    name='active'
                    type='checkbox'
                    className='form-check-input'
                    checked={formData.active || false}
                    onChange={handleFieldChange}
                  />
                  <label className='form-check-label' htmlFor='active'>
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end gap-2 mt-3'>
              <button type='button' className='btn btn-secondary' onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary' disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Rule'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`offcanvas-backdrop fade show`} onClick={isSaving ? undefined : onClose}></div>
    </>
  );
};

export default AddEditServicePricingRule;
