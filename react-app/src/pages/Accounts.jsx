import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { accounts } from '../data/mockData';

const Accounts = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Accounts</h4>
            <div className="page-title-right">
              <button className="btn btn-primary">
                <i className="bx bx-plus me-1"></i>
                Add Account
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
                      placeholder="Search accounts..."
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
                          <span className={`badge badge-soft-${
                            account.accountType === 1 ? 'primary' : 'success'
                          }`}>
                            {account.accountType === 1 ? 'Residential' : 'Commercial'}
                          </span>
                        </td>
                        <td>
                          <div>
                            <div className="fw-medium">{account.billingContact.name}</div>
                            <div className="text-muted font-size-12">{account.billingContact.email}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge badge-soft-${
                            account.isActive ? 'success' : 'danger'
                          }`}>
                            {account.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-3">
                            <Link to={`/accounts/${account.id}`} className="text-success">
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

export default Accounts;
