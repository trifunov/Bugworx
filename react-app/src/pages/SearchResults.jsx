import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import AdvancedCustomerFilter from '../components/Common/AdvancedFilter/AdvancedCustomerFilter';
import useAdvancedCustomerFilter from '../hooks/useAdvancedCustomerFilter';
import { getCustomers, getLeads } from '../utils/localStorage';
import Table from '../components/Common/Table/Table';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');

  const [customers] = useState(getCustomers());
  const [leads] = useState(getLeads());

  // Advanced Filter
  const advancedFilter = useAdvancedCustomerFilter({
    customers,
    leads,
    prospects: []
  });

  // Load filters from URL params - runs on mount and when URL params change
  useEffect(() => {
    console.log('SearchResults: URL params changed', searchParams.toString());

    // Start with initial filter structure
    const filtersFromUrl = {
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
    if (searchParams.get('firstName')) filtersFromUrl.firstName = searchParams.get('firstName');
    if (searchParams.get('lastName')) filtersFromUrl.lastName = searchParams.get('lastName');
    if (searchParams.get('companyName')) filtersFromUrl.companyName = searchParams.get('companyName');
    if (searchParams.get('customerNumber')) filtersFromUrl.customerNumber = searchParams.get('customerNumber');
    if (searchParams.get('email')) filtersFromUrl.email = searchParams.get('email');
    if (searchParams.get('phone')) filtersFromUrl.phone = searchParams.get('phone');
    if (searchParams.get('addressLine1')) filtersFromUrl.addressLine1 = searchParams.get('addressLine1');
    if (searchParams.get('city')) filtersFromUrl.city = searchParams.get('city');
    if (searchParams.get('postalCode')) filtersFromUrl.postalCode = searchParams.get('postalCode');
    if (searchParams.get('invoiceNumber')) filtersFromUrl.invoiceNumber = searchParams.get('invoiceNumber');
    if (searchParams.get('workOrderNumber')) filtersFromUrl.workOrderNumber = searchParams.get('workOrderNumber');
    if (searchParams.get('lastServiceDate')) filtersFromUrl.lastServiceDate = searchParams.get('lastServiceDate');
    if (searchParams.get('programType')) filtersFromUrl.programType = searchParams.get('programType');

    // Array filters
    if (searchParams.get('state')) {
      filtersFromUrl.state = searchParams.get('state').split(',');
    }

    // Property types
    if (searchParams.get('propertyTypes')) {
      const types = searchParams.get('propertyTypes').split(',');
      types.forEach(type => {
        filtersFromUrl.propertyTypes[type] = true;
      });
    }

    // Statuses
    if (searchParams.get('statuses')) {
      const statuses = searchParams.get('statuses').split(',');
      statuses.forEach(status => {
        filtersFromUrl.statuses[status] = true;
      });
    }

    console.log('SearchResults: Final filters from URL', filtersFromUrl);

    // Apply filters directly - this sets both filters and appliedFilters atomically
    advancedFilter.applyFiltersDirectly(filtersFromUrl);
    console.log('SearchResults: Filters applied directly');
  }, [searchParams]);

  // Compute results: always use filtered results from the hook
  const results = useMemo(() => {
    return advancedFilter.filteredResults;
  }, [advancedFilter.filteredResults]);

  // Calculate counts
  const counts = {
    all: results.all.length,
    customers: results.customers.length,
    leads: results.leads.length,
    prospects: results.prospects.length
  };

  // Get data for active tab
  const getTabData = () => {
    switch (activeTab) {
      case 'customers':
        return results.customers;
      case 'leads':
        return results.leads;
      case 'prospects':
        return results.prospects;
      default:
        return results.all;
    }
  };

  const tabData = getTabData();

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">
              Search Results
              <span className="badge bg-primary ms-2">{counts.all}</span>
            </h4>
            <div className="page-title-right">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => navigate(-1)}
              >
                <i className="mdi mdi-arrow-left me-1"></i>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {/* Filter Info Bar */}
              <div className="d-flex align-items-center justify-content-between mb-3 p-3 bg-light rounded">
                <div>
                  {advancedFilter.hasActiveFilters ? (
                    <>
                      <i className="mdi mdi-filter-variant text-primary me-2"></i>
                      <span className="fw-semibold">
                        {advancedFilter.activeFilterCount} filter{advancedFilter.activeFilterCount !== 1 ? 's' : ''} active
                      </span>
                      <button
                        className="btn btn-link btn-sm p-0 ms-2"
                        onClick={advancedFilter.clearFilters}
                      >
                        Clear all
                      </button>
                    </>
                  ) : (
                    <span className="text-muted">No filters applied</span>
                  )}
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={advancedFilter.open}
                >
                  <i className="mdi mdi-filter-variant me-1"></i>
                  Refine Filters
                </button>
              </div>

              {/* Tabs */}
              <ul className="nav nav-tabs nav-tabs-custom nav-justified mb-3" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                    role="tab"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="mdi mdi-view-grid me-1"></i>
                    All Results
                    <span className="badge bg-light text-dark ms-2">{counts.all}</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'customers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('customers')}
                    role="tab"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="mdi mdi-account-multiple me-1"></i>
                    Customers
                    <span className="badge bg-light text-dark ms-2">{counts.customers}</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'leads' ? 'active' : ''}`}
                    onClick={() => setActiveTab('leads')}
                    role="tab"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="mdi mdi-account-convert me-1"></i>
                    Leads
                    <span className="badge bg-light text-dark ms-2">{counts.leads}</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 'prospects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('prospects')}
                    role="tab"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="mdi mdi-account-question me-1"></i>
                    Prospects
                    <span className="badge bg-light text-dark ms-2">{counts.prospects}</span>
                  </a>
                </li>
              </ul>

              {/* Results Table */}
              <Table
                columns={['Type', 'Name', 'Contact', 'Status', 'Actions']}
                data={tabData}
                renderRow={(item) => {
                  const isCustomer = item.entityType === 'customer';
                  const isLead = item.entityType === 'lead';
                  const link = isLead ? '/leads' : `/customers/${item.id}`;

                  return (
                    <tr key={`${item.entityType}-${item.id}`}>
                      <td>
                        <span className={`badge badge-soft-${
                          isCustomer ? 'primary' : isLead ? 'warning' : 'info'
                        }`}>
                          {item.entityType}
                        </span>
                      </td>
                      <td>
                        <Link to={link} className="text-body fw-medium">
                          {item.name}
                        </Link>
                      </td>
                      <td>
                        {isCustomer ? (
                          <div>
                            <div className="fw-medium">{item.billingContact?.name || '-'}</div>
                            <div className="text-muted font-size-12">{item.billingContact?.email || '-'}</div>
                          </div>
                        ) : (
                          <div className="text-muted">-</div>
                        )}
                      </td>
                      <td>
                        {isCustomer && (
                          <span className={`badge badge-soft-${item.isActive ? 'success' : 'danger'}`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                        )}
                        {isLead && (
                          <span className="badge badge-soft-warning">New</span>
                        )}
                      </td>
                      <td>
                        <Link to={link} className="btn btn-sm btn-outline-primary">
                          <i className="mdi mdi-eye me-1"></i>
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                }}
                emptyState={{
                  icon: 'mdi mdi-magnify-close',
                  message: 'No results found. Try adjusting your filters or search criteria.'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AdvancedCustomerFilter
        isOpen={advancedFilter.isOpen}
        onClose={advancedFilter.close}
        filters={advancedFilter.filters}
        onUpdateFilter={advancedFilter.updateFilter}
        onUpdateNestedFilter={advancedFilter.updateNestedFilter}
        onApply={() => {
          // Apply filters to trigger re-computation
          advancedFilter.applyFilters();

          // Update URL params
          const params = new URLSearchParams();

          // Add simple string filters
          if (advancedFilter.filters.firstName) params.set('firstName', advancedFilter.filters.firstName);
          if (advancedFilter.filters.lastName) params.set('lastName', advancedFilter.filters.lastName);
          if (advancedFilter.filters.companyName) params.set('companyName', advancedFilter.filters.companyName);
          if (advancedFilter.filters.customerNumber) params.set('customerNumber', advancedFilter.filters.customerNumber);
          if (advancedFilter.filters.email) params.set('email', advancedFilter.filters.email);
          if (advancedFilter.filters.phone) params.set('phone', advancedFilter.filters.phone);
          if (advancedFilter.filters.addressLine1) params.set('addressLine1', advancedFilter.filters.addressLine1);
          if (advancedFilter.filters.city) params.set('city', advancedFilter.filters.city);
          if (advancedFilter.filters.postalCode) params.set('postalCode', advancedFilter.filters.postalCode);
          if (advancedFilter.filters.invoiceNumber) params.set('invoiceNumber', advancedFilter.filters.invoiceNumber);
          if (advancedFilter.filters.workOrderNumber) params.set('workOrderNumber', advancedFilter.filters.workOrderNumber);
          if (advancedFilter.filters.lastServiceDate) params.set('lastServiceDate', advancedFilter.filters.lastServiceDate);
          if (advancedFilter.filters.programType) params.set('programType', advancedFilter.filters.programType);

          // Add array filters
          if (advancedFilter.filters.state.length > 0) {
            params.set('state', advancedFilter.filters.state.join(','));
          }

          // Add nested object filters (propertyTypes)
          const activePropertyTypes = Object.keys(advancedFilter.filters.propertyTypes)
            .filter(key => advancedFilter.filters.propertyTypes[key]);
          if (activePropertyTypes.length > 0) {
            params.set('propertyTypes', activePropertyTypes.join(','));
          }

          // Add nested object filters (statuses)
          const activeStatuses = Object.keys(advancedFilter.filters.statuses)
            .filter(key => advancedFilter.filters.statuses[key]);
          if (activeStatuses.length > 0) {
            params.set('statuses', activeStatuses.join(','));
          }

          // Update URL without navigation
          navigate(`/search-results?${params.toString()}`, { replace: true });
          advancedFilter.close();
        }}
        onClearAll={() => {
          advancedFilter.clearFilters();
          // Clear URL params when filters are cleared
          navigate('/search-results', { replace: true });
        }}
        activeFilterCount={advancedFilter.activeFilterCount}
      />
    </>
  );
};

export default SearchResults;
