// ...existing code...
import React, { useEffect, useState } from 'react';
import { getTeams, saveTeams, addTeam } from '../../../utils/localStorage';

const TeamsBranches = () => {
  const [items, setItems] = useState(() => getTeams());
  const [form, setForm] = useState({ name: '', region: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // keep persisted on mount/change
    setItems(getTeams());
  }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({ name: '', region: '' });
  };

  const editItem = (it) => {
    setEditing(it.id);
    setForm({ name: it.name, region: it.region });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      const next = items.map(it => (it.id === editing ? { ...it, ...form } : it));
      setItems(next);
      saveTeams(next); // will dispatch 'teams:updated'
    } else {
      const newItem = addTeam({ ...form });
      setItems(prev => [newItem, ...prev]);
    }
    setEditing(null);
    setForm({ name: '', region: '' });
  };

  const removeItem = (id) => {
    const next = items.filter(it => it.id !== id);
    setItems(next);
    saveTeams(next); // will dispatch 'teams:updated'
  };

  return (
    <>
      {/* ...existing JSX unchanged ... */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">User Access — Teams & Branches</h4>
            <div className="page-title-right">
              <button className="btn btn-primary" onClick={startAdd}><i className="mdi mdi-plus me-1"></i> Add</button>
            </div>
          </div>
        </div>
      </div>

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
                  <button type="button" className="btn btn-light" onClick={() => { setEditing(null); setForm({ name: '', region: '' }); }}>Cancel</button>
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