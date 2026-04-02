import { getLeads, getTechnicians, getServiceAddresses } from '../../../utils/localStorage';
import { FREQUENCIES, STATUSES } from './useAddEditProgram';

const AddEditProgram = ({ isOpen, formData, errors, isSaving, onUpdateField, onToggleSite, onClose, onSave }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    const leads = getLeads() || [];
    const technicians = getTechnicians() || [];
    const selectedLead = leads.find((l) => l.id === parseInt(formData.leadId));
    const availableSites = selectedLead
        ? getServiceAddresses().filter((s) => s.customerId === selectedLead.customerId)
        : [];

    return (
        <>
            <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{formData.id ? 'Edit Program' : 'Add Program'}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="offcanvas-body offcanvas-scrollable">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="leadId" className="form-label">Lead</label>
                            <select
                                className="form-select"
                                id="leadId"
                                value={formData.leadId || ''}
                                onChange={(e) => {
                                    onUpdateField('leadId', e.target.value);
                                    onUpdateField('serviceAddressIds', []);
                                }}
                                disabled={isSaving}
                            >
                                <option value="">No linked lead</option>
                                {leads.map((l) => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="programName" className="form-label">Program Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="programName"
                                placeholder="e.g. Monthly General Pest Control"
                                value={formData.name || ''}
                                onChange={(e) => onUpdateField('name', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="serviceType" className="form-label">Service Type <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.serviceType ? 'is-invalid' : ''}`}
                                id="serviceType"
                                placeholder="e.g. General Pest Control"
                                value={formData.serviceType || ''}
                                onChange={(e) => onUpdateField('serviceType', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.serviceType && <div className="invalid-feedback">{errors.serviceType}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="frequency" className="form-label">Frequency</label>
                            <select
                                className="form-select"
                                id="frequency"
                                value={formData.frequency || 'monthly'}
                                onChange={(e) => onUpdateField('frequency', e.target.value)}
                                disabled={isSaving}
                            >
                                {FREQUENCIES.map((f) => (
                                    <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="programStatus" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="programStatus"
                                value={formData.status || 'Active'}
                                onChange={(e) => onUpdateField('status', e.target.value)}
                                disabled={isSaving}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">Start Date <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                                id="startDate"
                                value={formData.startDate || ''}
                                onChange={(e) => onUpdateField('startDate', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="endDate" className="form-label">End Date <small className="text-muted">(leave blank = ongoing)</small></label>
                            <input
                                type="date"
                                className="form-control"
                                id="endDate"
                                value={formData.endDate || ''}
                                onChange={(e) => onUpdateField('endDate', e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="assignedTechnicianId" className="form-label">Assigned Technician</label>
                            <select
                                className="form-select"
                                id="assignedTechnicianId"
                                value={formData.assignedTechnicianId || ''}
                                onChange={(e) => onUpdateField('assignedTechnicianId', e.target.value)}
                                disabled={isSaving}
                            >
                                <option value="">Unassigned</option>
                                {technicians.map((t) => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="estimatedDuration" className="form-label">Estimated Duration (min)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="estimatedDuration"
                                min="15"
                                step="15"
                                value={formData.estimatedDuration || 60}
                                onChange={(e) => onUpdateField('estimatedDuration', e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        {formData.leadId && (
                            <div className="mb-3">
                                <label className="form-label">Service Sites</label>
                                {availableSites.length === 0 ? (
                                    <p className="text-muted small">No sites found for this lead's customer.</p>
                                ) : (
                                    <div className="d-flex flex-wrap gap-2">
                                        {availableSites.map((site) => (
                                            <div key={site.id} className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`site-${site.id}`}
                                                    checked={(formData.serviceAddressIds || []).includes(site.id)}
                                                    onChange={() => onToggleSite(site.id)}
                                                    disabled={isSaving}
                                                />
                                                <label className="form-check-label" htmlFor={`site-${site.id}`}>
                                                    {site.serviceAddressName}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="programNotes" className="form-label">Notes</label>
                            <textarea
                                className="form-control"
                                id="programNotes"
                                rows="3"
                                value={formData.notes || ''}
                                onChange={(e) => onUpdateField('notes', e.target.value)}
                                disabled={isSaving}
                            />
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
                                    formData.id ? 'Save Changes' : 'Add Program'
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

export default AddEditProgram;
