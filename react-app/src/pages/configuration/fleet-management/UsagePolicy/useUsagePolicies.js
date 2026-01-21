import { useState, useCallback } from 'react';
import { getUsagePolicies, saveUsagePolicies } from '../../../../utils/localStorage';

export const useUsagePolicies = () => {
  const [items, setItems] = useState(() => getUsagePolicies());
  const [loading, setLoading] = useState(false);

  const saveItem = useCallback(async (itemData) => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error('Failed to save usage policy:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (id) => {
    setLoading(true);
    try {
      const currentItems = getUsagePolicies();
      const newItems = currentItems.filter((item) => item.id !== id);
      saveUsagePolicies(newItems);
      setItems(newItems);
    } catch (error) {
      console.error('Failed to remove usage policy:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { items, loading, saveItem, removeItem };
};
