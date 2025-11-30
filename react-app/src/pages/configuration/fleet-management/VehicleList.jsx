import React, { useEffect } from 'react';
import { useVehicles } from './useVehicles';
import { usePageSubHeader } from '../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../contexts/EditableFormContext';
import Table from '../../../components/Common/Table/Table';
import useTable from '../../../components/Common/Table/useTable';
import AddNewButton from '../../../components/Common/AddNewButton';
import useTableSearch from '../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../components/Common/SearchBar/TableSearch';
import AddEditVehicle from '../../../components/Configuration/FleetManagement/AddEditVehicle';

const columns = [
  { label: 'Vehicle', accessor: 'name', sortable: true },
  { label: 'Make/Model', accessor: 'make', sortable: true },
  { label: 'License Plate', accessor: 'licensePlate', sortable: true },
  { label: 'Status', accessor: 'status', sortable: true },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const VehicleList = () => {
  const { items, saveItem, removeItem } = useVehicles();
  const { addEditVehicle } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Vehicle List',
      breadcrumbs: [
        { label: 'Fleet', path: '/fleet' },
        { label: 'Vehicles', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'make', 'model', 'licensePlate']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const getStatusClass = (status) => {
    if (status === 'Active') return 'success';
    if (status === 'In-Shop') return 'warning';
    return 'secondary';
  };

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{`${item.make || ''} ${item.model || ''}`}</td>
      <td>{item.licensePlate}</td>
      <td>
        <span className={`badge badge-soft-${getStatusClass(item.status)}`}>{item.status}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditVehicle.open(item);
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
      <AddEditVehicle
        isOpen={addEditVehicle.isOpen}
        formData={addEditVehicle.formData}
        isSaving={addEditVehicle.isSaving}
        onUpdateFieldHandle={addEditVehicle.onUpdateFieldHandle}
        onClose={addEditVehicle.close}
        onSave={() => addEditVehicle.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search vehicles...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditVehicle.open()} />
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
                  icon: 'mdi mdi-car-multiple',
                  message: 'No vehicles found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleList;
