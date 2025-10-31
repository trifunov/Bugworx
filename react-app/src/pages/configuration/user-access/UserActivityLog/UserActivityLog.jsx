import React from 'react';
import { useUserActivityLog } from './useUserActivityLog';

const UserActivityLog = () => {
  const { logs, addLog, clear } = useUserActivityLog();

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">User Access — Activity Log</h4>
            <div className="page-title-right">
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => addLog('Manual test entry', 'Created sample log')}><i className="mdi mdi-plus me-1"></i> Add Log</button>
                <button className="btn btn-light" onClick={clear}><i className="mdi mdi-delete-outline me-1"></i> Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Activity Log</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover mb-0">
                  <thead className="table-light">
                    <tr><th>Time</th><th>Action</th><th>Details</th></tr>
                  </thead>
                  <tbody>
                    {logs.map(l => (
                      <tr key={l.id}>
                        <td style={{ whiteSpace: 'nowrap' }}>{new Date(l.timestamp).toLocaleString()}</td>
                        <td>{l.action}</td>
                        <td>{l.details}</td>
                      </tr>
                    ))}
                    {logs.length === 0 && <tr><td colSpan={3} className="text-center">No activity</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserActivityLog;