import { useState, useEffect, useCallback } from 'react';
import { getReportDistributions, saveReportDistributions } from '../../../../utils/localStorage';

export const useReportDistributions = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getReportDistributions());
  }, []);

  const saveItems = useCallback((updatedItems) => {
    saveReportDistributions(updatedItems);
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
        saveReportDistributions(updated);
        return updated;
      });
    },
    [saveItems]
  );

  const removeItem = useCallback(
    (id) => {
      if (!window.confirm('Are you sure you want to delete this report distribution?')) return;
      const updated = items.filter((item) => item.id !== id);
      saveItems(updated);
    },
    [items, saveItems]
  );

  return { items, saveItem, removeItem };
};
