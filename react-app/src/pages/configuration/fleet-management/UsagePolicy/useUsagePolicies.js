import { useState, useCallback } from 'react';
import { getUsagePolicies, saveUsagePolicies } from '../../../../utils/localStorage';

export const useUsagePolicies = () => {
  const [items, setItems] = useState(() => getUsagePolicies());

  const saveItem = useCallback((itemData) => {
    const currentItems = getUsagePolicies();
    if (itemData.id) {
      const updatedItems = currentItems.map((item) => (item.id === itemData.id ? { ...item, ...itemData } : item));
      saveUsagePolicies(updatedItems);
      setItems(updatedItems);
    } else {
      const newItem = { ...itemData, id: new Date().getTime() };
      const newItems = [...currentItems, newItem];
      saveUsagePolicies(newItems);
      setItems(newItems);
    }
  }, []);

  const removeItem = useCallback((id) => {
    const currentItems = getUsagePolicies();
    const newItems = currentItems.filter((item) => item.id !== id);
    saveUsagePolicies(newItems);
    setItems(newItems);
  }, []);

  return { items, saveItem, removeItem };
};
