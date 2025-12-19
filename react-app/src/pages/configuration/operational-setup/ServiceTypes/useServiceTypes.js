import { useState, useEffect } from 'react';
import { getServiceTypes, saveServiceTypes } from '../../../../utils/localStorage';

export const useServiceTypes = () => {
  const [items, setItems] = useState(getServiceTypes());

  useEffect(() => {
    saveServiceTypes(items);
  }, [items]);

  const saveItem = (formData) => {
    if (formData.id) {
      setItems(prev => prev.map(it => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      setItems(prev => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this service type?')) return;
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};