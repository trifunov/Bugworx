import { useState } from 'react';

const useCreateInvoice = (customerId) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: customerId,
    invoiceDate: '',
    dueDate: '',
    relatedServiceId: '',
    amount: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = () => {
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30); // Default to 30 days from now

    setFormData({
      customerId: customerId,
      invoiceDate: today,
      dueDate: dueDate.toISOString().split('T')[0],
      relatedServiceId: '',
      amount: '',
      description: ''
    });
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setFormData({});
    setErrors({});
  };

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.invoiceDate) {
      newErrors.invoiceDate = 'Invoice date is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.invoiceDate && formData.dueDate && formData.dueDate < formData.invoiceDate) {
      newErrors.dueDate = 'Due date must be after invoice date';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async (onSaveCallback) => {
    if (!validate()) {
      return false;
    }

    setIsSaving(true);
    try {
      if (onSaveCallback) {
        await onSaveCallback(formData);
      }
      close();
      return true;
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to create invoice' });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isOpen,
    formData,
    errors,
    isSaving,
    open,
    close,
    updateField,
    save
  };
};

export default useCreateInvoice;
