import { useLocation } from "react-router-dom";
import useSidebarMenu from "../../hooks/useSidebarMenu";
import useCustomerData from "../../hooks/useCustomerData";
import MenuRenderer from "./MenuRenderer";
import {
  customerMenuConfig,
  navigationActionsConfig,
} from "./customer/customerMenuConfig";
import { extractCustomerId } from "./menuUtils";

const Sidebar = () => {
  const location = useLocation();

  const customerId = extractCustomerId(location.pathname);

  const { customer } = useCustomerData(customerId);

  // Initialize sidebar menu functionality
  useSidebarMenu();

  return (
    <div className="vertical-menu">
      <div data-simplebar className="h-100">
        {/* Customer Info */}
        <div className="user-profile text-center mt-3">
          <div className="">
            <div className="avatar-md mx-auto">
              <span className="avatar-title rounded-circle bg-primary text-white font-size-24">
                {customer?.name?.charAt(0) || "C"}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <h4 className="font-size-16 mb-1">
              {customer?.name || "Customer"}
            </h4>
            <span className="text-muted">
              <span
                className={`badge badge-soft-${
                  customer?.isActive ? "success" : "danger"
                }`}
              >
                {customer?.isActive ? "Active" : "Inactive"}
              </span>
            </span>
          </div>
        </div>

        {/* Customer-Specific Sidebar */}
        <div id="sidebar-menu">
          {/* Customer Menu */}
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Customer Menu</li>

            {/* Render hierarchical menu from configuration */}
            <MenuRenderer items={customerMenuConfig} customerId={customerId} />

            {/* Navigation Section */}
            <li className="menu-title mt-3">Navigation</li>

            {/* Render navigation actions */}
            <MenuRenderer
              items={navigationActionsConfig}
              customerId={customerId}
            />
          </ul>
        </div>
        {/* Sidebar */}
      </div>
    </div>
  );
};

export default Sidebar;
