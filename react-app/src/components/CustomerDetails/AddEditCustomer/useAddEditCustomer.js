import { useState } from 'react';
import { save, updateField } from '../../../utils/addEditFormUtils';

const useAddEditCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultForm = {
    id: 0,
    name: '',
    customerType: '', // 'Residential' | 'Commercial'
    primaryContactPerson: '',
    jobTitle: '',
    email: '',
    phone: '',
    preferredContactMethod: '', // 'Email' | 'Phone' | 'SMS' | 'Portal'
    customerStatus: 'Active'
  };

  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = (customer) => {
    setFormData({
      id: customer?.id || 0,
      name: customer?.name || '',
      customerType: customer?.customerType || '',
      primaryContactPerson: customer?.primaryContactPerson || '',
      jobTitle: customer?.jobTitle || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      preferredContactMethod: customer?.preferredContactMethod || '',
      customerStatus: customer?.customerStatus || 'Active'
    });
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setFormData(defaultForm);
    setErrors({});
  };

  const onUpdateFieldHandle = (field, value) => {
    updateField(field, value, setFormData, errors, setErrors);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Customer name is required';
    }

    if (!formData.customerType?.trim()) {
      newErrors.customerType = 'Customer type is required';
    }

    if (!formData.primaryContactPerson?.trim()) {
      newErrors.primaryContactPerson = 'Primary contact name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSaveHandle = async (onSaveCallback) => {
    save(formData, onSaveCallback, setIsSaving, close, setErrors, validate);
  };

  return {
    isOpen,
    formData,
    errors,
    isSaving,
    open,
    close,
    onUpdateFieldHandle,
    onSaveHandle
  };
};

export default useAddEditCustomer;
