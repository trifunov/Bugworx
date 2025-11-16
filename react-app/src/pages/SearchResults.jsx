import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import AdvancedCustomerFilter from '../components/Common/AdvancedFilter/AdvancedCustomerFilter';
import useAdvancedCustomerFilter from '../hooks/useAdvancedCustomerFilter';
import { getCustomers, getLeads } from '../utils/localStorage';
import { deserializeUrlParamsToFilters, serializeFiltersToUrlParams } from '../utils/filterUrlUtils';
import Table from '../components/Common/Table/Table';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');

  // Use state setters for customers and leads to allow for dynamic updates
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);

  // Load data on mount
  useEffect(() => {
    setCustomers(getCustomers());
    setLeads(getLeads());
  }, []);

  // Advanced Filter
  const advancedFilter = useAdvancedCustomerFilter({
    customers,
    leads,
    prospects: []
  });

  // Extract applyFiltersDirectly to avoid infinite re-renders
  const { applyFiltersDirectly } = advancedFilter;

  // Load filters from URL params - runs on mount and when URL params change
  useEffect(() => {
    // Deserialize URL params to filters using utility function
    const filtersFromUrl = deserializeUrlParamsToFilters(searchParams);

    // Apply filters directly - this sets both filters and appliedFilters atomically
    applyFiltersDirectly(filtersFromUrl);
  }, [searchParams, applyFiltersDirectly]);

  // Use filtered results directly from the hook (already memoized)
  const results = advancedFilter.filteredResults;

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
                aria-label="Go back to previous page"
              >
                <i className="mdi mdi-arrow-left me-1" aria-hidden="true"></i>
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
                        aria-label="Clear all filters"
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
                  aria-label="Open advanced filter panel"
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

          // Serialize filters to URL params using utility function
          const params = serializeFiltersToUrlParams(advancedFilter.filters);

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
