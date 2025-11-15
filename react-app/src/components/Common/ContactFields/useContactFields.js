import { useCallback } from 'react';
import { isValidContactData } from '../../../utils/contactValidation';

/**
 * Custom hook for managing contact fields with dynamic emails and phones
 * @param {Object} formData - Current form data
 * @param {Function} setFormData - Function to update form data
 * @param {Object} errors - Current validation errors
 * @param {Function} setErrors - Function to update errors
 * @returns {Object} - Helper functions for managing contact fields
 */
const useContactFields = (formData, setFormData, errors, setErrors) => {

  // Add a new alternate email
  const addEmail = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      alternateEmails: [...(prev.alternateEmails || []), '']
    }));
  }, [setFormData]);

  // Remove an alternate email at specific index
  const removeEmail = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      alternateEmails: prev.alternateEmails.filter((_, i) => i !== index)
    }));

    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`alternateEmail_${index}`];
      return newErrors;
    });
  }, [setFormData, setErrors]);

  // Update alternate email at specific index
  const updateEmail = useCallback((index, value) => {
    setFormData(prev => {
      const newEmails = [...(prev.alternateEmails || [])];
      newEmails[index] = value;
      return {
        ...prev,
        alternateEmails: newEmails
      };
    });

    // Clear error when user types
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`alternateEmail_${index}`];
      return newErrors;
    });
  }, [setFormData, setErrors]);

  // Add a new phone number
  const addPhone = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      phones: [...(prev.phones || []), { type: 'mobile', number: '' }]
    }));
  }, [setFormData]);

  // Remove a phone number at specific index
  const removePhone = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.filter((_, i) => i !== index)
    }));

    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`phone_${index}`];
      return newErrors;
    });
  }, [setFormData, setErrors]);

  // Update phone at specific index
  const updatePhone = useCallback((index, phoneData) => {
    setFormData(prev => {
      const newPhones = [...(prev.phones || [])];
      newPhones[index] = phoneData;
      return {
        ...prev,
        phones: newPhones
      };
    });

    // Clear error when user types 
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`phone_${index}`];
      return newErrors;
    });
  }, [setFormData, setErrors]);

  // Validate contact data
  const validateContact = useCallback(() => {
    const validation = isValidContactData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
    }
    return validation.isValid;
  }, [formData, setErrors]);

  // Initialize contact fields with defaults if needed
  const initializeContactFields = useCallback(() => {
    setFormData(prev => {
      const updates = {};
      if (!prev.alternateEmails) {
        updates.alternateEmails = [];
      }
      if (!prev.phones) {
        updates.phones = [{ type: 'mobile', number: '' }];
      }
      return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev;
    });
  }, [setFormData]);

  return {
    addEmail,
    removeEmail,
    updateEmail,
    addPhone,
    removePhone,
    updatePhone,
    validateContact,
    initializeContactFields
  };
};

export default useContactFields;
