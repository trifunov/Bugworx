import { useState, useEffect } from 'react';
import { getCompanyProfile, saveCompanyProfile } from '../../../../utils/localStorage';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

export const useCompanyProfile = () => {
    const { setPageSubHeader } = usePageSubHeader();
    const [companyProfile, setCompanyProfile] = useState({
        name: '',
        regNumber: '',
        address: '',
        phone: '',
        email: '',
        logo: ''
    });

    useEffect(() => {
        const cp = getCompanyProfile();
        if (cp) setCompanyProfile(cp);
        setPageSubHeader({
            title: "Company Profile",
            breadcrumbs: [
                { label: "Configuration", path: "/configuration/general" },
                { label: "System Settings", path: "/configuration/general" },
                { label: "Company Profile", isActive: true }
            ]
        });
    }, [setPageSubHeader]);

    const handleCompanyChange = (field, value) => {
        setCompanyProfile(prev => ({ ...prev, [field]: value }));
    };

    const saveProfile = () => {
        saveCompanyProfile(companyProfile);
        alert('Company profile saved to local storage.');
    };

    const handleLogoUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const dataUrl = e.target.result;
            const next = { ...companyProfile, logo: dataUrl };
            setCompanyProfile(next);
            saveCompanyProfile(next);
        };
        reader.readAsDataURL(file);
    };

    return { companyProfile, handleCompanyChange, saveCompanyProfile: saveProfile, handleLogoUpload };
};