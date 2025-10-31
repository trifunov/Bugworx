import { useEffect, useState } from 'react';
import { getTeams, getEmployees, saveEmployees } from '../../../../utils/localStorage';

const useEmployeeDirectory = () => {
  const [items, setItems] = useState(getEmployees());
  const [form, setForm] = useState({ name: '', position: '', team: '' });
  const [editing, setEditing] = useState(null);
  const [teams, setTeams] = useState(getTeams());

  useEffect(() => {
    saveEmployees(items);
  }, [items]);

  useEffect(() => {
    const refreshTeams = () => setTeams(getTeams());
    refreshTeams();
    window.addEventListener('teams:updated', refreshTeams);
    return () => window.removeEventListener('teams:updated', refreshTeams);
  }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({
      name: '',
      position: '',
      team: teams && teams.length ? (teams[0].name ?? '') : '',
    });
  };

  const editItem = (it) => {
    setEditing(it.id);
    setForm({ name: it.name, position: it.position, team: it.team });
  };

  const saveItem = (e) => {
    e.preventDefault();
    if (editing) {
      const next = items.map(it => (it.id === editing ? { ...it, ...form } : it));
      setItems(next);
    } else {
      const newItem = { ...form, active: true, createdAt: new Date().toISOString() };
      setItems(prev => [newItem, ...prev]);
    }
    setEditing(null);
    setForm({ name: '', position: '', team: '' });
  };

  const toggleActive = (id) => {
    const next = items.map(it => (it.id === id ? { ...it, active: !it.active } : it));
    setItems(next);
  };

  return {
    items,
    form,
    editing,
    teams,
    startAdd,
    editItem,
    saveItem,
    toggleActive,
    setForm,
  };
};

export default useEmployeeDirectory;