import { useEffect } from 'react';
import EmailRow from './EmailRow';
import PhoneRow from './PhoneRow';

/**
 * Reusable ContactFields component for managing contact information
 * Includes: First/Middle/Last Name, Primary Email, Alternate Emails, Phone Numbers
 *
 * Pure controlled component - all state managed by parent
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

  // Handle simple field changes
  const handleFieldChange = (field, value) => {
    onUpdateField(field, value);
  };

  // Handle email updates
  const handleUpdateEmail = (index, value) => {
    const newEmails = [...(formData.alternateEmails || [])];
    newEmails[index] = value;
    onUpdateField('alternateEmails', newEmails);
  };

  // Handle phone updates
  const handleUpdatePhone = (index, phoneData) => {
    const newPhones = [...(formData.phones || [])];
    newPhones[index] = phoneData;
    onUpdateField('phones', newPhones);
  };

  // Handle remove email
  const handleRemoveEmail = (index) => {
    const newEmails = (formData.alternateEmails || []).filter((_, i) => i !== index);
    onUpdateField('alternateEmails', newEmails);
  };

  // Handle remove phone
  const handleRemovePhone = (index) => {
    const newPhones = (formData.phones || []).filter((_, i) => i !== index);
    onUpdateField('phones', newPhones);
  };

  // Handle add email
  const handleAddEmail = () => {
    const newEmails = [...(formData.alternateEmails || []), ''];
    onUpdateField('alternateEmails', newEmails);
  };

  // Handle add phone
  const handleAddPhone = () => {
    const newPhones = [...(formData.phones || []), { type: 'mobile', number: '' }];
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
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              placeholder="Given name"
              value={formData.firstName || ''}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              disabled={isSaving}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
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
                value={formData.middleName || ''}
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
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              placeholder="Surname"
              value={formData.lastName || ''}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              disabled={isSaving}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
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
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          placeholder="name@example.com"
          value={formData.email || ''}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          disabled={isSaving}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>

      {/* Alternate Emails Section */}
      <div className="mb-3">
        <label className="form-label">Alternate Emails</label>
        <div className="alternate-emails-section">
          {(formData.alternateEmails || []).map((email, index) => (
            <EmailRow
              key={index}
              value={email}
              onChange={(value) => handleUpdateEmail(index, value)}
              onRemove={() => handleRemoveEmail(index)}
              error={errors[`alternateEmail_${index}`]}
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
          {(formData.phones || []).map((phone, index) => (
            <PhoneRow
              key={index}
              phone={phone}
              onChange={(phoneData) => handleUpdatePhone(index, phoneData)}
              onRemove={() => handleRemovePhone(index)}
              error={errors[`phone_${index}`]}
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
