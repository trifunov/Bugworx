import { useState, useEffect } from 'react';
import { getEmployees, saveEmployees, addEmployee, getTeams } from '../../../../utils/localStorage';

export const useEmployeeDirectory = () => {
  const [items, setItems] = useState(getEmployees());
  const [teams, setTeams] = useState(getTeams());

  useEffect(() => {
    saveEmployees(items);
  }, [items]);

  const saveItem = (formData) => {
    if (formData.id) {
      setItems(prev => prev.map(it => (it.id === formData.id ? formData : it)));
    } else {
      const newItem = addEmployee({ ...formData, active: true });
      setItems(prev => [newItem, ...prev]);
    }
  };

  const toggleActive = (id) => {
    setItems(prev => prev.map(it => (it.id === id ? { ...it, active: !it.active } : it)));
  };

  return {
    items,
    teams,
    saveItem,
    toggleActive,
  };
};

export default useEmployeeDirectory;