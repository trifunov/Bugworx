import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AddNewButton from '../components/Common/AddNewButton';
import AddEditCustomer from '../components/CustomerDetails/AddEditCustomer/AddEditCustomer';
import useAddEditCustomer from '../components/CustomerDetails/AddEditCustomer/useAddEditCustomer';
import { getCustomers, addCustomer, updateCustomer } from '../utils/localStorage';

const Accounts = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, formData, errors, isSaving, open, close, onUpdateFieldHandle, onSaveHandle } = useAddEditCustomer();
  const [customers, setCustomers] = useState(getCustomers());

  useEffect(() => {
    // Get search query from URL if present
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerNum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mapCustomerToForm = (customer) => ({
    id: customer?.id || 0,
    name: customer?.name || '',
    customerType: customer?.customerType === 1 ? 'Residential' : (customer?.customerType === 2 ? 'Commercial' : ''),
    primaryContactPerson: customer?.billingContact?.name || '',
    jobTitle: customer?.billingContact?.jobTitle || '',
    email: customer?.billingContact?.email || '',
    phone: customer?.billingContact?.phone || '',
    preferredContactMethod: customer?.preferredContactMethod || '',
    customerStatus: customer?.isActive ? 'Active' : 'Inactive'
  });

  const mapFormToCustomer = (data) => ({
    name: data.name,
    customerType: data.customerType === 'Residential' ? 1 : 2,
    isActive: data.customerStatus === 'Active',
    preferredContactMethod: data.preferredContactMethod || '',
    billingContact: {
      name: data.primaryContactPerson || '',
      email: data.email || '',
      phone: data.phone || '',
      jobTitle: data.jobTitle || ''
    }
  });

  const handleSave = () => onSaveHandle((data) => {
    const mapped = mapFormToCustomer(data);
    if (data.id && data.id > 0) {
      updateCustomer(data.id, mapped);
    } else {
      addCustomer(mapped);
    }
    setCustomers(getCustomers());
  });

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Customers</h4>
            <div className="page-title-right"></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
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
                          placeholder="Search customers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoComplete="off"
                        />
                        <i className="bx bx-search-alt search-icon"></i>
                      </div>
                    </div>
                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={() => open({ id: 0 })} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Customer #</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <Link to={`/customers/${customer.id}`} className="text-body fw-bold">
                            {customer.customerNum}
                          </Link>
                        </td>
                        <td>{customer.name}</td>
                        <td>
                          <span className={`badge badge-soft-${
                            customer.customerType === 1 ? 'primary' : 'success'
                          }`}>
                            {customer.customerType === 1 ? 'Residential' : 'Commercial'}
                          </span>
                        </td>
                        <td>
                          <div>
                            <div className="fw-medium">{customer.billingContact?.name}</div>
                            <div className="text-muted font-size-12">{customer.billingContact?.email}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge badge-soft-${
                            customer.isActive ? 'success' : 'danger'
                          }`}>
                            {customer.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-3">
                            <Link to={`/customers/${customer.id}`} className="text-success">
                              <i className="mdi mdi-eye font-size-18"></i>
                            </Link>
                            <a href="#" className="text-primary" onClick={() => open(mapCustomerToForm(customer))}>
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

      <AddEditCustomer
        isOpen={isOpen}
        formData={formData}
        errors={errors}
        isSaving={isSaving}
        onUpdateField={onUpdateFieldHandle}
        onClose={close}
        onSave={handleSave}
      />
    </>
  );
};

export default Accounts;
