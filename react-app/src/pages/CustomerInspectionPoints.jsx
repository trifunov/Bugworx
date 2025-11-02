import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import useCustomerData from "../hooks/useCustomerData";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";

const CustomerInspectionPoints = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const { customer } = useCustomerData(id);

  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: "Inspection Points",
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${id}` },
          { label: 'Inspection Points' }
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
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="card-title mb-0">Inspection Points</h5>
                <button className="btn btn-primary btn-sm">
                  <i className="bx bx-plus me-1"></i>
                  Add Inspection Point
                </button>
              </div>
              <div className="text-center py-4">
                <i className="mdi mdi-clipboard-check-outline font-size-48 text-muted"></i>
                <p className="text-muted mt-2">No inspection points found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerInspectionPoints;
