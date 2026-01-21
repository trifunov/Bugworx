import { useState, useCallback, useEffect } from 'react';
import { getGpsIntegrations, saveGpsIntegrations } from '../../../../utils/localStorage';

export const useGpsIntegrations = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadItems = useCallback(() => {
    setLoading(true);
    const data = getGpsIntegrations();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reloadItems();
  }, [reloadItems]);

  const saveItem = useCallback(
    (itemToSave) => {
      const currentItems = getGpsIntegrations();
      const index = currentItems.findIndex((i) => i.id === itemToSave.id);
      if (index > -1) {
        currentItems[index] = itemToSave;
      } else {
        itemToSave.id = new Date().getTime();
        currentItems.push(itemToSave);
      }
      saveGpsIntegrations(currentItems);
      reloadItems();
    },
    [reloadItems]
  );

  const removeItem = useCallback(
    (id) => {
      const currentItems = getGpsIntegrations();
      const newItems = currentItems.filter((i) => i.id !== id);
      saveGpsIntegrations(newItems);
      reloadItems();
    },
    [reloadItems]
  );

  return { items, loading, saveItem, removeItem };
};
