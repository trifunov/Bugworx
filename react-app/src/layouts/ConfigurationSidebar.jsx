import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ConfigurationSidebar = () => {
  
  useEffect(() => {
    // Initialize MetisMenu after component mounts
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.metisMenu) {
      window.jQuery('#side-menu').metisMenu();
    }

    // Initialize Waves effect
    if (window.Waves && typeof window.Waves.init === 'function') {
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
        {/* Customer-Specific Sidebar */}
        <div id="sidebar-menu">
          {/* Customer Menu */}
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Configuration</li>

            <li>
              <Link to={`/configuration/companyprofile`} className="waves-effect">
                <i className="ri-user-line" />
                <span>Company Profile</span>
              </Link>
            </li>

            <li>
              <Link to={`/configuration/customfields`} className="waves-effect">
                <i className="ri-building-line" />
                <span>Custom Fields </span>
              </Link>
            </li>

            <li>
              <Link to={`/configuration/apiintegrations`} className="waves-effect">
                <i className="ri-calendar-check-line" />
                <span>API & Integrations </span>
              </Link>
            </li>

            <li>
              <Link to={`/configuration/dataimportexport`} className="waves-effect">
                <i className="ri-history-line" />
                <span>Data Import / Export </span>
              </Link>
            </li>

            <li>
              <Link to={`/configuration/audittrail`} className="waves-effect">
                <i className="ri-file-list-3-line" />
                <span>Audit Trail</span>
              </Link>
            </li>

            <li>
              <Link to={`/configuration/backupandrestore`} className="waves-effect">
                <i className="ri-file-text-line" />
                <span>Backup & Restore</span>
              </Link>
            </li>

            <li className="menu-title mt-3">Navigation</li>
            <li>
              <Link to="/" className="waves-effect">
                <i className="ri-home-4-line" />
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

export default ConfigurationSidebar;