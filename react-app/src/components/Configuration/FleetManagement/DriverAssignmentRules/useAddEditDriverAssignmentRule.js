import { useState, useCallback } from 'react';

export const useAddEditDriverAssignmentRule = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const open = useCallback((data = null) => {
    setFormData(
      data || {
        ruleName: '',
        technicianCertification: '',
        vehicleType: '',
        serviceZone: '',
        priority: 10,
        active: true,
      }
    );
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    if (isSaving) return;
    setIsOpen(false);
    setFormData(null);
  }, [isSaving]);

  const onUpdateFieldHandle = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onSaveHandle = useCallback(async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      onSave(formData);
      close();
    } catch (error) {
      console.error('Failed to save rule', error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, onSave, close]);

  return {
    isOpen,
    formData,
    isSaving,
    open,
    close,
    onUpdateFieldHandle,
    onSaveHandle,
  };
};
