import { useState, useEffect } from 'react';
import { getProposalTemplates, saveProposalTemplates } from '../../../../utils/localStorage';

export const useProposalTemplates = () => {
  const [items, setItems] = useState(getProposalTemplates());

  useEffect(() => {
    saveProposalTemplates(items);
  }, [items]);

  /**
   * Saves a new or existing proposal template.
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
   * Removes a proposal template by ID.
   * @param {number|string} id
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this proposal template?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};
