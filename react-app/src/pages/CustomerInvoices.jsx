import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCreateInvoice from "../hooks/useCreateInvoice";
import CreateInvoiceModal from "../components/CustomerActions/CreateInvoiceModal";
import SectionHeader from "../components/Common/SectionHeader";
import useCustomerData from "../hooks/useCustomerData";
import useServiceAddresses from "../hooks/useServiceAddresses";
import useCustomerAppointments from "../hooks/useCustomerAppointments";
import TableSearch from "../components/Common/SearchBar/TableSearch";
import AddNewButton from "../components/Common/AddNewButton";

const CustomerInvoices = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { customer } = useCustomerData(id);
  const { serviceAddresses } = useServiceAddresses(id);
  const { appointments } = useCustomerAppointments(id, serviceAddresses);
  const invoiceModal = useCreateInvoice(parseInt(id));

  // Auto-open modal when landing on create-invoice route
  useEffect(() => {
    if (location.pathname.includes('/create-invoice')) {
      invoiceModal.open();
      // Clean up URL
      navigate(`/customers/${id}/invoices`, { replace: true });
    }
    // Also handle query parameter ?action=create-invoice
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'create-invoice') {
      invoiceModal.open();
      navigate(`/customers/${id}/invoices`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const breadcrumbs = [
    { label: "Customers", link: "/customers" },
    { label: customer.customerNum, link: `/customers/${id}` },
    { label: "Invoices" },
  ];

  return (
    <>
      <SectionHeader title="Invoices" breadcrumbs={breadcrumbs} />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div className="flex-grow-1 w-100 me-md-3">
                      <TableSearch placeholder="Search invoices..." />
                    </div>
                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={invoiceModal.open} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Invoice #</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="fw-bold">#INV-001</span>
                      </td>
                      <td>2024-01-15</td>
                      <td>$250.00</td>
                      <td>
                        <span className="badge badge-soft-success">Paid</span>
                      </td>
                      <td>2024-02-15</td>
                      <td>
                        <div className="d-flex gap-3">
                          <a href="#" className="text-success" title="View">
                            <i className="mdi mdi-eye font-size-18"></i>
                          </a>
                          <a href="#" className="text-primary" title="Download">
                            <i className="mdi mdi-download font-size-18"></i>
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

      <CreateInvoiceModal
        isOpen={invoiceModal.isOpen}
        formData={invoiceModal.formData}
        errors={invoiceModal.errors}
        isSaving={invoiceModal.isSaving}
        completedAppointments={appointments.filter(
          (apt) => apt.status === "Completed"
        )}
        onUpdateField={invoiceModal.updateField}
        onClose={invoiceModal.close}
        onSave={() =>
          invoiceModal.save((data) => {
            console.log("Invoice created:", data);
          })
        }
      />
    </>
  );
};

export default CustomerInvoices;
