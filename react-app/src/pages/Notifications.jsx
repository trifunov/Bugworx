const Notifications = () => {
  return (
    <>
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Notification Hub</h4>

            <div className="page-title-right">
              <button className="btn btn-primary">
                <i className="mdi mdi-plus me-1"></i>
                Create Notification
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
                  <p className="text-muted fw-medium mb-2">SMS Sent Today</p>
                  <h4 className="mb-0">245</h4>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                    <span className="avatar-title">
                      <i className="mdi mdi-message-text font-size-24"></i>
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
                  <p className="text-muted fw-medium mb-2">Emails Sent Today</p>
                  <h4 className="mb-0">182</h4>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-success">
                    <span className="avatar-title">
                      <i className="mdi mdi-email font-size-24"></i>
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
                  <h4 className="mb-0">24</h4>
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
                  <p className="text-muted fw-medium mb-2">Delivery Rate</p>
                  <h4 className="mb-0">98.5%</h4>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-info">
                    <span className="avatar-title">
                      <i className="mdi mdi-check-circle font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">SMS Notification Templates</h4>
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Appointment Reminder</h5>
                    <small className="text-muted">24 hrs before</small>
                  </div>
                  <p className="mb-1 text-muted">
                    "Hi [Name], this is a reminder about your pest control service scheduled for [Date] at [Time]."
                  </p>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Technician On the Way</h5>
                    <small className="text-muted">30 min before</small>
                  </div>
                  <p className="mb-1 text-muted">
                    "Your technician [Tech Name] is on the way and will arrive in approximately 30 minutes."
                  </p>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Service Completed</h5>
                    <small className="text-muted">After completion</small>
                  </div>
                  <p className="mb-1 text-muted">
                    "Your pest control service has been completed. Thank you for choosing us!"
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Email Notification Templates</h4>
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Invoice</h5>
                    <small className="text-muted">After service</small>
                  </div>
                  <p className="mb-1 text-muted">
                    Professional invoice with service details, payment instructions, and company information.
                  </p>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Service Report</h5>
                    <small className="text-muted">After service</small>
                  </div>
                  <p className="mb-1 text-muted">
                    Detailed service report including areas treated, products used, and recommendations.
                  </p>
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Payment Reminder</h5>
                    <small className="text-muted">3 days after due</small>
                  </div>
                  <p className="mb-1 text-muted">
                    Friendly payment reminder with easy payment options and outstanding balance information.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Recent Notifications</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Type</th>
                      <th>Recipient</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="badge badge-soft-primary">SMS</span></td>
                      <td>John Smith</td>
                      <td>Appointment Reminder</td>
                      <td><span className="badge badge-soft-success">Delivered</span></td>
                      <td>Today, 9:30 AM</td>
                    </tr>
                    <tr>
                      <td><span className="badge badge-soft-success">Email</span></td>
                      <td>Sarah Johnson</td>
                      <td>Invoice #2024-001</td>
                      <td><span className="badge badge-soft-success">Delivered</span></td>
                      <td>Today, 8:45 AM</td>
                    </tr>
                    <tr>
                      <td><span className="badge badge-soft-primary">SMS</span></td>
                      <td>Mike Davis</td>
                      <td>Technician On the Way</td>
                      <td><span className="badge badge-soft-warning">Pending</span></td>
                      <td>Today, 8:15 AM</td>
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

export default Notifications;
