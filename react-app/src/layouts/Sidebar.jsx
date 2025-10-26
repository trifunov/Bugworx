import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { accounts } from '../data/mockData';

const Sidebar = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const accountId = pathParts[2] ? parseInt(pathParts[2]) : null;

  // Get customer data
  const customer = accountId ? accounts.find(acc => acc.id === accountId) : null;

  useEffect(() => {
    // Initialize MetisMenu after component mounts
    if (window.jQuery && window.jQuery.fn.metisMenu) {
      window.jQuery("#side-menu").metisMenu();
    }

    // Initialize Waves effect
    if (window.Waves) {
      window.Waves.init();
    }
  }, []);

  useEffect(() => {
    // Update active menu item based on current route
    const activateMenuItems = () => {
      const links = document.querySelectorAll('#side-menu a');
      links.forEach(link => {
        link.classList.remove('active');
        const parent = link.parentElement;
        if (parent) {
          parent.classList.remove('mm-active');
        }
      });

      const currentPath = location.pathname;
      const matchingLink = Array.from(links).find(link => {
        const href = link.getAttribute('href');
        return href === currentPath;
      });

      if (matchingLink) {
        matchingLink.classList.add('active');
        const parent = matchingLink.parentElement;
        if (parent) {
          parent.classList.add('mm-active');
        }
      }
    };

    activateMenuItems();
  }, [location]);

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
              <Link to={`/accounts/${accountId}`} className="waves-effect">
                <i className="ri-user-line"></i>
                <span>Overview</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/sites`} className="waves-effect">
                <i className="ri-building-line"></i>
                <span>Sites</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/appointments`} className="waves-effect">
                <i className="ri-calendar-check-line"></i>
                <span>Appointments</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/service-history`} className="waves-effect">
                <i className="ri-history-line"></i>
                <span>Service History</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/facilities`} className="waves-effect">
                <i className="mdi mdi-office-building"></i>
                <span>Facilities</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/areas`} className="waves-effect">
                <i className="mdi mdi-radar"></i>
                <span>Areas</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/inspection-points`} className="waves-effect">
                <i className="ri-map-pin-line"></i>
                <span>Inspection Points</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/invoices`} className="waves-effect">
                <i className="ri-file-list-3-line"></i>
                <span>Invoices</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/contracts`} className="waves-effect">
                <i className="ri-file-text-line"></i>
                <span>Contracts</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/documents`} className="waves-effect">
                <i className="ri-folder-line"></i>
                <span>Documents</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/notes`} className="waves-effect">
                <i className="ri-sticky-note-line"></i>
                <span>Notes</span>
              </Link>
            </li>

            <li className="menu-title mt-3">Actions</li>

            <li>
              <Link to={`/accounts/${accountId}/schedule-service`} className="waves-effect">
                <i className="ri-calendar-event-line"></i>
                <span>Schedule Service</span>
              </Link>
            </li>

            <li>
              <Link to={`/accounts/${accountId}/create-invoice`} className="waves-effect">
                <i className="ri-file-add-line"></i>
                <span>Create Invoice</span>
              </Link>
            </li>

            <li className="menu-title mt-3">Navigation</li>

            <li>
              <Link to="/accounts" className="waves-effect">
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
