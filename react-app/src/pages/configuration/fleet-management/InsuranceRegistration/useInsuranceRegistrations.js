import { useState, useCallback } from 'react';
import { getInsuranceRegistrations, saveInsuranceRegistrations } from '../../../../utils/localStorage';

export const useInsuranceRegistrations = () => {
  const [items, setItems] = useState(() => getInsuranceRegistrations());
  const [loading, setLoading] = useState(false);

  const saveItem = useCallback(async (itemData) => {
    setLoading(true);
    try {
      const currentItems = getInsuranceRegistrations();
      if (itemData.id) {
        // Update existing item
        const updatedItems = currentItems.map((item) => (item.id === itemData.id ? { ...item, ...itemData } : item));
        saveInsuranceRegistrations(updatedItems);
        setItems(updatedItems);
      } else {
        // Add new item
        const newItem = { ...itemData, id: new Date().getTime() };
        const newItems = [...currentItems, newItem];
        saveInsuranceRegistrations(newItems);
        setItems(newItems);
      }
    } catch (error) {
      console.error('Failed to save insurance record:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (id) => {
    setLoading(true);
    try {
      const currentItems = getInsuranceRegistrations();
      const newItems = currentItems.filter((item) => item.id !== id);
      saveInsuranceRegistrations(newItems);
      setItems(newItems);
    } catch (error) {
      console.error('Failed to remove insurance record:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { items, loading, saveItem, removeItem };
};
