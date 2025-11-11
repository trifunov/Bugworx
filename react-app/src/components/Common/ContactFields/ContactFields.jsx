import React, { useEffect } from 'react';
import EmailRow from './EmailRow';
import PhoneRow from './PhoneRow';
import useContactFields from './useContactFields';

/**
 * Reusable ContactFields component for managing contact information
 * Includes: First/Middle/Last Name, Primary Email, Alternate Emails, Phone Numbers
 *
 * @param {Object} props
 * @param {Object} props.formData - Contact data object
 * @param {Object} props.errors - Validation errors object
 * @param {Function} props.onUpdateField - Field update callback
 * @param {boolean} props.isSaving - Saving state
 * @param {boolean} props.showMiddleName - Show middle name field (default: true)
 * @param {string} props.prefix - Prefix for field names when nested (optional)
 */
const ContactFields = ({
  formData,
  errors,
  onUpdateField,
  isSaving = false,
  showMiddleName = true,
  prefix = ''
}) => {
  const [localFormData, setLocalFormData] = React.useState(formData);
  const [localErrors, setLocalErrors] = React.useState(errors);

  const {
    addEmail,
    removeEmail,
    updateEmail,
    addPhone,
    removePhone,
    updatePhone,
    initializeContactFields
  } = useContactFields(localFormData, setLocalFormData, localErrors, setLocalErrors);

  // Sync local state with parent formData
  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  // Sync local errors with parent errors
  useEffect(() => {
    setLocalErrors(errors);
  }, [errors]);

  // Initialize contact fields on mount
  useEffect(() => {
    initializeContactFields();
  }, []);

  // Handle field changes and propagate to parent
  const handleFieldChange = (field, value) => {
    const newFormData = { ...localFormData, [field]: value };
    setLocalFormData(newFormData);
    onUpdateField(field, value);
  };

  // Handle email updates
  const handleUpdateEmail = (index, value) => {
    updateEmail(index, value);
    // Update parent with new alternateEmails array
    const newEmails = [...(localFormData.alternateEmails || [])];
    newEmails[index] = value;
    onUpdateField('alternateEmails', newEmails);
  };

  // Handle phone updates
  const handleUpdatePhone = (index, phoneData) => {
    updatePhone(index, phoneData);
    // Update parent with new phones array
    const newPhones = [...(localFormData.phones || [])];
    newPhones[index] = phoneData;
    onUpdateField('phones', newPhones);
  };

  // Handle remove email
  const handleRemoveEmail = (index) => {
    const newEmails = (localFormData.alternateEmails || []).filter((_, i) => i !== index);
    removeEmail(index);
    onUpdateField('alternateEmails', newEmails);
  };

  // Handle remove phone
  const handleRemovePhone = (index) => {
    const newPhones = (localFormData.phones || []).filter((_, i) => i !== index);
    removePhone(index);
    onUpdateField('phones', newPhones);
  };

  // Handle add email
  const handleAddEmail = () => {
    addEmail();
    onUpdateField('alternateEmails', [...(localFormData.alternateEmails || []), '']);
  };

  // Handle add phone
  const handleAddPhone = () => {
    addPhone();
    onUpdateField('phones', [...(localFormData.phones || []), { type: 'mobile', number: '' }]);
  };

  return (
    <div className="contact-fields">
      {/* Name Fields */}
      <div className="row">
        <div className={showMiddleName ? 'col-md-4' : 'col-md-6'}>
          <div className="mb-3">
            <label htmlFor={`${prefix}firstName`} className="form-label">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id={`${prefix}firstName`}
              className={`form-control ${localErrors.firstName ? 'is-invalid' : ''}`}
              placeholder="Given name"
              value={localFormData.firstName || ''}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              disabled={isSaving}
            />
            {localErrors.firstName && (
              <div className="invalid-feedback">{localErrors.firstName}</div>
            )}
          </div>
        </div>

        {showMiddleName && (
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor={`${prefix}middleName`} className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                id={`${prefix}middleName`}
                className="form-control"
                placeholder="Middle (optional)"
                value={localFormData.middleName || ''}
                onChange={(e) => handleFieldChange('middleName', e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>
        )}

        <div className={showMiddleName ? 'col-md-4' : 'col-md-6'}>
          <div className="mb-3">
            <label htmlFor={`${prefix}lastName`} className="form-label">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id={`${prefix}lastName`}
              className={`form-control ${localErrors.lastName ? 'is-invalid' : ''}`}
              placeholder="Surname"
              value={localFormData.lastName || ''}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              disabled={isSaving}
            />
            {localErrors.lastName && (
              <div className="invalid-feedback">{localErrors.lastName}</div>
            )}
          </div>
        </div>
      </div>

      {/* Primary Email */}
      <div className="mb-3">
        <label htmlFor={`${prefix}email`} className="form-label">
          Email <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          id={`${prefix}email`}
          className={`form-control ${localErrors.email ? 'is-invalid' : ''}`}
          placeholder="name@example.com"
          value={localFormData.email || ''}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          disabled={isSaving}
        />
        {localErrors.email && (
          <div className="invalid-feedback">{localErrors.email}</div>
        )}
      </div>

      {/* Alternate Emails Section */}
      <div className="mb-3">
        <label className="form-label">Alternate Emails</label>
        <div className="alternate-emails-section">
          {(localFormData.alternateEmails || []).map((email, index) => (
            <EmailRow
              key={index}
              value={email}
              onChange={(value) => handleUpdateEmail(index, value)}
              onRemove={() => handleRemoveEmail(index)}
              error={localErrors[`alternateEmail_${index}`]}
              disabled={isSaving}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={handleAddEmail}
          disabled={isSaving}
        >
          <i className="mdi mdi-plus me-1"></i>
          Add alternate email
        </button>
      </div>

      {/* Phone Numbers Section */}
      <div className="mb-3">
        <label className="form-label">Phone Numbers</label>
        <div className="phones-section">
          {(localFormData.phones || []).map((phone, index) => (
            <PhoneRow
              key={index}
              phone={phone}
              onChange={(phoneData) => handleUpdatePhone(index, phoneData)}
              onRemove={() => handleRemovePhone(index)}
              error={localErrors[`phone_${index}`]}
              disabled={isSaving}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={handleAddPhone}
          disabled={isSaving}
        >
          <i className="mdi mdi-plus me-1"></i>
          Add phone
        </button>
        <div className="form-text mt-1">
          Use E.164 format for phone numbers (e.g., +44 20 7946 0958 → +442079460958)
        </div>
      </div>
    </div>
  );
};

export default ContactFields;
