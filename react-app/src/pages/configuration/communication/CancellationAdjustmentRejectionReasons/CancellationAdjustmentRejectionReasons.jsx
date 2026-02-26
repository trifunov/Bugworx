import React, { useEffect } from 'react';
import { useCancellationAdjustmentRejectionReasons } from './useOCancellationAdjustmentRejectionReasons';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditCancellationAdjustmentRejectionReason from '../../../../components/Configuration/communication/CancellationAdjustmentRejectionReasons/useAddEditCancellationAdjustmentRejectionReason';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditCancellationAdjustmentRejectionReason from '../../../../components/Configuration/communication/CancellationAdjustmentRejectionReasons/AddEditCancellationAdjustmentRejectionReason';

const TYPE_BADGE = {
  Cancellation: 'danger',
  Adjustment: 'warning',
  Rejection: 'secondary',
};

const columns = [
  { label: 'Reason Name', accessor: 'name', sortable: true },
  { label: 'Type', accessor: 'type', sortable: true },
  { label: 'Applies To', accessor: 'appliesTo', sortable: true },
  { label: 'Code', accessor: 'internalCode', sortable: true },
  { label: 'Approval Required', accessor: 'requiresApproval', sortable: false },
  { label: 'Notes Required', accessor: 'requiresNotes', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const CancellationAdjustmentRejectionReasons = () => {
  const { items, saveItem, removeItem } = useCancellationAdjustmentRejectionReasons();
  const addEditReason = useAddEditCancellationAdjustmentRejectionReason();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Cancellation, Adjustment & Rejection Reasons',
      description:
        'Manage standardized reasons used across the system: Cancellation reasons for programs or services, Adjustment reasons for programs, services or invoices, and Rejection reasons for proposals or calls.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Cancellation, Adjustment & Rejection Reasons', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'type',
    'appliesTo',
    'internalCode',
    'description',
    'followUpAction',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.description && (
          <div className='text-muted font-size-12' style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.description}
          </div>
        )}
      </td>
      <td>
        <span className={`badge badge-soft-${TYPE_BADGE[item.type] || 'secondary'}`}>{item.type || '—'}</span>
      </td>
      <td>{item.appliesTo || '—'}</td>
      <td>{item.internalCode ? <code className='font-size-12'>{item.internalCode}</code> : <span className='text-muted'>—</span>}</td>
      <td>
        {item.requiresApproval ? (
          <span className='badge badge-soft-warning'>
            <i className='ri-shield-check-line me-1' />
            Yes
          </span>
        ) : (
          <span className='text-muted font-size-12'>No</span>
        )}
      </td>
      <td>
        {item.requiresNotes ? (
          <span className='badge badge-soft-info'>
            <i className='ri-chat-3-line me-1' />
            Yes
          </span>
        ) : (
          <span className='text-muted font-size-12'>No</span>
        )}
      </td>
      <td>
        <span className={`badge badge-soft-${item.active !== false ? 'success' : 'danger'}`}>{item.active !== false ? 'Active' : 'Inactive'}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditReason.open(item);
            }}
          >
            <i className='mdi mdi-pencil font-size-18' />
          </a>
          <a
            className='text-danger'
            href='#'
            title='Delete'
            onClick={(e) => {
              e.preventDefault();
              removeItem(item.id);
            }}
          >
            <i className='mdi mdi-delete font-size-18' />
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <AddEditCancellationAdjustmentRejectionReason
        isOpen={addEditReason.isOpen}
        formData={addEditReason.formData}
        isSaving={addEditReason.isSaving}
        onUpdateFieldHandle={addEditReason.onUpdateFieldHandle}
        onClose={addEditReason.close}
        onSave={() => addEditReason.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search cancellation, adjustment & rejection reasons...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditReason.open()} />
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
                  icon: 'mdi mdi-cancel',
                  message: 'No reasons found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancellationAdjustmentRejectionReasons;
