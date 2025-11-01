import { useParams, Link } from "react-router-dom";
import SectionHeader from "../components/Common/SectionHeader";
import useCustomerData from "../hooks/useCustomerData";
import useServiceAddresses from "../hooks/useServiceAddresses";
import useCustomerAppointments from "../hooks/useCustomerAppointments";
import { useSearchFilter } from "../components/Common/SearchBar";
import DataTable from "../components/Common/DataTable/DataTable";
import SearchBar from "../components/Common/SearchBar";

const CustomerServiceHistory = () => {
  const { id } = useParams();
  const { customer } = useCustomerData(id);
  const { serviceAddresses } = useServiceAddresses(id);
  const { completedAppointments } = useCustomerAppointments(
    id,
    serviceAddresses
  );

  const { filteredItems, searchTerm, setSearchTerm } = useSearchFilter(
    completedAppointments,
    ['scheduledDate', 'serviceType', 'technicianId', 'duration']
  );

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const breadcrumbs = [
    { label: "Customers", link: "/customers" },
    { label: customer.customerNum, link: `/customers/${id}` },
    { label: "Service History" },
  ];

  const columns = [
    'Date',
    'Service Address',
    'Service Type',
    'Technician',
    'Duration',
    'Notes',
  ];

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
      <SectionHeader title="Service History" breadcrumbs={breadcrumbs} />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div className="flex-grow-1 w-100 me-md-3">
                      <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search service history..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DataTable
                columns={columns}
                data={filteredItems}
                renderRow={renderRow}
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
