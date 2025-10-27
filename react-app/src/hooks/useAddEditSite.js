import { useState } from 'react';
import { save, updateField } from '../utils/addEditFormUtils';

const useAddEditSite = (accountId) => {
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

  const open = (site) => {
    setFormData({
      id: site?.id || 0,
      accountId: accountId,
      siteName: site?.siteName || '',
      siteType: site?.siteType || '',
      address: site?.address || '',
      city: site?.city || '',
      state: site?.state || '',
      zip: site?.zip || '',
      contactName: site?.contactName || '',
      contactPhone: site?.contactPhone || '',
      contactEmail: site?.contactEmail || '',
      isActive: site?.isActive ?? true
    });
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setFormData({});
    setErrors({});
  };

  const onUpdateFieldHandle = (field, value) => {
    updateField(field, value, setFormData, errors, setErrors);
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

  const onSaveHandle = async (onSaveCallback) => {
    save(formData, onSaveCallback, setIsSaving, close, setErrors, validate);
  };

  return {
    isOpen,
    formData,
    errors,
    isSaving,
    open,
    close,
    onUpdateFieldHandle,
    onSaveHandle
  };
};

export default useAddEditSite;
