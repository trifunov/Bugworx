import React, { useEffect } from 'react';
import EmailRow from './EmailRow';
import PhoneRow from './PhoneRow';

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
    const updates = {};
    if (!formData.alternateEmails) {
      updates.alternateEmails = [];
    }
    if (!formData.phones) {
      updates.phones = [{ type: 'mobile', number: '' }];
    }
    if (Object.keys(updates).length > 0) {
      Object.entries(updates).forEach(([key, value]) => {
        onUpdateField(key, value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - run once on mount

  // Handle field changes and propagate to parent
  const handleFieldChange = (field, value) => {
    const newFormData = { ...localFormData, [field]: value };
    setLocalFormData(newFormData);
    onUpdateField(field, value);
  };

  // Handle email updates
  const handleUpdateEmail = (index, value) => {
    // Compute new array first to avoid race condition
    const newEmails = [...(localFormData.alternateEmails || [])];
    newEmails[index] = value;

    // Update local state
    setLocalFormData(prev => ({ ...prev, alternateEmails: newEmails }));

    // Update parent state
    onUpdateField('alternateEmails', newEmails);

    // Clear error when user types
    if (localErrors[`alternateEmail_${index}`]) {
      const newErrors = { ...localErrors };
      delete newErrors[`alternateEmail_${index}`];
      setLocalErrors(newErrors);
    }
  };

  // Handle phone updates
  const handleUpdatePhone = (index, phoneData) => {
    // Compute new array first to avoid race condition
    const newPhones = [...(localFormData.phones || [])];
    newPhones[index] = phoneData;

    // Update local state
    setLocalFormData(prev => ({ ...prev, phones: newPhones }));

    // Update parent state
    onUpdateField('phones', newPhones);

    // Clear error when user types
    if (localErrors[`phone_${index}`]) {
      const newErrors = { ...localErrors };
      delete newErrors[`phone_${index}`];
      setLocalErrors(newErrors);
    }
  };

  // Handle remove email
  const handleRemoveEmail = (index) => {
    // Compute new array first to avoid race condition
    const newEmails = (localFormData.alternateEmails || []).filter((_, i) => i !== index);

    // Update local state
    setLocalFormData(prev => ({ ...prev, alternateEmails: newEmails }));

    // Update parent state
    onUpdateField('alternateEmails', newEmails);

    // Clear error for this field
    if (localErrors[`alternateEmail_${index}`]) {
      const newErrors = { ...localErrors };
      delete newErrors[`alternateEmail_${index}`];
      setLocalErrors(newErrors);
    }
  };

  // Handle remove phone
  const handleRemovePhone = (index) => {
    // Compute new array first to avoid race condition
    const newPhones = (localFormData.phones || []).filter((_, i) => i !== index);

    // Update local state
    setLocalFormData(prev => ({ ...prev, phones: newPhones }));

    // Update parent state
    onUpdateField('phones', newPhones);

    // Clear error for this field
    if (localErrors[`phone_${index}`]) {
      const newErrors = { ...localErrors };
      delete newErrors[`phone_${index}`];
      setLocalErrors(newErrors);
    }
  };

  // Handle add email
  const handleAddEmail = () => {

    const newEmails = [...(localFormData.alternateEmails || []), ''];

    // Update local state
    setLocalFormData(prev => ({ ...prev, alternateEmails: newEmails }));

    // Update parent state
    onUpdateField('alternateEmails', newEmails);
  };

  // Handle add phone
  const handleAddPhone = () => {
    // Compute new array first to avoid race condition
    const newPhones = [...(localFormData.phones || []), { type: 'mobile', number: '' }];

    // Update local state
    setLocalFormData(prev => ({ ...prev, phones: newPhones }));

    // Update parent state
    onUpdateField('phones', newPhones);
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
