const Configuration = () => {
  return (
    <>
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Configuration</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="javascript: void(0);">Bugworx</a></li>
                <li className="breadcrumb-item active">Configuration</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}

      <div className="row">
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Settings Menu</h5>
              <div className="list-group list-group-flush">
                <a href="#general" className="list-group-item list-group-item-action active">
                  <i className="ri-settings-3-line me-2"></i> General Settings
                </a>
                <a href="#users" className="list-group-item list-group-item-action">
                  <i className="ri-user-settings-line me-2"></i> User Management
                </a>
                <a href="#billing" className="list-group-item list-group-item-action">
                  <i className="ri-money-dollar-circle-line me-2"></i> Billing Settings
                </a>
                <a href="#notifications" className="list-group-item list-group-item-action">
                  <i className="ri-notification-3-line me-2"></i> Notifications
                </a>
                <a href="#integrations" className="list-group-item list-group-item-action">
                  <i className="ri-plug-line me-2"></i> Integrations
                </a>
                <a href="#security" className="list-group-item list-group-item-action">
                  <i className="ri-shield-check-line me-2"></i> Security
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">General Settings</h4>

              <form>
                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Company Name</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" defaultValue="Bugworx Pest Control" />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Email Address</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" defaultValue="contact@bugworx.com" />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Phone Number</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" defaultValue="(555) 123-4567" />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Address</label>
                  <div className="col-sm-9">
                    <textarea className="form-control" rows="3" defaultValue="123 Main Street, City, State 12345"></textarea>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Time Zone</label>
                  <div className="col-sm-9">
                    <select className="form-select">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Currency</label>
                  <div className="col-sm-9">
                    <select className="form-select">
                      <option>USD ($)</option>
                      <option>EUR (¬)</option>
                      <option>GBP (£)</option>
                      <option>CAD (C$)</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Date Format</label>
                  <div className="col-sm-9">
                    <select className="form-select">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <h5 className="mb-3">Business Hours</h5>

                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Monday - Friday</label>
                  <div className="col-sm-4">
                    <input type="time" className="form-control" defaultValue="08:00" />
                  </div>
                  <div className="col-sm-1 text-center">
                    <span className="col-form-label">to</span>
                  </div>
                  <div className="col-sm-4">
                    <input type="time" className="form-control" defaultValue="18:00" />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Saturday</label>
                  <div className="col-sm-4">
                    <input type="time" className="form-control" defaultValue="09:00" />
                  </div>
                  <div className="col-sm-1 text-center">
                    <span className="col-form-label">to</span>
                  </div>
                  <div className="col-sm-4">
                    <input type="time" className="form-control" defaultValue="14:00" />
                  </div>
                </div>

                <div className="row mb-4">
                  <label className="col-sm-3 col-form-label">Sunday</label>
                  <div className="col-sm-9">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="sundayClosed" defaultChecked />
                      <label className="form-check-label" htmlFor="sundayClosed">
                        Closed
                      </label>
                    </div>
                  </div>
                </div>

                <h5 className="mb-3">Application Preferences</h5>

                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Default View</label>
                  <div className="col-sm-9">
                    <select className="form-select">
                      <option>Dashboard</option>
                      <option>Calendar</option>
                      <option>Customers</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-9 offset-sm-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="enableNotifications" defaultChecked />
                      <label className="form-check-label" htmlFor="enableNotifications">
                        Enable desktop notifications
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-9 offset-sm-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="enableSounds" />
                      <label className="form-check-label" htmlFor="enableSounds">
                        Enable sound alerts
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-9 offset-sm-3">
                    <button type="submit" className="btn btn-primary">
                      <i className="mdi mdi-content-save me-1"></i> Save Changes
                    </button>
                    <button type="button" className="btn btn-secondary ms-2">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configuration;
