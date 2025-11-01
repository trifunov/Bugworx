import TableHeader from './TableHeader';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

const DataTable = ({
  columns,
  data,
  renderRow,
  emptyState,
  sortableColumns = {},
  sortField = null,
  sortDirection = 'asc',
  onSort = null,
  pagination = null
}) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle table-nowrap table-hover">
          <TableHeader
            columns={columns}
            sortableColumns={sortableColumns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : null}
          </tbody>
        </table>
        {data.length === 0 && emptyState && (
          <EmptyState icon={emptyState.icon} message={emptyState.message} />
        )}
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          totalItems={pagination.totalItems}
        />
      )}
    </>
  );
};

export default DataTable;
