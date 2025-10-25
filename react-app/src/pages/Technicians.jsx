import { technicians } from '../data/mockData';

const Technicians = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Technicians</h4>
            <div className="page-title-right">
              <button className="btn btn-primary">
                <i className="bx bx-plus me-1"></i>
                Add Technician
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {technicians.map((tech) => (
          <div key={tech.id} className="col-xl-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <div className="avatar-md mx-auto mb-3">
                    <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                      {tech.name.charAt(0)}
                    </span>
                  </div>
                  <h5 className="font-size-16 mb-1">{tech.name}</h5>
                  <p className="text-muted mb-2">{tech.specialization}</p>
                </div>

                <div className="mt-3 pt-1">
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-2">Email:</p>
                    <p className="mb-2">{tech.email}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-2">Phone:</p>
                    <p className="mb-2">{tech.phone}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-2">License:</p>
                    <p className="mb-2">{tech.licenseNumber}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-2">Vehicle:</p>
                    <p className="mb-2">{tech.vehicleNumber}</p>
                  </div>
                </div>

                <div className="mt-3 pt-1 border-top">
                  <div className="d-flex justify-content-between">
                    <div className="text-center">
                      <p className="text-muted mb-1">Rating</p>
                      <h5 className="font-size-14">
                        {tech.rating}
                        <i className="bx bxs-star text-warning ms-1"></i>
                      </h5>
                    </div>
                    <div className="text-center">
                      <p className="text-muted mb-1">Completed Jobs</p>
                      <h5 className="font-size-14">{tech.completedJobs}</h5>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <span className={`badge badge-soft-${tech.isActive ? 'success' : 'danger'} w-100`}>
                    {tech.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="mt-3 d-flex gap-2">
                  <button className="btn btn-sm btn-primary flex-fill">
                    <i className="bx bx-edit"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-info flex-fill">
                    <i className="bx bx-calendar"></i> Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Technician Performance</h5>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Vehicle</th>
                      <th>Completed Jobs</th>
                      <th>Rating</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicians.map((tech) => (
                      <tr key={tech.id}>
                        <td>{tech.name}</td>
                        <td>{tech.specialization}</td>
                        <td>{tech.vehicleNumber}</td>
                        <td>{tech.completedJobs}</td>
                        <td>
                          <span className="text-warning">
                            {tech.rating}
                            <i className="bx bxs-star ms-1"></i>
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-soft-${tech.isActive ? 'success' : 'danger'}`}>
                            {tech.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Technicians;
