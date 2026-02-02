import React, { useEffect } from 'react';
import { useDriverAssignmentRules } from './useDriverAssignmentRules';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditDriverAssignmentRule from '../../../../components/Configuration/FleetManagement/DriverAssignmentRules/AddEditDriverAssignmentRule';
import { useAddEditDriverAssignmentRule } from '../../../../components/Configuration/FleetManagement/DriverAssignmentRules/useAddEditDriverAssignmentRule';

const columns = [
  { label: 'Rule Name', accessor: 'ruleName', sortable: true },
  { label: 'Criteria', accessor: 'criteria', sortable: false },
  { label: 'Priority', accessor: 'priority', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const DriverAssignmentRules = () => {
  const { items, loading, saveItem, removeItem } = useDriverAssignmentRules();
  const addEditRule = useAddEditDriverAssignmentRule(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Driver Assignment Rules',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Fleet Management', path: '/configuration/fleet-management' },
        { label: 'Driver Assignment Rules', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['ruleName']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'ruleName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>{item.ruleName}</td>
      <td>
        {item.technicianCertification && <span className='badge bg-info me-1'>Cert: {item.technicianCertification}</span>}
        {item.vehicleType && <span className='badge bg-primary me-1'>Vehicle: {item.vehicleType}</span>}
        {item.serviceZone && <span className='badge bg-secondary me-1'>Zone: {item.serviceZone}</span>}
      </td>
      <td>{item.priority}</td>
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
              addEditRule.open(item);
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
      <AddEditDriverAssignmentRule
        isOpen={addEditRule.isOpen}
        formData={addEditRule.formData}
        isSaving={addEditRule.isSaving}
        onUpdateFieldHandle={addEditRule.onUpdateFieldHandle}
        onClose={addEditRule.close}
        onSave={addEditRule.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search rules...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditRule.open()} />
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
                  icon: 'ri-git-merge-line',
                  message: 'No assignment rules found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverAssignmentRules;
