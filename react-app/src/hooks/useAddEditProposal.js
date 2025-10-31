import { useState } from 'react';
import { getConfiguration } from '../utils/localStorage';

const useAddEditProposal = (customerId = null) => {
  const config = getConfiguration();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    customerId: customerId || '',
    proposalTitle: '',
    scopeOfWork: '',
    servicesProposed: '',
    pricing: '',
    termsAndConditions: config.defaultTermsAndConditions || '',
    attachments: [],
    status: 'Draft'
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = (proposal = null) => {
    if (proposal) {
      setFormData({
        ...proposal
      });
    } else {
      const config = getConfiguration();
      setFormData({
        id: 0,
        customerId: customerId || '',
        proposalTitle: '',
        scopeOfWork: '',
        servicesProposed: '',
        pricing: '',
        termsAndConditions: config.defaultTermsAndConditions || '',
        attachments: [],
        status: 'Draft'
      });
    }
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    const config = getConfiguration();
    setFormData({
      id: 0,
      customerId: customerId || '',
      proposalTitle: '',
      scopeOfWork: '',
      servicesProposed: '',
      pricing: '',
      termsAndConditions: config.defaultTermsAndConditions || '',
      attachments: [],
      status: 'Draft'
    });
    setErrors({});
  };

  const onUpdateFieldHandle = (field, value) => {
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

  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files);

    const filePromises = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            id: Date.now() + Math.random(),
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            uploadedAt: new Date().toISOString()
          });
        };
        reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
        reader.readAsDataURL(file);
      });
    });

    try {
      const uploadedFiles = await Promise.all(filePromises);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...uploadedFiles]
      }));
      return true;
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        attachments: error.message
      }));
      return false;
    }
  };

  const removeAttachment = (fileId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(file => file.id !== fileId)
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerId) {
      newErrors.customerId = 'Please select a customer';
    }

    if (!formData.proposalTitle?.trim()) {
      newErrors.proposalTitle = 'Proposal title is required';
    }

    if (!formData.scopeOfWork?.trim()) {
      newErrors.scopeOfWork = 'Scope of work is required';
    }

    if (!formData.pricing?.trim()) {
      newErrors.pricing = 'Pricing is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSaveHandle = async (onSaveCallback) => {
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
      setErrors({ submit: error.message || 'Failed to save proposal' });
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
    onUpdateFieldHandle,
    onSaveHandle,
    handleFileUpload,
    removeAttachment
  };
};

export default useAddEditProposal;
