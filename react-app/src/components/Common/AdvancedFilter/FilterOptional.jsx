/**
 * Optional filter section
 */
const FilterOptional = ({ filters, onUpdateFilter }) => {
  return (
    <div className="mb-4">
      <h6 className="text-uppercase font-size-12 text-muted mb-3">Optional</h6>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            placeholder="Last Service Date"
            value={filters.lastServiceDate}
            onChange={(e) => onUpdateFilter('lastServiceDate', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Program or Subscription Type"
            value={filters.programType}
            onChange={(e) => onUpdateFilter('programType', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOptional;
