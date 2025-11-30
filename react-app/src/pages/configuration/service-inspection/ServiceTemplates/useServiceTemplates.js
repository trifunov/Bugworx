import { useState, useEffect } from 'react';
import { getServiceTemplates, saveServiceTemplates } from '../../../../utils/localStorage';

export const useServiceTemplates = () => {
  const [items, setItems] = useState(getServiceTemplates());

  useEffect(() => {
    saveServiceTemplates(items);
  }, [items]);

  const saveItem = (formData) => {
    // Convert checklist string back to an array, filtering out empty lines
    const checklist = formData.checklist ? formData.checklist.split('\n').map(s => s.trim()).filter(s => s) : [];
    const itemData = { ...formData, checklist };

    if (itemData.id) {
      setItems(prev => prev.map(it => (it.id === itemData.id ? itemData : it)));
    } else {
      const newItem = { ...itemData, id: Date.now().toString() };
      setItems(prev => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this service template?')) return;
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};