import { useEffect } from 'react';
import { useMaterialSetup } from './useMaterialSetup';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditMaterialSetup from '../../../../components/Configuration/ServiceInspection/MaterialSetup/AddEditMaterialSetup';

const columns = [
  { label: 'Material Name', accessor: 'name', sortable: true },
  { label: 'Inventory ID/SKU', accessor: 'inventoryId', sortable: true },
  { label: 'SDS', accessor: 'sdsUrl', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const MaterialSetup = () => {
  const { items, saveItem, removeItem } = useMaterialSetup();
  const { addEditMaterialSetup } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Material Setup',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        {
          label: 'Service Inspection',
          path: '/configuration/service-inspection',
        },
        { label: 'Material Setup', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'inventoryId']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, {
    defaultSortField: 'name',
  });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{item.inventoryId}</td>
      <td>
        {item.sdsUrl ? (
          <a href={item.sdsUrl} target='_blank' rel='noopener noreferrer' className='btn btn-sm btn-link'>
            View SDS
          </a>
        ) : (
          'N/A'
        )}
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditMaterialSetup.open(item);
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
      <AddEditMaterialSetup
        isOpen={addEditMaterialSetup.isOpen}
        formData={addEditMaterialSetup.formData}
        isSaving={addEditMaterialSetup.isSaving}
        onUpdateFieldHandle={addEditMaterialSetup.onUpdateFieldHandle}
        onClose={addEditMaterialSetup.close}
        onSave={() => addEditMaterialSetup.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search materials...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditMaterialSetup.open()} />
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
                  icon: 'mdi mdi-flask-outline',
                  message: 'No materials found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialSetup;
