import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sites, accounts } from '../data/mockData';

const Sites = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSites = sites.filter(site =>
    site.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAccountName = (accountId) => {
    const account = accounts.find(a => a.id === accountId);
    return account ? account.name : 'N/A';
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Sites</h4>
            <div className="page-title-right">
              <button className="btn btn-primary">
                <i className="bx bx-plus me-1"></i>
                Add Site
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
                      placeholder="Search sites..."
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
                      <th>Site Name</th>
                      <th>Account</th>
                      <th>Type</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Last Service</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSites.map((site) => (
                      <tr key={site.id}>
                        <td>
                          <Link to={`/sites/${site.id}`} className="text-body fw-bold">
                            {site.siteName}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/accounts/${site.accountId}`}>
                            {getAccountName(site.accountId)}
                          </Link>
                        </td>
                        <td>
                          <span className="badge badge-soft-info">
                            {site.siteType}
                          </span>
                        </td>
                        <td>{site.address}</td>
                        <td>
                          <div>
                            <div className="fw-medium">{site.contactName}</div>
                            <div className="text-muted font-size-12">{site.contactPhone}</div>
                          </div>
                        </td>
                        <td>{site.lastServiceDate}</td>
                        <td>
                          <span className={`badge badge-soft-${
                            site.isActive ? 'success' : 'danger'
                          }`}>
                            {site.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-3">
                            <Link to={`/sites/${site.id}`} className="text-success">
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

export default Sites;
