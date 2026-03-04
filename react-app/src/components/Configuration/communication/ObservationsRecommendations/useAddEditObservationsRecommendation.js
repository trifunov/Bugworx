import { useState } from 'react';

const DEFAULT_FORM = {
  type: 'Observation',
  category: 'Rodent',
  priority: 'Medium',
  active: true,
  includePhotoPlaceholder: false,
};

const useAddEditObservationsRecommendation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const open = (initialData = DEFAULT_FORM) => {
    setFormData(initialData);
    setIsOpen(true);
  };

  const close = () => {
    if (isSaving) return;
    setIsOpen(false);
    setFormData({});
  };

  const onUpdateFieldHandle = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSaveHandle = async (saveFunction) => {
    setIsSaving(true);
    try {
      await saveFunction(formData);
      close();
    } catch (error) {
      console.error('Failed to save observation/recommendation template:', error);
    } finally {
      setIsSaving(false);
    }
  };

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

export default useAddEditObservationsRecommendation;
