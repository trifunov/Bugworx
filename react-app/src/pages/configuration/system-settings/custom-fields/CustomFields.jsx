import React, { useEffect } from 'react';
import { useCustomFields } from './useCustomFields';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditCustomField from '../../../../components/Configuration/SystemSettings/CustomFields/AddEditCustomField';

const columns = [
  { label: 'Label', accessor: 'label', sortable: true },
  { label: 'Type', accessor: 'type', sortable: true },
  { label: 'Applies To', accessor: 'applies', sortable: true },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const CustomFields = () => {
  const { items, saveItem, removeItem } = useCustomFields();
  const { addEditCustomField } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Custom Fields',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'System Settings', path: '/configuration/system-settings' },
        { label: 'Custom Fields', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['label', 'type', 'applies']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'label' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.label}</strong>
      </td>
      <td>{item.type}</td>
      <td>
        <span className='badge badge-soft-info'>{item.applies}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditCustomField.open(item);
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
      <AddEditCustomField
        isOpen={addEditCustomField.isOpen}
        formData={addEditCustomField.formData}
        isSaving={addEditCustomField.isSaving}
        onUpdateFieldHandle={addEditCustomField.onUpdateFieldHandle}
        onClose={addEditCustomField.close}
        onSave={() => addEditCustomField.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search custom fields...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditCustomField.open()} />
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
                  icon: 'mdi mdi-form-select',
                  message: 'No custom fields found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomFields;
