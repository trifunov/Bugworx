import { useState, useEffect } from 'react';
import { getCompanyProfile, saveCompanyProfile as saveProfileToStorage } from '../../../../utils/localStorage';

export const useCompanyProfile = () => {
  const defaultProfile = { name: '', regNumber: '', address: '', phone: '', email: '', logo: '' };
  const [companyProfile, setCompanyProfile] = useState(defaultProfile);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadedProfile = getCompanyProfile();
    if (loadedProfile) {
      setCompanyProfile({ ...defaultProfile, ...loadedProfile });
    }
  }, []);

  const handleCompanyChange = (field, value) => {
    setCompanyProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCompanyProfile((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveCompanyProfile = async () => {
    setIsSaving(true);
    try {
      // Simulate async save
      await new Promise((resolve) => setTimeout(resolve, 500));
      saveProfileToStorage(companyProfile);
      alert('Company profile saved successfully!');
    } catch (error) {
      console.error('Failed to save company profile:', error);
      alert('Failed to save company profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    companyProfile,
    isSaving,
    handleCompanyChange,
    saveCompanyProfile,
    handleLogoUpload,
  };
};
