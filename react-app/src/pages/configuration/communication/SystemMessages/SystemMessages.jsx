import React, { useEffect } from 'react';
import { useSystemMessages } from './useSystemMessages';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditSystemMessage from '../../../../components/Configuration/Communication/SystemMessages/AddEditSystemMessage';
import { useAddEditSystemMessage } from '../../../../components/Configuration/Communication/SystemMessages/useAddEditSystemMessage';

const CATEGORY_COLORS = {
  'Status Label': 'info',
  'Error Message': 'danger',
  'Success Message': 'success',
  'Warning Message': 'warning',
  'Info Message': 'primary',
  'Email Footer': 'secondary',
  'Portal Banner': 'dark',
  'Terms & Conditions': 'secondary',
  Custom: 'secondary',
};

const columns = [
  { label: 'Message Key', accessor: 'messageKey', sortable: true },
  { label: 'Category', accessor: 'category', sortable: true },
  { label: 'Context', accessor: 'context', sortable: true },
  { label: 'Message Text', accessor: 'messageText', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const truncate = (text, max = 60) => (text && text.length > max ? `${text.substring(0, max)}…` : text);

const SystemMessages = () => {
  const { items, saveItem, removeItem } = useSystemMessages();
  const addEdit = useAddEditSystemMessage(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'System Messages',
      description: 'Manage default system texts and status labels',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Communication', path: '/configuration/communication' },
        { label: 'System Messages', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['messageKey', 'category', 'context', 'messageText']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'messageKey' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <code className='text-muted'>{item.messageKey}</code>
      </td>
      <td>
        <span className={`badge badge-soft-${CATEGORY_COLORS[item.category] || 'secondary'}`}>{item.category}</span>
      </td>
      <td>{item.context}</td>
      <td>
        <span title={item.messageText}>{truncate(item.messageText)}</span>
      </td>
      <td>
        <span className={`badge badge-soft-${item.active ? 'success' : 'danger'}`}>{item.active ? 'Active' : 'Inactive'}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEdit.open(item);
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
      <AddEditSystemMessage
        isOpen={addEdit.isOpen}
        formData={addEdit.formData}
        isSaving={addEdit.isSaving}
        onUpdateFieldHandle={addEdit.onUpdateFieldHandle}
        onClose={addEdit.close}
        onSave={addEdit.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search system messages…' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEdit.open()} />
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
                  icon: 'mdi mdi-message-text-outline',
                  message: 'No system messages found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemMessages;
