// ...existing code...
import React, { useEffect, useState } from 'react';
import { getRoles, saveRoles, addRole } from '../../../utils/localStorage';

const RolesPermissions = () => {
  const [roles, setRoles] = useState(() => getRoles());
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
    setEditing(null);
    setForm({ name: '', permissions: '' });
  };

  const removeRole = (id) => {
    const next = roles.filter(r => r.id !== id);
    setRoles(next);
    saveRoles(next);
  };

  return (
    <>
      {/* ...existing JSX unchanged ... */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">User Access — Roles & Permissions</h4>
            <div className="page-title-right">
              <button className="btn btn-primary" onClick={startAdd}><i className="mdi mdi-plus me-1"></i> Add Role</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Roles</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>Role</th><th>Permissions</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {roles.map(r => (
                      <tr key={r.id}>
                        <td className="fw-bold">{r.name}</td>
                        <td>{(r.permissions || []).join(', ')}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(r)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeRole(r.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {roles.length === 0 && <tr><td colSpan={3} className="text-center">No roles</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{editing ? 'Edit Role' : 'Add Role'}</h4>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label">Role Name</label>
                  <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Permissions (comma separated)</label>
                  <input className="form-control" value={form.permissions} onChange={e => setForm({ ...form, permissions: e.target.value })} />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-light" onClick={() => { setEditing(null); setForm({ name: '', permissions: '' }); }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolesPermissions;