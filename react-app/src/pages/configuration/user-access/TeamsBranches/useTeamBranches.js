import { useState, useEffect } from 'react';
import { getTeams, saveTeams, addTeam } from '../../../../utils/localStorage';

export const useTeamsBranches = () => {
  const [items, setItems] = useState(getTeams());
  const [form, setForm] = useState({ name: '', region: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // keep persisted on mount/change
    setItems(getTeams());
  }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({ name: '', region: '' });
  };

  const editItem = (it) => {
    setEditing(it.id);
    setForm({ name: it.name, region: it.region });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', region: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      const next = items.map(it => (it.id === editing ? { ...it, ...form } : it));
      setItems(next);
      saveTeams(next);
    } else {
      const newItem = addTeam({ ...form });
      setItems(prev => [newItem, ...prev]);
    }
    cancelEdit();
  };

  const removeItem = (id) => {
    const next = items.filter(it => it.id !== id);
    setItems(next);
    saveTeams(next);
  };

  return {
    items,
    form,
    editing,
    setForm,
    startAdd,
    editItem,
    cancelEdit,
    handleSave,
    removeItem,
  };
};