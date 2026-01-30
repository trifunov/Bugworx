import React, { useEffect } from 'react';
import { useGpsIntegrations } from './useGpsIntegrations';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditGpsIntegration from '../../../../components/Configuration/FleetManagement/GpsIntegration/AddEditGpsIntegration';
import { useAddEditGpsIntegration } from '../../../../components/Configuration/FleetManagement/GpsIntegration/useAddEditGpsIntegration';

const columns = [
  { label: 'Provider Name', accessor: 'providerName', sortable: true },
  { label: 'Sync Frequency', accessor: 'syncFrequency', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const GpsIntegration = () => {
  const { items, loading, saveItem, removeItem } = useGpsIntegrations();
  const addEditIntegration = useAddEditGpsIntegration(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'GPS / Tracking Integration',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Fleet Management', path: '/configuration/fleet-management' },
        { label: 'GPS / Tracking Integration', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['providerName']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'providerName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>{item.providerName}</td>
      <td>{item.syncFrequency} minutes</td>
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
              addEditIntegration.open(item);
            }}
          >
            <i className='mdi mdi-pencil font-size-18'></i>
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
            <i className='mdi mdi-delete font-size-18'></i>
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <AddEditGpsIntegration
        isOpen={addEditIntegration.isOpen}
        formData={addEditIntegration.formData}
        isSaving={addEditIntegration.isSaving}
        onUpdateFieldHandle={addEditIntegration.onUpdateFieldHandle}
        onClose={addEditIntegration.close}
        onSave={addEditIntegration.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search integrations...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditIntegration.open()} />
                    </div>
                  </div>
                </div>
              </div>

              <Table
                columns={columnNames}
                data={paginatedData}
                renderRow={renderRow}
                isLoading={loading}
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
                  icon: 'ri-map-pin-line',
                  message: 'No GPS integrations found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GpsIntegration;
