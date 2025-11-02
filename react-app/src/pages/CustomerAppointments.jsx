import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addAppointment } from "../utils/localStorage";
import useScheduleService from "../hooks/useScheduleService";
import ScheduleServiceModal from "../components/CustomerActions/ScheduleServiceModal";
import useCustomerData from "../hooks/useCustomerData";
import useServiceAddresses from "../hooks/useServiceAddresses";
import useCustomerAppointments from "../hooks/useCustomerAppointments";
import useTableSearch from "../components/Common/SearchBar/useTableSearch";
import useDataTable from "../components/Common/DataTable/useDataTable";
import DataTable from "../components/Common/DataTable/DataTable";
import TableSearch from "../components/Common/SearchBar/TableSearch";
import AddNewButton from "../components/Common/AddNewButton";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";

const CustomerAppointments = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { customer } = useCustomerData(id);
  const { serviceAddresses } = useServiceAddresses(id);
  const { appointments } = useCustomerAppointments(id, serviceAddresses);
  const scheduleServiceModal = useScheduleService(parseInt(id));

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(
    appointments,
    ['id', 'serviceType', 'scheduledDate', 'status']
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
  } = useDataTable(filteredItems, {
    defaultSortField: 'scheduledDate',
    defaultSortDirection: 'desc',
    pageSize: 10
  });

  // Set breadcrumbs
  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: "Appointments",
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${id}` },
          { label: 'Appointments' }
        ]
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, id]);

  // Auto-open modal when landing on schedule-service route
  useEffect(() => {
    if (location.pathname.includes('/schedule-service')) {
      scheduleServiceModal.open();
      // Clean up URL
      navigate(`/customers/${id}/appointments`, { replace: true });
    }
    // Also handle query parameter ?action=schedule-service
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'schedule-service') {
      scheduleServiceModal.open();
      navigate(`/customers/${id}/appointments`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const columns = [
    'ID',
    'Service Address',
    'Service Type',
    'Date & Time',
    'Status',
    'Actions',
  ];

  const sortableColumns = {
    'ID': 'id',
    'Service Type': 'serviceType',
    'Date & Time': 'scheduledDate',
    'Status': 'status'
  };

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

  const renderRow = (appointment) => {
    const serviceAddress = serviceAddresses.find(
      (s) => s.id === appointment.serviceAddressId
    );

    return (
      <tr key={appointment.id}>
        <td>
          <span className="fw-bold">#{appointment.id}</span>
        </td>
        <td>{serviceAddress?.serviceAddressName || 'N/A'}</td>
        <td>{appointment.serviceType}</td>
        <td>
          <div>{appointment.scheduledDate}</div>
          <div className="text-muted font-size-12">
            {appointment.scheduledTime}
          </div>
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
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div className="flex-grow-1 w-100 me-md-3">
                      <TableSearch
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search appointments..."
                      />
                    </div>
                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={scheduleServiceModal.open} />
                    </div>
                  </div>
                </div>
              </div>

              <DataTable
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
                  icon: 'mdi mdi-calendar-remove',
                  message: 'No appointments found',
                }}
              />
            </div>
          </div>
        </div>
      </div>

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
    </>
  );
};

export default CustomerAppointments;
