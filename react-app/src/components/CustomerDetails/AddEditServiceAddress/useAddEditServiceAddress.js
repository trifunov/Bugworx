import { useState } from 'react';
import { save, updateField } from '../../../utils/addEditFormUtils';

const useAddEditServiceAddress = (customerId) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerId: customerId,
    serviceAddressName: '',
    serviceAddressType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    isActive: true
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = (serviceAddress) => {
    setFormData({
      id: serviceAddress?.id || 0,
      customerId: customerId,
      serviceAddressName: serviceAddress?.serviceAddressName || '',
      serviceAddressType: serviceAddress?.serviceAddressType || '',
      address: serviceAddress?.address || '',
      city: serviceAddress?.city || '',
      state: serviceAddress?.state || '',
      zip: serviceAddress?.zip || '',
      contactName: serviceAddress?.contactName || '',
      contactPhone: serviceAddress?.contactPhone || '',
      contactEmail: serviceAddress?.contactEmail || '',
      isActive: serviceAddress?.isActive ?? true
    });
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setFormData({});
    setErrors({});
  };

  const onUpdateFieldHandle = (field, value) => {
    updateField(field, value, setFormData, errors, setErrors);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.serviceAddressName?.trim()) {
      newErrors.serviceAddressName = 'Service address name is required';
    }

    if (!formData.serviceAddressType?.trim()) {
      newErrors.serviceAddressType = 'Service address type is required';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.contactName?.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.contactPhone?.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
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

export default useAddEditServiceAddress;
