import { useEffect } from 'react';
import { useTreatmentTypes } from './useTreatmentTypes';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditTreatmentType from '../../../../components/Configuration/ServiceInspection/TreatmentTypes/AddEditTreatmentType';

const columns = [
  { label: 'Method', accessor: 'method', sortable: true },
  { label: 'Chemicals', accessor: 'chemicals', sortable: true },
  { label: 'Protocols', accessor: 'protocols', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const TreatmentTypes = () => {
  const { items, saveItem, removeItem } = useTreatmentTypes();
  const { addEditTreatmentType } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Treatment Types',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        {
          label: 'Service Inspection',
          path: '/configuration/service-inspection',
        },
        { label: 'Treatment Types', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['method', 'chemicals', 'protocols']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, {
    defaultSortField: 'method',
  });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.method}</strong>
      </td>
      <td>{item.chemicals}</td>
      <td>{item.protocols}</td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditTreatmentType.open(item);
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
      <AddEditTreatmentType
        isOpen={addEditTreatmentType.isOpen}
        formData={addEditTreatmentType.formData}
        isSaving={addEditTreatmentType.isSaving}
        onUpdateFieldHandle={addEditTreatmentType.onUpdateFieldHandle}
        onClose={addEditTreatmentType.close}
        onSave={() => addEditTreatmentType.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder='Search treatment types...'
                      />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditTreatmentType.open()} />
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
                  icon: 'mdi mdi-eyedropper-variant',
                  message: 'No treatment types found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreatmentTypes;
