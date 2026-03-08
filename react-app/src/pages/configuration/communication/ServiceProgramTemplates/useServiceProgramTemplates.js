import { useState, useEffect } from 'react';
import { getServiceProgramTemplates, saveServiceProgramTemplates } from '../../../../utils/localStorage';

export const useServiceProgramTemplates = () => {
  const [items, setItems] = useState(getServiceProgramTemplates());

  useEffect(() => {
    saveServiceProgramTemplates(items);
  }, [items]);

  /**
   * Saves a new or existing service / program template.
   * @param {object} formData The form data from the off-canvas.
   */
  const saveItem = (formData) => {
    if (formData.id) {
      setItems((prev) => prev.map((it) => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = { ...formData, id: new Date().getTime() };
      setItems((prev) => [newItem, ...prev]);
    }
  };

  /**
   * Removes a service / program template by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this service / program template?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
