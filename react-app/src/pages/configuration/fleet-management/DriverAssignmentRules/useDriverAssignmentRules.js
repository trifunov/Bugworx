import { useState, useCallback, useEffect } from 'react';
import { getDriverAssignmentRules, saveDriverAssignmentRules } from '../../../../utils/localStorage';

export const useDriverAssignmentRules = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadItems = useCallback(() => {
    setLoading(true);
    const data = getDriverAssignmentRules();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reloadItems();
  }, [reloadItems]);

  const saveItem = useCallback(
    (itemToSave) => {
      const currentItems = getDriverAssignmentRules();
      const index = currentItems.findIndex((i) => i.id === itemToSave.id);
      if (index > -1) {
        currentItems[index] = itemToSave;
      } else {
        itemToSave.id = new Date().getTime();
        currentItems.push(itemToSave);
      }
      saveDriverAssignmentRules(currentItems);
      reloadItems();
    },
    [reloadItems]
  );

  const removeItem = useCallback(
    (id) => {
      const currentItems = getDriverAssignmentRules();
      const newItems = currentItems.filter((i) => i.id !== id);
      saveDriverAssignmentRules(newItems);
      reloadItems();
    },
    [reloadItems]
  );

  return { items, loading, saveItem, removeItem };
};
