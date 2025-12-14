import { useState, useEffect } from 'react';
import { getFuelTypeAndCapacities, saveFuelTypeAndCapacities } from '../../../../utils/localStorage';

export const useFuelTypeAndCapacity = () => {
  const [items, setItems] = useState(getFuelTypeAndCapacities());

  useEffect(() => {
    saveFuelTypeAndCapacities(items);
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
    if (!window.confirm('Are you sure you want to delete this fuel type and capacity?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
