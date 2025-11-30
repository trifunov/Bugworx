import { useState, useEffect } from 'react';
import { getCustomFields, saveCustomFields } from '../../../../utils/localStorage';

export const useCustomFields = () => {
  const [items, setItems] = useState(getCustomFields());

  useEffect(() => {
    saveCustomFields(items);
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
    if (!window.confirm('Are you sure you want to delete this custom field?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};

export default useCustomFields;
