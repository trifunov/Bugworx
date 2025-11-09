/**
 * Menu Utilities
 */

/**
 * Build a customer-specific route path
 * @param {number|string} customerId - Customer ID from URL
 * @param {string} path - Relative path (e.g., '/service-addresses' or '')
 * @returns {string} Full route path (e.g., '/customers/123/service-addresses')
 */
export const buildCustomerRoute = (customerId, path = '') => {
  if (!customerId) {
    return '/customers';
  }
  return `/customers/${customerId}${path}`;
};

/**
 * Extract customer ID from a pathname
 * @param {string} pathname - Current pathname from location (e.g., '/customers/123/invoices')
 * @returns {number|null} Customer ID as number, or null if not found
 */
export const extractCustomerId = (pathname) => {
  const match = pathname?.match(/^\/customers\/(\d+)(?:\/|$)/);
  return match ? Number(match[1]) : null;
};
