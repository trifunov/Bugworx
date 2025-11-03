import React from 'react';
import { useAuditTrail } from './useAuditTrail';

const AuditTrail = () => {
    const { auditFilter, handleAuditFilterChange, filteredAudit } = useAuditTrail();

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Audit Trail</h5>
                        <p className="text-muted">System-wide log of changes.</p>

                        <div className="mb-3 row">
                            <div className="col-md-4 mb-2">
                                <input value={auditFilter.user} onChange={e => handleAuditFilterChange('user', e.target.value)} className="form-control" placeholder="Filter by User..." />
                            </div>
                            <div className="col-md-4 mb-2">
                                <input value={auditFilter.from} onChange={e => handleAuditFilterChange('from', e.target.value)} type="date" className="form-control" placeholder="From Date" />
                            </div>
                            <div className="col-md-4 mb-2">
                                <input value={auditFilter.to} onChange={e => handleAuditFilterChange('to', e.target.value)} type="date" className="form-control" placeholder="To Date" />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>User</th>
                                        <th>Action</th>
                                        <th>Entity</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAudit.map((row, idx) => (
                                        <tr key={idx}>
                                            <td>{new Date(row.timestamp).toLocaleString()}</td>
                                            <td>{row.user}</td>
                                            <td>{row.action}</td>
                                            <td>{row.entity}</td>
                                            <td>{row.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditTrail;