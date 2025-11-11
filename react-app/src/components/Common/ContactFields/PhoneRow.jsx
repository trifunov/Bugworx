import React from 'react';
import { formatPhoneE164 } from '../../../utils/contactValidation';

const PHONE_TYPES = [
  { value: 'mobile', label: 'Mobile' },
  { value: 'landline', label: 'Landline' },
  { value: 'fax', label: 'Fax' }
];

const PhoneRow = ({ phone, onChange, onRemove, error, disabled }) => {
  const handleTypeChange = (e) => {
    onChange({ ...phone, type: e.target.value });
  };

  const handleNumberChange = (e) => {
    const formattedNumber = formatPhoneE164(e.target.value);
    onChange({ ...phone, number: formattedNumber });
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onRemove();
  };

  return (
    <div className="d-flex align-items-start gap-2 mb-2">
      <select
        className="form-select"
        value={phone.type || 'mobile'}
        onChange={handleTypeChange}
        disabled={disabled}
        aria-label="Phone type"
        style={{ minWidth: '140px', maxWidth: '140px' }}
      >
        {PHONE_TYPES.map(type => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <div className="flex-grow-1">
        <input
          type="tel"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="+442079460958"
          value={phone.number || ''}
          onChange={handleNumberChange}
          disabled={disabled}
          aria-label="Phone number"
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <button
        type="button"
        className="btn btn-sm btn-danger"
        onClick={handleRemove}
        disabled={disabled}
        aria-label="Remove phone number"
        style={{ minWidth: '38px', height: '38px' }}
      >
        <i className="mdi mdi-close"></i>
      </button>
    </div>
  );
};

export default PhoneRow;
