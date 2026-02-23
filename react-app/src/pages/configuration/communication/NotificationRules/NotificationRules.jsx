import React, { useEffect } from 'react';
import { useNotificationRules } from './useNotificationRules';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditNotificationRules from '../../../../components/Configuration/Communication/NotificationRules/AddEditNotificationRules';
import { useAddEditNotificationRules } from '../../../../components/Configuration/Communication/NotificationRules/useAddEditNotificationRules';

const PRIORITY_COLORS = { Low: 'success', Medium: 'warning', High: 'danger', Critical: 'dark' };
const CHANNEL_COLORS = { 'In-App': 'info', Email: 'primary', SMS: 'warning', 'Push Notification': 'secondary' };

const columns = [
  { label: 'Rule Name', accessor: 'ruleName', sortable: true },
  { label: 'Trigger Event', accessor: 'triggerEvent', sortable: true },
  { label: 'Channel', accessor: 'notificationChannel', sortable: true },
  { label: 'Recipient', accessor: 'recipientType', sortable: false },
  { label: 'Priority', accessor: 'priority', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const NotificationRules = () => {
  const { items, saveItem, removeItem } = useNotificationRules();
  const addEdit = useAddEditNotificationRules(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Notification Rules',
      description: 'Configure when alerts trigger (e.g., missed service, new work order).',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Communication', path: '/configuration/communication' },
        { label: 'Notification Rules', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'ruleName',
    'triggerEvent',
    'notificationChannel',
    'recipientType',
    'priority',
  ]);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'ruleName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.ruleName}</strong>
      </td>
      <td>{item.triggerEvent}</td>
      <td>
        <span className={`badge badge-soft-${CHANNEL_COLORS[item.notificationChannel] || 'secondary'}`}>{item.notificationChannel}</span>
      </td>
      <td>{item.recipientType}</td>
      <td>
        <span className={`badge badge-soft-${PRIORITY_COLORS[item.priority] || 'secondary'}`}>{item.priority}</span>
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
      <AddEditNotificationRules
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
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search notification rules…' />
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
                  icon: 'mdi mdi-bell-outline',
                  message: 'No notification rules found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationRules;
