import { useState, useEffect, useCallback } from 'react';
import { getMaintenanceTemplates, saveMaintenanceTemplates } from '../../../../utils/localStorage';

export const useMaintenanceTemplates = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getMaintenanceTemplates());
  }, []);

  const saveItems = useCallback((updatedItems) => {
    saveMaintenanceTemplates(updatedItems);
    setItems(updatedItems);
  }, []);

  const saveItem = useCallback(
    (itemToSave) => {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        const index = newItems.findIndex((i) => i.id === itemToSave.id);

        if (index > -1) {
          newItems[index] = itemToSave;
        } else {
          newItems.push({ ...itemToSave, id: new Date().getTime() });
        }
        saveItems(newItems);
        return newItems;
      });
    },
    [saveItems]
  );

  const removeItem = useCallback(
    (itemId) => {
      const newItems = items.filter((item) => item.id !== itemId);
      saveItems(newItems);
    },
    [items, saveItems]
  );

  return { items, saveItem, removeItem };
};
