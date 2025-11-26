import { useState, useEffect } from 'react';
import { getContractTypes, saveContractTypes } from '../../../../utils/localStorage';

export const useContractTypes = () => {
  const [items, setItems] = useState(getContractTypes());

  // This effect handles all persistence to localStorage whenever the 'items' state changes.
  useEffect(() => {
    saveContractTypes(items);
  }, [items]);

  /**
   * Saves a new or existing contract type by updating the component state.
   * The useEffect hook will then handle persisting the changes.
   * @param {object} formData The data for the contract type from the form.
   */
  const saveItem = (formData) => {
    if (formData.id) {
      // Logic for editing an existing item.
      setItems(prev => prev.map(it => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      setItems(prev => [newItem, ...prev]);
    }
  };

  /**
   * Removes a contract type from the list.
   * The useEffect hook will then handle persisting the changes.
   * @param {string} id The ID of the contract type to remove.
   */
  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this contract type?')) return;
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};