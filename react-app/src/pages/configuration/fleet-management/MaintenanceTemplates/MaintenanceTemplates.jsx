import React, { useEffect } from 'react';
import { useMaintenanceTemplates } from './useMaintenanceTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditMaintenanceTemplate from '../../../../components/Configuration/FleetManagement/MaintenanceTemplates/AddEditMaintenanceTemplate';
import { useAddEditMaintenanceTemplate } from '../../../../components/Configuration/FleetManagement/MaintenanceTemplates/useAddEditMaintenanceTemplate';

const columns = [
  { label: 'Name', accessor: 'name', sortable: true },
  { label: 'Frequency', accessor: 'frequency', sortable: false },
  { label: 'Tasks', accessor: 'tasks', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const MaintenanceTemplates = () => {
  const { items, saveItem, removeItem } = useMaintenanceTemplates();
  const addEditTemplate = useAddEditMaintenanceTemplate(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Maintenance Schedule Templates',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Fleet Management', path: '/configuration/fleet-management' },
        { label: 'Maintenance Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'description']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        <br />
        <small className='text-muted'>{item.description}</small>
      </td>
      <td>
        {item.frequencyValue} {item.frequencyUnit}
      </td>
      <td>
        <p color='light' className='me-1'>
          {item.tasks}
        </p>
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
              addEditTemplate.open(item);
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
      <AddEditMaintenanceTemplate
        isOpen={addEditTemplate.isOpen}
        formData={addEditTemplate.formData}
        isSaving={addEditTemplate.isSaving}
        onUpdateFieldHandle={addEditTemplate.onUpdateFieldHandle}
        onClose={addEditTemplate.close}
        onSave={addEditTemplate.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search templates...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditTemplate.open()} />
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
                  icon: 'mdi mdi-calendar-clock-outline',
                  message: 'No maintenance templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenanceTemplates;
