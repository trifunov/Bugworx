import { useState } from 'react';
import { save, updateField } from '../../../utils/addEditFormUtils';
import { isValidContactData } from '../../../utils/contactValidation';

const useAddEditCustomer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultForm = {
    id: 0,
    name: '',
    customerType: '', // 'Residential' | 'Commercial'
    billingContact: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      alternateEmails: [],
      phones: [{ type: 'mobile', number: '' }]
    },
    preferredContactMethod: '', // 'Email' | 'Phone' | 'SMS' | 'Portal'
    customerStatus: 'Active'
  };

  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const open = (customer) => {
    // Handle legacy data format migration
    const billingContact = customer?.billingContact || {};

    // If old format (name, email, phone), migrate to new format
    if (billingContact.name && !billingContact.firstName) {

      const nameParts = billingContact.name.trim().split(/\s+/);

      if (nameParts.length === 1) {

        billingContact.firstName = '';
        billingContact.lastName = nameParts[0];
        billingContact.middleName = '';
        console.warn('Single-word name detected for customer:', customer?.id, 'Name:', billingContact.name);
      } else if (nameParts.length === 2) {
        billingContact.firstName = nameParts[0];
        billingContact.lastName = nameParts[1];
        billingContact.middleName = '';
      } else if (nameParts.length === 3) {
        billingContact.firstName = nameParts[0];
        billingContact.middleName = nameParts[1];
        billingContact.lastName = nameParts[2];
      } else {
        billingContact.firstName = nameParts[0];
        billingContact.middleName = nameParts.slice(1, -1).join(' ');
        billingContact.lastName = nameParts[nameParts.length - 1];
        console.warn('Complex name format detected for customer:', customer?.id, 'Original:', billingContact.name);
      }

      billingContact._migrated = true;
    }

    // Ensure arrays exist
    if (!billingContact.alternateEmails) {
      billingContact.alternateEmails = [];
    }
    if (!billingContact.phones) {
      billingContact.phones = billingContact.phone ?
        [{ type: 'mobile', number: billingContact.phone }] :
        [{ type: 'mobile', number: '' }];
    }

    setFormData({
      id: customer?.id || 0,
      name: customer?.name || '',
      customerType: customer?.customerType || '',
      billingContact,
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

    // Validate billing contact using contact validation utility
    if (formData.billingContact) {
      const contactValidation = isValidContactData(formData.billingContact);
      if (!contactValidation.isValid) {
        Object.assign(newErrors, contactValidation.errors);
      }
    } else {
      newErrors.billingContact = 'Billing contact information is required';
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
