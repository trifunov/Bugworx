import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { addServiceAddress, updateServiceAddress } from "../utils/localStorage";
import useAddEditServiceAddress from "../components/CustomerDetails/AddEditServiceAddress/useAddEditServiceAddress";
import AddEditServiceAddress from "../components/CustomerDetails/AddEditServiceAddress/AddEditServiceAddress";
import useCustomerData from "../hooks/useCustomerData";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";
import useServiceAddresses from "../hooks/useServiceAddresses";
import useTableSearch from "../components/Common/SearchBar/useTableSearch";
import { useDataTable } from "../components/Common/DataTable";
import DataTable from "../components/Common/DataTable/DataTable";
import TableSearch from "../components/Common/SearchBar/TableSearch";
import AddNewButton from "../components/Common/AddNewButton";

const CustomerServiceAddresses = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const { customer } = useCustomerData(id);
  const { serviceAddresses, refresh: refreshServiceAddresses } = useServiceAddresses(id);
  const serviceAddressModal = useAddEditServiceAddress(parseInt(id));

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
  } = useDataTable(filteredItems, {
    defaultSortField: 'serviceAddressName',
    defaultSortDirection: 'asc',
    pageSize: 10
  });

  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: "Customer Service Addresses",
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${id}` },
          { label: 'Service Addresses' }
        ]
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, id]);

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
          className={`badge badge-soft-${
            serviceAddress.isActive ? 'success' : 'danger'
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
                        placeholder="Search service addresses..."
                      />
                    </div>
                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={() => serviceAddressModal.open({ id: 0 })} />
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
                  icon: 'mdi mdi-home-map-marker',
                  message: 'No service addresses found',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AddEditServiceAddress
        isOpen={serviceAddressModal.isOpen}
        formData={serviceAddressModal.formData}
        errors={serviceAddressModal.errors}
        isSaving={serviceAddressModal.isSaving}
        onUpdateField={serviceAddressModal.onUpdateFieldHandle}
        onClose={serviceAddressModal.close}
        onSave={() =>
          serviceAddressModal.onSaveHandle((data) => {
            let updatedServiceAddress = null;
            if (data.id && data.id !== 0) {
              updatedServiceAddress = updateServiceAddress(data.id, data);
            } else {
              updatedServiceAddress = addServiceAddress(data);
            }
            refreshServiceAddresses();
            return updatedServiceAddress;
          })
        }
      />
    </>
  );
};

export default CustomerServiceAddresses;
