import { useState, useEffect, useCallback } from 'react';
import { getSystemMessages, saveSystemMessages } from '../../../../utils/localStorage';

export const useSystemMessages = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getSystemMessages());
  }, []);

  const saveItems = useCallback((updatedItems) => {
    saveSystemMessages(updatedItems);
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
        saveSystemMessages(updated);
        return updated;
      });
    },
    [saveItems]
  );

  const removeItem = useCallback(
    (id) => {
      if (!window.confirm('Are you sure you want to delete this system message?')) return;
      const updated = items.filter((item) => item.id !== id);
      saveItems(updated);
    },
    [items, saveItems]
  );

  return { items, saveItem, removeItem };
};
