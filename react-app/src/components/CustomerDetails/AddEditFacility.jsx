import React, { useEffect, useState } from 'react';
import { getSites, getSitesByAccountId } from '../../utils/localStorage';

const AddEditFacility = (
    props
) => {
    const { facility, show, onClose, onSave, accountId } = props;

    const [populatedFacility, setPopulatedFacility] = useState(facility || {});

    // When the offcanvas opens, refresh local form state from the incoming facility prop.
    // This handles the case where the same component instance is reused and `facility` may
    // be different on subsequent opens.
    useEffect(() => {
        if (show) {
            setPopulatedFacility(facility);
        }
    }, [show, facility]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // basic validation
        if (!populatedFacility.name?.trim() || !populatedFacility.siteId) {
            return;
        }

        if (typeof onSave === 'function') {
            onSave({
                ...populatedFacility,
                name: populatedFacility.name.trim(),
                siteId: Number(populatedFacility.siteId)
            });
        }
    };

    return (
        <>
            {show &&
                (<div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} data-bs-scroll="true" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">{facility.id > 0 ? 'Edit Facility' : 'Add Facility'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="offcanvas-body offcanvas-scrollable">
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="facilityName" className="form-label">Facility Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="facilityName"
                                    value={populatedFacility.name}
                                    onChange={(e) => setPopulatedFacility({ ...populatedFacility, name: e.target.value })}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a facility name.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="siteSelect" className="form-label">Service address</label>
                                <select
                                    className="form-select"
                                    id="siteSelect"
                                    value={populatedFacility.siteId}
                                    onChange={(e) => setPopulatedFacility({ ...populatedFacility, siteId: e.target.value })}
                                    required
                                >
                                    <option value="">Select a service address</option>
                                    {/* Map through available sites and create an option for each */}
                                    {getSitesByAccountId(accountId).map(site => (
                                        <option key={site.id} value={site.id}>{site.address}</option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                    Please select a service address.
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>)
            }

            {show && <div className="offcanvas-backdrop fade show" onClick={onClose} />}
        </>
    );
};

export default AddEditFacility;