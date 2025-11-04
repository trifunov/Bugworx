import React from 'react';
import { useCompanyProfile } from './useCompanyProfile';

const CompanyProfile = () => {
    const { companyProfile, handleCompanyChange, saveCompanyProfile, handleLogoUpload } = useCompanyProfile();

    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={e => { e.preventDefault(); saveCompanyProfile(); }}>
                            <div className="mb-3">
                                <label className="form-label">Company Name</label>
                                <input value={companyProfile.name} onChange={e => handleCompanyChange('name', e.target.value)} type="text" className="form-control" placeholder="Enter company name" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Registration Number</label>
                                <input value={companyProfile.regNumber} onChange={e => handleCompanyChange('regNumber', e.target.value)} type="text" className="form-control" placeholder="Registration number" />
                            </div>
                            <h6 className="mt-3">Contact Info</h6>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input value={companyProfile.address} onChange={e => handleCompanyChange('address', e.target.value)} type="text" className="form-control" placeholder="Address" />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Phone</label>
                                    <input value={companyProfile.phone} onChange={e => handleCompanyChange('phone', e.target.value)} type="text" className="form-control" placeholder="+1 (555) 555-5555" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Email</label>
                                    <input value={companyProfile.email} onChange={e => handleCompanyChange('email', e.target.value)} type="email" className="form-control" placeholder="contact@company.com" />
                                </div>
                            </div>
                            <button type="button" onClick={saveCompanyProfile} className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body text-center">
                        <h5 className="card-title">Company Logo</h5>
                        <div className="mb-3">
                            <img src={companyProfile.logo || "/assets/images/placeholder-logo.png"} alt="logo" className="img-fluid mb-2" style={{ maxHeight: '120px' }} />
                            <div>
                                <input onChange={e => handleLogoUpload(e.target.files?.[0])} type="file" className="form-control" />
                            </div>
                        </div>
                        <button type="button" onClick={saveCompanyProfile} className="btn btn-secondary">Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;