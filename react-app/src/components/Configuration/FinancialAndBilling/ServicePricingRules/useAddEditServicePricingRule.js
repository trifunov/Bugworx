import { useState, useCallback } from 'react';

const defaultState = {
  ruleName: '',
  serviceType: '',
  pestType: '',
  clientTier: '',
  pricingMethod: 'Flat Rate',
  price: 0,
  unitLabel: '',
  active: true,
};

export const useAddEditServicePricingRule = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  const open = (initialData = defaultState) => {
    setFormData(initialData);
    setIsOpen(true);
  };

  const close = useCallback(() => {
    setIsOpen(false);
    setFormData(null);
  }, []);

  const onUpdateFieldHandle = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onSaveHandle = useCallback(async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      await onSave(formData);
      close();
    } catch (error) {
      console.error('Failed to save service pricing rule:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsSaving(false);
    }
  }, [formData, onSave, close]);

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
