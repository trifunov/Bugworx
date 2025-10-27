import React, { useEffect, useState } from 'react';

const AddEditCustomer = (
    props
) => {
    const { customer, show, onClose, onSave } = props;

    const [populatedCustomer, setPopulatedCustomer] = useState(customer || {
        name: '',
        customerType: 'Residential',
        contactName: '',
        jobTitle: '',
        email: '',
        phone: '',
        alternatePhone: '',
        preferredContactMethod: 'Email',
        status: 'Active'
    });

    useEffect(() => {
        if (show) {
            setPopulatedCustomer(customer ? { ...customer } : {
                name: '',
                customerType: 'Residential',
                contactName: '',
                jobTitle: '',
                email: '',
                phone: '',
                alternatePhone: '',
                preferredContactMethod: 'Email',
                status: 'Active',
                siteId: ''
            });
        }
    }, [show, customer]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const customerObj = {
            ...populatedCustomer,
            name: populatedCustomer.name.trim(),
            status: populatedCustomer.status || 'Active',
            customerType: populatedCustomer.customerType || 'Residential',
            contactName: populatedCustomer.contactName?.trim(),
            jobTitle: populatedCustomer.jobTitle?.trim(),
            email: populatedCustomer.email?.trim(),
            phone: populatedCustomer.phone?.trim(),
            alternatePhone: populatedCustomer.alternatePhone?.trim(),
            preferredContactMethod: populatedCustomer.preferredContactMethod || 'Email'
        };

        if (typeof onSave === 'function') onSave(customerObj);
    };

    return (
        <>
            {show && (
                <div className={`offcanvas offcanvas-end ${show ? 'show' : ''}`} data-bs-scroll="true" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">{populatedCustomer.id ? 'Edit Customer' : 'Add Customer'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="offcanvas-body offcanvas-scrollable">
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            <h6>Basic Information</h6>

                            <div className="mb-3">
                                <label htmlFor="customerName" className="form-label">Customer Name / Company Name</label>
                                <input
                                    id="customerName"
                                    className="form-control"
                                    value={populatedCustomer.name}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Customer Type</label>
                                <div className="btn-group" role="group" aria-label="Customer Type">
                                    <button
                                        type="button"
                                        className={`btn ${populatedCustomer.customerType === 'Residential' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setPopulatedCustomer({ ...populatedCustomer, customerType: 'Residential' })}
                                    >
                                        Residential
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${populatedCustomer.customerType === 'Commercial' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setPopulatedCustomer({ ...populatedCustomer, customerType: 'Commercial' })}
                                    >
                                        Commercial
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label">Primary Contact Person</label>
                                <input
                                    id="contactName"
                                    className="form-control"
                                    value={populatedCustomer.contactName || ''}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, contactName: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="jobTitle" className="form-label">Job Title / Role</label>
                                <input
                                    id="jobTitle"
                                    className="form-control"
                                    value={populatedCustomer.jobTitle || ''}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, jobTitle: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    value={populatedCustomer.email || ''}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, email: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone / Mobile Number</label>
                                <input
                                    id="phone"
                                    className="form-control"
                                    value={populatedCustomer.phone || ''}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, phone: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="alternatePhone" className="form-label">Alternate Phone / Fax</label>
                                <input
                                    id="alternatePhone"
                                    className="form-control"
                                    value={populatedCustomer.alternatePhone || ''}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, alternatePhone: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="preferredContact" className="form-label">Preferred Contact Method</label>
                                <select
                                    id="preferredContact"
                                    className="form-select"
                                    value={populatedCustomer.preferredContactMethod}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, preferredContactMethod: e.target.value })}
                                >
                                    <option>Email</option>
                                    <option>Phone</option>
                                    <option>SMS</option>
                                    <option>Portal</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Customer Status</label>
                                <select
                                    id="status"
                                    className="form-select"
                                    value={populatedCustomer.status}
                                    onChange={(e) => setPopulatedCustomer({ ...populatedCustomer, status: e.target.value })}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Prospect</option>
                                    <option>Suspended</option>
                                </select>
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {show && <div className="offcanvas-backdrop fade show" onClick={onClose} />}
        </>
    );
};

export default AddEditCustomer;