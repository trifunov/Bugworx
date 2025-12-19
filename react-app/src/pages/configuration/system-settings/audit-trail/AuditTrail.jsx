import { useEffect, useState, useMemo } from 'react';
import { useAuditTrail } from './useAuditTrail';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';

const columns = [
  { label: 'Timestamp', accessor: 'timestamp', sortable: true },
  { label: 'User', accessor: 'user', sortable: true },
  { label: 'Action', accessor: 'action', sortable: true },
  { label: 'Entity', accessor: 'entity', sortable: true },
  { label: 'Details', accessor: 'details', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const AuditTrail = () => {
  const { items } = useAuditTrail();
  const { setPageSubHeader } = usePageSubHeader();
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  useEffect(() => {
    setPageSubHeader({
      title: 'Audit Trail',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'System Settings', path: '/configuration/system-settings' },
        { label: 'Audit Trail', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const handleDateFilterChange = (field, value) => {
    setDateFilter((prev) => ({ ...prev, [field]: value }));
  };

  const dateFilteredItems = useMemo(() => {
    if (!dateFilter.from && !dateFilter.to) {
      return items;
    }
    return items.filter((item) => {
      const itemDate = new Date(item.timestamp);
      const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
      const toDate = dateFilter.to ? new Date(dateFilter.to) : null;
      if (fromDate) fromDate.setHours(0, 0, 0, 0);
      if (toDate) toDate.setHours(23, 59, 59, 999);

      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > toDate) return false;
      return true;
    });
  }, [items, dateFilter]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(dateFilteredItems, ['user', 'action', 'entity', 'details']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'timestamp', defaultSortDirection: 'desc' });

  const renderRow = (row) => (
    <tr key={row.id}>
      <td>{new Date(row.timestamp).toLocaleString()}</td>
      <td>{row.user}</td>
      <td>{row.action}</td>
      <td>{row.entity}</td>
      <td>{row.details}</td>
    </tr>
  );

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-body'>
            <div className='row mb-3 gy-2'>
              <div className='col-md-5'>
                <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search by user, action, entity...' />
              </div>
              <div className='col-md-7'>
                <div className='d-flex flex-column flex-md-row justify-content-end align-items-center gap-2'>
                  <label className='form-label mb-0'>Date Range:</label>
                  <input
                    value={dateFilter.from}
                    onChange={(e) => handleDateFilterChange('from', e.target.value)}
                    type='date'
                    className='form-control'
                    style={{ maxWidth: '160px' }}
                  />
                  <span className='d-none d-md-block'>-</span>
                  <input
                    value={dateFilter.to}
                    onChange={(e) => handleDateFilterChange('to', e.target.value)}
                    type='date'
                    className='form-control'
                    style={{ maxWidth: '160px' }}
                  />
                </div>
              </div>
            </div>

            <Table
              columns={columnNames}
              data={paginatedData}
              renderRow={renderRow}
              sortableColumns={sortableColumns}
              onSort={tableProps.handleSort}
              sortField={tableProps.sortField}
              sortDirection={tableProps.sortDirection}
              pagination={{
                currentPage: tableProps.currentPage,
                totalPages: tableProps.totalPages,
                onPageChange: tableProps.setCurrentPage,
                totalItems: tableProps.totalItems,
              }}
              emptyState={{
                icon: 'mdi mdi-history',
                message: 'No audit trail records found for the selected filters.',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
