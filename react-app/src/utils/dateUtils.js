/**
 * Formats a date string (like 'YYYY-MM-DD') or a Date object into 'MM/DD/YYYY' format.
 * @param {string | Date} date - The date to format.
 * @returns {string} The formatted date string, or an empty string if the input is invalid.
 */
export const formatDate = (date) => {
  if (!date) return '';
  try {
    // Handles both 'YYYY-MM-DD' strings and Date objects.
    // Using UTC methods avoids local timezone shifts when the input is a
    // date-only string, which new Date() treats as UTC midnight.
    const d = new Date(date);
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const year = d.getUTCFullYear();
    return `${month}/${day}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', date, error);
    return '';
  }
};

/**
 * Formats a date string or Date object into 'YYYY-MM-DD' format for date input fields.
 * @param {string | Date} date - The date to format.
 * @returns {string} The formatted date string, or an empty string if the input is invalid.
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  try {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date for input:', date, error);
    return '';
  }
};
