import React, { useEffect } from 'react';
import { usePropertyTypeTemplates } from './usePropertyTypeTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditPropertyTypeTemplate from '../../../../components/Configuration/communication/TemplatesAndDefaults/AddEditPropertyTypeTemplate';

const RISK_BADGE = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
  Critical: 'dark',
};

const columns = [
  { label: 'Template Name', accessor: 'name', sortable: true },
  { label: 'Category', accessor: 'category', sortable: true },
  { label: 'Default Frequency', accessor: 'defaultServiceFrequency', sortable: true },
  { label: 'Pest Risk', accessor: 'pestRiskLevel', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const PropertyTypeTemplates = () => {
  const { items, saveItem, removeItem } = usePropertyTypeTemplates();
  const { addEditPropertyTypeTemplate } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Property Type Template',
      description: 'Reusable templates for property types to streamline service address setup',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Property Type Template', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'category',
    'defaultServiceFrequency',
    'pestRiskLevel',
    'description',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.description && <div className='text-muted font-size-12'>{item.description}</div>}
      </td>
      <td>{item.category}</td>
      <td>{item.defaultServiceFrequency}</td>
      <td>
        <span className={`badge badge-soft-${RISK_BADGE[item.pestRiskLevel] || 'secondary'}`}>{item.pestRiskLevel || '—'}</span>
      </td>
      <td>
        <span className={`badge badge-soft-${item.active !== false ? 'success' : 'danger'}`}>{item.active !== false ? 'Active' : 'Inactive'}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditPropertyTypeTemplate.open(item);
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
      <AddEditPropertyTypeTemplate
        isOpen={addEditPropertyTypeTemplate.isOpen}
        formData={addEditPropertyTypeTemplate.formData}
        isSaving={addEditPropertyTypeTemplate.isSaving}
        onUpdateFieldHandle={addEditPropertyTypeTemplate.onUpdateFieldHandle}
        onClose={addEditPropertyTypeTemplate.close}
        onSave={() => addEditPropertyTypeTemplate.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search property type templates...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditPropertyTypeTemplate.open()} />
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
                  icon: 'mdi mdi-home-city-outline',
                  message: 'No property type templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyTypeTemplates;
