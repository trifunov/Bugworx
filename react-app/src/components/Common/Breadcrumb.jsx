import React from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '../../contexts/BreadcrumbContext';

const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumbs();

  // Always start with the Home breadcrumb
  const allBreadcrumbs = [{ label: 'Bugworx', path: '/' }, ...breadcrumbs];

  // Only show breadcrumbs if there's more than just the "Home" link
  if (allBreadcrumbs.length <= 1) {
    return null;
  }

  return (
    <ol className="breadcrumb m-0">
      {allBreadcrumbs.map((crumb, index) => {
        const isLast = index === allBreadcrumbs.length - 1;
        return (
          <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
            {isLast ? (
              crumb.label
            ) : (
              <Link to={crumb.path}>{crumb.label}</Link>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Breadcrumb;