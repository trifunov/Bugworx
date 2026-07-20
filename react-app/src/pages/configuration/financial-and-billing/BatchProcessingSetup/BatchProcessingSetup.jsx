import React, { useEffect } from 'react';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useBatchProcessingSetup } from './useBatchProcessingSetup';
import AddEditBatchProcessing from '../../../../components/Configuration/FinancialAndBilling/BatchProcessingSetup/AddEditBatchProcessing';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddNewButton from '../../../../components/Common/AddNewButton';

const columns = [
  { label: 'Batch Name', accessor: 'batchName', sortable: true },
  { label: 'Transaction Type', accessor: 'transactionType', sortable: true },
  { label: 'Frequency', accessor: 'frequency', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const BatchProcessingSetup = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { setups, loading, openAddEditForm, closeAddEditForm, isFormOpen, selectedSetup, handleSave, handleDelete, isSaving } =
    useBatchProcessingSetup();

  useEffect(() => {
    setPageSubHeader({
      title: 'Batch Processing Setup',
      description: 'Configure rules for automated transaction batching and posting.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Financial & Billing Setup', path: '/configuration' },
        { label: 'Batch Processing Setup', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(setups, ['batchName', 'transactionType']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'batchName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.batchName}</strong>
        <div className='text-muted'>{item.description}</div>
      </td>
      <td>{item.transactionType}</td>
      <td>
        {item.frequency}
        {item.frequency !== 'Manual' && <div className='text-muted small'>at {item.scheduledTime}</div>}
      </td>
      <td>
        <span className={`badge badge-soft-${item.active ? 'success' : 'danger'}`}>{item.active ? 'Active' : 'Inactive'}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            href='#'
            className='text-primary'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              openAddEditForm(item);
            }}
          >
            <i className='mdi mdi-pencil font-size-18'></i>
          </a>
          <a
            href='#'
            className='text-danger'
            title='Delete'
            onClick={(e) => {
              e.preventDefault();
              handleDelete(item.id);
            }}
          >
            <i className='mdi mdi-delete font-size-18'></i>
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {isFormOpen && (
        <AddEditBatchProcessing isOpen={isFormOpen} formData={selectedSetup} isSaving={isSaving} onClose={closeAddEditForm} onSave={handleSave} />
      )}

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search batch setups...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => openAddEditForm()} />
                    </div>
                  </div>
                </div>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
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
                    icon: 'ri-stack-line',
                    message: 'No batch processing rules found. Click "Add New" to create one.',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchProcessingSetup;
