import { getAreas, getFacilities, getFacilitiesByCustomerId } from '../../../../utils/localStorage';
import { inspectionPointStatuses } from '../../../../data/mockData';

// Offcanvas form for adding/editing an Inspection Point
// Props mirror other Add/Edit components and consume useAddEditInspectionPoint hook output
// Optional props: customerId, facilityId to filter area selection
const AddEditInspectionPoint = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave, customerId, facilityId }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    // Derive areas list: if facilityId provided use its areas; else if customerId provided gather areas under that customer's facilities; else all areas.
    let areas = [];
    if (facilityId) {
        // We don't have a direct helper, so filter areas by facilityId
        areas = (getAreas() || []).filter(a => a.facilityId === facilityId);
    } else if (customerId) {
        const facilities = getFacilitiesByCustomerId ? getFacilitiesByCustomerId(customerId) : (getFacilities() || []).filter(f => f.customerId === customerId);
        const facilityIds = facilities.map(f => f.id);
        areas = (getAreas() || []).filter(a => facilityIds.includes(a.facilityId));
    } else {
        areas = getAreas() || [];
    }

    return (
        <>
            <div className="offcanvas offcanvas-end show" tabIndex="-1">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{formData.id && formData.id !== 0 ? 'Edit Inspection Point' : 'Add Inspection Point'}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body offcanvas-scrollable">
                    <form onSubmit={handleSubmit}>
                        {/* Point Name */}
                        <div className="mb-3">
                            <label htmlFor="pointName" className="form-label">Point Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.pointName ? 'is-invalid' : ''}`}
                                id="pointName"
                                value={formData.pointName || ''}
                                onChange={(e) => onUpdateField('pointName', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.pointName && <div className="invalid-feedback">{errors.pointName}</div>}
                        </div>

                        {/* Barcode */}
                        <div className="mb-3">
                            <label htmlFor="barcode" className="form-label">Barcode</label>
                            <input
                                type="text"
                                className="form-control"
                                id="barcode"
                                value={formData.barcode || ''}
                                onChange={(e) => onUpdateField('barcode', e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        {/* Area */}
                        <div className="mb-3">
                            <label htmlFor="areaId" className="form-label">Area</label>
                            <select
                                className={`form-select ${errors.areaId ? 'is-invalid' : ''}`}
                                id="areaId"
                                value={formData.areaId ?? ''}
                                onChange={(e) => onUpdateField('areaId', Number(e.target.value))}
                                disabled={isSaving}
                            >
                                <option value="">Select an area</option>
                                {areas.map(area => (
                                    <option key={area.id} value={area.id}>{area.name}</option>
                                ))}
                            </select>
                            {errors.areaId && <div className="invalid-feedback">{errors.areaId}</div>}
                        </div>

                        {/* Type */}
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                value={formData.type || ''}
                                onChange={(e) => onUpdateField('type', e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        {/* Type Category */}
                        <div className="mb-3">
                            <label htmlFor="typeCategory" className="form-label">Type Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="typeCategory"
                                value={formData.typeCategory || ''}
                                onChange={(e) => onUpdateField('typeCategory', e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="status"
                                value={formData.status ?? 0}
                                onChange={(e) => onUpdateField('status', Number(e.target.value))}
                                disabled={isSaving}
                            >
                                {inspectionPointStatuses.map((s) => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        {errors.submit && (
                            <div className="alert alert-danger" role="alert">
                                {errors.submit}
                            </div>
                        )}

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success" disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Saving...
                                    </>
                                ) : (
                                    formData.id && formData.id !== 0 ? 'Edit Inspection Point' : 'Add Inspection Point'
                                )}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
        </>
    );
};

export default AddEditInspectionPoint;

