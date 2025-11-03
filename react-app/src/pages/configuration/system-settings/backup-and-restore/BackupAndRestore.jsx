import React from 'react';
import { useBackupAndRestore } from './useBackupAndRestore';

const BackupAndRestore = () => {
    const { backups, createBackup, downloadBackup, restoreBackup, deleteBackup, handleBackupUpload } = useBackupAndRestore();

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Backup & Restore</h5>
                        <p className="text-muted">Manage database backups and restores.</p>

                        <div className="mb-3">
                            <button className="btn btn-primary me-2" onClick={createBackup}>Create Backup</button>
                            <button className="btn btn-outline-secondary" onClick={() => { if (backups[0]) downloadBackup(backups[0].id); else alert('No backups available'); }}>Download Latest</button>
                        </div>

                        <hr />

                        <h6>Available Backups</h6>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Backup Name</th>
                                        <th>Date</th>
                                        <th>Size</th>
                                        <th style={{ width: '240px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {backups.map(b => (
                                        <tr key={b.id}>
                                            <td>{b.name}</td>
                                            <td>{new Date(b.date).toLocaleString()}</td>
                                            <td>{b.size}</td>
                                            <td>
                                                <button onClick={() => restoreBackup(b.id)} className="btn btn-sm btn-outline-primary me-1">Restore</button>
                                                <button onClick={() => downloadBackup(b.id)} className="btn btn-sm btn-outline-secondary me-1">Download</button>
                                                <button onClick={() => deleteBackup(b.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <hr />

                        <h6 className="mt-3">Upload Backup</h6>
                        <div className="mb-3">
                            <label className="form-label">Select a backup file (.json) to upload.</label>
                            <input onChange={e => handleBackupUpload(e.target.files?.[0])} type="file" className="form-control" accept=".json" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackupAndRestore;