import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AddNewButton from '../components/Common/AddNewButton';
import AddEditCustomer from '../components/CustomerDetails/AddEditCustomer/AddEditCustomer';
import useAddEditCustomer from '../components/CustomerDetails/AddEditCustomer/useAddEditCustomer';
import { getAccounts, addAccount, updateAccount } from '../utils/localStorage';

const Accounts = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, formData, errors, isSaving, open, close, onUpdateFieldHandle, onSaveHandle } = useAddEditCustomer();
  const [accounts, setAccounts] = useState(getAccounts());

  useEffect(() => {
    // Get search query from URL if present
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountNum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mapAccountToCustomerForm = (account) => ({
    id: account?.id || 0,
    name: account?.name || '',
    customerType: account?.accountType === 1 ? 'Residential' : (account?.accountType === 2 ? 'Commercial' : ''),
    primaryContactPerson: account?.billingContact?.name || '',
    jobTitle: account?.billingContact?.jobTitle || '',
    email: account?.billingContact?.email || '',
    phone: account?.billingContact?.phone || '',
    preferredContactMethod: account?.preferredContactMethod || '',
    customerStatus: account?.isActive ? 'Active' : 'Inactive'
  });

  const mapCustomerFormToAccount = (data) => ({
    name: data.name,
    accountType: data.customerType === 'Residential' ? 1 : 2,
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
    const mapped = mapCustomerFormToAccount(data);
    if (data.id && data.id > 0) {
      updateAccount(data.id, mapped);
    } else {
      addAccount(mapped);
    }
    setAccounts(getAccounts());
  });

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Accounts</h4>
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
                          placeholder="Search accounts..."
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
                      <th>Account #</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.map((account) => (
                      <tr key={account.id}>
                        <td>
                          <Link to={`/accounts/${account.id}`} className="text-body fw-bold">
                            {account.accountNum}
                          </Link>
                        </td>
                        <td>{account.name}</td>
                        <td>
                          <span className={`badge badge-soft-${account.accountType === 1 ? 'primary' : 'success'
                            }`}>
                            {account.accountType === 1 ? 'Residential' : 'Commercial'}
                          </span>
                        </td>
                        <td>
                          <div>
                            <div className="fw-medium">{account.billingContact?.name}</div>
                            <div className="text-muted font-size-12">{account.billingContact?.email}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge badge-soft-${account.isActive ? 'success' : 'danger'
                            }`}>
                            {account.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-3">
                            <Link to={`/accounts/${account.id}`} className="text-success">
                              <i className="mdi mdi-eye font-size-18"></i>
                            </Link>
                            <a href="#" className="text-primary" onClick={() => open(mapAccountToCustomerForm(account))}>
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
