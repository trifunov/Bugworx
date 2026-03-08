import { useState } from 'react';

const DEFAULT_FORM = {
  inspectionMethod: 'Visual',
  resultType: 'Pass / Fail',
  defaultSeverity: 'None',
  applicableEnvironment: 'Both',
  requiresPhoto: false,
  requiresSignature: false,
  requiresMeasurement: false,
  triggerFollowUp: false,
  active: true,
  sortOrder: '',
};

const useAddEditInspectionPointTypeTemplate = () => {
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
      console.error('Failed to save inspection point type template:', error);
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

export default useAddEditInspectionPointTypeTemplate;
