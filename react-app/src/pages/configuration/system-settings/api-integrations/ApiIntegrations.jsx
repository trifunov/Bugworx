import { useEffect } from 'react';
import { useApiIntegrations } from './useApiIntegrations';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditApiIntegration from '../../../../components/Configuration/SystemSettings/ApiIntegrations/AddEditApiIntegration';

const columns = [
  { label: 'Provider', accessor: 'name', sortable: true },
  { label: 'Type', accessor: 'type', sortable: true },
  { label: 'Status', accessor: 'enabled', sortable: true },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const ApiIntegrations = () => {
  const { items, saveItem, removeItem, toggleEnabled } = useApiIntegrations();
  const { addEditApiIntegration } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'API Integrations',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'System Settings', path: '/configuration/system-settings' },
        { label: 'API Integrations', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'type']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{item.type}</td>
      <td>
        <span className={`badge ${item.enabled ? 'badge-soft-success' : 'badge-soft-secondary'}`}>{item.enabled ? 'Enabled' : 'Disabled'}</span>
      </td>
      <td>
        <div className='d-flex gap-2'>
          <button className='btn btn-sm btn-outline-primary' onClick={() => addEditApiIntegration.open(item)}>
            Configure
          </button>
          <button className={`btn btn-sm ${item.enabled ? 'btn-outline-warning' : 'btn-outline-success'}`} onClick={() => toggleEnabled(item.id)}>
            {item.enabled ? 'Disable' : 'Enable'}
          </button>
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
      <AddEditApiIntegration
        isOpen={addEditApiIntegration.isOpen}
        formData={addEditApiIntegration.formData}
        isSaving={addEditApiIntegration.isSaving}
        onUpdateFieldHandle={addEditApiIntegration.onUpdateFieldHandle}
        onClose={addEditApiIntegration.close}
        onSave={() => addEditApiIntegration.onSaveHandle(saveItem)}
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
                      <AddNewButton handleAddNew={() => addEditApiIntegration.open()} />
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
                  icon: 'mdi mdi-power-plug-outline',
                  message: 'No API integrations found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiIntegrations;
