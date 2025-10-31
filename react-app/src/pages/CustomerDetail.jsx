import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { appointments } from "../data/mockData";
import {
  getServiceAddressesByCustomerId,
  addServiceAddress,
  updateServiceAddress,
  addAppointment,
  getCustomers,
  addCustomer,
  updateCustomer,
  getProposalsByCustomerId,
  addProposal,
  updateProposal,
  deleteProposal,
} from "../utils/localStorage";
import useAddEditServiceAddress from "../components/CustomerDetails/AddEditServiceAddress/useAddEditServiceAddress";
import useScheduleService from "../hooks/useScheduleService";
import useViewReports from "../hooks/useViewReports";
import useAddEditProposal from "../hooks/useAddEditProposal";
import useCreateInvoice from "../hooks/useCreateInvoice";
import AddEditServiceAddress from "../components/CustomerDetails/AddEditServiceAddress/AddEditServiceAddress";
import ScheduleServiceModal from "../components/CustomerActions/ScheduleServiceModal";
import ViewReportsModal from "../components/CustomerActions/ViewReportsModal";
import AddEditProposalModal from "../components/CustomerActions/AddEditProposalModal";
import CreateInvoiceModal from "../components/CustomerActions/CreateInvoiceModal";
import useAddEditCustomer from "../components/CustomerDetails/AddEditCustomer/useAddEditCustomer";
import AddEditCustomer from "../components/CustomerDetails/AddEditCustomer/AddEditCustomer";
import AddNewButton from "../components/Common/AddNewButton";

const CustomerDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(getCustomers());
  const [customerServiceAddresses, setCustomerServiceAddresses] = useState([]);
  const [customerProposals, setCustomerProposals] = useState([]);
  const [proposalSearchTerm, setProposalSearchTerm] = useState("");
  const [serviceAddressSearchTerm, setServiceAddressSearchTerm] = useState("");
  const [appointmentSearchTerm, setAppointmentSearchTerm] = useState("");
  const [serviceHistorySearchTerm, setServiceHistorySearchTerm] = useState("");
  const customer = customers.find((a) => a.id === parseInt(id));

  const addEditCustomer = useAddEditCustomer();
  const {
    isOpen,
    formData,
    errors,
    isSaving,
    open,
    close,
    onUpdateFieldHandle,
    onSaveHandle,
  } = useAddEditServiceAddress(parseInt(id));
  const scheduleService = useScheduleService(parseInt(id));
  const viewReports = useViewReports(parseInt(id));
  const proposalModal = useAddEditProposal(parseInt(id));
  const createInvoice = useCreateInvoice(parseInt(id));

  const loadServiceAddresses = useCallback(() => {
    const serviceAddresses = getServiceAddressesByCustomerId(parseInt(id));
    setCustomerServiceAddresses(serviceAddresses);
  }, [id]);

  const loadProposals = useCallback(() => {
    const proposals = getProposalsByCustomerId(parseInt(id));
    setCustomerProposals(proposals);
  }, [id]);

  useEffect(() => {
    loadServiceAddresses();
    loadProposals();
  }, [loadServiceAddresses, loadProposals]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get("action");
    if (action === "schedule-service") {
      scheduleService.open();
      navigate(`/customers/${id}`, { replace: true });
    } else if (action === "create-invoice") {
      createInvoice.open();
      navigate(`/customers/${id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, navigate, id]);

  const loadCustomers = () => {
    const customers = getCustomers();
    setCustomers(customers);
  };

  const customerAppointments = appointments.filter((apt) => {
    const serviceAddress = customerServiceAddresses.find(
      (s) => s.id === apt.serviceAddressId
    );
    return serviceAddress && serviceAddress.customerId === parseInt(id);
  });

  // Determine which section to display based on the current path
  const pathParts = location.pathname.split("/");
  const section = pathParts[3] || "overview"; // Default to overview if no section specified

  if (!customer) {
    return <div>Customer not found</div>;
  }

  // Get section title and breadcrumb
  const getSectionInfo = () => {
    const sections = {
      overview: { title: "Customer Overview", breadcrumb: "Overview" },
      "service-addresses": {
        title: "Customer Service Addresses",
        breadcrumb: "Service Addresses",
      },
      appointments: { title: "Appointments", breadcrumb: "Appointments" },
      "service-history": {
        title: "Service History",
        breadcrumb: "Service History",
      },
      invoices: { title: "Invoices", breadcrumb: "Invoices" },
      contracts: { title: "Contracts", breadcrumb: "Contracts" },
      proposals: { title: "Proposals", breadcrumb: "Proposals" },
      documents: { title: "Documents", breadcrumb: "Documents" },
      notes: { title: "Notes", breadcrumb: "Notes" },
      "inspection-points": {
        title: "Inspection Points",
        breadcrumb: "Inspection Points",
      },
    };
    return sections[section] || sections["overview"];
  };

  const sectionInfo = getSectionInfo();

  // Render section content based on current section
  const renderSectionContent = () => {
    switch (section) {
      case "service-addresses":
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
                              placeholder="Search service addresses..."
                              value={serviceAddressSearchTerm}
                              onChange={(e) =>
                                setServiceAddressSearchTerm(e.target.value)
                              }
                              autoComplete="off"
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>

                        <div className="mt-2 mt-md-0">
                          <AddNewButton
                            handleAddNew={() =>
                              open({
                                id: 0,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Service Address Name</th>
                          <th>Type</th>
                          <th>Address</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerServiceAddresses
                          .filter((serviceAddress) => {
                            const q = serviceAddressSearchTerm.toLowerCase();
                            return (
                              (serviceAddress.serviceAddressName &&
                                serviceAddress.serviceAddressName
                                  .toLowerCase()
                                  .includes(q)) ||
                              (serviceAddress.serviceAddressType &&
                                serviceAddress.serviceAddressType
                                  .toLowerCase()
                                  .includes(q)) ||
                              (serviceAddress.address &&
                                serviceAddress.address.toLowerCase().includes(q)) ||
                              (serviceAddress.contactName &&
                                serviceAddress.contactName
                                  .toLowerCase()
                                  .includes(q))
                            );
                          })
                          .map((serviceAddress) => (
                            <tr key={serviceAddress.id}>
                            <td>
                              <h5 className="font-size-14 mb-0">
                                <Link
                                  to={`/service-addresses/${serviceAddress.id}`}
                                  className="text-body"
                                >
                                  {serviceAddress.serviceAddressName}
                                </Link>
                              </h5>
                            </td>
                            <td>{serviceAddress.serviceAddressType}</td>
                            <td>{serviceAddress.address}</td>
                            <td>
                              <div>{serviceAddress.contactName}</div>
                              <div className="text-muted font-size-12">
                                {serviceAddress.contactPhone}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge badge-soft-${
                                  serviceAddress.isActive ? "success" : "danger"
                                }`}
                              >
                                {serviceAddress.isActive
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-3">
                                <Link
                                  to={`/service-addresses/${serviceAddress.id}`}
                                  className="text-success"
                                  title="View"
                                >
                                  <i className="mdi mdi-eye font-size-18"></i>
                                </Link>
                                <a
                                  href="#"
                                  className="text-primary"
                                  title="Edit"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    open(serviceAddress);
                                  }}
                                >
                                  <i className="mdi mdi-pencil font-size-18"></i>
                                </a>
                                <a href="#" className="text-danger" title="Delete">
                                  <i className="mdi mdi-delete font-size-18"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {customerServiceAddresses.filter((serviceAddress) => {
                    const q = serviceAddressSearchTerm.toLowerCase();
                    return (
                      (serviceAddress.serviceAddressName &&
                        serviceAddress.serviceAddressName
                          .toLowerCase()
                          .includes(q)) ||
                      (serviceAddress.serviceAddressType &&
                        serviceAddress.serviceAddressType
                          .toLowerCase()
                          .includes(q)) ||
                      (serviceAddress.address &&
                        serviceAddress.address.toLowerCase().includes(q)) ||
                      (serviceAddress.contactName &&
                        serviceAddress.contactName.toLowerCase().includes(q))
                    );
                  }).length === 0 && (
                    <div className="text-center py-4">
                      <i className="mdi mdi-home-map-marker font-size-48 text-muted"></i>
                      <p className="text-muted mt-2">
                        No service addresses found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "appointments":
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
                              placeholder="Search appointments..."
                              value={appointmentSearchTerm}
                              onChange={(e) =>
                                setAppointmentSearchTerm(e.target.value)
                              }
                              autoComplete="off"
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>

                        <div className="mt-2 mt-md-0">
                          <AddNewButton
                            handleAddNew={scheduleService.open}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>ID</th>
                          <th>Service Address</th>
                          <th>Service Type</th>
                          <th>Date & Time</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerAppointments
                          .filter((appointment) => {
                            const q = appointmentSearchTerm.toLowerCase();
                            const serviceAddress = customerServiceAddresses.find(
                              (s) => s.id === appointment.serviceAddressId
                            );
                            return (
                              appointment.id.toString().includes(q) ||
                              (serviceAddress?.serviceAddressName &&
                                serviceAddress.serviceAddressName
                                  .toLowerCase()
                                  .includes(q)) ||
                              (appointment.serviceType &&
                                appointment.serviceType.toLowerCase().includes(q)) ||
                              (appointment.scheduledDate &&
                                appointment.scheduledDate.toLowerCase().includes(q)) ||
                              (appointment.status &&
                                appointment.status.toLowerCase().includes(q))
                            );
                          })
                          .map((appointment) => {
                            const serviceAddress = customerServiceAddresses.find(
                              (s) => s.id === appointment.serviceAddressId
                            );
                          const getStatusBadgeClass = (status) => {
                            switch (status) {
                              case "Completed":
                                return "badge-soft-success";
                              case "Scheduled":
                                return "badge-soft-primary";
                              case "In Progress":
                                return "badge-soft-warning";
                              case "Cancelled":
                                return "badge-soft-danger";
                              default:
                                return "badge-soft-secondary";
                            }
                          };
                          return (
                            <tr key={appointment.id}>
                              <td>
                                <span className="fw-bold">
                                  #{appointment.id}
                                </span>
                              </td>
                              <td>
                                {serviceAddress?.serviceAddressName || "N/A"}
                              </td>
                              <td>{appointment.serviceType}</td>
                              <td>
                                <div>{appointment.scheduledDate}</div>
                                <div className="text-muted font-size-12">
                                  {appointment.scheduledTime}
                                </div>
                              </td>
                              <td>
                                <span
                                  className={`badge ${getStatusBadgeClass(
                                    appointment.status
                                  )}`}
                                >
                                  {appointment.status}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-3">
                                  <a
                                    href="#"
                                    className="text-success"
                                    title="View"
                                  >
                                    <i className="mdi mdi-eye font-size-18"></i>
                                  </a>
                                  <a
                                    href="#"
                                    className="text-primary"
                                    title="Edit"
                                  >
                                    <i className="mdi mdi-pencil font-size-18"></i>
                                  </a>
                                  <a
                                    href="#"
                                    className="text-danger"
                                    title="Cancel"
                                  >
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
                  {customerAppointments.filter((appointment) => {
                    const q = appointmentSearchTerm.toLowerCase();
                    const serviceAddress = customerServiceAddresses.find(
                      (s) => s.id === appointment.serviceAddressId
                    );
                    return (
                      appointment.id.toString().includes(q) ||
                      (serviceAddress?.serviceAddressName &&
                        serviceAddress.serviceAddressName
                          .toLowerCase()
                          .includes(q)) ||
                      (appointment.serviceType &&
                        appointment.serviceType.toLowerCase().includes(q)) ||
                      (appointment.scheduledDate &&
                        appointment.scheduledDate.toLowerCase().includes(q)) ||
                      (appointment.status &&
                        appointment.status.toLowerCase().includes(q))
                    );
                  }).length === 0 && (
                    <div className="text-center py-4">
                      <i className="mdi mdi-calendar-remove font-size-48 text-muted"></i>
                      <p className="text-muted mt-2">
                        No appointments found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "service-history":
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
                              placeholder="Search service history..."
                              value={serviceHistorySearchTerm}
                              onChange={(e) =>
                                setServiceHistorySearchTerm(e.target.value)
                              }
                              autoComplete="off"
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Date</th>
                          <th>Service Address</th>
                          <th>Service Type</th>
                          <th>Technician</th>
                          <th>Duration</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerAppointments
                          .filter((apt) => {
                            if (apt.status !== "Completed") return false;
                            const q = serviceHistorySearchTerm.toLowerCase();
                            const serviceAddress = customerServiceAddresses.find(
                              (s) => s.id === apt.serviceAddressId
                            );
                            return (
                              (apt.scheduledDate &&
                                apt.scheduledDate.toLowerCase().includes(q)) ||
                              (serviceAddress?.serviceAddressName &&
                                serviceAddress.serviceAddressName
                                  .toLowerCase()
                                  .includes(q)) ||
                              (apt.serviceType &&
                                apt.serviceType.toLowerCase().includes(q)) ||
                              (apt.technicianId &&
                                apt.technicianId.toString().includes(q)) ||
                              (apt.duration && apt.duration.toLowerCase().includes(q))
                            );
                          })
                          .map((appointment) => {
                            const serviceAddress =
                              customerServiceAddresses.find(
                                (s) => s.id === appointment.serviceAddressId
                              );
                            return (
                              <tr key={appointment.id}>
                                <td>{appointment.scheduledDate}</td>
                                <td>
                                  {serviceAddress?.serviceAddressName || "N/A"}
                                </td>
                                <td>{appointment.serviceType}</td>
                                <td>Technician #{appointment.technicianId}</td>
                                <td>{appointment.duration || "2h"}</td>
                                <td>
                                  <a href="#" className="text-primary">
                                    View Details
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  {customerAppointments.filter((apt) => {
                    if (apt.status !== "Completed") return false;
                    const q = serviceHistorySearchTerm.toLowerCase();
                    const serviceAddress = customerServiceAddresses.find(
                      (s) => s.id === apt.serviceAddressId
                    );
                    return (
                      (apt.scheduledDate &&
                        apt.scheduledDate.toLowerCase().includes(q)) ||
                      (serviceAddress?.serviceAddressName &&
                        serviceAddress.serviceAddressName
                          .toLowerCase()
                          .includes(q)) ||
                      (apt.serviceType &&
                        apt.serviceType.toLowerCase().includes(q)) ||
                      (apt.technicianId &&
                        apt.technicianId.toString().includes(q)) ||
                      (apt.duration && apt.duration.toLowerCase().includes(q))
                    );
                  }).length === 0 && (
                    <div className="text-center py-4">
                      <i className="mdi mdi-history font-size-48 text-muted"></i>
                      <p className="text-muted mt-2">
                        No service history found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "invoices":
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
                              placeholder="Search invoices..."
                              autoComplete="off"
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>

                        <div className="mt-2 mt-md-0">
                          <AddNewButton
                            handleAddNew={createInvoice.open}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-dark">
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
                          <td>
                            <span className="fw-bold">#INV-001</span>
                          </td>
                          <td>2024-01-15</td>
                          <td>$250.00</td>
                          <td>
                            <span className="badge badge-soft-success">
                              Paid
                            </span>
                          </td>
                          <td>2024-02-15</td>
                          <td>
                            <div className="d-flex gap-3">
                              <a href="#" className="text-success" title="View">
                                <i className="mdi mdi-eye font-size-18"></i>
                              </a>
                              <a
                                href="#"
                                className="text-primary"
                                title="Download"
                              >
                                <i className="mdi mdi-download font-size-18"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "contracts":
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
                            <h5 className="card-title mb-0">
                              Annual Pest Control
                            </h5>
                            <span className="badge badge-soft-success">
                              Active
                            </span>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <th className="text-muted" scope="row">
                                    Start Date:
                                  </th>
                                  <td>Jan 1, 2024</td>
                                </tr>
                                <tr>
                                  <th className="text-muted" scope="row">
                                    End Date:
                                  </th>
                                  <td>Dec 31, 2024</td>
                                </tr>
                                <tr>
                                  <th className="text-muted" scope="row">
                                    Value:
                                  </th>
                                  <td>$1,200/year</td>
                                </tr>
                                <tr>
                                  <th className="text-muted" scope="row">
                                    Services:
                                  </th>
                                  <td>Quarterly treatments</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-3">
                            <button className="btn btn-sm btn-primary me-2">
                              View Details
                            </button>
                            <button className="btn btn-sm btn-outline-secondary">
                              Renew
                            </button>
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

      case "proposals": {
        const getStatusBadgeClass = (status) => {
          switch (status) {
            case "Accepted":
              return "badge-soft-success";
            case "Sent":
              return "badge-soft-primary";
            case "Draft":
              return "badge-soft-secondary";
            case "Rejected":
              return "badge-soft-danger";
            case "Withdrawn":
              return "badge-soft-warning";
            default:
              return "badge-soft-secondary";
          }
        };

        const formatDate = (dateString) => {
          if (!dateString) return "N/A";
          return new Date(dateString).toLocaleDateString();
        };

        const handleEditProposal = (proposal) => {
          proposalModal.open(proposal);
        };

        const handleDeleteProposal = (proposalId) => {
          if (
            window.confirm("Are you sure you want to delete this proposal?")
          ) {
            deleteProposal(proposalId);
            loadProposals();
          }
        };

        const filteredProposals = customerProposals.filter((proposal) => {
          const q = proposalSearchTerm.toLowerCase();
          return (
            (proposal.proposalTitle &&
              proposal.proposalTitle.toLowerCase().includes(q)) ||
            (proposal.proposalNumber &&
              proposal.proposalNumber.toLowerCase().includes(q)) ||
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
                              onChange={(e) =>
                                setProposalSearchTerm(e.target.value)
                              }
                              autoComplete="off"
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>

                        <div className="mt-2 mt-md-0">
                          <AddNewButton
                            handleAddNew={() => proposalModal.open()}
                          />
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
                              <span className="fw-bold">
                                {proposal.proposalNumber}
                              </span>
                            </td>
                            <td>{proposal.proposalTitle}</td>
                            <td>
                              <div
                                className="text-truncate"
                                style={{ maxWidth: "200px" }}
                              >
                                {proposal.pricing}
                              </div>
                            </td>
                            <td>{formatDate(proposal.createdAt)}</td>
                            <td>
                              <span
                                className={`badge ${getStatusBadgeClass(
                                  proposal.status
                                )}`}
                              >
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

      case "documents":
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
                              placeholder="Search documents..."
                              autoComplete="off"
                            />
                            <i className="bx bx-search-alt search-icon"></i>
                          </div>
                        </div>

                        <div className="mt-2 mt-md-0">
                          <button className="btn btn-primary btn-sm">
                            <i className="bx bx-upload me-1"></i>
                            Upload Document
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-dark">
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
                              <a
                                href="#"
                                className="text-primary"
                                title="Download"
                              >
                                <i className="mdi mdi-download font-size-18"></i>
                              </a>
                              <a
                                href="#"
                                className="text-danger"
                                title="Delete"
                              >
                                <i className="mdi mdi-delete font-size-18"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "notes":
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
                            <p className="text-muted font-size-12 mb-2">
                              2024-01-20 10:30 AM
                            </p>
                            <p className="mb-0">
                              Customer prefers morning appointments. Has a dog
                              that needs to be secured before service.
                            </p>
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
                            <p className="text-muted font-size-12 mb-2">
                              2024-01-15 2:15 PM
                            </p>
                            <p className="mb-0">
                              Noticed increased activity in garage area.
                              Recommended quarterly treatment upgrade.
                            </p>
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
                        <h5 className="font-size-16 mb-1">{customer.name}</h5>
                        <p className="text-muted mb-0">
                          {customer.customerNum}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`badge badge-soft-${
                            customer.isActive ? "success" : "danger"
                          } font-size-12`}
                        >
                          {customer.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-size-14 mb-3">
                          Customer Information
                        </h6>
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="text-muted" scope="row">
                                  Customer Type:
                                </th>
                                <td>
                                  {customer.customerType === 1
                                    ? "Residential"
                                    : "Commercial"}
                                </td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">
                                  Registration #:
                                </th>
                                <td>{customer.registrationNum}</td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">
                                  Send Invoice:
                                </th>
                                <td>{customer.sendInvoice ? "Yes" : "No"}</td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">
                                  Email Invoice:
                                </th>
                                <td>{customer.emailInvoice ? "Yes" : "No"}</td>
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
                                <th className="text-muted" scope="row">
                                  Name:
                                </th>
                                <td>
                                  {customer.billingContact?.name ||
                                    customer.primaryContactPerson}
                                </td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">
                                  Email:
                                </th>
                                <td>
                                  {customer.billingContact?.email ||
                                    customer.email}
                                </td>
                              </tr>
                              <tr>
                                <th className="text-muted" scope="row">
                                  Phone:
                                </th>
                                <td>
                                  {customer.billingContact?.phone ||
                                    customer.phone}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h6 className="font-size-14 mb-3">Billing Address</h6>
                      <p className="mb-0">
                        {customer.billingAddress?.street || ""}
                        <br />
                        {customer.billingAddress?.city || ""},{" "}
                        {customer.billingAddress?.state || ""}{" "}
                        {customer.billingAddress?.zip || ""}
                      </p>
                    </div>

                    {customer.instructions && (
                      <div className="mt-4">
                        <h6 className="font-size-14 mb-3">Instructions</h6>
                        <p className="text-muted mb-0">
                          {customer.instructions}
                        </p>
                      </div>
                    )}

                    {customer.primaryNote && (
                      <div className="mt-4">
                        <h6 className="font-size-14 mb-3">Notes</h6>
                        <p className="text-muted mb-0">
                          {customer.primaryNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

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
                                placeholder="Search service addresses..."
                                value={serviceAddressSearchTerm}
                                onChange={(e) =>
                                  setServiceAddressSearchTerm(e.target.value)
                                }
                                autoComplete="off"
                              />
                              <i className="bx bx-search-alt search-icon"></i>
                            </div>
                          </div>

                          <div className="mt-2 mt-md-0">
                            <AddNewButton
                              handleAddNew={() => open({ id: 0 })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table align-middle table-nowrap table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Service Address Name</th>
                            <th>Type</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerServiceAddresses
                            .filter((serviceAddress) => {
                              const q = serviceAddressSearchTerm.toLowerCase();
                              return (
                                (serviceAddress.serviceAddressName &&
                                  serviceAddress.serviceAddressName
                                    .toLowerCase()
                                    .includes(q)) ||
                                (serviceAddress.serviceAddressType &&
                                  serviceAddress.serviceAddressType
                                    .toLowerCase()
                                    .includes(q)) ||
                                (serviceAddress.address &&
                                  serviceAddress.address
                                    .toLowerCase()
                                    .includes(q)) ||
                                (serviceAddress.contactName &&
                                  serviceAddress.contactName
                                    .toLowerCase()
                                    .includes(q))
                              );
                            })
                            .map((serviceAddress) => (
                              <tr key={serviceAddress.id}>
                                <td>
                                  <h5 className="font-size-14 mb-0">
                                    <Link
                                      to={`/service-addresses/${serviceAddress.id}`}
                                      className="text-body"
                                    >
                                      {serviceAddress.serviceAddressName}
                                    </Link>
                                  </h5>
                                </td>
                                <td>{serviceAddress.serviceAddressType}</td>
                                <td>{serviceAddress.address}</td>
                                <td>
                                  <div>{serviceAddress.contactName}</div>
                                  <div className="text-muted font-size-12">
                                    {serviceAddress.contactPhone}
                                  </div>
                                </td>
                                <td>
                                  <span
                                    className={`badge badge-soft-${
                                      serviceAddress.isActive
                                        ? "success"
                                        : "danger"
                                    }`}
                                  >
                                    {serviceAddress.isActive
                                      ? "Active"
                                      : "Inactive"}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-3">
                                    <Link
                                      to={`/service-addresses/${serviceAddress.id}`}
                                      className="text-success"
                                      title="View"
                                    >
                                      <i className="mdi mdi-eye font-size-18"></i>
                                    </Link>
                                    <a
                                      href="#"
                                      className="text-primary"
                                      title="Edit"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        open(serviceAddress);
                                      }}
                                    >
                                      <i className="mdi mdi-pencil font-size-18"></i>
                                    </a>
                                    <a
                                      href="#"
                                      className="text-danger"
                                      title="Delete"
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

                    {customerServiceAddresses.filter((serviceAddress) => {
                      const q = serviceAddressSearchTerm.toLowerCase();
                      return (
                        (serviceAddress.serviceAddressName &&
                          serviceAddress.serviceAddressName
                            .toLowerCase()
                            .includes(q)) ||
                        (serviceAddress.serviceAddressType &&
                          serviceAddress.serviceAddressType
                            .toLowerCase()
                            .includes(q)) ||
                        (serviceAddress.address &&
                          serviceAddress.address.toLowerCase().includes(q)) ||
                        (serviceAddress.contactName &&
                          serviceAddress.contactName.toLowerCase().includes(q))
                      );
                    }).length === 0 && (
                      <div className="text-center py-4">
                        <i className="mdi mdi-home-map-marker font-size-48 text-muted"></i>
                        <p className="text-muted mt-2">
                          No service addresses found
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Actions</h5>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => addEditCustomer.open(customer)}
                      >
                        <i className="bx bx-edit me-1"></i>
                        Edit Customer
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => open({ id: 0 })}
                      >
                        <i className="bx bx-plus me-1"></i>
                        Add Service Address
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={scheduleService.open}
                      >
                        <i className="bx bx-calendar me-1"></i>
                        Schedule Service
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={viewReports.open}
                      >
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
                            <p className="text-muted mb-1">
                              Total Service Addresses
                            </p>
                            <h5>{customerServiceAddresses.length}</h5>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mt-4">
                            <p className="text-muted mb-1">
                              Active Service Addresses
                            </p>
                            <h5>
                              {
                                customerServiceAddresses.filter(
                                  (s) => s.isActive
                                ).length
                              }
                            </h5>
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
                  <Link to="/customers">Customers</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/customers/${id}`}>{customer.customerNum}</Link>
                </li>
                <li className="breadcrumb-item active">
                  {sectionInfo.breadcrumb}
                </li>
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
        onSave={() =>
          addEditCustomer.onSaveHandle((data) => {
            let updatedCustomer = null;
            if (data.id && data.id !== 0) {
              updatedCustomer = updateCustomer(data.id, data);
            } else {
              updatedCustomer = addCustomer(data);
            }
            loadCustomers();
            return updatedCustomer;
          })
        }
      />

      <AddEditServiceAddress
        isOpen={isOpen}
        formData={formData}
        errors={errors}
        isSaving={isSaving}
        onUpdateField={onUpdateFieldHandle}
        onClose={close}
        onSave={() =>
          onSaveHandle((data) => {
            let updatedServiceAddress = null;
            if (data.id && data.id !== 0) {
              updatedServiceAddress = updateServiceAddress(data.id, data);
            } else {
              updatedServiceAddress = addServiceAddress(data);
            }
            loadServiceAddresses();
            return updatedServiceAddress;
          })
        }
      />

      <ScheduleServiceModal
        isOpen={scheduleService.isOpen}
        formData={scheduleService.formData}
        errors={scheduleService.errors}
        isSaving={scheduleService.isSaving}
        customerServiceAddresses={customerServiceAddresses}
        onUpdateField={scheduleService.updateField}
        onClose={scheduleService.close}
        onSave={() =>
          scheduleService.save((data) => {
            const newAppointment = addAppointment(data);
            return newAppointment;
          })
        }
      />

      <ViewReportsModal
        isOpen={viewReports.isOpen}
        selectedReportType={viewReports.selectedReportType}
        dateRange={viewReports.dateRange}
        onSelectReportType={viewReports.selectReportType}
        onUpdateDateRange={viewReports.updateDateRange}
        onClose={viewReports.close}
        onGenerate={viewReports.generateReport}
        customerId={parseInt(id)}
      />

      <AddEditProposalModal
        isOpen={proposalModal.isOpen}
        formData={proposalModal.formData}
        errors={proposalModal.errors}
        isSaving={proposalModal.isSaving}
        onUpdateField={proposalModal.onUpdateFieldHandle}
        onClose={proposalModal.close}
        onSave={() =>
          proposalModal.onSaveHandle(async (data) => {
            if (data.id) {
              updateProposal(data.id, data);
            } else {
              addProposal(data);
            }
            loadProposals();
          })
        }
        onFileUpload={proposalModal.handleFileUpload}
        onRemoveAttachment={proposalModal.removeAttachment}
      />

      <CreateInvoiceModal
        isOpen={createInvoice.isOpen}
        formData={createInvoice.formData}
        errors={createInvoice.errors}
        isSaving={createInvoice.isSaving}
        completedAppointments={customerAppointments.filter((apt) => apt.status === "Completed")}
        onUpdateField={createInvoice.updateField}
        onClose={createInvoice.close}
        onSave={() =>
          createInvoice.save((data) => {
            // TODO: Add invoice to localStorage when invoice storage is implemented
            console.log('Invoice created:', data);
          })
        }
      />
    </>
  );
};

export default CustomerDetail;
