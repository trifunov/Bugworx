import { Link } from 'react-router-dom';

const SectionHeader = ({ title, breadcrumbs }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">{title}</h4>
          {breadcrumbs && (
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                {breadcrumbs.map((crumb, index) => (
                  <li
                    key={index}
                    className={`breadcrumb-item ${
                      index === breadcrumbs.length - 1 ? 'active' : ''
                    }`}
                  >
                    {crumb.link ? (
                      <Link to={crumb.link}>{crumb.label}</Link>
                    ) : (
                      crumb.label
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
