import { useNavigate } from 'react-router-dom';

const ViewReportsModal = ({ isOpen, selectedReportType, dateRange, onSelectReportType, onUpdateDateRange, onClose, onGenerate, customerId }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const reportTypes = [
    { id: 'service-history', name: 'Service History', icon: 'mdi-history', description: 'Complete service history for this customer' },
    { id: 'upcoming-services', name: 'Upcoming Services', icon: 'mdi-calendar-clock', description: 'Scheduled services for this customer' },
    { id: 'invoices', name: 'Invoice Report', icon: 'mdi-receipt', description: 'Invoice history and status' },
    { id: 'chemical-usage', name: 'Chemical Usage', icon: 'mdi-flask-outline', description: 'Chemicals used at customer service addresses' },
    { id: 'site-summary', name: 'Service Address Summary', icon: 'mdi-map-marker-multiple', description: 'Summary of all service addresses for this customer' }
  ];

  const handleViewFullReports = () => {
    navigate('/reports');
    onClose();
  };

  const handleGenerateReport = () => {
    if (selectedReportType) {
      onGenerate();
      navigate('/reports');
      onClose();
    }
  };

  return (
    <>
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden', width: '500px' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Customer Reports</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-4">
            <p className="text-muted">Generate reports for this customer or view all reports.</p>
          </div>

          <div className="mb-4">
            <h6 className="mb-3">Date Range</h6>
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={dateRange.startDate || ''}
                  onChange={(e) => onUpdateDateRange('startDate', e.target.value)}
                />
              </div>
              <div className="col-6 mb-3">
                <label htmlFor="endDate" className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={dateRange.endDate || ''}
                  onChange={(e) => onUpdateDateRange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="mb-3">Select Report Type</h6>
            <div className="d-grid gap-2">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className={`card cursor-pointer ${selectedReportType === report.id ? 'border-primary' : ''}`}
                  onClick={() => onSelectReportType(report.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body p-3">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0 me-3">
                        <div className={`avatar-sm ${selectedReportType === report.id ? 'bg-primary bg-soft' : 'bg-light'} rounded d-flex align-items-center justify-content-center`}>
                          <i className={`${report.icon} ${selectedReportType === report.id ? 'text-primary' : 'text-muted'} font-size-20`}></i>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{report.name}</h6>
                        <p className="text-muted mb-0 small">{report.description}</p>
                      </div>
                      {selectedReportType === report.id && (
                        <div className="flex-shrink-0">
                          <i className="mdi mdi-check-circle text-primary font-size-20"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerateReport}
              disabled={!selectedReportType}
            >
              <i className="mdi mdi-file-chart me-1"></i>
              Generate Report
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleViewFullReports}
            >
              <i className="mdi mdi-file-document-multiple me-1"></i>
              View All Reports
            </button>
            <button type="button" className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      {isOpen && <div className="offcanvas-backdrop fade show" onClick={onClose}></div>}
    </>
  );
};

export default ViewReportsModal;
