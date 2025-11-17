/**
 * Customer Info filter section
 */
const FilterCustomerInfo = ({ filters, onUpdateFilter }) => {
  return (
    <div className="mb-4">
      <h6 className="text-uppercase font-size-12 text-muted mb-3">Customer Info</h6>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={filters.firstName}
            onChange={(e) => onUpdateFilter('firstName', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={filters.lastName}
            onChange={(e) => onUpdateFilter('lastName', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Company Name"
            value={filters.companyName}
            onChange={(e) => onUpdateFilter('companyName', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Customer Number"
            value={filters.customerNumber}
            onChange={(e) => onUpdateFilter('customerNumber', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={filters.email}
            onChange={(e) => onUpdateFilter('email', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="tel"
            className="form-control"
            placeholder="Phone"
            value={filters.phone}
            onChange={(e) => onUpdateFilter('phone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCustomerInfo;
