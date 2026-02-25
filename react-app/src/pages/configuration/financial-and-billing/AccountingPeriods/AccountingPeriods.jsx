import React, { useEffect } from 'react';
import { useAccountingPeriods } from './useAccountingPeriods';
import AddEditAccountingPeriod from '../../../../components/Configuration/FinancialAndBilling/AccountingPeriods/AddEditAccountingPeriod';
import Table from '../../../../components/Common/Table/Table';
import { formatDate } from '../../../../utils/dateUtils';
import AddNewButton from '../../../../components/Common/AddNewButton';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useAddEditAccountingPeriod } from '../../../../components/Configuration/FinancialAndBilling/AccountingPeriods/useAddEditAccountingPeriod';

const columns = [
  { label: 'Period Name', accessor: 'name', sortable: true },
  { label: 'Start Date', accessor: 'startDate', sortable: true },
  { label: 'End Date', accessor: 'endDate', sortable: true },
  { label: 'Status', accessor: 'status', sortable: true },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const AccountingPeriods = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { accountingPeriods, handleAdd, handleUpdate, handleDelete, searchTerm, setSearchTerm, tableProps, totalItems } = useAccountingPeriods();

  const saveItem = (item) => {
    if (item.id) {
      handleUpdate(item);
    } else {
      handleAdd(item);
    }
  };

  const addEditPeriod = useAddEditAccountingPeriod(saveItem);

  useEffect(() => {
    setPageSubHeader({
      title: 'Accounting Periods',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Financial & Billing Setup', path: '/configuration' },
        { label: 'Accounting Periods', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{formatDate(item.startDate)}</td>
      <td>{formatDate(item.endDate)}</td>
      <td>
        <span className={`badge badge-soft-${item.status === 'Open' ? 'success' : item.status === 'Closed' ? 'danger' : 'info'}`}>{item.status}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            href='#!'
            className='text-primary'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditPeriod.open(item);
            }}
          >
            <i className='mdi mdi-pencil font-size-18'></i>
          </a>
          <a
            href='#!'
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
      <AddEditAccountingPeriod
        isOpen={addEditPeriod.isOpen}
        formData={addEditPeriod.formData}
        isSaving={addEditPeriod.isSaving}
        onUpdateFieldHandle={addEditPeriod.onUpdateFieldHandle}
        onClose={addEditPeriod.close}
        onSave={addEditPeriod.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search accounting periods...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditPeriod.open()} />
                    </div>
                  </div>
                </div>
              </div>

              <Table
                columns={columnNames}
                data={accountingPeriods}
                renderRow={renderRow}
                sortableColumns={sortableColumns}
                onSort={tableProps.handleSort}
                sortField={tableProps.sortField}
                sortDirection={tableProps.sortDirection}
                pagination={{
                  currentPage: tableProps.currentPage,
                  totalPages: tableProps.totalPages,
                  onPageChange: tableProps.setCurrentPage,
                  totalItems: totalItems,
                }}
                emptyState={{
                  icon: 'ri-calendar-check-line',
                  message: 'No accounting periods found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountingPeriods;
