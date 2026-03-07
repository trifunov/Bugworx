import { useState, useCallback } from 'react';

const defaultState = {
  templateName: '',
  channel: 'Email',
  triggerEvent: 'Appointment Reminder',
  subject: '',
  body: '',
  recipientType: 'Customer',
  sendTimingValue: 1,
  sendTimingUnit: 'Days',
  sendTimingDirection: 'Before',
  active: true,
};

export const useAddEditEmailAndSMSTemplates = (onSaveCallback) => {
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
      console.error('Failed to save email/SMS template:', error);
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
