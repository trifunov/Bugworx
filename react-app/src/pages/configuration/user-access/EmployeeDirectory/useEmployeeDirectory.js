import { useEffect, useState } from 'react';
import { getTeams, getEmployees, saveEmployees } from '../../../../utils/localStorage';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const useEmployeeDirectory = () => {
  const { setPageSubHeader } = usePageSubHeader();
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
    setPageSubHeader({
      title: "Employee Directory",
      breadcrumbs: [
        { label: "Configuration", path: "/configuration/general" },
        { label: "User Access", path: "/configuration/user-access" },
        { label: "Employee Directory", isActive: true }
      ]
    });
    return () => window.removeEventListener('teams:updated', refreshTeams);
  }, [setPageSubHeader]);

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