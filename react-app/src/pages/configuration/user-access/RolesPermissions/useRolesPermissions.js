import { useState, useEffect } from 'react';
import { getRoles, saveRoles, addRole } from '../../../../utils/localStorage';

export const useRolesPermissions = () => {
  const [roles, setRoles] = useState(getRoles());

  useEffect(() => {
    saveRoles(roles);
    // Dispatch an event so the Users page can refresh its roles list
    window.dispatchEvent(new CustomEvent('roles:updated'));
  }, [roles]);

  const handleSave = (formData) => {
    // Convert comma-separated string back to an array of permissions
    const permissions = formData.permissions ? formData.permissions.split(',').map(p => p.trim()).filter(p => p) : [];
    const roleData = { ...formData, permissions };

    if (roleData.id) { // Editing existing role
      setRoles(prev => prev.map(r => (r.id === roleData.id ? roleData : r)));
    } else { // Adding new role
      const newRole = addRole(roleData);
      setRoles(prev => [newRole, ...prev]);
    }
  };

  const removeRole = (id) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    setRoles(prev => prev.filter(r => r.id !== id));
  };

  return {
    roles,
    handleSave,
    removeRole,
  };
};