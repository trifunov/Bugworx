/**
 * Transactions / Work Orders filter section
 */
const FilterTransactions = ({ filters, onUpdateFilter }) => {
  return (
    <div className="mb-4">
      <h6 className="text-uppercase font-size-12 text-muted mb-3">Transactions / Work Orders</h6>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Invoice #"
            value={filters.invoiceNumber}
            onChange={(e) => onUpdateFilter('invoiceNumber', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Work Order #"
            value={filters.workOrderNumber}
            onChange={(e) => onUpdateFilter('workOrderNumber', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterTransactions;
