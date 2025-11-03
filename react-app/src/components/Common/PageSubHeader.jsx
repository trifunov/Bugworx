import React from 'react';
import { Link } from 'react-router-dom';
import { usePageSubHeader } from '../../contexts/PageSubHeaderContext';

const PageSubHeader = () => {
  const { pageSubHeader } = usePageSubHeader();

  // Do not render the sub-header if no title is set
  if (!pageSubHeader || !pageSubHeader.title) {
    return null;
  }

  const { title, breadcrumbs } = pageSubHeader;

  // Always start with the Home breadcrumb
  const allBreadcrumbs = [{ label: 'Home', path: '/' }, ...(breadcrumbs || [])];

  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0">{title}</h4>

          {/* Breadcrumb logic is now inside this component */}
          {allBreadcrumbs.length > 1 && (
            <div className="page-title-right">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageSubHeader;