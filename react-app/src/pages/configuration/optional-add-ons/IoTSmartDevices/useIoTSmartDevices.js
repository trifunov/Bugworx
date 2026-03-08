import { useState, useEffect } from 'react';
import { getIoTSmartDevices, saveIoTSmartDevices } from '../../../../utils/localStorage';

export const useIoTSmartDevices = () => {
  const [items, setItems] = useState(getIoTSmartDevices());

  useEffect(() => {
    saveIoTSmartDevices(items);
  }, [items]);

  /**
   * Saves a new or existing IoT smart device entry.
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
   * Removes an IoT smart device entry by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this IoT device entry?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
