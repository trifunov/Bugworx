import React from 'react';
import { getServiceAddresses } from '../../../../utils/localStorage';

const ViewFacility = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  const serviceAddresses = getServiceAddresses();
  const serviceAddress = serviceAddresses.find(sa => sa.id === data.serviceAddressId);

  return (
    <>
      <div className="offcanvas offcanvas-end show" tabIndex="-1" style={{ visibility: 'visible' }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">View Facility</h5>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label className="form-label fw-semibold">Facility Name</label>
            <p className="form-control-plaintext">{data.name || '-'}</p>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Service Address</label>
            <p className="form-control-plaintext">{serviceAddress?.address || '-'}</p>
          </div>

          {data.drawing && data.drawing.name && (
            <div className="mb-3">
              <label className="form-label fw-semibold">Drawing</label>
              <p className="form-control-plaintext">
                {data.drawing.url ? (
                  <a href={data.drawing.url} target="_blank" rel="noopener noreferrer">
                    {data.drawing.name}
                  </a>
                ) : (
                  data.drawing.name
                )}
              </p>
            </div>
          )}

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

export default ViewFacility;
