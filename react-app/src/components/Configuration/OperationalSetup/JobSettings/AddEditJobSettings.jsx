import React from 'react';

const AddEditJobSetting = ({
    isOpen,
    onClose,
    onSave,
    formData,
    onUpdateFieldHandle,
    isSaving,
}) => {

    if (!isOpen) {
        return null;
    }

    const isEditing = formData && formData.id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        onUpdateFieldHandle(name, name === 'slaHours' ? Number(value) : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    return (
        <>
            <div className={`offcanvas offcanvas-end show`} style={{ width: '400px' }} tabIndex="-1">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">{isEditing ? 'Edit Job Setting' : 'Add New Job Setting'}</h5>
                    <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close" disabled={isSaving}></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Profile Name</label>
                            <input
                                name="name"
                                className="form-control"
                                required
                                value={formData.name || ''}
                                onChange={handleChange}
                                placeholder="e.g., Standard Maintenance Jobs"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Default Status</label>
                            <select className="form-select" name="defaultStatus" value={formData.defaultStatus || 'Open'} onChange={handleChange}>
                                <option>Open</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Numbering Format</label>
                            <input className="form-control" name="numberingFormat" value={formData.numberingFormat || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">SLA (hours)</label>
                            <input className="form-control" type="number" name="slaHours" value={formData.slaHours || ''} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Escalations</label>
                            <textarea className="form-control" name="escalations" value={formData.escalations || ''} onChange={handleChange} placeholder="Comma-separated emails" />
                        </div>
                        <div className="d-flex gap-2 mt-4">
                            <button type="submit" className="btn btn-primary w-sm" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                            <button type="button" className="btn btn-light w-sm" onClick={onClose} disabled={isSaving}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`offcanvas-backdrop fade show`} onClick={isSaving ? undefined : onClose}></div>
        </>
    );
};

export default AddEditJobSetting;