import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { appointments } from '../data/mockData';
import { getSitesByAccountId, addSite, updateSite, addAppointment, getAccounts, addAccount, updateAccount, getProposalsByAccountId, addProposal, updateProposal, deleteProposal } from '../utils/localStorage';
import useAddEditSite from '../hooks/useAddEditSite';
import useScheduleService from '../hooks/useScheduleService';
import useViewReports from '../hooks/useViewReports';
import useAddEditProposal from '../hooks/useAddEditProposal';
import AddEditSite from '../components/AccountActions/AddEditSite';
import ScheduleServiceModal from '../components/AccountActions/ScheduleServiceModal';
import ViewReportsModal from '../components/AccountActions/ViewReportsModal';
import AddEditProposalModal from '../components/AccountActions/AddEditProposalModal';
import useAddEditCustomer from '../hooks/useAddEditCustomer';
import AddEditCustomer from '../components/CustomerDetails/AddEditCustomer';
import AddNewButton from '../components/CustomerDetails/AddNewButton';

const AccountDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(getAccounts());
  const [accountSites, setAccountSites] = useState([]);
  const [accountProposals, setAccountProposals] = useState([]);
  const [proposalSearchTerm, setProposalSearchTerm] = useState('');
  const account = accounts.find(a => a.id === parseInt(id));

  const addEditCustomer = useAddEditCustomer();
  const { isOpen, formData, errors, isSaving, open, close, onUpdateFieldHandle, onSaveHandle } = useAddEditSite(parseInt(id));
  const scheduleService = useScheduleService(parseInt(id));
  const viewReports = useViewReports(parseInt(id));
  const proposalModal = useAddEditProposal(parseInt(id));

  const loadSites = useCallback(() => {
    const sites = getSitesByAccountId(parseInt(id));
    setAccountSites(sites);
  }, [id]);

  const loadProposals = useCallback(() => {
    const proposals = getProposalsByAccountId(parseInt(id));
    setAccountProposals(proposals);
  }, [id]);

  useEffect(() => {
    loadSites();
    loadProposals();
  }, [loadSites, loadProposals]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (action === 'schedule-service') {
      scheduleService.open();
      navigate(`/accounts/${id}`, { replace: true });
    }
  }, [location.search, scheduleService, navigate, id]);

  const loadAccounts = () => {
    const accounts = getAccounts();
    setAccounts(accounts);
  };

  const accountAppointments = appointments.filter(apt => {
    const site = accountSites.find(s => s.id === apt.siteId);
    return site && site.accountId === parseInt(id);
  });



  // Determine which section to display based on the current path
  const pathParts = location.pathname.split('/');
  const section = pathParts[3] || 'overview'; // Default to overview if no section specified

  if (!account) {
    return <div>Account not found</div>;
  }

  // Get section title and breadcrumb
  const getSectionInfo = () => {
    const sections = {
      'overview': { title: 'Account Overview', breadcrumb: 'Overview' },
      'sites': { title: 'Customer Sites', breadcrumb: 'Sites' },
      'appointments': { title: 'Appointments', breadcrumb: 'Appointments' },
      'service-history': { title: 'Service History', breadcrumb: 'Service History' },
      'invoices': { title: 'Invoices', breadcrumb: 'Invoices' },
      'contracts': { title: 'Contracts', breadcrumb: 'Contracts' },
      'proposals': { title: 'Proposals', breadcrumb: 'Proposals' },
      'documents': { title: 'Documents', breadcrumb: 'Documents' },
      'notes': { title: 'Notes', breadcrumb: 'Notes' },
      'create-invoice': { title: 'Create Invoice', breadcrumb: 'Create Invoice' },
      'inspection-points': { title: 'Inspection Points', breadcrumb: 'Inspection Points' }
    };
    return sections[section] || sections['overview'];
  };

  const sectionInfo = getSectionInfo();

  // Render section content based on current section
  const renderSectionContent = () => {
    switch (section) {
      case 'sites':
        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Customer Sites</h5>
                    <button className="btn btn-success btn-sm" onClick={() => open({
                      id: 0,
                    })}>
                      <i className="bx bx-plus me-1"></i>
                      Add Site
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Site Name</th>
                          <th>Type</th>
                          <th>Address</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountSites.map((site) => (
                          <tr key={site.id}>
                            <td>
                              <h5 className="font-size-14 mb-0">
                                <Link to={`/sites/${site.id}`} className="text-body">
                                  {site.siteName}
                                </Link>
                              </h5>
                            </td>
                            <td>{site.siteType}</td>
                            <td>{site.address}</td>
                            <td>
                              <div>{site.contactName}</div>
                              <div className="text-muted font-size-12">{site.contactPhone}</div>
                            </td>
                            <td>
                              <span className={`badge badge-soft-${site.isActive ? 'success' : 'danger'}`}>
                                {site.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-3">
                                <Link to={`/sites/${site.id}`} className="text-success" title="View">
                                  <i className="mdi mdi-eye font-size-18"></i>
                                </Link>
                                <button
                                  onClick={() => open(site)}
                                  className="btn btn-link text-primary p-0"
                                  title="Edit"
                                >
                                  <i className="mdi mdi-pencil font-size-18"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {accountSites.length === 0 && (
                    <div className="text-center py-4">
                      <i className="mdi mdi-home-map-marker font-size-48 text-muted"></i>
                      <p className="text-muted mt-2">No sites found for this customer</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Customer Appointments</h5>
                    <button className="btn btn-primary btn-sm" onClick={scheduleService.open}>
                      <i className="bx bx-calendar-plus me-1"></i>
                      Schedule Service
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Site</th>
                          <th>Service Type</th>
                          <th>Date & Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountAppointments.map((appointment) => {
                          const site = accountSites.find(s => s.id === appointment.siteId);
                          const getStatusBadgeClass = (status) => {
                            switch (status) {
                              case 'Completed': return 'badge-soft-success';
                              case 'Scheduled': return 'badge-soft-primary';
                              case 'In Progress': return 'badge-soft-warning';
                              case 'Cancelled': return 'badge-soft-danger';
                              default: return 'badge-soft-secondary';
                            }
                          };
                          return (
                            <tr key={appointment.id}>
                              <td><span className="fw-bold">#{appointment.id}</span></td>
                              <td>{site?.siteName || 'N/A'}</td>
                              <td>{appointment.serviceType}</td>
                              <td>
                                <div>{appointment.scheduledDate}</div>
                                <div className="text-muted font-size-12">{appointment.scheduledTime}</div>
                              </td>
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
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {accountAppointments.length === 0 && (
                    <div className="text-center py-4">
                      <i className="mdi mdi-calendar-remove font-size-48 text-muted"></i>
                      <p className="text-muted mt-2">No appointments found for this customer</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'service-history':
        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-3">Service History</h5>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Date</th>
                          <th>Site</th>
                          <th>Service Type</th>
                          <th>Technician</th>
                          <th>Duration</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountAppointments.filter(apt => apt.status === 'Completed').map((appointment) => {
                          const site = accountSites.find(s => s.id === appointment.siteId);
                          return (
                            <tr key={appointment.id}>
                              <td>{appointment.scheduledDate}</td>
                              <td>{site?.siteName || 'N/A'}</td>
                              <td>{appointment.serviceType}</td>
                              <td>Technician #{appointment.technicianId}</td>
                              <td>{appointment.duration || '2h'}</td>
                              <td>
                                <a href="#" className="text-primary">View Details</a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {accountAppointments.filter(apt => apt.status === 'Completed').length === 0 && (
                    <div className="text-center py-4">
                      <i className="mdi mdi-history font-size-48 text-muted"></i>
                      <p className="text-muted mt-2">No service history available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Invoices</h5>
                    <Link to={`/accounts/${id}/create-invoice`} className="btn btn-primary btn-sm">
                      <i className="bx bx-file-add me-1"></i>
                      Create Invoice
                    </Link>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>Invoice #</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Due Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><span className="fw-bold">#INV-001</span></td>
                          <td>2024-01-15</td>
                          <td>$250.00</td>
                          <td><span className="badge badge-soft-success">Paid</span></td>
                          <td>2024-02-15</td>
                          <td>
                            <div className="d-flex gap-3">
                              <a href="#" className="text-success" title="View">
                                <i className="mdi mdi-eye font-size-18"></i>
                              </a>
                              <a href="#" className="text-primary" title="Download">
                                <i className="mdi mdi-download font-size-18"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center py-4">
                    <i className="mdi mdi-file-document-outline font-size-48 text-muted"></i>
                    <p className="text-muted mt-2">Invoice management coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contracts':
        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Service Contracts</h5>
                    <button className="btn btn-primary btn-sm">
                      <i className="bx bx-plus me-1"></i>
                      New Contract
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card border border-success">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="card-title mb-0">Annual Pest Control</h5>
                            <span className="badge badge-soft-success">Active</span>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <th className="text-muted" scope="row">Start Date:</th>
                                  <td>Jan 1, 2024</td>
                                </tr>
                                <tr>
                                  <th className="text-muted" scope="row">End Date:</th>
                                  <td>Dec 31, 2024</td>
                                </tr>
                                <tr>
                                  <th className="text-muted" scope="row">Value:</th>
                                  <td>$1,200/year</td>
                                </tr>
                                <tr>
                                  <th className="text-muted" scope="row">Services:</th>
                                  <td>Quarterly treatments</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-3">
                            <button className="btn btn-sm btn-primary me-2">View Details</button>
                            <button className="btn btn-sm btn-outline-secondary">Renew</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'proposals': {
        const getStatusBadgeClass = (status) => {
          switch (status) {
            case 'Accepted':
              return 'badge-soft-success';
            case 'Sent':
              return 'badge-soft-primary';
            case 'Draft':
              return 'badge-soft-secondary';
            case 'Rejected':
              return 'badge-soft-danger';
            case 'Withdrawn':
              return 'badge-soft-warning';
            default:
              return 'badge-soft-secondary';
          }
        };

        const formatDate = (dateString) => {
          if (!dateString) return 'N/A';
          return new Date(dateString).toLocaleDateString();
        };

        const handleEditProposal = (proposal) => {
          proposalModal.open(proposal);
        };

        const handleDeleteProposal = (proposalId) => {
          if (window.confirm('Are you sure you want to delete this proposal?')) {
            deleteProposal(proposalId);
            loadProposals();
          }
        };

        const filteredProposals = accountProposals.filter((proposal) => {
          const q = proposalSearchTerm.toLowerCase();
          return (
            (proposal.proposalTitle && proposal.proposalTitle.toLowerCase().includes(q)) ||
            (proposal.proposalNumber && proposal.proposalNumber.toLowerCase().includes(q)) ||
            (proposal.status && proposal.status.toLowerCase().includes(q))
          );
        });

        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                        <div className="flex-grow-1 w-100 me-md-3">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search proposals..."
                              value={proposalSearchTerm}
                              onChange={(e) => setProposalSearchTerm(e.target.value)}
                              autoComplete="off"
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>

                        <div className="mt-2 mt-md-0">
                          <AddNewButton handleAddNew={() => proposalModal.open()} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Proposal #</th>
                          <th>Title</th>
                          <th>Pricing</th>
                          <th>Created Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProposals.map((proposal) => (
                          <tr key={proposal.id}>
                            <td>
                              <span className="fw-bold">{proposal.proposalNumber}</span>
                            </td>
                            <td>{proposal.proposalTitle}</td>
                            <td>
                              <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                {proposal.pricing}
                              </div>
                            </td>
                            <td>{formatDate(proposal.createdAt)}</td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(proposal.status)}`}>
                                {proposal.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-3">
                                <a
                                  href="#"
                                  className="text-primary"
                                  title="Edit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleEditProposal(proposal);
                                  }}
                                >
                                  <i className="mdi mdi-pencil font-size-18"></i>
                                </a>
                                <a
                                  href="#"
                                  className="text-danger"
                                  title="Delete"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteProposal(proposal.id);
                                  }}
                                >
                                  <i className="mdi mdi-delete font-size-18"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredProposals.length === 0 && (
                    <div className="text-center py-4">
                      <i className="mdi mdi-file-document-outline font-size-48 text-muted"></i>
                      <p className="text-muted mt-2">No proposals found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'documents':
        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Documents</h5>
                    <button className="btn btn-primary btn-sm">
                      <i className="bx bx-upload me-1"></i>
                      Upload Document
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>File Name</th>
                          <th>Type</th>
                          <th>Size</th>
                          <th>Uploaded</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <i className="mdi mdi-file-pdf text-danger me-2"></i>
                            Service Agreement.pdf
                          </td>
                          <td>Contract</td>
                          <td>245 KB</td>
                          <td>2024-01-15</td>
                          <td>
                            <div className="d-flex gap-3">
                              <a href="#" className="text-primary" title="Download">
                                <i className="mdi mdi-download font-size-18"></i>
                              </a>
                              <a href="#" className="text-danger" title="Delete">
                                <i className="mdi mdi-delete font-size-18"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center py-4">
                    <i className="mdi mdi-folder-open font-size-48 text-muted"></i>
                    <p className="text-muted mt-2">Document management coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="card-title mb-0">Notes</h5>
                    <button className="btn btn-primary btn-sm">
                      <i className="bx bx-plus me-1"></i>
                      Add Note
                    </button>
                  </div>
                  <div className="mb-4">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-start">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <span className="avatar-title rounded-circle bg-primary text-white">
                                A
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-14 mb-1">Admin User</h5>
                            <p className="text-muted font-size-12 mb-2">2024-01-20 10:30 AM</p>
                            <p className="mb-0">Customer prefers morning appointments. Has a dog that needs to be secured before service.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-start">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-sm">
                              <span className="avatar-title rounded-circle bg-success text-white">
                                T
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="font-size-14 mb-1">Technician</h5>
                            <p className="text-muted font-size-12 mb-2">2024-01-15 2:15 PM</p>
                            <p className="mb-0">Noticed increased activity in garage area. Recommended quarterly treatment upgrade.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-invoice':
        return (
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Create Invoice</h5>
                  <form>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Invoice Date</label>
                      <div className="col-md-9">
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Due Date</label>
                      <div className="col-md-9">
                        <input type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Related Service</label>
                      <div className="col-md-9">
                        <select className="form-select">
                          <option value="">Choose service...</option>
                          {accountAppointments.filter(apt => apt.status === 'Completed').map(apt => (
                            <option key={apt.id} value={apt.id}>
                              {apt.serviceType} - {apt.scheduledDate}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Amount</label>
                      <div className="col-md-9">
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input type="number" className="form-control" placeholder="0.00" step="0.01" />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-md-3 col-form-label">Description</label>
                      <div className="col-md-9">
                        <textarea className="form-control" rows="3" placeholder="Invoice description..."></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-9 offset-md-3">
                        <button type="submit" className="btn btn-primary me-2">
                          <i className="bx bx-check me-1"></i>
                          Create Invoice
                        </button>
                        <Link to={`/accounts/${id}/invoices`} className="btn btn-secondary">
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        // Overview section
        return (
          <>
            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-start mb-4">
                      <div className="flex-grow-1">
                        <h5 className="font-size-16 mb-1">{account.name}</h5>
                        <p className="text-muted mb-0">{account.accountNum}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`badge badge-soft-${account.isActive ? 'success' : 'danger'} font-size-12`}>
                          {account.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-size-14 mb-3">Account Information</h6>
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="text-muted" scope="row">Account Type:</th>
                                <td>{account.accountType === 1 ? 'Residential' : 'Commercial'}</td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">Registration #:</th>
                                <td>{account.registrationNum}</td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">Send Invoice:</th>
                                <td>{account.sendInvoice ? 'Yes' : 'No'}</td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">Email Invoice:</th>
                                <td>{account.emailInvoice ? 'Yes' : 'No'}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <h6 className="font-size-14 mb-3">Billing Contact</h6>
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="text-muted" scope="row">Name:</th>
                                <td>{account.billingContact?.name || account.primaryContactPerson}</td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">Email:</th>
                                <td>{account.billingContact?.email || account.email}</td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">Phone:</th>
                                <td>{account.billingContact?.phone || account.phone}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h6 className="font-size-14 mb-3">Billing Address</h6>
                      <p className="mb-0">
                        {account.billingAddress?.street || ''}<br />
                        {account.billingAddress?.city || ''}, {account.billingAddress?.state || ''} {account.billingAddress?.zip || ''}
                      </p>
                    </div>

                    {account.instructions && (
                      <div className="mt-4">
                        <h6 className="font-size-14 mb-3">Instructions</h6>
                        <p className="text-muted mb-0">{account.instructions}</p>
                      </div>
                    )}

                    {account.primaryNote && (
                      <div className="mt-4">
                        <h6 className="font-size-14 mb-3">Notes</h6>
                        <p className="text-muted mb-0">{account.primaryNote}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Associated Sites</h5>
                    <div className="table-responsive">
                      <table className="table align-middle table-nowrap">
                        <thead className="table-light">
                          <tr>
                            <th>Site Name</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accountSites.map((site) => (
                            <tr key={site.id}>
                              <td>
                                <Link to={`/sites/${site.id}`} className="text-body">
                                  {site.siteName}
                                </Link>
                              </td>
                              <td>{site.siteType}</td>
                              <td>{site.address}</td>
                              <td>
                                <span className={`badge badge-soft-${site.isActive ? 'success' : 'danger'}`}>
                                  {site.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => open(site)}
                                >
                                  <i className="mdi mdi-pencil me-1"></i>
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Actions</h5>
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary" onClick={() => addEditCustomer.open(account)}>
                        <i className="bx bx-edit me-1"></i>
                        Edit Account
                      </button>
                      <button className="btn btn-success" onClick={() => open({ id: 0 })}>
                        <i className="bx bx-plus me-1"></i>
                        Add Site
                      </button>
                      <button className="btn btn-info" onClick={scheduleService.open}>
                        <i className="bx bx-calendar me-1"></i>
                        Schedule Service
                      </button>
                      <button className="btn btn-secondary" onClick={viewReports.open}>
                        <i className="bx bx-file me-1"></i>
                        View Reports
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Quick Stats</h5>
                    <div className="text-center">
                      <div className="row">
                        <div className="col-6">
                          <div className="mt-4">
                            <p className="text-muted mb-1">Total Sites</p>
                            <h5>{accountSites.length}</h5>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mt-4">
                            <p className="text-muted mb-1">Active Sites</p>
                            <h5>{accountSites.filter(s => s.isActive).length}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">{sectionInfo.title}</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="/accounts">Accounts</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/accounts/${id}`}>{account.accountNum}</Link>
                </li>
                <li className="breadcrumb-item active">{sectionInfo.breadcrumb}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {renderSectionContent()}

      <AddEditCustomer
        isOpen={addEditCustomer.isOpen}
        formData={addEditCustomer.formData}
        errors={addEditCustomer.errors}
        isSaving={addEditCustomer.isSaving}
        onUpdateField={addEditCustomer.onUpdateFieldHandle}
        onClose={addEditCustomer.close}
        onSave={() => addEditCustomer.onSaveHandle((data) => {
          let updatedCustomer = null;
          if (data.id && data.id !== 0) {
            updatedCustomer = updateAccount(data.id, data);
          }
          else {
            updatedCustomer = addAccount(data);
          }
          loadAccounts();
          return updatedCustomer;
        })}
      />

      <AddEditSite
        isOpen={isOpen}
        formData={formData}
        errors={errors}
        isSaving={isSaving}
        onUpdateField={onUpdateFieldHandle}
        onClose={close}
        onSave={() => onSaveHandle((data) => {
          let updatedSite = null;
          if (data.id && data.id !== 0) {
            updatedSite = updateSite(data.id, data);
          }
          else {
            updatedSite = addSite(data);
          }
          loadSites();
          return updatedSite;
        })}
      />

      <ScheduleServiceModal
        isOpen={scheduleService.isOpen}
        formData={scheduleService.formData}
        errors={scheduleService.errors}
        isSaving={scheduleService.isSaving}
        accountSites={accountSites}
        onUpdateField={scheduleService.updateField}
        onClose={scheduleService.close}
        onSave={() => scheduleService.save((data) => {
          const newAppointment = addAppointment(data);
          return newAppointment;
        })}
      />

      <ViewReportsModal
        isOpen={viewReports.isOpen}
        selectedReportType={viewReports.selectedReportType}
        dateRange={viewReports.dateRange}
        onSelectReportType={viewReports.selectReportType}
        onUpdateDateRange={viewReports.updateDateRange}
        onClose={viewReports.close}
        onGenerate={viewReports.generateReport}
        accountId={parseInt(id)}
      />

      <AddEditProposalModal
        isOpen={proposalModal.isOpen}
        formData={proposalModal.formData}
        errors={proposalModal.errors}
        isSaving={proposalModal.isSaving}
        onUpdateField={proposalModal.onUpdateFieldHandle}
        onClose={proposalModal.close}
        onSave={() => proposalModal.onSaveHandle(async (data) => {
          if (data.id) {
            updateProposal(data.id, data);
          } else {
            addProposal(data);
          }
          loadProposals();
        })}
        onFileUpload={proposalModal.handleFileUpload}
        onRemoveAttachment={proposalModal.removeAttachment}
      />
    </>
  );
};

export default AccountDetail;
