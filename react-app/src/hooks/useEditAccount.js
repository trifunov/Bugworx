import { useState } from 'react';

const useEditAccount = (account) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(account || {});
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = () => {
    setFormData(account);
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

    if (!formData.name?.trim()) {
      newErrors.name = 'Account name is required';
    }

    if (!formData.billingContact?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.billingContact.email)) {
      newErrors.email = 'Email is invalid';
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
      setErrors({ submit: error.message || 'Failed to save account' });
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

export default useEditAccount;
