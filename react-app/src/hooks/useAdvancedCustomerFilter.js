import { useState, useMemo } from 'react';

/**
 * Hook for managing advanced global filter state and filtering logic
 * Supports customers, leads, and prospects
 * @param {Object} data - Object containing customers, leads, and prospects arrays
 * @returns {Object} Filter state, handlers, and filtered results
 */
const useAdvancedCustomerFilter = (data = { customers: [], leads: [], prospects: [] }) => {
  const { customers = [], leads = [], prospects = [] } = data;
  const initialFilters = {
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

  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Update a specific filter field
   */
  const updateFilter = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Update multiple filters at once
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  /**
   * Update a nested filter field (e.g., statuses.active)
   */
  const updateNestedFilter = (parent, field, value) => {
    setFilters(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  /**
   * Apply filters - sets appliedFilters to current filters
   */
  const applyFilters = () => {
    console.log('Hook: applyFilters called, current filters:', filters);
    console.log('Hook: companyName filter specifically:', filters.companyName);
    setAppliedFilters({ ...filters });
    console.log('Hook: appliedFilters will be set to:', filters);
  };

  /**
   * Apply specific filters directly (for URL params)
   */
  const applyFiltersDirectly = (filtersToApply) => {
    console.log('Hook: applyFiltersDirectly called with:', filtersToApply);
    setFilters(filtersToApply);
    setAppliedFilters(filtersToApply);
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
  };

  /**
   * Check if any filters are active (based on applied filters)
   */
  const hasActiveFilters = useMemo(() => {
    return (
      appliedFilters.firstName !== '' ||
      appliedFilters.lastName !== '' ||
      appliedFilters.companyName !== '' ||
      appliedFilters.customerNumber !== '' ||
      appliedFilters.email !== '' ||
      appliedFilters.phone !== '' ||
      appliedFilters.addressLine1 !== '' ||
      appliedFilters.city !== '' ||
      appliedFilters.postalCode !== '' ||
      appliedFilters.state.length > 0 ||
      Object.values(appliedFilters.propertyTypes).some(v => v) ||
      Object.values(appliedFilters.statuses).some(v => v) ||
      appliedFilters.invoiceNumber !== '' ||
      appliedFilters.workOrderNumber !== '' ||
      appliedFilters.lastServiceDate !== '' ||
      appliedFilters.programType !== ''
    );
  }, [appliedFilters]);

  /**
   * Generic filter function that works for customers, leads, and prospects
   * Uses appliedFilters instead of filters
   */
  const filterEntity = (entity, entityType) => {
    // Customer Info filters
    if (appliedFilters.firstName) {
      const contactName = entityType === 'lead' ? entity.name : (entity.billingContact?.name || '');
      const firstName = contactName.split(' ')[0] || '';
      if (!firstName.toLowerCase().includes(appliedFilters.firstName.toLowerCase())) {
        return false;
      }
    }

    if (appliedFilters.lastName) {
      const contactName = entityType === 'lead' ? entity.name : (entity.billingContact?.name || '');
      const nameParts = contactName.split(' ');
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
      if (!lastName.toLowerCase().includes(appliedFilters.lastName.toLowerCase())) {
        return false;
      }
    }

    if (appliedFilters.companyName) {
      if (!entity.name.toLowerCase().includes(appliedFilters.companyName.toLowerCase())) {
        return false;
      }
    }

    if (appliedFilters.customerNumber) {
      const number = entity.customerNum || entity.leadNum || '';
      if (!number.toLowerCase().includes(appliedFilters.customerNumber.toLowerCase())) {
        return false;
      }
    }

    if (appliedFilters.email) {
      const email = entityType === 'lead' ? (entity.email || '') : (entity.billingContact?.email || '');
      if (!email.toLowerCase().includes(appliedFilters.email.toLowerCase())) {
        return false;
      }
    }

    if (appliedFilters.phone) {
      const phone = entityType === 'lead' ? (entity.phone || '') : (entity.billingContact?.phone || '');
      if (!phone.includes(appliedFilters.phone)) {
        return false;
      }
    }

    // Address filters
    if (appliedFilters.addressLine1) {
      const street = entity.billingAddress?.street || entity.address?.street || '';
      if (!street.toLowerCase().includes(appliedFilters.addressLine1.toLowerCase())) {
        return false;
      }
    }

    if (appliedFilters.city) {
      const city = entity.billingAddress?.city || entity.address?.city || '';
      if (!city.toLowerCase().includes(appliedFilters.city.toLowerCase())) {
        return false;
      }
    }

    if (appliedFilters.postalCode) {
      const zip = entity.billingAddress?.zip || entity.address?.zip || '';
      if (!zip.includes(appliedFilters.postalCode)) {
        return false;
      }
    }

    if (appliedFilters.state.length > 0) {
      const state = entity.billingAddress?.state || entity.address?.state || '';
      if (!appliedFilters.state.includes(state)) {
        return false;
      }
    }

    // Property Types filter
    const hasPropertyTypeFilter = Object.values(appliedFilters.propertyTypes).some(v => v);
    if (hasPropertyTypeFilter) {
      let matchesPropertyType = false;

      // Map customerType to property type
      if (appliedFilters.propertyTypes.residential && entity.customerType === 1) {
        matchesPropertyType = true;
      }
      if (appliedFilters.propertyTypes.commercial && entity.customerType === 2) {
        matchesPropertyType = true;
      }
      if (appliedFilters.propertyTypes.industrial && entity.customerType === 3) {
        matchesPropertyType = true;
      }
      if (appliedFilters.propertyTypes.mixed && entity.customerType === 4) {
        matchesPropertyType = true;
      }

      if (!matchesPropertyType) {
        return false;
      }
    }

    // Status & Category filters
    const hasStatusFilter = Object.values(appliedFilters.statuses).some(v => v);
    if (hasStatusFilter) {
      let matchesStatus = false;

      if (appliedFilters.statuses.active && (entity.isActive === 1 || entity.status === 'Active')) {
        matchesStatus = true;
      }
      if (appliedFilters.statuses.inactive && (entity.isActive === 0 || entity.status === 'Inactive')) {
        matchesStatus = true;
      }
      if (appliedFilters.statuses.prospect && entityType === 'prospect') {
        matchesStatus = true;
      }
      if (appliedFilters.statuses.lead && entityType === 'lead') {
        matchesStatus = true;
      }

      if (!matchesStatus) {
        return false;
      }
    }

    return true;
  };

  /**
   * Filter all entity types and combine results
   * Only recomputes when appliedFilters change, not when filters change
   */
  const filteredResults = useMemo(() => {
    if (!hasActiveFilters) {
      return {
        customers,
        leads,
        prospects: [],
        all: [
          ...customers.map(c => ({ ...c, entityType: 'customer' })),
          ...leads.map(l => ({ ...l, entityType: 'lead' })),
        ]
      };
    }

    const filteredCustomers = customers.filter(c => filterEntity(c, 'customer'));
    const filteredLeads = leads.filter(l => filterEntity(l, 'lead'));
    const filteredProspects = prospects.filter(p => filterEntity(p, 'prospect'));

    return {
      customers: filteredCustomers,
      leads: filteredLeads,
      prospects: filteredProspects,
      all: [
        ...filteredCustomers.map(c => ({ ...c, entityType: 'customer' })),
        ...filteredLeads.map(l => ({ ...l, entityType: 'lead' })),
        ...filteredProspects.map(p => ({ ...p, entityType: 'prospect' })),
      ]
    };
  }, [customers, leads, prospects, appliedFilters, hasActiveFilters]);

  /**
   * Get count of active filters (based on applied filters)
   */
  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (appliedFilters.firstName) count++;
    if (appliedFilters.lastName) count++;
    if (appliedFilters.companyName) count++;
    if (appliedFilters.customerNumber) count++;
    if (appliedFilters.email) count++;
    if (appliedFilters.phone) count++;
    if (appliedFilters.addressLine1) count++;
    if (appliedFilters.city) count++;
    if (appliedFilters.postalCode) count++;
    if (appliedFilters.state.length > 0) count++;
    if (Object.values(appliedFilters.propertyTypes).some(v => v)) count++;
    if (Object.values(appliedFilters.statuses).some(v => v)) count++;
    if (appliedFilters.invoiceNumber) count++;
    if (appliedFilters.workOrderNumber) count++;
    if (appliedFilters.lastServiceDate) count++;
    if (appliedFilters.programType) count++;

    return count;
  }, [appliedFilters]);

  return {
    filters,
    appliedFilters,
    updateFilter,
    updateFilters,
    updateNestedFilter,
    applyFilters,
    applyFiltersDirectly,
    clearFilters,
    filteredResults,
    hasActiveFilters,
    activeFilterCount,
    isOpen,
    setIsOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

export default useAdvancedCustomerFilter;
