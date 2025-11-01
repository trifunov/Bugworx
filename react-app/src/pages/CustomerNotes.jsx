import { useParams, Link } from "react-router-dom";
import SectionHeader from "../components/Common/SectionHeader";
import useCustomerData from "../hooks/useCustomerData";

const CustomerNotes = () => {
  const { id } = useParams();
  const { customer } = useCustomerData(id);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const breadcrumbs = [
    { label: "Customers", link: "/customers" },
    { label: customer.customerNum, link: `/customers/${id}` },
    { label: "Notes" },
  ];

  return (
    <>
      <SectionHeader title="Notes" breadcrumbs={breadcrumbs} />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="card-title mb-0">Notes</h5>
                <button className="btn btn-primary btn-sm">
                  <i className="bx bx-plus me-1"></i>
                  Add Note
                </button>
              </div>
              <div className="mb-4">
                <div className="card border">
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <span className="avatar-title rounded-circle bg-primary text-white">
                            A
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="font-size-14 mb-1">Admin User</h5>
                        <p className="text-muted font-size-12 mb-2">
                          2024-01-20 10:30 AM
                        </p>
                        <p className="mb-0">
                          Customer prefers morning appointments. Has a dog that
                          needs to be secured before service.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border">
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-sm">
                          <span className="avatar-title rounded-circle bg-success text-white">
                            T
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="font-size-14 mb-1">Technician</h5>
                        <p className="text-muted font-size-12 mb-2">
                          2024-01-15 2:15 PM
                        </p>
                        <p className="mb-0">
                          Noticed increased activity in garage area. Recommended
                          quarterly treatment upgrade.
                        </p>
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

export default CustomerNotes;
