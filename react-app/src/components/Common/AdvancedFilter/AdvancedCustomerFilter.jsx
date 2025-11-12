import FilterCustomerInfo from './FilterCustomerInfo';
import FilterAddress from './FilterAddress';
import FilterPropertyTypes from './FilterPropertyTypes';
import FilterStatusCategory from './FilterStatusCategory';
import FilterTransactions from './FilterTransactions';
import FilterOptional from './FilterOptional';

/**
 * Main Advanced Filter component
 */
const AdvancedCustomerFilter = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilter,
  onUpdateNestedFilter,
  onApply,
  onClearAll,
  activeFilterCount
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-end show"
        tabIndex="-1"
        style={{ width: '500px', maxWidth: '90vw' }}
      >
        {/* Header */}
        <div className="offcanvas-header border-bottom bg-light">
          <div className="d-flex align-items-center gap-2">
            <i className="mdi mdi-filter-variant text-primary font-size-20"></i>
            <h5 className="offcanvas-title mb-0">
              Advanced Filters
              {activeFilterCount > 0 && (
                <span className="badge bg-primary ms-2 font-size-12">{activeFilterCount}</span>
              )}
            </h5>
          </div>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>

        {/* Body - Scrollable */}
        <div className="offcanvas-body">
          <FilterCustomerInfo
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />

          <hr className="my-2" />

          <FilterAddress
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />

          <hr className="my-2" />

          <FilterPropertyTypes
            filters={filters}
            onUpdateNestedFilter={onUpdateNestedFilter}
          />

          <hr className="my-2" />

          <FilterStatusCategory
            filters={filters}
            onUpdateNestedFilter={onUpdateNestedFilter}
          />

          <hr className="my-2" />

          <FilterTransactions
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />

          <hr className="my-2" />

          <FilterOptional
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />

          <div className="d-flex gap-2 mt-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                onApply();
              }}
            >
              Apply Filters
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-light ms-auto"
              onClick={onClearAll}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
      <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
    </>
  );
};

export default AdvancedCustomerFilter;
