
const Configuration = () => {
  return (
    <>
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Configuration</h4>

            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="javascript: void(0);">Bugworx</a></li>
                <li className="breadcrumb-item active">Configuration</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}

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