import { useState, useEffect } from 'react';
import { getApiIntegrations, saveApiIntegrations } from '../../../../utils/localStorage';

export const useApiIntegrations = () => {
  const [items, setItems] = useState(getApiIntegrations());

  useEffect(() => {
    saveApiIntegrations(items);
  }, [items]);

  const saveItem = (formData) => {
    if (formData.id) {
      setItems((prev) => prev.map((it) => (it.id === formData.id ? { ...it, ...formData } : it)));
    } else {
      const newItem = { ...formData, id: Date.now().toString(), enabled: false };
      setItems((prev) => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this integration?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const toggleEnabled = (id) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, enabled: !it.enabled } : it)));
  };

  return {
    items,
    saveItem,
    removeItem,
    toggleEnabled,
  };
};
