import { useEffect } from 'react';
import { useUsers } from './useUsers';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { EditableFormProvider, useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from "../../../../components/Common/Table/useTable";
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from "../../../../components/Common/SearchBar/useTableSearch";
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditUser from '../../../../components/Users/AddEditUser';

// Column definitions for the reusable Table component
const columns = [
    { label: 'Username', accessor: 'username', sortable: true },
    { label: 'Email', accessor: 'email', sortable: true },
    { label: 'Role', accessor: 'role', sortable: true },
    { label: 'Status', accessor: 'active', sortable: false },
    { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const UsersComponent = () => {
   const {
    users,
    roles,
    handleSave,
    toggleActive,
    removeUser,
  } = useUsers();

 const {addEditUser} = useEditableFormContext();

    // Search filter for service addresses
  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(
    users,
    ['username', 'email', 'role']
  );


  const {
    data: paginatedData,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems
  } = useTable(filteredItems, {
    defaultSortField: 'username',
    defaultSortDirection: 'asc',
    pageSize: 5
  });

  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
        title: 'Users & Roles',
        breadcrumbs: [
            { label: 'Configuration', path: '/configuration' },
            { label: 'User & Access Control', path: '/configuration/user-access' },
            { label: 'Users', active: true },
        ],
    });
  }, [setPageSubHeader]);

  const renderRow = (user) => (
    <tr key={user.id}>
      <td><strong>{user.username}</strong></td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <span className={`badge badge-soft-${user.active ? 'success' : 'danger'}`}>
          {user.active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td>
        <div className="d-flex gap-3">
          <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditUser.open(user); }}><i className="mdi mdi-pencil font-size-18"></i></a>
          <a className={`text-${user.active ? 'warning' : 'success'}`} href="#" title={user.active ? 'Deactivate' : 'Activate'} onClick={(e) => { e.preventDefault(); toggleActive(user.id); }}>
            <i className={`mdi ${user.active ? 'mdi-account-off' : 'mdi-account-check'} font-size-18`}></i>
          </a>
          <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); removeUser(user.id); }}><i className="mdi mdi-delete font-size-18"></i></a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
       <AddEditUser
        isOpen={addEditUser.isOpen}
        formData={addEditUser.formData}
        isSaving={addEditUser.isSaving}
        onUpdateFieldHandle={addEditUser.onUpdateFieldHandle}
        onClose={addEditUser.close}
        onSave={() => addEditUser.onSaveHandle(handleSave)}
        roles={roles}
      />

      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="page-title-right">
         
            </div>
          </div>
        </div>
      </div>

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
                          placeholder="Search users..."
                      />
                    </div>
                    <div className="mt-2 mt-md-0">
                      <AddNewButton handleAddNew={() => addEditUser.open()} />
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
                  icon: 'mdi mdi-account-group-outline',
                  message: 'No users found. Click "Add New" to create one.'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Users = () => (
  <EditableFormProvider>
    <UsersComponent />
  </EditableFormProvider>
);

export default Users;