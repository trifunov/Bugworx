import { useState, useEffect } from 'react';
import { getJobSettings, saveJobSettings } from '../../../../utils/localStorage';

export const useJobSettings = () => {
  // getJobSettings should now return an array from localStorage
  const [items, setItems] = useState(getJobSettings());

  useEffect(() => {
    // saveJobSettings should now save an array to localStorage
    saveJobSettings(items);
  }, [items]);

  const saveItem = (formData) => {
    if (formData.id) {
      setItems(prev => prev.map(it => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      setItems(prev => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this job setting profile?')) return;
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};

export default useJobSettings;