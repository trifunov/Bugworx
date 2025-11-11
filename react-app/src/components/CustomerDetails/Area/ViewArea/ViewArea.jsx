import React from 'react';
import { getFacilities } from '../../../../utils/localStorage';

const ViewArea = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  const facilities = getFacilities();
  const facility = facilities.find(f => f.id === data.facilityId);

  return (
    <>
      <div className="offcanvas offcanvas-end show" tabIndex="-1" style={{ visibility: 'visible' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">View Area</h5>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label className="form-label fw-semibold">Area Name</label>
            <p className="form-control-plaintext">{data.name || '-'}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Facility</label>
            <p className="form-control-plaintext">{facility?.name || '-'}</p>
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

export default ViewArea;
