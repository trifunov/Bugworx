import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  addAppointment,
  addProposal,
  updateProposal,
} from "../utils/localStorage";
import serviceAddressService from "../services/serviceAddressService";
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
import useCustomerData from "../hooks/useCustomerData";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";
import useServiceAddresses from "../hooks/useServiceAddresses";
import useCustomerAppointments from "../hooks/useCustomerAppointments";
import useCustomerProposals from "../hooks/useCustomerProposals";
import useTableSearch from "../components/Common/SearchBar/useTableSearch";
import useTable from "../components/Common/Table/useTable";
import Table from "../components/Common/Table/Table";
import TableSearch from "../components/Common/SearchBar/TableSearch";
import AddNewButton from "../components/Common/AddNewButton";
import { useEditableFormContext } from "../contexts/EditableFormContext";

const CustomerOverview = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Data hooks
  const { customer } = useCustomerData(id);
  const { refresh: refreshServiceAddresses } = useServiceAddresses(id);
  const { serviceAddresses } = useServiceAddresses(id);
  const { appointments } = useCustomerAppointments(id, serviceAddresses);
  const { refresh: refreshProposals } = useCustomerProposals(id);

  // Modals
  const serviceAddressModal = useAddEditServiceAddress(parseInt(id));
  const { addEditCustomer } = useEditableFormContext();
  const scheduleServiceModal = useScheduleService(parseInt(id));
  const viewReportsModal = useViewReports(parseInt(id));
  const proposalModal = useAddEditProposal(parseInt(id));
  const invoiceModal = useCreateInvoice(parseInt(id));

  // Search filter for service addresses
  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(
    serviceAddresses,
    ['serviceAddressName', 'serviceAddressType', 'address', 'contactName']
  );

  const {
    data: paginatedData,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems
  } = useTable(filteredItems, {
    defaultSortField: 'serviceAddressName',
    defaultSortDirection: 'asc',
    pageSize: 5
  });

  // Set breadcrumbs
  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: "Customer Overview",
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${id}` },
          { label: 'Overview' }
        ]
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, id]);

  // Handle URL actions (query parameters)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get("action");
    if (action === "schedule-service") {
      scheduleServiceModal.open();
      navigate(`/customers/${id}`, { replace: true });
    } else if (action === "create-invoice") {
      invoiceModal.open();
      navigate(`/customers/${id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, navigate, id]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const columns = [
    'Service Address Name',
    'Type',
    'Address',
    'Contact',
    'Status',
    'Actions',
  ];

  const sortableColumns = {
    'Service Address Name': 'serviceAddressName',
    'Type': 'serviceAddressType',
    'Address': 'address',
    'Contact': 'contactName',
    'Status': 'isActive'
  };

  const renderRow = (serviceAddress) => (
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
          className={`badge badge-soft-${serviceAddress.isActive ? 'success' : 'danger'
            }`}
        >
          {serviceAddress.isActive ? 'Active' : 'Inactive'}
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
              serviceAddressModal.open(serviceAddress);
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
  );

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-start mb-4">
                <div className="flex-grow-1">
                  <h5 className="font-size-16 mb-1">{customer.name}</h5>
                  <p className="text-muted mb-0">{customer.customerNum}</p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`badge badge-soft-${customer.isActive ? 'success' : 'danger'
                      } font-size-12`}
                  >
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h6 className="font-size-14 mb-3">Customer Information</h6>
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <th className="text-muted ps-0" scope="row">
                            Customer Type:
                          </th>
                          <td className="pe-0">
                            {customer.customerType === 1
                              ? 'Residential'
                              : 'Commercial'}
                          </td>
                        </tr>
                        <tr>
                          <th className="text-muted ps-0" scope="row">
                            Registration #:
                          </th>
                          <td className="pe-0">{customer.registrationNum}</td>
                        </tr>
                        <tr>
                          <th className="text-muted ps-0" scope="row">
                            Send Invoice:
                          </th>
                          <td className="pe-0">
                            {customer.sendInvoice ? 'Yes' : 'No'}
                          </td>
                        </tr>
                        <tr>
                          <th className="text-muted ps-0" scope="row">
                            Email Invoice:
                          </th>
                          <td className="pe-0">
                            {customer.emailInvoice ? 'Yes' : 'No'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-md-6">
                  <h6 className="font-size-14 mb-3">Billing Contact</h6>
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <colgroup>
                        <col style={{ width: '35%' }} />
                        <col style={{ width: '65%' }} />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th className="text-muted ps-0" scope="row">
                            Name:
                          </th>
                          <td className="pe-0">
                            {customer.billingContact?.firstName && customer.billingContact?.lastName
                              ? `${customer.billingContact.firstName} ${customer.billingContact.middleName ? customer.billingContact.middleName + ' ' : ''}${customer.billingContact.lastName}`
                              : customer.billingContact?.name || customer.primaryContactPerson}
                          </td>
                        </tr>
                        <tr>
                          <th className="text-muted ps-0" scope="row">
                            Email:
                          </th>
                          <td className="pe-0">
                            <div>{customer.billingContact?.email || customer.email}</div>
                            {customer.billingContact?.alternateEmails && customer.billingContact.alternateEmails.length > 0 && (
                              <div className="mt-1">
                                {customer.billingContact.alternateEmails.map((altEmail, index) => (
                                  <div key={index} className="text-muted font-size-12">
                                    <i className="mdi mdi-email-outline me-1"></i>
                                    {altEmail}
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th className="text-muted ps-0" scope="row">
                            Phone:
                          </th>
                          <td className="pe-0">
                            {customer.billingContact?.phones && customer.billingContact.phones.length > 0 ? (
                              <div>
                                {customer.billingContact.phones.map((phone, index) => (
                                  <div key={index} className="mb-1">
                                    <span className="badge badge-soft-primary me-2" style={{ fontSize: '10px' }}>
                                      {phone.type}
                                    </span>
                                    {phone.number}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              customer.billingContact?.phone || customer.phone
                            )}
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
                  {customer.billingAddress?.street || ''}
                  <br />
                  {customer.billingAddress?.city || ''},{' '}
                  {customer.billingAddress?.state || ''}{' '}
                  {customer.billingAddress?.zip || ''}
                </p>
              </div>

              {customer.instructions && (
                <div className="mt-4">
                  <h6 className="font-size-14 mb-3">Instructions</h6>
                  <p className="text-muted mb-0">{customer.instructions}</p>
                </div>
              )}

              {customer.primaryNote && (
                <div className="mt-4">
                  <h6 className="font-size-14 mb-3">Notes</h6>
                  <p className="text-muted mb-0">{customer.primaryNote}</p>
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
                      <TableSearch
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search service addresses..."
                      />
                    </div>
                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={() => serviceAddressModal.open({ id: 0 })} />
                    </div>
                  </div>
                </div>
              </div>

              <Table
                columns={columns}
                data={paginatedData}
                renderRow={renderRow}
                sortableColumns={sortableColumns}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                pagination={{
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  totalItems
                }}
                emptyState={{
                  icon: 'mdi mdi-home-map-marker',
                  message: 'No service addresses found',
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Actions</h5>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => addEditCustomer.open(customer)}>
                  <i className="bx bx-edit me-1"></i>
                  Edit Customer
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => serviceAddressModal.open({ id: 0 })}
                >
                  <i className="bx bx-plus me-1"></i>
                  Add Service Address
                </button>
                <button className="btn btn-info" onClick={scheduleServiceModal.open}>
                  <i className="bx bx-calendar me-1"></i>
                  Schedule Service
                </button>
                <button className="btn btn-secondary" onClick={viewReportsModal.open}>
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
                      <p className="text-muted mb-1">Total Service Addresses</p>
                      <h5>{serviceAddresses.length}</h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-4">
                      <p className="text-muted mb-1">Active Service Addresses</p>
                      <h5>
                        {serviceAddresses.filter((s) => s.isActive).length}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}

      <AddEditServiceAddress
        isOpen={serviceAddressModal.isOpen}
        formData={serviceAddressModal.formData}
        errors={serviceAddressModal.errors}
        isSaving={serviceAddressModal.isSaving}
        onUpdateField={serviceAddressModal.onUpdateFieldHandle}
        onClose={serviceAddressModal.close}
        onSave={() =>
          serviceAddressModal.onSaveHandle(async (data) => {
            let result = null;
            if (data.id && data.id !== 0) {
              result = await serviceAddressService.update(data.id, data);
            } else {
              result = await serviceAddressService.create(data);
            }
            await refreshServiceAddresses();
            return result;
          })
        }
      />

      <ScheduleServiceModal
        isOpen={scheduleServiceModal.isOpen}
        formData={scheduleServiceModal.formData}
        errors={scheduleServiceModal.errors}
        isSaving={scheduleServiceModal.isSaving}
        customerServiceAddresses={serviceAddresses}
        onUpdateField={scheduleServiceModal.updateField}
        onClose={scheduleServiceModal.close}
        onSave={() =>
          scheduleServiceModal.save((data) => {
            const newAppointment = addAppointment(data);
            return newAppointment;
          })
        }
      />

      <ViewReportsModal
        isOpen={viewReportsModal.isOpen}
        selectedReportType={viewReportsModal.selectedReportType}
        dateRange={viewReportsModal.dateRange}
        onSelectReportType={viewReportsModal.selectReportType}
        onUpdateDateRange={viewReportsModal.updateDateRange}
        onClose={viewReportsModal.close}
        onGenerate={viewReportsModal.generateReport}
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
            refreshProposals();
          })
        }
        onFileUpload={proposalModal.handleFileUpload}
        onRemoveAttachment={proposalModal.removeAttachment}
      />

      <CreateInvoiceModal
        isOpen={invoiceModal.isOpen}
        formData={invoiceModal.formData}
        errors={invoiceModal.errors}
        isSaving={invoiceModal.isSaving}
        completedAppointments={appointments.filter(
          (apt) => apt.status === "Completed"
        )}
        onUpdateField={invoiceModal.updateField}
        onClose={invoiceModal.close}
        onSave={() =>
          invoiceModal.save((data) => {
            console.log("Invoice created:", data);
          })
        }
      />
    </>
  );
};

export default CustomerOverview;
