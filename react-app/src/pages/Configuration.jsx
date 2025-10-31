import { useEffect } from "react";
import { usePageSubHeader } from "../contexts/PageSubHeaderContext";

const Configuration = () => {
  const { setPageSubHeader } = usePageSubHeader();
  useEffect(() => {
    setPageSubHeader({
      title: 'Configuration',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' }
      ]
    });
  }, [setPageSubHeader]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">General Settings</h4>
              {/* ...existing form markup... */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configuration;