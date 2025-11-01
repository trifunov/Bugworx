import TableHeader from './TableHeader';
import EmptyState from './EmptyState';

const DataTable = ({ columns, data, renderRow, emptyState }) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle table-nowrap table-hover">
        <TableHeader columns={columns} />
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
  );
};

export default DataTable;
