const TableHeader = ({ columns }) => {
  return (
    <thead className="table-dark">
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
