import { useState, useEffect } from 'react';
import { getTeams, saveTeams, addTeam } from '../../../../utils/localStorage';

export const useTeamsBranches = () => {
  const [items, setItems] = useState(getTeams());

  useEffect(() => {
    saveTeams(items);
  }, [items]);

  const saveItem = (formData) => {
    if (formData.id) {
      setItems(prev => prev.map(it => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = addTeam(formData);
      setItems(prev => [newItem, ...prev]);
    }
  };

  const removeItem = (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setItems(prev => prev.filter(it => it.id !== id));
  };

  return {
    items,
    saveItem,
    removeItem,
  };
};

export default useTeamsBranches;