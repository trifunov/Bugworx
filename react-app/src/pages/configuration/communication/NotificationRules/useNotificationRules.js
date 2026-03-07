import { useState, useEffect, useCallback } from 'react';
import { getNotificationRules, saveNotificationRules } from '../../../../utils/localStorage';

export const useNotificationRules = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getNotificationRules());
  }, []);

  const saveItems = useCallback((updatedItems) => {
    saveNotificationRules(updatedItems);
    setItems(updatedItems);
  }, []);

  const saveItem = useCallback(
    (itemToSave) => {
      setItems((prevItems) => {
        const updated = [...prevItems];
        const index = updated.findIndex((i) => i.id === itemToSave.id);
        if (index > -1) {
          updated[index] = itemToSave;
        } else {
          updated.push({ ...itemToSave, id: new Date().getTime() });
        }
        saveNotificationRules(updated);
        return updated;
      });
    },
    [saveItems]
  );

  const removeItem = useCallback(
    (id) => {
      if (!window.confirm('Are you sure you want to delete this notification rule?')) return;
      const updated = items.filter((item) => item.id !== id);
      saveItems(updated);
    },
    [items, saveItems]
  );

  return { items, saveItem, removeItem };
};
