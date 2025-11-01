import { useParams, Link } from "react-router-dom";
import { addServiceAddress, updateServiceAddress } from "../utils/localStorage";
import useAddEditServiceAddress from "../components/CustomerDetails/AddEditServiceAddress/useAddEditServiceAddress";
import AddEditServiceAddress from "../components/CustomerDetails/AddEditServiceAddress/AddEditServiceAddress";
import SectionHeader from "../components/Common/SectionHeader";
import useCustomerData from "../hooks/useCustomerData";
import useServiceAddresses from "../hooks/useServiceAddresses";
import { useSearchFilter } from "../components/Common/SearchBar";
import DataTable from "../components/Common/DataTable/DataTable";
import SearchBar from "../components/Common/SearchBar";
import AddNewButton from "../components/Common/AddNewButton";

const CustomerServiceAddresses = () => {
  const { id } = useParams();
  const { customer } = useCustomerData(id);
  const { serviceAddresses, refresh: refreshServiceAddresses } = useServiceAddresses(id);
  const serviceAddressModal = useAddEditServiceAddress(parseInt(id));

  const { filteredItems, searchTerm, setSearchTerm } = useSearchFilter(
    serviceAddresses,
    ['serviceAddressName', 'serviceAddressType', 'address', 'contactName']
  );

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const breadcrumbs = [
    { label: "Customers", link: "/customers" },
    { label: customer.customerNum, link: `/customers/${id}` },
    { label: "Service Addresses" },
  ];

  const columns = [
    'Service Address Name',
    'Type',
    'Address',
    'Contact',
    'Status',
    'Actions',
  ];

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
      <SectionHeader title="Customer Service Addresses" breadcrumbs={breadcrumbs} />

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
                data={filteredItems}
                renderRow={renderRow}
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
