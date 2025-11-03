import { useState, useEffect } from 'react';
import { getUsers, saveUsers, addUser, getRoles } from '../../../../utils/localStorage';

export const useUsers = () => {
  const [users, setUsers] = useState(getUsers());
  const [roles, setRoles] = useState(getRoles());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', username: '', email: '', role: '', password: '' });

  useEffect(() => {
    const persisted = users.filter(u => typeof u.id === 'string');
    saveUsers(persisted);
  }, [users]);

  useEffect(() => {
    const refreshRoles = () => setRoles(getRoles());
    window.addEventListener('roles:updated', refreshRoles);
    refreshRoles(); // Initial fetch
    return () => window.removeEventListener('roles:updated', refreshRoles);
  }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({ name: '', username: '', email: '', role: roles.length > 0 ? (roles[0].name ?? '') : '', password: '' });
  };

  const startEdit = (u) => {
    setEditing(u.id);
    setForm({
      name: u.name ?? '',
      username: u.username ?? '',
      email: u.email ?? '',
      role: u.role ?? '',
      password: ''
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', username: '', email: '', role: '', password: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      const next = users.map(u => {
        if (u.id !== editing) return u;
        const updated = { ...u, ...form };
        if (!form.password) delete updated.password;
        return updated;
      });
      setUsers(next);
    } else {
      const newUser = addUser({ ...form, active: true, createdAt: new Date().toISOString() });
      setUsers(prev => [newUser, ...prev]);
    }
    cancelEdit();
  };

  const toggleActive = (id) => {
    const next = users.map(u => (u.id === id ? { ...u, active: !u.active } : u));
    setUsers(next);
  };

  const removeUser = (id) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    const next = users.filter(u => u.id !== id);
    setUsers(next);
    if (editing === id) {
      cancelEdit();
    }
  };

  return {
    users,
    roles,
    editing,
    form,
    setForm,
    startAdd,
    startEdit,
    cancelEdit,
    handleSave,
    toggleActive,
    removeUser,
  };
};