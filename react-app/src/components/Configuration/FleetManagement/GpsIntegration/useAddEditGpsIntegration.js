import { useState, useCallback } from 'react';

export const useAddEditGpsIntegration = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const open = useCallback((data = null) => {
    setFormData(
      data || {
        providerName: '',
        apiKey: '',
        apiEndpoint: '',
        syncFrequency: '15',
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
      console.error('Failed to save integration', error);
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
