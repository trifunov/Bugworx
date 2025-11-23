import React, { useEffect } from 'react';
import { useTeamsBranches } from './useTeamBranches';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { EditableFormProvider, useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditTeam from '../../../../components/Configuration/TeamBranches/AddEditTeam';

const columns = [
    { label: 'Name', accessor: 'name', sortable: true },
    { label: 'Region', accessor: 'region', sortable: true },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const TeamsBranches = () => {
  const { items, saveItem, removeItem } = useTeamsBranches();
  const { addEditTeam } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
        title: 'Teams & Branches',
        breadcrumbs: [
            { label: 'Configuration', path: '/configuration' },
            { label: 'User & Access Control', path: '/configuration/user-access' },
            { label: 'Teams & Branches', active: true },
        ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'region']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td><strong>{item.name}</strong></td>
      <td>{item.region}</td>
      <td>
        <div className="d-flex gap-3">
          <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditTeam.open(item); }}><i className="mdi mdi-pencil font-size-18"></i></a>
          <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); removeItem(item.id); }}><i className="mdi mdi-delete font-size-18"></i></a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <AddEditTeam
        isOpen={addEditTeam.isOpen}
        formData={addEditTeam.formData}
        isSaving={addEditTeam.isSaving}
        onUpdateFieldHandle={addEditTeam.onUpdateFieldHandle}
        onClose={addEditTeam.close}
        onSave={() => addEditTeam.onSaveHandle(saveItem)}
      />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <TableSearch
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search teams or regions..."
                  />
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <AddNewButton handleAddNew={() => addEditTeam.open()} />
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
                  totalItems: tableProps.totalItems
                }}
                emptyState={{
                  icon: 'mdi mdi-account-group-outline',
                  message: 'No teams or branches found. Click "Add New" to create one.'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsBranches;