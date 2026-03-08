import { useState, useEffect } from 'react';
import { getQualityAssuranceSetups, saveQualityAssuranceSetups } from '../../../../utils/localStorage';

export const useQualityAssuranceSetups = () => {
  const [items, setItems] = useState(getQualityAssuranceSetups());

  useEffect(() => {
    saveQualityAssuranceSetups(items);
  }, [items]);

  /**
   * Saves a new or existing quality assurance setup entry.
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
   * Removes a quality assurance setup entry by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this quality assurance entry?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
