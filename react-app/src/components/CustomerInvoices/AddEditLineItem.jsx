import React from 'react';

const AddEditLineItem = ({ isOpen, onClose, onSave, formData, onUpdateField, isSaving }) => {
  if (!isOpen) return null;
  const isEditing = formData && formData.id;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdateField(name, value);
  };

  return (
    <>
      <div className='offcanvas-backdrop fade show' onClick={onClose}></div>
      <div className='offcanvas offcanvas-end show' tabIndex='-1' style={{ visibility: 'visible' }}>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit Line Item' : 'Add Line Item'}</h5>
          <button type='button' className='btn-close' onClick={onClose} aria-label='Close'></button>
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='item-description' className='form-label'>
                Description
              </label>
              <textarea
                id='item-description'
                className='form-control'
                rows='3'
                value={formData.description || ""}
                onChange={handleChange}
                required
                name='description'
              ></textarea>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='item-quantity' className='form-label'>
                  Quantity
                </label>
                <input
                  type='number'
                  id='item-quantity'
                  className='form-control'
                  value={formData.quantity || ""}
                  onChange={handleChange}
                  required
                  name='quantity'
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='item-unit-price' className='form-label'>
                  Unit Price
                </label>
                <input
                  type='number'
                  id='item-unit-price'
                  className='form-control'
                  value={formData.unitPrice ?? ""}
                  onChange={handleChange}
                  required
                  name='unitPrice'
                  step='0.01'
                />
              </div>
            </div>
            <div className='d-flex justify-content-end gap-2'>
              <button type='button' className='btn btn-secondary' onClick={onClose}>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary'>
                {isEditing ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditLineItem;
