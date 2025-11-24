import React, { useEffect } from 'react';
import { useRolesPermissions } from './useRolesPermissions';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditRole from '../../../../components/RolesPermissions/AddEditRole';

const columns = [
    { label: 'Role', accessor: 'name', sortable: true },
    { label: 'Permissions', accessor: 'permissions', sortable: false },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const RolesPermissions = () => {
  const { roles, handleSave, removeRole } = useRolesPermissions();
  const { addEditRole } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
        title: 'Roles & Permissions',
        breadcrumbs: [
            { label: 'Configuration', path: '/configuration' },
            { label: 'User & Access Control', path: '/configuration/user-access' },
            { label: 'Roles & Permissions', active: true },
        ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(roles, ['name']);
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

  const renderRow = (role) => (
    <tr key={role.id}>
      <td><strong>{role.name}</strong></td>
      <td>
        <div style={{ maxWidth: '500px', whiteSpace: 'normal' }}>
            {(role.permissions || []).map(p => <span key={p} className="badge badge-soft-info me-1">{p}</span>)}
        </div>
      </td>
      <td>
        <div className="d-flex gap-3">
          <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditRole.open(role); }}><i className="mdi mdi-pencil font-size-18"></i></a>
          <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); removeRole(role.id); }}><i className="mdi mdi-delete font-size-18"></i></a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <AddEditRole
        isOpen={addEditRole.isOpen}
        formData={addEditRole.formData}
        isSaving={addEditRole.isSaving}
        onUpdateFieldHandle={addEditRole.onUpdateFieldHandle}
        onClose={addEditRole.close}
        onSave={() => addEditRole.onSaveHandle(handleSave)}
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
                    placeholder="Search roles..."
                  />
                </div>
                <div className="mt-2 mt-md-0">
                  <AddNewButton handleAddNew={() => addEditRole.open()} />
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
                  icon: 'mdi mdi-lock-outline',
                  message: 'No roles found. Click "Add New" to create one.'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolesPermissions;