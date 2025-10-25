const Billing = () => {
  const invoices = [
    { id: 'INV-2024-001', customer: 'Smith Residence', amount: 125.00, date: '2024-01-15', status: 'Paid' },
    { id: 'INV-2024-002', customer: 'Johnson Corp', amount: 450.00, date: '2024-01-16', status: 'Pending' },
    { id: 'INV-2024-003', customer: 'Green Valley Apartments', amount: 890.00, date: '2024-01-17', status: 'Paid' },
    { id: 'INV-2024-004', customer: 'Brown Family', amount: 175.00, date: '2024-01-18', status: 'Overdue' },
  ];

  return (
    <>
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Billing & Invoices</h4>

            <div className="page-title-right">
              <button className="btn btn-primary">
                <i className="mdi mdi-plus me-1"></i>
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}

      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">Total Revenue</p>
                  <h4 className="mb-0">$45,890</h4>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                    <span className="avatar-title">
                      <i className="mdi mdi-currency-usd font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">Paid Invoices</p>
                  <h4 className="mb-0">124</h4>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-success">
                    <span className="avatar-title">
                      <i className="mdi mdi-check-circle font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">Pending</p>
                  <h4 className="mb-0">15</h4>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-warning">
                    <span className="avatar-title">
                      <i className="mdi mdi-clock-outline font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">Overdue</p>
                  <h4 className="mb-0">8</h4>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-danger">
                    <span className="avatar-title">
                      <i className="mdi mdi-alert-circle font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Recent Invoices</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Invoice ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>
                          <a href="#" className="text-body fw-bold">{invoice.id}</a>
                        </td>
                        <td>{invoice.customer}</td>
                        <td>{invoice.date}</td>
                        <td>${invoice.amount.toFixed(2)}</td>
                        <td>
                          <span className={`badge badge-soft-${
                            invoice.status === 'Paid' ? 'success' :
                            invoice.status === 'Pending' ? 'warning' : 'danger'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-3">
                            <a href="#" className="text-success">
                              <i className="mdi mdi-eye font-size-18"></i>
                            </a>
                            <a href="#" className="text-primary">
                              <i className="mdi mdi-download font-size-18"></i>
                            </a>
                            <a href="#" className="text-info">
                              <i className="mdi mdi-email font-size-18"></i>
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

export default Billing;
