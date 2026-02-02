import { useState, useCallback } from 'react';

const getInitialState = () => ({
  policyName: '',
  description: '',
  rules: '',
  active: true,
});

export const useAddEditUsagePolicy = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(getInitialState());

  const open = useCallback((item = null) => {
    setFormData(item ? { ...getInitialState(), ...item } : getInitialState());
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    if (isSaving) return;
    setIsOpen(false);
    setFormData(getInitialState());
  }, [isSaving]);

  const onUpdateFieldHandle = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onSaveHandle = useCallback(async () => {
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
    close();
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
