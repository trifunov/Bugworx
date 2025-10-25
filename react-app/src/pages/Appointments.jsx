import { useState } from 'react';
import { Link } from 'react-router-dom';
import { appointments, sites, technicians, accounts } from '../data/mockData';

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getSiteName = (siteId) => {
    const site = sites.find(s => s.id === siteId);
    return site ? site.siteName : 'N/A';
  };

  const getAccountName = (siteId) => {
    const site = sites.find(s => s.id === siteId);
    if (!site) return 'N/A';
    const account = accounts.find(a => a.id === site.accountId);
    return account ? account.name : 'N/A';
  };

  const getTechnicianName = (technicianId) => {
    const tech = technicians.find(t => t.id === technicianId);
    return tech ? tech.name : 'N/A';
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      getAccountName(apt.siteId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getSiteName(apt.siteId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.serviceType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-soft-success';
      case 'Scheduled':
        return 'badge-soft-primary';
      case 'In Progress':
        return 'badge-soft-warning';
      case 'Cancelled':
        return 'badge-soft-danger';
      default:
        return 'badge-soft-secondary';
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Appointments</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><Link to="/">Bugworx</Link></li>
                <li className="breadcrumb-item active">Appointments</li>
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
                <div className="col-xl-4 col-md-6">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mt-2 mt-md-0">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="col-xl-5 col-md-12 mt-2 mt-xl-0 text-end">
                  <button className="btn btn-primary">
                    <i className="bx bx-plus me-1"></i>
                    New Appointment
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Site</th>
                      <th>Service Type</th>
                      <th>Date & Time</th>
                      <th>Technician</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>
                          <span className="fw-bold">#{appointment.id}</span>
                        </td>
                        <td>
                          <h5 className="font-size-14 mb-0">
                            {getAccountName(appointment.siteId)}
                          </h5>
                        </td>
                        <td>{getSiteName(appointment.siteId)}</td>
                        <td>{appointment.serviceType}</td>
                        <td>
                          <div>{appointment.scheduledDate}</div>
                          <div className="text-muted font-size-12">{appointment.scheduledTime}</div>
                        </td>
                        <td>{getTechnicianName(appointment.technicianId)}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-3">
                            <a href="#" className="text-success" title="View">
                              <i className="mdi mdi-eye font-size-18"></i>
                            </a>
                            <a href="#" className="text-primary" title="Edit">
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a href="#" className="text-danger" title="Cancel">
                              <i className="mdi mdi-close-circle font-size-18"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredAppointments.length === 0 && (
                <div className="text-center py-4">
                  <i className="mdi mdi-calendar-remove font-size-48 text-muted"></i>
                  <p className="text-muted mt-2">No appointments found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
