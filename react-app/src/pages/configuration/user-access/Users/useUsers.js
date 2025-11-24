import { useState, useEffect } from 'react';
import { getUsers, saveUsers, addUser, getRoles } from '../../../../utils/localStorage';

export const useUsers = () => {
  const [users, setUsers] = useState(getUsers());
  const [roles, setRoles] = useState(getRoles());

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

  const handleSave = (formData) => {
    if (formData.id) { // Editing existing user
      const next = users.map(u => {
        if (u.id !== formData.id) return u;
        const updated = { ...u, ...formData };
        if (!formData.password) {
          delete updated.password; // Don't overwrite password if it's blank
        }
        return updated;
      });
      setUsers(next);
    } else { // Adding new user
      const newUser = addUser({ ...formData, active: true, createdAt: new Date().toISOString() });
      setUsers(prev => [newUser, ...prev]);
    }
  };

  const toggleActive = (id) => {
    const next = users.map(u => (u.id === id ? { ...u, active: !u.active } : u));
    setUsers(next);
  };

  const removeUser = (id) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    const next = users.filter(u => u.id !== id);
    setUsers(next);
  };

  return {
    users,
    roles,
    handleSave,
    toggleActive,
    removeUser
  };
};