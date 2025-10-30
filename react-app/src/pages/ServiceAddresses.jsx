import { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceAddresses, customers } from '../data/mockData';

const ServiceAddresses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServiceAddresses = serviceAddresses.filter(serviceAddress =>
    serviceAddress.serviceAddressName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    serviceAddress.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'N/A';
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Service Addresses</h4>
            <div className="page-title-right">
              <button className="btn btn-primary">
                <i className="bx bx-plus me-1"></i>
                Add Service Address
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-xl-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search service addresses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Service Address Name</th>
                      <th>Customer</th>
                      <th>Type</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Last Service</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServiceAddresses.map((serviceAddress) => (
                      <tr key={serviceAddress.id}>
                        <td>
                          <Link to={`/sites/${serviceAddress.id}`} className="text-body fw-bold">
                            {serviceAddress.serviceAddressName}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/customers/${serviceAddress.customerId}`}>
                            {getCustomerName(serviceAddress.customerId)}
                          </Link>
                        </td>
                        <td>
                          <span className="badge badge-soft-info">
                            {serviceAddress.serviceAddressType}
                          </span>
                        </td>
                        <td>{serviceAddress.address}</td>
                        <td>
                          <div>
                            <div className="fw-medium">{serviceAddress.contactName}</div>
                            <div className="text-muted font-size-12">{serviceAddress.contactPhone}</div>
                          </div>
                        </td>
                        <td>{serviceAddress.lastServiceDate}</td>
                        <td>
                          <span className={`badge badge-soft-${
                            serviceAddress.isActive ? 'success' : 'danger'
                          }`}>
                            {serviceAddress.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-3">
                            <Link to={`/sites/${serviceAddress.id}`} className="text-success">
                              <i className="mdi mdi-eye font-size-18"></i>
                            </Link>
                            <a href="#" className="text-primary">
                              <i className="mdi mdi-pencil font-size-18"></i>
                            </a>
                            <a href="#" className="text-danger">
                              <i className="mdi mdi-delete font-size-18"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default ServiceAddresses;
