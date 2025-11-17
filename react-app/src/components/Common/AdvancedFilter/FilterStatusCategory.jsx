/**
 * Status & Category filter section
 */
const FilterStatusCategory = ({ filters, onUpdateNestedFilter }) => {
  return (
    <div className="mb-4">
      <h6 className="text-uppercase font-size-12 text-muted mb-3">Status & Category</h6>
      <div className="d-flex flex-wrap gap-3">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="status-active"
            checked={filters.statuses.active}
            onChange={(e) => onUpdateNestedFilter('statuses', 'active', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="status-active">
            Active
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="status-inactive"
            checked={filters.statuses.inactive}
            onChange={(e) => onUpdateNestedFilter('statuses', 'inactive', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="status-inactive">
            Inactive
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="status-prospect"
            checked={filters.statuses.prospect}
            onChange={(e) => onUpdateNestedFilter('statuses', 'prospect', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="status-prospect">
            Prospect
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="status-lead"
            checked={filters.statuses.lead}
            onChange={(e) => onUpdateNestedFilter('statuses', 'lead', e.target.checked)}
          />
          <label className="form-check-label" htmlFor="status-lead">
            Lead
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterStatusCategory;
