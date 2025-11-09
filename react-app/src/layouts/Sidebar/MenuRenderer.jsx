import React from "react";
import { Link } from "react-router-dom";
import { buildCustomerRoute } from "./menuUtils";

/**
 * MenuRenderer Component
 *
 * @param {Object} props
 * @param {Array} props.items - Array of menu item configurations
 * @param {number|string} props.customerId - Customer ID for building routes
 */
const MenuRenderer = ({ items, customerId }) => {
  if (!items || !Array.isArray(items)) {
    return null;
  }

  /**
   * Render a single menu item (leaf node with no children)
   */
  const renderMenuItem = (item) => {
    const route = item.absolute
      ? item.route
      : buildCustomerRoute(customerId, item.route);

    return (
      <li key={item.id}>
        <Link to={route} className="waves-effect">
          {item.icon && <i className={item.icon}></i>}
          <span>{item.label}</span>
        </Link>
      </li>
    );
  };

  /**
   * Render a parent menu item with nested children
   */
  const renderParentMenuItem = (item) => {
    const handleClick = (e) => {
      e.preventDefault();
    };

    return (
      <li key={item.id}>
        <a
          href="#"
          className="has-arrow waves-effect"
          onClick={handleClick}
          role="button"
          aria-expanded="false"
        >
          {item.icon && <i className={item.icon}></i>}
          <span>{item.label}</span>
        </a>
        <ul className="sub-menu" aria-expanded="false">
          {item.children.map((child) => {
            const childRoute = child.absolute
              ? child.route
              : buildCustomerRoute(customerId, child.route);

            return (
              <li key={child.id}>
                <Link to={childRoute}>
                  {child.icon && <i className={child.icon}></i>}
                  <span>{child.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  };

  /**
   * Determine whether to render as parent (with children) or single item
   */
  return (
    <>
      {items.map((item) => {
        // Check if item has children (nested menu)
        if (
          item.children &&
          Array.isArray(item.children) &&
          item.children.length > 0
        ) {
          return renderParentMenuItem(item);
        } else {
          return renderMenuItem(item);
        }
      })}
    </>
  );
};

export default MenuRenderer;
