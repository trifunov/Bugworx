import React, { useEffect, useRef } from 'react';
import { useBackupAndRestore } from './useBackupAndRestore';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';

const columns = [
  { label: 'Backup Name', accessor: 'name', sortable: true },
  { label: 'Date', accessor: 'date', sortable: true },
  { label: 'Size', accessor: 'size', sortable: true },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const BackupAndRestore = () => {
  const { backups, createBackup, downloadBackup, restoreBackup, deleteBackup, handleBackupUpload } = useBackupAndRestore();
  const { setPageSubHeader } = usePageSubHeader();
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPageSubHeader({
      title: 'Backup & Restore',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'System Settings', path: '/configuration/system-settings' },
        { label: 'Backup & Restore', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(backups, ['name']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'date', defaultSortDirection: 'desc' });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{new Date(item.date).toLocaleString()}</td>
      <td>{item.size}</td>
      <td>
        <div className='d-flex gap-2'>
          <button onClick={() => restoreBackup(item.id)} className='btn btn-sm btn-outline-primary'>
            Restore
          </button>
          <button onClick={() => downloadBackup(item.id)} className='btn btn-sm btn-outline-secondary'>
            Download
          </button>
          <button onClick={() => deleteBackup(item.id)} className='btn btn-sm btn-outline-danger'>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='card'>
          <div className='card-body'>
            <div className='row mb-3'>
              <div className='col-12'>
                <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                  <div className='flex-grow-1 w-90 me-md-1'>
                    <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search backups...' />
                  </div>
                  <div className='d-flex gap-2 mt-2 mt-md-1'>
                    <button className='btn btn-light' onClick={handleUploadClick}>
                      <i className='mdi mdi-upload me-1'></i> Upload Backup
                    </button>
                    <input
                      type='file'
                      ref={fileInputRef}
                      className='d-none'
                      accept='.json'
                      onChange={(e) => handleBackupUpload(e.target.files?.[0])}
                    />
                    <button className='btn btn-primary' onClick={createBackup}>
                      <i className='mdi mdi-plus me-1'></i> Create Backup
                    </button>
                  </div>
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
                icon: 'mdi mdi-database-off-outline',
                message: 'No backups found. Click "Create Backup" to get started.',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupAndRestore;
