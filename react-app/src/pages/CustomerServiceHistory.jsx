import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useCustomerData from "../hooks/useCustomerData";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";
import useServiceAddresses from "../hooks/useServiceAddresses";
import useCustomerAppointments from "../hooks/useCustomerAppointments";
import useTableSearch from "../components/Common/SearchBar/useTableSearch";
import useTable from "../components/Common/Table/useTable";
import Table from "../components/Common/Table/Table";
import TableSearch from "../components/Common/SearchBar/TableSearch";

const CustomerServiceHistory = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const { customer } = useCustomerData(id);
  const { serviceAddresses } = useServiceAddresses(id);
  const { completedAppointments } = useCustomerAppointments(
    id,
    serviceAddresses
  );

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(
    completedAppointments,
    ['scheduledDate', 'serviceType', 'technicianId', 'duration']
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
    defaultSortField: 'scheduledDate',
    defaultSortDirection: 'desc',
    pageSize: 10
  });

  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: "Service History",
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${id}` },
          { label: 'Service History' }
        ]
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, id]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const columns = [
    'Date',
    'Service Address',
    'Service Type',
    'Technician',
    'Duration',
    'Notes',
  ];

  const sortableColumns = {
    'Date': 'scheduledDate',
    'Service Type': 'serviceType',
    'Technician': 'technicianId',
    'Duration': 'duration'
  };

  const renderRow = (appointment) => {
    const serviceAddress = serviceAddresses.find(
      (s) => s.id === appointment.serviceAddressId
    );

    return (
      <tr key={appointment.id}>
        <td>{appointment.scheduledDate}</td>
        <td>{serviceAddress?.serviceAddressName || 'N/A'}</td>
        <td>{appointment.serviceType}</td>
        <td>Technician #{appointment.technicianId}</td>
        <td>{appointment.duration || '2h'}</td>
        <td>
          <a href="#" className="text-primary">
            View Details
          </a>
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
                        placeholder="Search service history..."
                      />
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
                  icon: 'mdi mdi-history',
                  message: 'No service history found',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerServiceHistory;
