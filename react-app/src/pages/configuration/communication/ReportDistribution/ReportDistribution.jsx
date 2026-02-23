import React, { useEffect } from 'react';
import { useReportDistributions } from './useReportDistributions';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditReportDistribution from '../../../../components/Configuration/Communication/ReportDistribution/AddEditReportDistribution';
import { useAddEditReportDistribution } from '../../../../components/Configuration/Communication/ReportDistribution/useAddEditReportDistribution';

const CHANNEL_COLORS = { Email: 'primary', SMS: 'warning', 'Portal Upload': 'info' };
const FORMAT_COLORS = { PDF: 'danger', Excel: 'success', CSV: 'secondary' };

const columns = [
  { label: 'Distribution Name', accessor: 'distributionName', sortable: true },
  { label: 'Report Type', accessor: 'reportType', sortable: true },
  { label: 'Channel', accessor: 'deliveryChannel', sortable: true },
  { label: 'Recipient', accessor: 'recipientType', sortable: false },
  { label: 'Schedule', accessor: 'schedule', sortable: false },
  { label: 'Format', accessor: 'fileFormat', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const formatSchedule = (item) => {
  if (item.schedule === 'Scheduled') {
    return `After ${item.scheduleValue ?? 1} ${item.scheduleUnit ?? 'Days'}`;
  }
  return 'Immediately';
};

const ReportDistribution = () => {
  const { items, saveItem, removeItem } = useReportDistributions();
  const addEdit = useAddEditReportDistribution(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Report Distribution',
      description: 'Auto-send inspection reports to clients',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Communication', path: '/configuration/communication' },
        { label: 'Report Distribution', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['distributionName', 'reportType', 'deliveryChannel', 'recipientType']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'distributionName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.distributionName}</strong>
      </td>
      <td>{item.reportType}</td>
      <td>
        <span className={`badge badge-soft-${CHANNEL_COLORS[item.deliveryChannel] || 'secondary'}`}>{item.deliveryChannel}</span>
      </td>
      <td>{item.recipientType}</td>
      <td>
        <span className='text-muted'>{formatSchedule(item)}</span>
      </td>
      <td>
        <span className={`badge badge-soft-${FORMAT_COLORS[item.fileFormat] || 'secondary'}`}>{item.fileFormat}</span>
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
      <AddEditReportDistribution
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
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search report distributions…' />
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
                  icon: 'mdi mdi-file-send-outline',
                  message: 'No report distributions found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDistribution;
