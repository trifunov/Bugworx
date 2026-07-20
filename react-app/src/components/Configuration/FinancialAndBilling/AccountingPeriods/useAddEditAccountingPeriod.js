import { useState, useEffect } from 'react';
import { formatDateForInput } from '../../../../utils/dateUtils';

export const useAddEditAccountingPeriod = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});
  const [initialData, setInitialData] = useState(null);

  const getInitialState = (data) => ({
    id: data?.id || null,
    name: data?.name || '',
    startDate: data?.startDate ? formatDateForInput(data.startDate) : '',
    endDate: data?.endDate ? formatDateForInput(data.endDate) : '',
    status: data?.status || 'Future',
    isCurrent: data?.isCurrent || false,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialState(initialData));
    }
  }, [isOpen, initialData]);

  const open = (data = null) => {
    setInitialData(data);
    setIsOpen(true);
  };

  const close = () => {
    if (isSaving) return;
    setIsOpen(false);
    setInitialData(null);
  };

  const onUpdateFieldHandle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSaveHandle = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      close();
    } catch (error) {
      console.error('Failed to save accounting period:', error);
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
