/**
 * Property Types filter section
 */
const FilterPropertyTypes = ({ filters, onUpdateNestedFilter }) => {
  const propertyTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'mixed', label: 'Mixed Use' }
  ];

  return (
    <div className="mb-4">
      <h6 className="text-uppercase font-size-12 text-muted mb-3">Property Types</h6>
      <div className="d-flex flex-wrap gap-3">
        {propertyTypes.map((type) => (
          <div key={type.value} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`property-type-${type.value}`}
              checked={filters.propertyTypes?.[type.value] || false}
              onChange={(e) => onUpdateNestedFilter('propertyTypes', type.value, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`property-type-${type.value}`}>
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPropertyTypes;
