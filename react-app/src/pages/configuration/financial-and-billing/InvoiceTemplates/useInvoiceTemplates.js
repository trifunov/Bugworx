import { useState, useEffect, useCallback } from 'react';
import { getInvoiceTemplates, saveInvoiceTemplates } from '../../../../utils/localStorage';

export const useInvoiceTemplates = () => {
  const [invoiceTemplates, setInvoiceTemplates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedTemplates = getInvoiceTemplates();
    setInvoiceTemplates(storedTemplates);
  }, []);

  const addInvoiceTemplate = useCallback(
    (formData) => {
      setIsSaving(true);
      const newTemplate = { ...formData, id: new Date().getTime() };
      const newTemplates = [...invoiceTemplates, newTemplate];
      setInvoiceTemplates(newTemplates);
      saveInvoiceTemplates(newTemplates);
      setIsSaving(false);
    },
    [invoiceTemplates]
  );

  const editInvoiceTemplate = useCallback(
    (id, updatedTemplate) => {
      setIsSaving(true);
      const newTemplates = invoiceTemplates.map((template) => (template.id === id ? { ...updatedTemplate, id } : template));
      setInvoiceTemplates(newTemplates);
      saveInvoiceTemplates(newTemplates);
      setIsSaving(false);
    },
    [invoiceTemplates]
  );

  const deleteInvoiceTemplate = useCallback(
    (id) => {
      const newTemplates = invoiceTemplates.filter((template) => template.id !== id);
      setInvoiceTemplates(newTemplates);
      saveInvoiceTemplates(newTemplates);
    },
    [invoiceTemplates]
  );

  return {
    invoiceTemplates,
    addInvoiceTemplate,
    editInvoiceTemplate,
    deleteInvoiceTemplate,
    isSaving,
  };
};
