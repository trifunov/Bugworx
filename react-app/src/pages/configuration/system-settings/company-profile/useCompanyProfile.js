import { useState, useEffect } from 'react';
import * as ls from '../../../../utils/localStorage'
import { useAudit } from '../../../../contexts/AuditContext'

export const useCompanyProfile = () => {
    const { pushAudit } = useAudit();
    const [companyProfile, setCompanyProfile] = useState({
        name: '',
        regNumber: '',
        address: '',
        phone: '',
        email: '',
        logo: ''
    });

    useEffect(() => {
        const cp = ls.getFromStorage('companyProfile', null);
        if (cp) setCompanyProfile(cp);
    }, []);

    const handleCompanyChange = (field, value) => {
        setCompanyProfile(prev => ({ ...prev, [field]: value }));
    };

    const saveCompanyProfile = () => {
        ls.setToStorage('companyProfile', companyProfile);
        pushAudit('admin', 'Update', 'CompanyProfile', 'Saved company profile');
        alert('Company profile saved to local storage.');
    };

    const handleLogoUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const dataUrl = e.target.result;
            const next = { ...companyProfile, logo: dataUrl };
            setCompanyProfile(next);
            ls.setToStorage('companyProfile', next);
            pushAudit('admin', 'Upload', 'CompanyLogo', file.name);
        };
        reader.readAsDataURL(file);
    };

    return { companyProfile, handleCompanyChange, saveCompanyProfile, handleLogoUpload };
};