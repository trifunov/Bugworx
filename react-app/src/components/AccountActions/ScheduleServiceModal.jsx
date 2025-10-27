import { getServiceTypes } from '../../utils/localStorage';

const ScheduleServiceModal = ({ isOpen, formData, errors, isSaving, accountSites, onUpdateField, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const serviceTypes = getServiceTypes();

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const priorities = ['Low', 'Normal', 'High', 'Emergency'];

  return (
    <>
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden', width: '600px' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Schedule Service</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="siteId" className="form-label">Select Site <span className="text-danger">*</span></label>
              <select
                className={`form-select ${errors.siteId ? 'is-invalid' : ''}`}
                id="siteId"
                value={formData.siteId || ''}
                onChange={(e) => onUpdateField('siteId', parseInt(e.target.value))}
                disabled={isSaving}
              >
                <option value="">Choose site...</option>
                {accountSites && accountSites.map(site => (
                  <option key={site.id} value={site.id}>{site.siteName || site.address}</option>
                ))}
              </select>
              {errors.siteId && <div className="invalid-feedback">{errors.siteId}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="serviceType" className="form-label">Service Type <span className="text-danger">*</span></label>
              <select
                className={`form-select ${errors.serviceType ? 'is-invalid' : ''}`}
                id="serviceType"
                value={formData.serviceType || ''}
                onChange={(e) => onUpdateField('serviceType', e.target.value)}
                disabled={isSaving}
              >
                <option value="">Choose service...</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.serviceType && <div className="invalid-feedback">{errors.serviceType}</div>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="scheduledDate" className="form-label">Preferred Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  className={`form-control ${errors.scheduledDate ? 'is-invalid' : ''}`}
                  id="scheduledDate"
                  value={formData.scheduledDate || ''}
                  onChange={(e) => onUpdateField('scheduledDate', e.target.value)}
                  disabled={isSaving}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.scheduledDate && <div className="invalid-feedback">{errors.scheduledDate}</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="scheduledTime" className="form-label">Preferred Time <span className="text-danger">*</span></label>
                <select
                  className={`form-select ${errors.scheduledTime ? 'is-invalid' : ''}`}
                  id="scheduledTime"
                  value={formData.scheduledTime || ''}
                  onChange={(e) => onUpdateField('scheduledTime', e.target.value)}
                  disabled={isSaving}
                >
                  <option value="">Choose time...</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.scheduledTime && <div className="invalid-feedback">{errors.scheduledTime}</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="estimatedDuration" className="form-label">Estimated Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  id="estimatedDuration"
                  value={formData.estimatedDuration || 60}
                  onChange={(e) => onUpdateField('estimatedDuration', parseInt(e.target.value))}
                  disabled={isSaving}
                  min="15"
                  step="15"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select
                  className="form-select"
                  id="priority"
                  value={formData.priority || 'Normal'}
                  onChange={(e) => onUpdateField('priority', e.target.value)}
                  disabled={isSaving}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="specialInstructions" className="form-label">Special Instructions</label>
              <textarea
                className="form-control"
                id="specialInstructions"
                rows="3"
                placeholder="Any special instructions or notes..."
                value={formData.specialInstructions || ''}
                onChange={(e) => onUpdateField('specialInstructions', e.target.value)}
                disabled={isSaving}
              ></textarea>
            </div>

            {errors.submit && (
              <div className="alert alert-danger" role="alert">
                {errors.submit}
              </div>
            )}

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Scheduling...
                  </>
                ) : (
                  <>
                    <i className="bx bx-calendar-check me-1"></i>
                    Schedule Appointment
                  </>
                )}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {isOpen && <div className="offcanvas-backdrop fade show" onClick={onClose}></div>}
    </>
  );
};

export default ScheduleServiceModal;
