import { useState, useCallback } from 'react';

const defaultState = {
  distributionName: '',
  reportType: 'Inspection Report',
  deliveryChannel: 'Email',
  recipientType: 'Customer',
  recipientEmails: '',
  schedule: 'Immediately After Service',
  scheduleValue: 1,
  scheduleUnit: 'Days',
  fileFormat: 'PDF',
  includePhotos: true,
  includeTechnicianSignature: true,
  includeCustomerSignature: false,
  subject: '',
  message: '',
  active: true,
};

export const useAddEditReportDistribution = (onSaveCallback) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  const open = useCallback((data = null) => {
    setFormData(data ? { ...data } : { ...defaultState });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setFormData(null);
  }, []);

  const onUpdateFieldHandle = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onSaveHandle = useCallback(async () => {
    if (!formData || isSaving) return;
    setIsSaving(true);
    try {
      await onSaveCallback(formData);
      close();
    } catch (error) {
      console.error('Failed to save report distribution:', error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, isSaving, onSaveCallback, close]);

  return {
    isOpen,
    isSaving,
    formData,
    open,
    close,
    onUpdateFieldHandle,
    onSaveHandle,
  };
};
