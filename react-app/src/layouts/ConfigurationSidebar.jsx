import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSidebarMenu from '../hooks/useSidebarMenu';

const ConfigurationSidebar = () => {
  
   useSidebarMenu(); // uses default selector '#side-menu'

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