import React from 'react';
import { useTeamsBranches } from './useTeamBranches';

const TeamsBranches = () => {
  const {
    items,
    form,
    editing,
    setForm,
    startAdd,
    editItem,
    cancelEdit,
    handleSave,
    removeItem,
  } = useTeamsBranches();

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Teams / Branches</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>Name</th><th>Region</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {items.map(it => (
                      <tr key={it.id}>
                        <td className="fw-bold">{it.name}</td>
                        <td>{it.region}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => editItem(it)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(it.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {items.length === 0 && <tr><td colSpan={3} className="text-center">No teams / branches</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{editing ? 'Edit' : 'Add'}</h4>
              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Region</label>
                  <input className="form-control" value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} />
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
export default TeamsBranches;