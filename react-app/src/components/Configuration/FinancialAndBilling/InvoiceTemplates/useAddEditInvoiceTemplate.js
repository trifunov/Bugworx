import { useState, useCallback } from 'react';

export const useAddEditInvoiceTemplate = (onSave) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  const open = useCallback((initialData = null) => {
    setFormData(
      initialData || {
        templateName: '',
        isDefault: false,
        headerContent: '',
        footerContent: '',
        numberingPrefix: 'INV-',
        numberingSuffix: '',
        nextNumber: 1000,
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
    if (isSaving) return;
    setIsSaving(true);
    try {
      await onSave(formData);
      close();
    } catch (error) {
      console.error('Failed to save invoice template:', error);
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
