import ContactFields from '../../Common/ContactFields/ContactFields';

const AddEditCustomer = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    // Handle updates to nested billingContact fields
    const handleContactFieldUpdate = (field, value) => {
        onUpdateField('billingContact', {
            ...(formData.billingContact || {}),
            [field]: value
        });
    };

    return (
        <>
            <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ visibility: isOpen ? 'visible' : 'hidden', width: '600px', maxWidth: '90vw' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">
                        {formData.id && formData.id !== 0 ? 'Edit Customer' : 'Add Customer'}
                    </h5>
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body offcanvas-scrollable">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Customer Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="name"
                                value={formData.name || ''}
                                onChange={(e) => onUpdateField('name', e.target.value)}
                                disabled={isSaving}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label me-1">Customer Type</label>
                            <div className={`btn-group form-group ${errors.customerType ? 'is-invalid' : ''}`} role="group" aria-label="Customer Type">
                                <button
                                    type="button"
                                    className={`btn ${formData.customerType === 'Residential' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => onUpdateField('customerType', 'Residential')}
                                >
                                    Residential
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${formData.customerType === 'Commercial' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => onUpdateField('customerType', 'Commercial')}
                                >
                                    Commercial
                                </button>
                            </div>
                            {errors.customerType && <div className="invalid-feedback">{errors.customerType}</div>}
                        </div>

                        <h6 className="mt-4 mb-3 text-uppercase text-muted" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                            Billing Contact Information
                        </h6>

                        <ContactFields
                            formData={formData.billingContact || {}}
                            errors={errors}
                            onUpdateField={handleContactFieldUpdate}
                            isSaving={isSaving}
                            showMiddleName={true}
                            prefix="billingContact_"
                        />

                        <div className="mb-3 mt-4">
                            <label htmlFor="preferredContactMethod" className="form-label">Preferred contact method</label>
                            <select
                                className={`form-select ${errors.preferredContactMethod ? 'is-invalid' : ''}`}
                                id="preferredContactMethod"
                                value={formData.preferredContactMethod || ''}
                                onChange={(e) => onUpdateField('preferredContactMethod', e.target.value)}
                                disabled={isSaving}
                            >
                                <option value="">Select method...</option>
                                <option value="Email">Email</option>
                                <option value="Phone">Phone</option>
                                <option value="SMS">SMS</option>
                                <option value="Portal">Portal</option>
                            </select>
                            {errors.preferredContactMethod && <div className="invalid-feedback">{errors.preferredContactMethod}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="customerStatus" className="form-label">Status</label>
                            <select
                                className={`form-select ${errors.customerStatus ? 'is-invalid' : ''}`}
                                id="customerStatus"
                                value={formData.customerStatus || ''}
                                onChange={(e) => onUpdateField('customerStatus', e.target.value)}
                                disabled={isSaving}
                            >
                                <option value="">Select status...</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Prospect">Prospect</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                            {errors.serviceAddressType && <div className="invalid-feedback">{errors.serviceAddressType}</div>}
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
                                    formData.id && formData.id !== 0 ? 'Edit Customer' : 'Add Customer'
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

export default AddEditCustomer;
