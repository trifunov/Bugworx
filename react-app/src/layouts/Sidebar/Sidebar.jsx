import { Link, useLocation } from 'react-router-dom';
import { customers } from '../../data/mockData';
import useSidebarMenu from '../../hooks/useSidebarMenu';

const Sidebar = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const customerId = pathParts[2] ? parseInt(pathParts[2]) : null;

  // Get customer data
  const customer = customerId ? customers.find(cust => cust.id === customerId) : null;

  useSidebarMenu();

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        {/* Customer Info */}
        <div className="user-profile text-center mt-3">
          <div className="">
            <div className="avatar-md mx-auto">
              <span className="avatar-title rounded-circle bg-primary text-white font-size-24">
                {customer?.name?.charAt(0) || 'C'}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <h4 className="font-size-16 mb-1">{customer?.name || 'Customer'}</h4>
            <span className="text-muted">
              <span className={`badge badge-soft-${customer?.isActive ? 'success' : 'danger'}`}>
                {customer?.isActive ? 'Active' : 'Inactive'}
              </span>
            </span>
          </div>
        </div>

        {/* Customer-Specific Sidebar */}
        <div id="sidebar-menu">
          {/* Customer Menu */}
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Customer Menu</li>

            <li>
              <Link to={`/customers/${customerId}`} className="waves-effect">
                <i className="ri-user-line"></i>
                <span>Overview</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/service-addresses`} className="waves-effect">
                <i className="ri-building-line"></i>
                <span>Service Addresses</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/appointments`} className="waves-effect">
                <i className="ri-calendar-check-line"></i>
                <span>Appointments</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/service-history`} className="waves-effect">
                <i className="ri-history-line"></i>
                <span>Service History</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/facilities`} className="waves-effect">
                <i className="mdi mdi-office-building"></i>
                <span>Facilities</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/areas`} className="waves-effect">
                <i className="mdi mdi-radar"></i>
                <span>Areas</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/inspection-points`} className="waves-effect">
                <i className="ri-map-pin-line"></i>
                <span>Inspection Points</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/invoices`} className="waves-effect">
                <i className="ri-file-list-3-line"></i>
                <span>Invoices</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/contracts`} className="waves-effect">
                <i className="ri-file-text-line"></i>
                <span>Contracts</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/proposals`} className="waves-effect">
                <i className="ri-file-paper-line"></i>
                <span>Proposals</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/documents`} className="waves-effect">
                <i className="ri-folder-line"></i>
                <span>Documents</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}/notes`} className="waves-effect">
                <i className="ri-sticky-note-line"></i>
                <span>Notes</span>
              </Link>
            </li>

            <li className="menu-title mt-3">Actions</li>

            <li>
              <Link to={`/customers/${customerId}?action=schedule-service`} className="waves-effect">
                <i className="ri-calendar-event-line"></i>
                <span>Schedule Service</span>
              </Link>
            </li>

            <li>
              <Link to={`/customers/${customerId}?action=create-invoice`} className="waves-effect">
                <i className="ri-file-add-line"></i>
                <span>Create Invoice</span>
              </Link>
            </li>

            <li className="menu-title mt-3">Navigation</li>

            <li>
              <Link to="/customers" className="waves-effect">
                <i className="ri-arrow-left-line"></i>
                <span>Back to Customers</span>
              </Link>
            </li>

            <li>
              <Link to="/" className="waves-effect">
                <i className="ri-home-4-line"></i>
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Sidebar */}
      </div>
    </div>
  );
};

export default Sidebar;
