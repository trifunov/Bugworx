import { useState, useEffect } from 'react';
import { getPestTypes, savePestTypes } from '../../../../utils/localStorage';

export const usePestTypes = () => {
  const [items, setItems] = useState(getPestTypes());

  useEffect(() => {
    savePestTypes(items);
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
    if (!window.confirm('Are you sure you want to delete this pest type?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
