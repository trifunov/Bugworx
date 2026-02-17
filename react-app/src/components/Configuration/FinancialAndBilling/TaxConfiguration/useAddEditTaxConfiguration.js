import { useState, useCallback } from 'react';

export const useAddEditTaxConfiguration = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  const open = useCallback((initialData = null) => {
    setFormData(initialData);
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
    if (isSaving) return;
    setIsSaving(true);
    try {
      await onSave(formData);
      close();
    } catch (error) {
      console.error('Failed to save:', error);
      // Optionally, handle save errors (e.g., show a notification)
    } finally {
      setIsSaving(false);
    }
  }, [formData, isSaving, onSave, close]);

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
