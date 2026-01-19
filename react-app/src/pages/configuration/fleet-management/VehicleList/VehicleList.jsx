import React, { useEffect, useMemo } from 'react';
import { useVehicleList } from './useVehicleList';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditVehicle from '../../../../components/Configuration/FleetManagement/VehicleList/AddEditVehicle';
import { useAddEditVehicle } from '../../../../components/Configuration/FleetManagement/VehicleList/useAddEditVehicle';
import { getVehicleTypes, getTechnicians } from '../../../../utils/localStorage';

const columns = [
  { label: 'Name', accessor: 'name', sortable: true },
  { label: 'Type', accessor: 'vehicleTypeId', sortable: true },
  { label: 'Assigned To', accessor: 'technicianId', sortable: true },
  { label: 'License Plate', accessor: 'licensePlate', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const VehicleList = () => {
  const { items, saveItem, removeItem } = useVehicleList();
  const addEditVehicle = useAddEditVehicle(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  const vehicleTypes = useMemo(() => getVehicleTypes(), []);
  const technicians = useMemo(() => getTechnicians(), []);

  useEffect(() => {
    setPageSubHeader({
      title: 'Vehicle List',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Fleet Management', path: '/configuration/fleet-management' },
        { label: 'Vehicle List', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const getTypeName = (id) => vehicleTypes.find((vt) => vt.id === id)?.name || 'N/A';
  const getTechName = (id) => technicians.find((t) => t.id === id)?.name || 'Unassigned';

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'licensePlate']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
      </td>
      <td>{getTypeName(item.vehicleTypeId)}</td>
      <td>{getTechName(item.technicianId)}</td>
      <td>{item.licensePlate}</td>
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
        onSave={addEditVehicle.onSaveHandle}
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
