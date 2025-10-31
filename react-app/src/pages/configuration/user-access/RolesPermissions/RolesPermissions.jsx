import React from 'react';
import { useRolesPermissions } from './useRolesPermissions';

const RolesPermissions = () => {
  const {
    roles,
    form,
    editing,
    setForm,
    startAdd,
    startEdit,
    cancelEdit,
    handleSave,
    removeRole,
  } = useRolesPermissions();

  return (
    <>
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
                  <button type="button" className="btn btn-light" onClick={cancelEdit}>Cancel</button>
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