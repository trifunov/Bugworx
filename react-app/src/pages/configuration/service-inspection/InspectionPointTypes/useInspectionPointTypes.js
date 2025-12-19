import { useState, useEffect } from 'react';
import { getInspectionPointTypes, saveInspectionPointTypes, getInspectionPointCategories } from '../../../../utils/localStorage';

export const useInspectionPointTypes = () => {
  const [items, setItems] = useState(getInspectionPointTypes());
  const [categories] = useState(getInspectionPointCategories());

  useEffect(() => {
    saveInspectionPointTypes(items);
  }, [items]);

  const saveItem = (formData) => {
    if (formData.id) {
      setItems((prev) => prev.map((it) => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      setItems((prev) => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this inspection point type?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    categories,
    saveItem,
    removeItem,
  };
};
