import { useState, useEffect, useCallback } from 'react';
import { getTaxConfigurations, saveTaxConfigurations } from '../../../../utils/localStorage';

export const useTaxConfiguration = () => {
  const [taxConfigs, setTaxConfigs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedConfigs = getTaxConfigurations();
    setTaxConfigs(storedConfigs);
  }, []);

  const addTaxConfig = useCallback(
    (formData) => {
      setIsSaving(true);
      const newConfig = { ...formData, id: new Date().getTime() };
      const newConfigs = [...taxConfigs, newConfig];
      setTaxConfigs(newConfigs);
      saveTaxConfigurations(newConfigs);
      setIsSaving(false);
    },
    [taxConfigs]
  );

  const editTaxConfig = useCallback(
    (id, updatedConfig) => {
      setIsSaving(true);
      const newConfigs = taxConfigs.map((config) => (config.id === id ? { ...updatedConfig, id } : config));
      setTaxConfigs(newConfigs);
      saveTaxConfigurations(newConfigs);
      setIsSaving(false);
    },
    [taxConfigs]
  );

  const deleteTaxConfig = useCallback(
    (id) => {
      const newConfigs = taxConfigs.filter((config) => config.id !== id);
      setTaxConfigs(newConfigs);
      saveTaxConfigurations(newConfigs);
    },
    [taxConfigs]
  );

  return {
    taxConfigs,
    addTaxConfig,
    editTaxConfig,
    deleteTaxConfig,
    isSaving,
  };
};
