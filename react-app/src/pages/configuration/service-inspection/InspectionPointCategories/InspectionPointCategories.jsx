import React, { useEffect } from 'react';
import { useInspectionPointCategories } from './useInspectionPointCategories';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { EditableFormProvider, useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditInspectionPointCategory from '../../../../components/Configuration/ServiceInspection/InspectionPointCategories/AddEditInspectionPointCategory';

const columns = [
    { label: 'Category Name', accessor: 'name', sortable: true },
    { label: 'Description', accessor: 'description', sortable: false },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const InspectionPointCategories = () => {
  const { items, saveItem, removeItem } = useInspectionPointCategories();
  const { addEditInspectionPointCategory } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
        title: 'Inspection Point Categories',
        breadcrumbs: [
            { label: 'Configuration', path: '/configuration' },
            { label: 'Service Inspection', path: '/configuration/service-inspection' },
            { label: 'Inspection Point Categories', active: true },
        ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'description']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td><strong>{item.name}</strong></td>
      <td>{item.description}</td>
      <td>
        <div className="d-flex gap-3">
          <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditInspectionPointCategory.open(item); }}><i className="mdi mdi-pencil font-size-18"></i></a>
          <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); removeItem(item.id); }}><i className="mdi mdi-delete font-size-18"></i></a>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <AddEditInspectionPointCategory
        isOpen={addEditInspectionPointCategory.isOpen}
        formData={addEditInspectionPointCategory.formData}
        isSaving={addEditInspectionPointCategory.isSaving}
        onUpdateFieldHandle={addEditInspectionPointCategory.onUpdateFieldHandle}
        onClose={addEditInspectionPointCategory.close}
        onSave={() => addEditInspectionPointCategory.onSaveHandle(saveItem)}
      />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
                 <div className="row mb-3">
                                <div className="col-12">
                                     <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                                        <div className="flex-grow-1 w-100 me-md-3">
                  <TableSearch
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search categories..."
                  />
                </div>
                <div className="mt-2 mt-md-0">
                  <AddNewButton handleAddNew={() => addEditInspectionPointCategory.open()} />
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
                  totalItems: tableProps.totalItems
                }}
                emptyState={{
                  icon: 'mdi mdi-format-list-bulleted-type',
                  message: 'No inspection point categories found. Click "Add New" to create one.'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionPointCategories;