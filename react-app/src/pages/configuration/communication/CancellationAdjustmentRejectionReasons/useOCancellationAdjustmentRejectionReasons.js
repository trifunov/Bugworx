import { useState, useEffect } from 'react';
import { getCancellationAdjustmentRejectionReasons, saveCancellationAdjustmentRejectionReasons } from '../../../../utils/localStorage';

export const useCancellationAdjustmentRejectionReasons = () => {
  const [items, setItems] = useState(getCancellationAdjustmentRejectionReasons());

  useEffect(() => {
    saveCancellationAdjustmentRejectionReasons(items);
  }, [items]);

  /**
   * Saves a new or existing cancellation / adjustment / rejection reason.
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
   * Removes a reason by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this reason?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
