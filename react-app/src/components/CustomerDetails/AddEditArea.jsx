import React, { useEffect, useState } from 'react';
import { getFacilitiesByAccountId } from '../../utils/localStorage';

const AddEditArea = (
    props
) => {
    const { area, show, onClose, onSave, accountId } = props;

    const [populatedArea, setPopulatedArea] = useState(area || { name: '', facilityId: '' });

    // When the offcanvas opens, refresh local form state from the incoming area prop.
    // This handles the case where the same component instance is reused and `area` may
    // be different on subsequent opens.
    useEffect(() => {
        if (show) {
            setPopulatedArea(area ? { ...area } : { name: '', facilityId: '' });
        }
    }, [show, area]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // basic validation
        if (!populatedArea.name?.trim() || !populatedArea.facilityId) {
            return;
        }

        if (typeof onSave === 'function') {
            onSave({
                ...populatedArea,
                name: populatedArea.name.trim(),
                facilityId: Number(populatedArea.facilityId)
            });
        }
    };

    return (
        <>
            {show &&
                (<div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">{area.id > 0 ? 'Edit Area' : 'Add Area'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="offcanvas-body">
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="areaName" className="form-label">Area Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="areaName"
                                    value={populatedArea.name}
                                    onChange={(e) => setPopulatedArea({ ...populatedArea, name: e.target.value })}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide an area name.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="facilitySelect" className="form-label">Facility</label>
                                <select
                                    className="form-select"
                                    id="facilitySelect"
                                    value={populatedArea.facilityId}
                                    onChange={(e) => setPopulatedArea({ ...populatedArea, facilityId: e.target.value })}
                                    required
                                >
                                    <option value="">Select a facility</option>
                                    {/* Map through available facilities and create an option for each */}
                                    {getFacilitiesByAccountId(accountId).map(facility => (
                                        <option key={facility.id} value={facility.id}>{facility.name}</option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                    Please select a facility.
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

export default AddEditArea;