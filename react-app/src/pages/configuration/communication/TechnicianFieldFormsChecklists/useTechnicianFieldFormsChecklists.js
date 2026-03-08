import { useState, useEffect } from 'react';
import { getTechnicianFieldFormsChecklists, saveTechnicianFieldFormsChecklists } from '../../../../utils/localStorage';

export const useTechnicianFieldFormsChecklists = () => {
  const [items, setItems] = useState(getTechnicianFieldFormsChecklists());

  useEffect(() => {
    saveTechnicianFieldFormsChecklists(items);
  }, [items]);

  /**
   * Saves a new or existing technician field form / checklist.
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
   * Removes a form / checklist template by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this form template?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
