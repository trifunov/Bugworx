import { useState } from 'react';

const useScheduleService = (accountId) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountId: accountId,
    siteId: '',
    serviceType: '',
    scheduledDate: '',
    scheduledTime: '',
    estimatedDuration: 60,
    priority: 'Normal',
    technicianId: '',
    specialInstructions: '',
    status: 'Scheduled'
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = () => {
    setFormData({
      accountId: accountId,
      siteId: '',
      serviceType: '',
      scheduledDate: '',
      scheduledTime: '',
      estimatedDuration: 60,
      priority: 'Normal',
      technicianId: '',
      specialInstructions: '',
      status: 'Scheduled'
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

    if (!formData.siteId) {
      newErrors.siteId = 'Please select a site';
    }

    if (!formData.serviceType?.trim()) {
      newErrors.serviceType = 'Service type is required';
    }

    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Date is required';
    }

    if (!formData.scheduledTime) {
      newErrors.scheduledTime = 'Time is required';
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
      setErrors({ submit: error.message || 'Failed to schedule service' });
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

export default useScheduleService;
