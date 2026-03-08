import { useState, useEffect } from 'react';
import { getSafetyAndComplianceSetups, saveSafetyAndComplianceSetups } from '../../../../utils/localStorage';

export const useSafetyAndComplianceSetups = () => {
  const [items, setItems] = useState(getSafetyAndComplianceSetups());

  useEffect(() => {
    saveSafetyAndComplianceSetups(items);
  }, [items]);

  /**
   * Saves a new or existing safety & compliance setup entry.
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
   * Removes a safety & compliance setup entry by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this safety & compliance entry?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
