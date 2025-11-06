import React from 'react';
import { Link } from 'react-router-dom';
import useSidebarMenu from '../../hooks/useSidebarMenu';

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

            {/* Main Menu 1: User & Access Management */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-user-settings-line" />
                <span>User & Access</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/user-access/users">Users</Link></li>
                <li><Link to="/configuration/user-access/roles-permissions">Roles & Permissions</Link></li>
                <li><Link to="/configuration/user-access/employee-directory">Employee Directory</Link></li>
                <li><Link to="/configuration/user-access/teams-branches">Teams / Branches</Link></li>
                <li><Link to="/configuration/user-access/user-activity-log">User Activity Log</Link></li>
              </ul>
            </li>

            {/* Main Menu 2: Operational Setup */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-settings-2-line" />
                <span>Operational Setup</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/operational-setup/contract-types">Contract Types</Link></li>
                <li><Link to="/configuration/operational-setup/service-types">Service Types</Link></li>
                <li><Link to="/configuration/operational-setup/frequency-templates">Frequency Templates</Link></li>
                <li><Link to="/configuration/operational-setup/job-settings">Job Settings</Link></li>
                <li><Link to="/configuration/operational-setup/route-configuration">Route Configuration</Link></li>
                <li><Link to="/configuration/operational-setup/operational-zones">Operational Zones</Link></li>
              </ul>
            </li>

            {/* Main Menu 3: Service & Inspection Setup */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-clipboard-line" />
                <span>Service & Inspection</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/service-inspection/inspection-point-categories">Inspection Point Categories</Link></li>
                <li><Link to="/configuration/service-inspection/inspection-point-types">Inspection Point Types</Link></li>
                <li><Link to="/configuration/service-inspection/pest-types">Pest Types</Link></li>
                <li><Link to="/configuration/service-inspection/treatment-types">Treatment Types</Link></li>
                <li><Link to="/configuration/service-inspection/service-templates">Service Templates</Link></li>
                <li><Link to="/configuration/service-inspection/equipment-devices">Equipment / Devices</Link></li>
                <li><Link to="/configuration/service-inspection/material-setup">Material Setup</Link></li>
              </ul>
            </li>

            {/* Main Menu 4: Fleet / Vehicle Management */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-truck-line" />
                <span>Fleet Management</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/fleet/vehicles">Vehicle List</Link></li>
                <li><Link to="/configuration/fleet/vehicle-types">Vehicle Types</Link></li>
                <li><Link to="/configuration/fleet/fuel-types">Fuel Type & Capacity</Link></li>
                <li><Link to="/configuration/fleet/maintenance-templates">Maintenance Schedule Templates</Link></li>
                <li><Link to="/configuration/fleet/driver-assignment">Driver Assignment Rules</Link></li>
                <li><Link to="/configuration/fleet/gps-integration">GPS / Tracking Integration</Link></li>
                <li><Link to="/configuration/fleet/insurance-registration">Insurance & Registration Records</Link></li>
                <li><Link to="/configuration/fleet/usage-policy">Usage Policy Setup</Link></li>
              </ul>
            </li>

            {/* Main Menu 5: Financial & Billing Setup */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-wallet-3-line" />
                <span>Financial & Billing Setup</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/financial/tax-configuration">Tax Configuration</Link></li>
                <li><Link to="/configuration/financial/currency-localization">Currency & Localization</Link></li>
                <li><Link to="/configuration/financial/invoice-templates">Invoice Templates</Link></li>
                <li><Link to="/configuration/financial/service-pricing-rules">Service Pricing Rules</Link></li>
                <li><Link to="/configuration/financial/payment-terms">Payment Terms</Link></li>
                <li><Link to="/configuration/financial/batch-processing">Batch Processing Setup</Link></li>
                <li><Link to="/configuration/financial/accounting-periods">Accounting Periods</Link></li>
              </ul>
            </li>

            {/* Main Menu 6: Communication & Notifications */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-notification-2-line" />
                <span>Communication</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/communication/email-sms-templates">Email & SMS Templates</Link></li>
                <li><Link to="/configuration/communication/notification-rules">Notification Rules</Link></li>
                <li><Link to="/configuration/communication/report-distribution">Report Distribution</Link></li>
                <li><Link to="/configuration/communication/system-messages">System Messages</Link></li>
              </ul>
            </li>

            {/* Main Menu 7: Templates & Defaults */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-file-3-line" />
                <span>Templates & Defaults</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/templates/property-type">Property Type Template</Link></li>
                <li><Link to="/configuration/templates/service-program-templates">Service / Program Templates</Link></li>
                <li><Link to="/configuration/templates/proposal-templates">Proposal Templates</Link></li>
                <li><Link to="/configuration/templates/observations-recommendations">Observations & Recommendations</Link></li>
                <li><Link to="/configuration/templates/cancellation-adjustment-reasons">Cancellation, Adjustment & Rejection Reasons</Link></li>
                <li><Link to="/configuration/templates/technician-field-forms">Technician Field Forms / Checklists</Link></li>
                <li><Link to="/configuration/templates/facility-template">Facility Template</Link></li>
                <li><Link to="/configuration/templates/locations-zones">Locations / Zones Templates</Link></li>
                <li><Link to="/configuration/templates/inspection-point-category-templates">Inspection Point Category Templates</Link></li>
                <li><Link to="/configuration/templates/inspection-point-type-templates">Inspection Point Type Templates</Link></li>
              </ul>
            </li>

            {/* Main Menu 8: General System Settings */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-global-line" />
                <span>System Settings</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/general/company-profile">Company Profile</Link></li>
                <li><Link to="/configuration/general/custom-fields">Custom Fields</Link></li>
                <li><Link to="/configuration/general/api-integrations">API & Integrations</Link></li>
                <li><Link to="/configuration/general/data-import-export">Data Import / Export</Link></li>
                <li><Link to="/configuration/general/audit-trail">Audit Trail</Link></li>
                <li><Link to="/configuration/general/backup-restore">Backup & Restore</Link></li>
              </ul>
            </li>

            {/* Main Menu 9: Optional Add-ons */}
            <li>
              <a href="#" className="has-arrow waves-effect">
                <i className="ri-tools-fill" />
                <span>Optional Add-ons</span>
              </a>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/configuration/addons/safety-compliance">Safety & Compliance Setup</Link></li>
                <li><Link to="/configuration/addons/quality-assurance">Quality Assurance Setup</Link></li>
                <li><Link to="/configuration/addons/iot-smart-devices">IoT & Smart Devices</Link></li>
              </ul>
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