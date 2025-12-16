import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeStorage } from '../utils/localStorage';
import {
  appointments as initialAppointments,
  serviceAddresses as initialServiceAddresses,
  technicians as initialTechnicians,
  customers as initialCustomers,
  inventory as initialInventory,
  facilities,
  areas,
  inspectionPoints,
  services,
  contracts
} from '../data/mockData';

const Dashboard = () => {

  useEffect(() => {
    initializeStorage({
      appointments: initialAppointments,
      customers: initialCustomers,
      serviceAddresses: initialServiceAddresses,
      technicians: initialTechnicians,
      inventory: initialInventory,
      facilities: facilities,
      areas: areas,
      inspectionPoints: inspectionPoints,
      services: services,
      contracts: contracts
    });
  }, []);

  return (
    <>
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Home</h4>
          </div>
        </div>
      </div>
      {/* end page title */}

      <div className="row">
        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/customers" style={{ textDecoration: 'none' }}>
            <div className="card border border-primary card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-primary">
                <h4 className="my-0 text-primary font-size-24"><i className="mdi mdi-account-circle me-3"></i>Customers</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">Customer Management</h5>
                <p className="card-text">
                  Manage customer profiles, addresses, and service history in one place.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/scheduler" style={{ textDecoration: 'none' }}>
            <div className="card border border-warning card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-warning">
                <h4 className="my-0 text-warning font-size-24"><i className="mdi mdi-calendar-multiselect me-3"></i>Scheduler</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">Scheduling jobs</h5>
                <p className="card-text">
                  Quickly create and schedule pest control visits, assign technicians and routes
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/routing" style={{ textDecoration: 'none' }}>
            <div className="card border border-warning card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-warning">
                <h4 className="my-0 text-warning font-size-24"><i className="mdi mdi-map-marker me-3"></i>Routing & Fleet</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">Routing & Fleet AI management</h5>
                <p className="card-text">
                  Optimize technician routes with AI-powered suggestions to save time and fuel.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/reports" style={{ textDecoration: 'none' }}>
            <div className="card border border-primary card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-primary">
                <h4 className="my-0 text-primary font-size-24"><i className="mdi mdi-file-chart me-3"></i>Reports</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">Generate reports</h5>
                <p className="card-text">
                  Generate detailed reports on service history, technician performance, and customer feedback.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/analytics" style={{ textDecoration: 'none' }}>
            <div className="card border border-primary card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-primary">
                <h4 className="my-0 text-primary font-size-24"><i className="mdi mdi-view-dashboard me-3"></i>Analytics</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">Analytical dashboards</h5>
                <p className="card-text">
                  Gain insights into your business performance with customizable analytics dashboards.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/inventory" style={{ textDecoration: 'none' }}>
            <div className="card border border-success card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-success">
                <h4 className="my-0 text-success font-size-24"><i className="mdi mdi-flask me-3"></i>Inventory</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">Inventory Management</h5>
                <p className="card-text">
                  Track and manage pest control supplies and equipment with ease.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/billing" style={{ textDecoration: 'none' }}>
            <div className="card border border-success card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-success">
                <h4 className="my-0 text-success font-size-24"><i className="mdi mdi-bank me-3"></i>Billing & Invoices</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">Manage billing and invoices</h5>
                <p className="card-text">
                  Streamline your billing process with automated invoicing and payment tracking.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/notifications" style={{ textDecoration: 'none' }}>
            <div className="card border border-warning card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-warning">
                <h4 className="my-0 text-warning font-size-24"><i className="mdi mdi-email me-3"></i>Notification hub</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">SMS and Email Notifications</h5>
                <p className="card-text">
                  Keep customers and technicians informed with automated notifications and reminders.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-xl-4 col-md-6 card-parent">
          <Link to="/configuration/general" style={{ textDecoration: 'none' }}>
            <div className="card border border-dark card-height" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-header bg-transparent border-dark">
                <h4 className="my-0 text-dark font-size-24"><i className="mdi mdi-cog me-3"></i>Configuration</h4>
              </div>
              <div className="card-body">
                <h5 className="card-title">System settings</h5>
                <p className="card-text">
                  Customize system settings, user roles, and preferences to fit your business needs.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
