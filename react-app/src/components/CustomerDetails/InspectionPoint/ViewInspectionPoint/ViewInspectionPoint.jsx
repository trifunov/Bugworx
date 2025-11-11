import React from 'react';
import { getAreas } from '../../../../utils/localStorage';
import { inspectionPointStatuses } from '../../../../data/mockData';

const ViewInspectionPoint = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  const areas = getAreas();
  const area = areas.find(a => a.id === data.areaId);
  const status = inspectionPointStatuses.find(s => s.id === data.status);

  return (
    <>
      <div className="offcanvas offcanvas-end show" tabIndex="-1" style={{ visibility: 'visible' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">View Inspection Point</h5>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label className="form-label fw-semibold">Point Name</label>
            <p className="form-control-plaintext">{data.pointName || '-'}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Barcode</label>
            <p className="form-control-plaintext">{data.barcode || '-'}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Area</label>
            <p className="form-control-plaintext">{area?.name || '-'}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Type</label>
            <p className="form-control-plaintext">{data.type || '-'}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Type Category</label>
            <p className="form-control-plaintext">{data.typeCategory || '-'}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Status</label>
            <p className="form-control-plaintext">{status?.label || '-'}</p>
          </div>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
    </>
  );
};

export default ViewInspectionPoint;
