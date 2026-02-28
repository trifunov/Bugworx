import { useState, useEffect } from 'react';
import { getInspectionPointTypeTemplates, saveInspectionPointTypeTemplates } from '../../../../utils/localStorage';

export const useInspectionPointTypeTemplates = () => {
  const [items, setItems] = useState(getInspectionPointTypeTemplates());

  useEffect(() => {
    saveInspectionPointTypeTemplates(items);
  }, [items]);

  /**
   * Saves a new or existing inspection point type template.
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
   * Removes an inspection point type template by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
