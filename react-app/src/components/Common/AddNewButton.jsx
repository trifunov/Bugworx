const AddNewButton = (
    props
) => {
    const { handleAddNew } = props;

    return (
        <button className="btn btn-primary px-3 text-nowrap" onClick={handleAddNew}>
            <i className="mdi mdi-plus me-1"></i>Add New
        </button>
    );
};

export default AddNewButton;