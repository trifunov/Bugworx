import { useState, useEffect, useCallback } from 'react';
import { getBatchProcessingSetups, saveBatchProcessingSetups } from '../../../../utils/localStorage';

export const useBatchProcessingSetup = () => {
  const [setups, setSetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSetup, setSelectedSetup] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const data = getBatchProcessingSetups();
    setSetups(data);
    setLoading(false);
  }, []);

  const openAddEditForm = (setup = null) => {
    setSelectedSetup(setup ? { ...setup } : null);
    setIsFormOpen(true);
  };

  const closeAddEditForm = () => {
    setIsFormOpen(false);
    setSelectedSetup(null);
  };

  const handleSave = useCallback(
    (formData) => {
      setIsSaving(true);
      let updatedSetups;
      if (formData.id) {
        updatedSetups = setups.map((s) => (s.id === formData.id ? formData : s));
      } else {
        const newSetup = { ...formData, id: new Date().getTime() };
        updatedSetups = [...setups, newSetup];
      }

      saveBatchProcessingSetups(updatedSetups);
      setSetups(updatedSetups);
      setIsSaving(false);
      closeAddEditForm();
    },
    [setups]
  );

  const handleDelete = useCallback(
    (setupId) => {
      if (window.confirm('Are you sure you want to delete this batch processing rule?')) {
        const updatedSetups = setups.filter((s) => s.id !== setupId);
        saveBatchProcessingSetups(updatedSetups);
        setSetups(updatedSetups);
      }
    },
    [setups]
  );

  return {
    setups,
    loading,
    isFormOpen,
    selectedSetup,
    isSaving,
    openAddEditForm,
    closeAddEditForm,
    handleSave,
    handleDelete,
  };
};
