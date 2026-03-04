import { useState, useEffect } from 'react';
import { getFacilityTemplates, saveFacilityTemplates } from '../../../../utils/localStorage';

export const useFacilityTemplates = () => {
  const [items, setItems] = useState(getFacilityTemplates());

  useEffect(() => {
    saveFacilityTemplates(items);
  }, [items]);

  /**
   * Saves a new or existing facility template.
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
   * Removes a facility template by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this facility template?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
