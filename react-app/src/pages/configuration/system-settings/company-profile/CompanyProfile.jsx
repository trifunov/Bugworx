import React, { useEffect, useRef } from 'react';
import { useCompanyProfile } from './useCompanyProfile';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const CompanyProfile = () => {
  const { companyProfile, isSaving, handleCompanyChange, saveCompanyProfile, handleLogoUpload } = useCompanyProfile();
  const { setPageSubHeader } = usePageSubHeader();
  const logoInputRef = useRef(null);

  useEffect(() => {
    setPageSubHeader({
      title: 'Company Profile',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'System Settings', path: '/configuration/system-settings' },
        { label: 'Company Profile', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCompanyProfile();
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='mb-3'>
                <label className='form-label'>Company Name</label>
                <input
                  value={companyProfile.name}
                  onChange={(e) => handleCompanyChange('name', e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Enter company name'
                  disabled={isSaving}
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Registration Number</label>
                <input
                  value={companyProfile.regNumber}
                  onChange={(e) => handleCompanyChange('regNumber', e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Registration number'
                  disabled={isSaving}
                />
              </div>
              <h6 className='mt-4'>Contact Info</h6>
              <div className='mb-3'>
                <label className='form-label'>Address</label>
                <input
                  value={companyProfile.address}
                  onChange={(e) => handleCompanyChange('address', e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Address'
                  disabled={isSaving}
                />
              </div>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    value={companyProfile.phone}
                    onChange={(e) => handleCompanyChange('phone', e.target.value)}
                    type='text'
                    className='form-control'
                    placeholder='+1 (555) 555-5555'
                    disabled={isSaving}
                  />
                </div>
                <div className='col-md-6 mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    value={companyProfile.email}
                    onChange={(e) => handleCompanyChange('email', e.target.value)}
                    type='email'
                    className='form-control'
                    placeholder='contact@company.com'
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='text-center border rounded p-3 p-md-4'>
                <h6 className='mb-3'>Company Logo</h6>
                <div className='mb-3'>
                  <img
                    src={companyProfile.logo || '/assets/images/placeholder-logo.png'}
                    alt='logo'
                    className='img-fluid mb-3'
                    style={{ maxHeight: '100px' }}
                  />
                  <div>
                    <input
                      ref={logoInputRef}
                      onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                      type='file'
                      className='d-none'
                      accept='image/*'
                      disabled={isSaving}
                    />
                    <button type='button' className='btn btn-light w-100' onClick={() => logoInputRef.current?.click()} disabled={isSaving}>
                      <i className='mdi mdi-upload me-1'></i> Change Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className='row'>
            <div className='col-12 text-end'>
              <button type='submit' className='btn btn-primary' disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
