const AddEditCustomer = (
    props
) => {
    const { customer, show, onClose } = props;

    return (
        <>
            {show &&
                (<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5>{customer.id > 0 ? 'Edit Customer' : 'Add Customer'}</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        ...
                    </div>
                </div>)
            }

            {show && <div className="modal-backdrop fade show" onClick={onClose} />}
        </>
    );
};

export default AddEditCustomer;