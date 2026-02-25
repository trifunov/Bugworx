import { useState, useEffect, useCallback } from 'react';
import { getPaymentTerms, savePaymentTerms } from '../../../../utils/localStorage';

export const usePaymentTerms = () => {
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const terms = getPaymentTerms();
    setPaymentTerms(terms);
    setLoading(false);
  }, []);

  const openAddEditForm = (term = null) => {
    setSelectedTerm(term ? { ...term } : null);
    setIsFormOpen(true);
  };

  const closeAddEditForm = () => {
    setIsFormOpen(false);
    setSelectedTerm(null);
  };

  const handleSave = useCallback(
    (formData) => {
      setIsSaving(true);
      let updatedTerms;
      const termId = formData.id || new Date().getTime();
      if (formData.id) {
        // Edit existing term
        updatedTerms = paymentTerms.map((term) => (term.id === formData.id ? formData : term));
      } else {
        // Add new term
        const newTerm = { ...formData, id: termId };
        updatedTerms = [...paymentTerms, newTerm];
      }

      // If the new/edited term is set as default, unset all others
      if (formData.isDefault) {
        updatedTerms = updatedTerms.map((term) => ({
          ...term,
          isDefault: term.id === termId,
        }));
      }

      savePaymentTerms(updatedTerms);
      setPaymentTerms(updatedTerms);
      setIsSaving(false);
      closeAddEditForm();
    },
    [paymentTerms]
  );

  const handleDelete = useCallback(
    (termId) => {
      if (window.confirm('Are you sure you want to delete this payment term?')) {
        const updatedTerms = paymentTerms.filter((term) => term.id !== termId);
        savePaymentTerms(updatedTerms);
        setPaymentTerms(updatedTerms);
      }
    },
    [paymentTerms]
  );

  return {
    paymentTerms,
    loading,
    isFormOpen,
    selectedTerm,
    isSaving,
    openAddEditForm,
    closeAddEditForm,
    handleSave,
    handleDelete,
  };
};
