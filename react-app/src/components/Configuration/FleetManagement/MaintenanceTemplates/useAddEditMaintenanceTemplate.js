import { useState, useCallback } from 'react';

export const useAddEditMaintenanceTemplate = (onSaveSuccess) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  const open = useCallback((data = null) => {
    setFormData(data || { name: '', description: '', frequencyValue: '', frequencyUnit: 'Days', tasks: '', active: true });
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
      await onSaveSuccess(formData);
      close();
    } catch (error) {
      console.error('Failed to save maintenance template', error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, onSaveSuccess, close]);

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
