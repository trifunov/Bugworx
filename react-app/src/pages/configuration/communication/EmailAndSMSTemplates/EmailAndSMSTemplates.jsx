import React, { useEffect } from 'react';
import { useEmailAndSMSTemplates } from './useEmailAndSMSTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEmailAndSMSTemplates from '../../../../components/Configuration/Communication/EmailAndSMSTemplates/AddEmailAndSMSTemplates';
import { useAddEditEmailAndSMSTemplates } from '../../../../components/Configuration/Communication/EmailAndSMSTemplates/useAddEditEmailAndSMSTemplates';

const CHANNEL_COLORS = {
  Email: 'primary',
  SMS: 'warning',
  Both: 'info',
};

const columns = [
  { label: 'Template Name', accessor: 'templateName', sortable: true },
  { label: 'Channel', accessor: 'channel', sortable: true },
  { label: 'Trigger Event', accessor: 'triggerEvent', sortable: true },
  { label: 'Recipient', accessor: 'recipientType', sortable: false },
  { label: 'Send Timing', accessor: 'sendTiming', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const formatTiming = (item) => {
  if (item.sendTimingDirection === 'On The Day') return 'On the day';
  return `${item.sendTimingValue ?? 1} ${item.sendTimingUnit ?? 'Days'} ${item.sendTimingDirection ?? 'Before'}`;
};

const EmailAndSMSTemplates = () => {
  const { items, saveItem, removeItem } = useEmailAndSMSTemplates();
  const addEdit = useAddEditEmailAndSMSTemplates(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Email & SMS Templates',
      description: '– Define message templates for reminders and reports',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Communication', path: '/configuration/communication' },
        { label: 'Email & SMS Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['templateName', 'triggerEvent', 'recipientType', 'channel']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'templateName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.templateName}</strong>
      </td>
      <td>
        <span className={`badge badge-soft-${CHANNEL_COLORS[item.channel] || 'secondary'}`}>{item.channel}</span>
      </td>
      <td>{item.triggerEvent}</td>
      <td>{item.recipientType}</td>
      <td>
        <span className='text-muted'>{formatTiming(item)}</span>
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
      <AddEmailAndSMSTemplates
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
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search templates…' />
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
                  icon: 'mdi mdi-email-outline',
                  message: 'No templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailAndSMSTemplates;
