import { useEffect } from 'react';
import { useEmployeeDirectory } from './useEmployeeDirectory';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditEmployee from './../../../../components/Configuration/EmployeeDirectory/AddEditEmployee';

const columns = [
    { label: 'Name', accessor: 'name', sortable: true },
    { label: 'Position', accessor: 'position', sortable: true },
    { label: 'Team', accessor: 'team', sortable: true },
    { label: 'Status', accessor: 'active', sortable: false },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const EmployeeDirectory = () => {
  const { items, teams, saveItem, toggleActive } = useEmployeeDirectory();
  const { addEditEmployee } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
        title: 'Employee Directory',
        breadcrumbs: [
            { label: 'Configuration', path: '/configuration' },
            { label: 'User & Access Control', path: '/configuration/user-access' },
            { label: 'Employee Directory', active: true },
        ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'position', 'team']);
  
  const { 
    data: paginatedData, 
    handleSort, 
    sortField, 
    sortDirection,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems
  } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td><strong>{item.name}</strong></td>
      <td>{item.position}</td>
      <td>{item.team}</td>
      <td>
        <span className={`badge badge-soft-${item.active ? 'success' : 'danger'}`}>{item.active ? 'Active' : 'Inactive'}</span>
      </td>
      <td>
        <div className="d-flex gap-3">
          <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditEmployee.open(item); }}><i className="mdi mdi-pencil font-size-18"></i></a>
          <a className={`text-${item.active ? 'warning' : 'success'}`} href="#" title={item.active ? 'Deactivate' : 'Activate'} onClick={(e) => { e.preventDefault(); toggleActive(item.id); }}>
            <i className={`mdi ${item.active ? 'mdi-account-off' : 'mdi-account-check'} font-size-18`}></i>
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <AddEditEmployee
        isOpen={addEditEmployee.isOpen}
        formData={addEditEmployee.formData}
        isSaving={addEditEmployee.isSaving}
        onUpdateFieldHandle={addEditEmployee.onUpdateFieldHandle}
        onClose={addEditEmployee.close}
        onSave={() => addEditEmployee.onSaveHandle(saveItem)}
        teams={teams}
      />

     <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                    <div className="flex-grow-1 w-100 me-md-3">
                  <TableSearch
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search employees..."
                  />
                </div>
                <div className="mt-2 mt-md-0">
                  <AddNewButton handleAddNew={() => addEditEmployee.open()} />
                </div>
                </div>
                </div>
              </div>

              <Table
                columns={columnNames}
                data={paginatedData}
                renderRow={renderRow}
                sortableColumns={sortableColumns}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                pagination={{
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  totalItems
                }}
                emptyState={{
                  icon: 'mdi mdi-account-multiple-outline',
                  message: 'No employees found. Click "Add New" to create one.'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDirectory;