import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useCustomerData from "../hooks/useCustomerData";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";
import TableSearch from "../components/Common/SearchBar/TableSearch";

const CustomerDocuments = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const { customer } = useCustomerData(id);

  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: "Documents",
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${id}` },
          { label: 'Documents' }
        ]
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, id]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

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
                      <TableSearch placeholder="Search documents..." />
                    </div>
                    <div className="mt-2 mt-md-0">
                      <button className="btn btn-primary btn-sm">
                        <i className="bx bx-upload me-1"></i>
                        Upload Document
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>File Name</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Uploaded</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <i className="mdi mdi-file-pdf text-danger me-2"></i>
                        Service Agreement.pdf
                      </td>
                      <td>Contract</td>
                      <td>245 KB</td>
                      <td>2024-01-15</td>
                      <td>
                        <div className="d-flex gap-3">
                          <a href="#" className="text-primary" title="Download">
                            <i className="mdi mdi-download font-size-18"></i>
                          </a>
                          <a href="#" className="text-danger" title="Delete">
                            <i className="mdi mdi-delete font-size-18"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
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

export default CustomerDocuments;
