/**
 * Utility functions for serializing and deserializing filter parameters to/from URL
 */

/**
 * Serializes filter object to URL search parameters
 * @param {Object} filters - Filter object containing all filter values
 * @returns {URLSearchParams} - URL search parameters object
 */
export const serializeFiltersToUrlParams = (filters) => {
  const params = new URLSearchParams();

  // Simple string filters
  const stringFields = [
    'firstName',
    'lastName',
    'companyName',
    'customerNumber',
    'email',
    'phone',
    'addressLine1',
    'city',
    'postalCode',
    'invoiceNumber',
    'workOrderNumber',
    'lastServiceDate',
    'programType'
  ];

  stringFields.forEach(field => {
    if (filters[field]) {
      params.set(field, filters[field]);
    }
  });

  // Array filters (state)
  if (filters.state?.length > 0) {
    params.set('state', filters.state.join(','));
  }

  // Nested object filters (propertyTypes)
  const activePropertyTypes = Object.keys(filters.propertyTypes || {})
    .filter(key => filters.propertyTypes[key]);
  if (activePropertyTypes.length > 0) {
    params.set('propertyTypes', activePropertyTypes.join(','));
  }

  // Nested object filters (statuses)
  const activeStatuses = Object.keys(filters.statuses || {})
    .filter(key => filters.statuses[key]);
  if (activeStatuses.length > 0) {
    params.set('statuses', activeStatuses.join(','));
  }

  return params;
};

/**
 * Deserializes URL search parameters to filter object
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} - Filter object
 */
export const deserializeUrlParamsToFilters = (searchParams) => {
  const filters = {
    // Customer Info
    firstName: '',
    lastName: '',
    companyName: '',
    customerNumber: '',
    email: '',
    phone: '',

    // Address
    addressLine1: '',
    city: '',
    postalCode: '',
    state: [],

    // Property Types
    propertyTypes: {
      residential: false,
      commercial: false,
      industrial: false,
      mixed: false,
    },

    // Status & Category
    statuses: {
      active: false,
      inactive: false,
      prospect: false,
      lead: false,
    },

    // Transactions / Work Orders
    invoiceNumber: '',
    workOrderNumber: '',

    // Optional
    lastServiceDate: '',
    programType: '',
  };

  // Simple string filters
  const stringFields = [
    'firstName',
    'lastName',
    'companyName',
    'customerNumber',
    'email',
    'phone',
    'addressLine1',
    'city',
    'postalCode',
    'invoiceNumber',
    'workOrderNumber',
    'lastServiceDate',
    'programType'
  ];

  stringFields.forEach(field => {
    if (searchParams.get(field)) {
      filters[field] = searchParams.get(field);
    }
  });

  // Array filters (state)
  if (searchParams.get('state')) {
    filters.state = searchParams.get('state').split(',');
  }

  // Property types
  if (searchParams.get('propertyTypes')) {
    const types = searchParams.get('propertyTypes').split(',');
    types.forEach(type => {
      if (Object.prototype.hasOwnProperty.call(filters.propertyTypes, type)) {
        filters.propertyTypes[type] = true;
      }
    });
  }

  // Statuses
  if (searchParams.get('statuses')) {
    const statuses = searchParams.get('statuses').split(',');
    statuses.forEach(status => {
      if (Object.prototype.hasOwnProperty.call(filters.statuses, status)) {
        filters.statuses[status] = true;
      }
    });
  }

  return filters;
};
