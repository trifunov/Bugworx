const TableHeader = ({
  columns,
  sortableColumns = {},
  sortField = null,
  sortDirection = 'asc',
  onSort = null
}) => {
  const handleSort = (field) => {
    if (field && onSort) {
      onSort(field);
    }
  };

  return (
    <thead className="table-dark">
      <tr>
        {columns.map((column, index) => {
          const field = sortableColumns[column];
          const isSortable = !!field;
          const isActive = sortField === field;

          return (
            <th
              key={index}
              onClick={() => isSortable && handleSort(field)}
              style={{
                cursor: isSortable ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <span>{column}</span>
                {isSortable && (
                  <span className="ms-1">
                    {isActive ? (
                      sortDirection === 'asc' ? (
                        <i className="mdi mdi-arrow-up"></i>
                      ) : (
                        <i className="mdi mdi-arrow-down"></i>
                      )
                    ) : (
                      <i className="mdi mdi-unfold-more-horizontal" style={{ opacity: 0.5 }}></i>
                    )}
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
