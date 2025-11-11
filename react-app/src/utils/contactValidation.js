// Contact validation utilities for email and phone number validation

/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates phone number in E.164 format
 * E.164 format: +[country code][number] (e.g., +442079460958)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid E.164 format
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  // E.164 format: + followed by 1-15 digits
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone.trim());
};

/**
 * Formats phone number to E.164 format by removing spaces, dashes, parentheses
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneE164 = (phone) => {
  if (!phone) return '';
  // Remove all spaces, dashes, parentheses, and other non-digit characters except +
  return phone.replace(/[^\d+]/g, '');
};

/**
 * Validates complete contact data object
 * @param {Object} contactData - Contact object with firstName, lastName, email, etc.
 * @returns {Object} - Object with isValid boolean and errors object
 */
export const isValidContactData = (contactData) => {
  const errors = {};

  // Validate required fields
  if (!contactData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!contactData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!contactData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(contactData.email)) {
    errors.email = 'Invalid email format';
  }

  // Validate alternate emails if provided
  if (contactData.alternateEmails && Array.isArray(contactData.alternateEmails)) {
    contactData.alternateEmails.forEach((altEmail, index) => {
      if (altEmail && !validateEmail(altEmail)) {
        errors[`alternateEmail_${index}`] = 'Invalid email format';
      }
    });
  }

  // Validate phones if provided
  if (contactData.phones && Array.isArray(contactData.phones)) {
    contactData.phones.forEach((phone, index) => {
      if (phone.number && !validatePhone(phone.number)) {
        errors[`phone_${index}`] = 'Invalid phone format. Use E.164 format (e.g., +442079460958)';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Provides user-friendly phone formatting hint
 * @param {string} phone - Phone number
 * @returns {string} - Hint message
 */
export const getPhoneFormatHint = (phone) => {
  if (!phone) return '';

  const formatted = formatPhoneE164(phone);

  if (formatted && !validatePhone(formatted)) {
    return 'Use E.164 format: +[country code][number] (e.g., +442079460958)';
  }

  return '';
};
