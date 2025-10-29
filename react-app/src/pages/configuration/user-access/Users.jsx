// ...existing code (modified to add password field + delete)...
import React, { useEffect, useState } from 'react';
import { getUsers, saveUsers, addUser, getRoles } from '../../../utils/localStorage';

const Users = () => {
  const [users, setUsers] = useState(() => getUsers());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', username: '', email: '', role: '', password: '' });

  // roles state (reads roles created by RolesPermissions from storage)
  const [roles, setRoles] = useState(() => getRoles());

  useEffect(() => {
    // persist users when changed (only persisted users, not static ones)
    const persisted = users.filter(u => typeof u.id === 'string');
    saveUsers(persisted);
  }, [users]);

  // refresh roles when RolesPermissions emits an update event or on mount
  useEffect(() => {
    const refreshRoles = () => setRoles(getRoles());
    window.addEventListener('roles:updated', refreshRoles);
    // ensure roles are current on mount
    refreshRoles();
    return () => window.removeEventListener('roles:updated', refreshRoles);
  }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({ name: '', username: '', email: '', role: '', password: '' });
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

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      // When editing, do not overwrite password unless provided
      const next = users.map(u => {
        if (u.id !== editing) return u;
        const updated = { ...u, ...form };
        if (!form.password) updated.password = u.password;
        return updated;
      });
      setUsers(next);
      const persisted = next.filter(u => typeof u.id === 'string');
      saveUsers(persisted);
    } else {
      // Ensure username/email uniqueness check could be added here
      const newUser = addUser({
        name: form.name,
        username: form.username,
        email: form.email,
        role: form.role,
        password: form.password,
        active: true,
        createdAt: new Date().toISOString()
      });
      setUsers(prev => [newUser, ...prev]);
    }
    setEditing(null);
    setForm({ name: '', username: '', email: '', role: '', password: '' });
  };

  const toggleActive = (id) => {
    const next = users.map(u => (u.id === id ? { ...u, active: !u.active } : u));
    setUsers(next);
    const persisted = next.filter(u => typeof u.id === 'string');
    saveUsers(persisted);
  };

  const removeUser = (id) => {
    const ok = window.confirm('Delete this user? This action cannot be undone.');
    if (!ok) return;
    const next = users.filter(u => u.id !== id);
    setUsers(next);
    const persisted = next.filter(u => typeof u.id === 'string');
    saveUsers(persisted);
    // if editing the deleted user, reset form
    if (editing === id) {
      setEditing(null);
      setForm({ name: '', username: '', email: '', role: '', password: '' });
    }
  };

  return (
    <>
      {/* ...existing JSX unchanged except added password input and delete button ... */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">User Access — Users</h4>
            <div className="page-title-right">
              <button className="btn btn-primary" onClick={startAdd}>
                <i className="mdi mdi-plus me-1"></i> Add User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Users</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td className="fw-bold">{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                          <span className={`badge badge-soft-${u.active ? 'success' : 'danger'}`}>
                            {u.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(u)}>Edit</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleActive(u.id)}>
                              {u.active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeUser(u.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && <tr><td colSpan={5} className="text-center">No users</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{editing ? 'Edit User' : 'Add User'}</h4>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input className="form-control" required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input className="form-control" type="password" required={!editing} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                  {editing && <small className="text-muted">Leave blank to keep existing password</small>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  {roles && roles.length > 0 ? (
                    <select
                      className="form-control"
                      value={form.role}
                      onChange={e => setForm({ ...form, role: e.target.value })}
                      required
                    >
                      <option value="">-- Select role --</option>
                      {roles.map(r => (
                        <option key={r.id ?? r.name} value={r.name ?? r.title ?? r.role}>
                          {r.name ?? r.title ?? r.role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input className="form-control" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-light" onClick={() => { setEditing(null); setForm({ name: '', username: '', email: '', role: '', password: '' }); }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Users;