import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProgram, updateProgram } from '../utils/localStorage';
import usePrograms from '../hooks/usePrograms';
import { STATUSES } from '../components/CustomerDetails/AddEditProgram/useAddEditProgram';
import { useEditableFormContext } from '../contexts/EditableFormContext';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';

const Programs = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const navigate = useNavigate();
  const { addEditProgram, programs, loadPrograms } = useEditableFormContext();
  const {
    filteredPrograms,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    getLeadName,
    getTechnicianName,
    getSiteCount,
    getNextDate,
    getProgress,
    getStatusBadge,
    getFrequencyLabel,
  } = usePrograms(programs);

  useEffect(() => {
    setPageSubHeader({
      title: 'Programs',
      breadcrumbs: [{ label: 'Programs', path: '/programs' }],
    });
  }, [setPageSubHeader]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this program? This will not remove already-created work orders.')) {
      deleteProgram(id);
      loadPrograms();
    }
  };

  const handleToggleStatus = (program) => {
    const newStatus = program.status === 'Active' ? 'Paused' : 'Active';
    updateProgram(program.id, { status: newStatus });
    loadPrograms();
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Programs</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/">Bugworx</Link></li>
                <li className="breadcrumb-item active">Programs</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div className="d-flex gap-2 flex-grow-1 flex-wrap">
                      <div className="flex-grow-1 position-relative" style={{ minWidth: '200px' }}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search programs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoComplete="off"
                        />
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                      <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ width: 'auto', minWidth: '140px' }}
                      >
                        <option value="all">All Statuses</option>
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-2 mt-md-0 flex-shrink-0">
                      <button className="btn btn-primary" onClick={() => addEditProgram.open()}>
                        <i className="bx bx-plus me-1"></i>Add Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Program Name</th>
                      <th>Lead</th>
                      <th>Service Type</th>
                      <th>Frequency</th>
                      <th>Sites</th>
                      <th>Technician</th>
                      <th>Next WO</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrograms.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center text-muted py-4">
                          No programs found
                        </td>
                      </tr>
                    ) : (
                      filteredPrograms.map((program) => {
                        const progress = getProgress(program);
                        return (
                          <tr key={program.id}>
                            <td><span className="fw-semibold">{program.name}</span></td>
                            <td>
                              <Link to="/leads" className="text-body">
                                {getLeadName(program.leadId)}
                              </Link>
                            </td>
                            <td>{program.serviceType}</td>
                            <td>{getFrequencyLabel(program.frequency)}</td>
                            <td>
                              <span className="badge bg-light text-dark">
                                {getSiteCount(program.serviceAddressIds)} site{getSiteCount(program.serviceAddressIds) !== 1 ? 's' : ''}
                              </span>
                            </td>
                            <td>{getTechnicianName(program.assignedTechnicianId)}</td>
                            <td>{getNextDate(program)}</td>
                            <td style={{ minWidth: '120px' }}>
                              {progress ? (
                                <div>
                                  <div className="d-flex justify-content-between mb-1">
                                    <small>{progress.done}/{progress.total}</small>
                                    <small>{progress.pct}%</small>
                                  </div>
                                  <div className="progress" style={{ height: '6px' }}>
                                    <div
                                      className={`progress-bar ${progress.pct === 100 ? 'bg-success' : 'bg-primary'}`}
                                      style={{ width: `${progress.pct}%` }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <span className="text-muted">—</span>
                              )}
                            </td>
                            <td>
                              <span className={`badge ${getStatusBadge(program.status)}`}>
                                {program.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  title="View on Scheduler"
                                  onClick={() => navigate(`/scheduler?programId=${program.id}`)}
                                >
                                  <i className="bx bx-calendar"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  title="Edit"
                                  onClick={() => addEditProgram.open(program)}
                                >
                                  <i className="bx bx-pencil"></i>
                                </button>
                                <button
                                  className={`btn btn-sm ${program.status === 'Active' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                  title={program.status === 'Active' ? 'Pause' : 'Resume'}
                                  onClick={() => handleToggleStatus(program)}
                                >
                                  <i className={`bx ${program.status === 'Active' ? 'bx-pause' : 'bx-play'}`}></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(program.id)}
                                >
                                  <i className="bx bx-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;
