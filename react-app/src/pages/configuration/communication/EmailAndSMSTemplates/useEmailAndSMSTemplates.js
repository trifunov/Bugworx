import { useState, useEffect, useCallback } from 'react';
import { getEmailSmsTemplates, saveEmailSmsTemplates } from '../../../../utils/localStorage';

export const useEmailAndSMSTemplates = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getEmailSmsTemplates());
  }, []);

  const saveItems = useCallback((updatedItems) => {
    saveEmailSmsTemplates(updatedItems);
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
        saveEmailSmsTemplates(updated);
        return updated;
      });
    },
    [saveItems]
  );

  const removeItem = useCallback(
    (id) => {
      if (!window.confirm('Are you sure you want to delete this template?')) return;
      const updated = items.filter((item) => item.id !== id);
      saveItems(updated);
    },
    [items, saveItems]
  );

  return { items, saveItem, removeItem };
};
