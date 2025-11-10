import React from 'react';
import { useUserActivityLog } from './useUserActivityLog';

const UserActivityLog = () => {
  const { logs, addLog, clear } = useUserActivityLog();

  return (
    <>
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