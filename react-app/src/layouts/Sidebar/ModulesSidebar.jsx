import { Link, useLocation } from 'react-router-dom';
import { dashboardMenuConfig } from './dashboard/dashboardMenuConfig';

const ModulesSidebar = () => {
  const location = useLocation();

  // Check if current path matches or starts with a route
  const isActive = (route) => {
    if (route === '/') {
      return location.pathname === '/';
    }
    return location.pathname === route || location.pathname.startsWith(route + '/');
  };

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        {/* Modules Header */}
        <div className="user-profile text-center mt-3">
          <div className="">
            <div className="avatar-md mx-auto">
              <span className="avatar-title rounded-circle bg-primary text-white font-size-24">
                <i className="mdi mdi-view-dashboard"></i>
              </span>
            </div>
          </div>
          <div className="mt-3">
            <h4 className="font-size-16 mb-1">Bugworx</h4>
            <span className="text-muted font-size-13">Pest Control ERP</span>
          </div>
        </div>

        {/* Modules Menu */}
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Modules</li>

            {dashboardMenuConfig.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.route}
                  className={isActive(item.route) ? 'active' : ''}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModulesSidebar;
