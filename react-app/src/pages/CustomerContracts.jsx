import { useParams, Link } from "react-router-dom";
import SectionHeader from "../components/Common/SectionHeader";
import useCustomerData from "../hooks/useCustomerData";

const CustomerContracts = () => {
  const { id } = useParams();
  const { customer } = useCustomerData(id);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const breadcrumbs = [
    { label: "Customers", link: "/customers" },
    { label: customer.customerNum, link: `/customers/${id}` },
    { label: "Contracts" },
  ];

  return (
    <>
      <SectionHeader title="Contracts" breadcrumbs={breadcrumbs} />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="card-title mb-0">Service Contracts</h5>
                <button className="btn btn-primary btn-sm">
                  <i className="bx bx-plus me-1"></i>
                  New Contract
                </button>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card border border-success">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="card-title mb-0">Annual Pest Control</h5>
                        <span className="badge badge-soft-success">Active</span>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <th className="text-muted" scope="row">
                                Start Date:
                              </th>
                              <td>Jan 1, 2024</td>
                            </tr>
                            <tr>
                              <th className="text-muted" scope="row">
                                End Date:
                              </th>
                              <td>Dec 31, 2024</td>
                            </tr>
                            <tr>
                              <th className="text-muted" scope="row">
                                Value:
                              </th>
                              <td>$1,200/year</td>
                            </tr>
                            <tr>
                              <th className="text-muted" scope="row">
                                Services:
                              </th>
                              <td>Quarterly treatments</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-3">
                        <button className="btn btn-sm btn-primary me-2">
                          View Details
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                          Renew
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerContracts;
