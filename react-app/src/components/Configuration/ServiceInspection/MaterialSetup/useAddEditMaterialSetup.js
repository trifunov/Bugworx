import { useState } from 'react';

const useAddEditMaterialSetup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const open = (initialData = {}) => {
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
      console.error('Failed to save material:', error);
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

export default useAddEditMaterialSetup;
