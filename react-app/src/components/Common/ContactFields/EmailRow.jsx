import React from 'react';

const EmailRow = ({ value, onChange, onRemove, error, disabled }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onRemove();
  };

  return (
    <div className="d-flex align-items-start gap-2 mb-2">
      <div className="flex-grow-1">
        <input
          type="email"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="alt@example.com"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-label="Alternate email"
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={handleRemove}
        disabled={disabled}
        aria-label="Remove alternate email"
        style={{ minWidth: '38px', height: '38px' }}
      >
        <i className="mdi mdi-close"></i>
      </button>
    </div>
  );
};

export default EmailRow;
