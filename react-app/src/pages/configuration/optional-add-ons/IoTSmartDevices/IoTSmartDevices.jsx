import React, { useEffect } from 'react';
import { useIoTSmartDevices } from './useIoTSmartDevices';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditIoTSmartDevice from '../../../../components/configuration/optional-add-ons/IoTSmartDevices/useAddEditIoTSmartDevice';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditIoTSmartDevice from '../../../../components/configuration/optional-add-ons/IoTSmartDevices/AddEditIoTSmartDevice';

const DEVICE_TYPE_BADGE = {
  'Smart Trap': 'primary',
  'Motion Sensor': 'warning',
  'Temperature / Humidity Sensor': 'info',
  'CO2 Monitor': 'success',
  'Bait Station Monitor': 'danger',
  'Door / Entry Sensor': 'secondary',
  'Camera / Image Sensor': 'dark',
  'UV Light Trap': 'warning',
  'Air Quality Sensor': 'info',
  'Gateway / Hub': 'primary',
  Other: 'secondary',
};

const STATUS_BADGE = {
  Active: 'success',
  Inactive: 'secondary',
  Maintenance: 'warning',
  Offline: 'danger',
  Decommissioned: 'dark',
};

const columns = [
  { label: 'Device Name', accessor: 'name', sortable: true },
  { label: 'Device Type', accessor: 'deviceType', sortable: true },
  { label: 'Manufacturer / Model', accessor: 'manufacturer', sortable: true },
  { label: 'Protocol', accessor: 'protocol', sortable: true },
  { label: 'Location / Zone', accessor: 'assignedLocation', sortable: false },
  { label: 'Device Status', accessor: 'status', sortable: true },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const IoTSmartDevices = () => {
  const { items, saveItem, removeItem } = useIoTSmartDevices();
  const addEditDevice = useAddEditIoTSmartDevice();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'IoT & Smart Devices',
      description: 'Link to monitoring sensors or smart traps',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Optional Add-ons', path: '/configuration/addons' },
        { label: 'IoT & Smart Devices', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'deviceType',
    'manufacturer',
    'model',
    'serialNumber',
    'deviceId',
    'protocol',
    'assignedLocation',
    'notes',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.serialNumber && <div className='text-muted font-size-12'>S/N: {item.serialNumber}</div>}
      </td>
      <td>
        <span className={`badge badge-soft-${DEVICE_TYPE_BADGE[item.deviceType] || 'secondary'}`}>{item.deviceType || '—'}</span>
      </td>
      <td>
        {item.manufacturer || item.model ? (
          <>
            {item.manufacturer && <div>{item.manufacturer}</div>}
            {item.model && <div className='text-muted font-size-12'>{item.model}</div>}
          </>
        ) : (
          <span className='text-muted'>—</span>
        )}
      </td>
      <td>
        <span className='badge badge-soft-secondary'>{item.protocol || '—'}</span>
      </td>
      <td>{item.assignedLocation || <span className='text-muted'>—</span>}</td>
      <td>
        <span className={`badge badge-soft-${STATUS_BADGE[item.status] || 'secondary'}`}>{item.status || 'Active'}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditDevice.open(item);
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
      <AddEditIoTSmartDevice
        isOpen={addEditDevice.isOpen}
        formData={addEditDevice.formData}
        isSaving={addEditDevice.isSaving}
        onUpdateFieldHandle={addEditDevice.onUpdateFieldHandle}
        onClose={addEditDevice.close}
        onSave={() => addEditDevice.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search IoT devices...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditDevice.open()} />
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
                  icon: 'mdi mdi-access-point-network',
                  message: 'No IoT devices found. Click "Add New" to register a device.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IoTSmartDevices;
