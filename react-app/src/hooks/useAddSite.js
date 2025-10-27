import { useState } from 'react';

const useAddSite = (accountId) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountId: accountId,
    siteName: '',
    siteType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = () => {
    setFormData({
      accountId: accountId,
      siteName: '',
      siteType: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      isActive: true
    });
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setFormData({});
    setErrors({});
  };

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.siteName?.trim()) {
      newErrors.siteName = 'Site name is required';
    }

    if (!formData.siteType?.trim()) {
      newErrors.siteType = 'Site type is required';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.contactName?.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.contactPhone?.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async (onSaveCallback) => {
    if (!validate()) {
      return false;
    }

    setIsSaving(true);
    try {
      if (onSaveCallback) {
        await onSaveCallback(formData);
      }
      close();
      return true;
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to save site' });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isOpen,
    formData,
    errors,
    isSaving,
    open,
    close,
    updateField,
    save
  };
};

export default useAddSite;
