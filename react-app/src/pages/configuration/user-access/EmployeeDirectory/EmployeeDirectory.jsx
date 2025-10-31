import React from 'react';
import useEmployeeDirectory from './useEmployeeDirectory';

const EmployeeDirectory = () => {
  const {
    items,
    form,
    editing,
    teams,
    startAdd,
    editItem,
    saveItem,
    toggleActive,
    setForm,
    setEditing,
  } = useEmployeeDirectory();

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">User Access — Employee Directory</h4>
            <div className="page-title-right">
              <button className="btn btn-primary" onClick={startAdd}><i className="mdi mdi-plus me-1"></i> Add Employee</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Employees</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Team</th>
                      <th>Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(it => (
                      <tr key={it.id}>
                        <td className="fw-bold">{it.name}</td>
                        <td>{it.position}</td>
                        <td>{it.team}</td>
                        <td>
                          <span className={`badge badge-soft-${it.active ? 'success' : 'danger'}`}>{it.active ? 'Active' : 'Inactive'}</span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => editItem(it)}>Edit</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleActive(it.id)}>{it.active ? 'Deactivate' : 'Activate'}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && <tr><td colSpan={5} className="text-center">No employees</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{editing ? 'Edit Employee' : 'Add Employee'}</h4>
              <form onSubmit={saveItem}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <input className="form-control" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Team</label>
                  {teams && teams.length > 0 ? (
                    <select
                      className="form-control"
                      value={form.team}
                      onChange={e => setForm({ ...form, team: e.target.value })}
                      required
                    >
                      <option value="">-- Select team --</option>
                      {teams.map(t => (
                        <option key={t.id ?? t.name} value={t.name ?? t.title ?? t.id}>
                          {t.name ?? t.title ?? t.id}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input className="form-control" value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} />
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-light" onClick={() => { setEditing(null); setForm({ name: '', position: '', team: '' }); }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDirectory;