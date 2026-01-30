import React, { useEffect } from 'react';
import { useVehicleTypes } from './useVehicleTypes';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditVehicleType from '../../../../components/Configuration/FleetManagement/VehicleTypes/AddEditVehicleType';
import { useAddEditVehicleTypes } from '../../../../components/Configuration/FleetManagement/VehicleTypes/useAddEditVehicleTypes';

const columns = [
  { label: 'Name', accessor: 'name', sortable: true },
  { label: 'Capacity (lbs)', accessor: 'capacity', sortable: true },
  { label: 'Fuel Type', accessor: 'fuelType', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const VehicleTypes = () => {
  const { items, saveItem, removeItem } = useVehicleTypes();
  const addEditVehicleType = useAddEditVehicleTypes(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Vehicle Types',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Fleet Management', path: '/configuration/fleet-management' },
        { label: 'Vehicle Types', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'capacity', 'fuelType']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{item.capacity}</td>
      <td>{item.fuelType}</td>
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
              addEditVehicleType.open(item);
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
      <AddEditVehicleType
        isOpen={addEditVehicleType.isOpen}
        formData={addEditVehicleType.formData}
        isSaving={addEditVehicleType.isSaving}
        onUpdateFieldHandle={addEditVehicleType.onUpdateFieldHandle}
        onClose={addEditVehicleType.close}
        onSave={addEditVehicleType.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search vehicle types...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditVehicleType.open()} />
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
                  icon: 'mdi mdi-car-outline',
                  message: 'No vehicle types found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleTypes;
