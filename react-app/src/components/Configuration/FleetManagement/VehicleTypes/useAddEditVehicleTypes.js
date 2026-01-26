import { useState, useCallback } from 'react';

const getInitialState = () => ({
  name: '',
  capacity: '',
  fuelType: '',
  active: true,
});

export const useAddEditVehicleTypes = (onSaveCallback) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(getInitialState());

  const open = useCallback((data = null) => {
    setFormData(data ? { ...getInitialState(), ...data } : getInitialState());
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
    if (!formData) return;
    setIsSaving(true);
    try {
      await onSaveCallback(formData);
      close();
    } catch (error) {
      console.error('Failed to save vehicle type', error);
      // Optionally: handle error state in UI
    } finally {
      setIsSaving(false);
    }
  }, [formData, onSaveCallback, close]);

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
