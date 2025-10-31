import { useState, useEffect } from 'react';
import { getRoles, saveRoles, addRole } from '../../../../utils/localStorage';

export const useRolesPermissions = () => {
  const [roles, setRoles] = useState(getRoles());
  const [form, setForm] = useState({ name: '', permissions: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // keep roles in sync if other parts update storage externally
    setRoles(getRoles());
  }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({ name: '', permissions: '' });
  };

  const startEdit = (r) => {
    setEditing(r.id);
    setForm({ name: r.name, permissions: (r.permissions || []).join(', ') });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', permissions: '' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const perms = form.permissions.split(',').map(s => s.trim()).filter(Boolean);
    if (editing) {
      const next = roles.map(r => (r.id === editing ? { ...r, name: form.name, permissions: perms } : r));
      setRoles(next);
      saveRoles(next);
    } else {
      const newRole = addRole({ name: form.name, permissions: perms });
      setRoles(prev => [newRole, ...prev]);
    }
    cancelEdit();
  };

  const removeRole = (id) => {
    const next = roles.filter(r => r.id !== id);
    setRoles(next);
    saveRoles(next);
  };

  return {
    roles,
    form,
    editing,
    setForm,
    startAdd,
    startEdit,
    cancelEdit,
    handleSave,
    removeRole,
  };
};