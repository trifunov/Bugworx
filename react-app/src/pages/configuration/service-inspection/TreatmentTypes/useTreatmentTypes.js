import { useState, useEffect } from 'react';
import { getTreatmentTypes, saveTreatmentTypes } from '../../../../utils/localStorage';

export const useTreatmentTypes = () => {
  const [items, setItems] = useState(getTreatmentTypes());

  useEffect(() => {
    saveTreatmentTypes(items);
  }, [items]);

  const saveItem = (formData) => {
    if (formData.id) {
      setItems((prev) => prev.map((it) => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = { ...formData, id: new Date().getTime() };
      setItems((prev) => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this treatment type?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
