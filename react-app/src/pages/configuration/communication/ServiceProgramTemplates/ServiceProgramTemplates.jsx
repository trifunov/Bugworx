import React, { useEffect } from 'react';
import { useServiceProgramTemplates } from './useServiceProgramTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditServiceProgramTemplate from '../../../../components/Configuration/communication/ServiceProgramTemplates/AddEditServiceProgramTemplate';

const SERVICE_TYPE_BADGE = {
  Inspection: 'info',
  Treatment: 'warning',
  Maintenance: 'primary',
  General: 'secondary',
  'Re-treatment': 'danger',
  'Follow-up': 'success',
};

const columns = [
  { label: 'Template Name', accessor: 'name', sortable: true },
  { label: 'Service Type', accessor: 'serviceType', sortable: true },
  { label: 'Duration', accessor: 'standardDuration', sortable: true },
  { label: 'Technician Role', accessor: 'technicianRole', sortable: true },
  { label: 'Property Types', accessor: 'applicablePropertyTypes', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const ServiceProgramTemplates = () => {
  const { items, saveItem, removeItem } = useServiceProgramTemplates();
  const { addEditServiceProgramTemplate } = useEditableFormContext();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Service / Program Templates',
      description:
        'Predefined templates for service types (inspection, treatment, maintenance) — including default checklist items, standard duration, required tools/materials, and technician role assignment.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Service / Program Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'serviceType',
    'technicianRole',
    'pestTypesCovered',
    'applicablePropertyTypes',
    'description',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.description && <div className='text-muted font-size-12'>{item.description}</div>}
      </td>
      <td>
        <span className={`badge badge-soft-${SERVICE_TYPE_BADGE[item.serviceType] || 'secondary'}`}>{item.serviceType || '—'}</span>
      </td>
      <td>
        {item.standardDuration ? (
          <span>
            {item.standardDuration} {item.standardDurationUnit || 'minutes'}
          </span>
        ) : (
          '—'
        )}
      </td>
      <td>{item.technicianRole || '—'}</td>
      <td>{item.applicablePropertyTypes ? <span className='text-muted font-size-12'>{item.applicablePropertyTypes}</span> : '—'}</td>
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
              addEditServiceProgramTemplate.open(item);
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
      <AddEditServiceProgramTemplate
        isOpen={addEditServiceProgramTemplate.isOpen}
        formData={addEditServiceProgramTemplate.formData}
        isSaving={addEditServiceProgramTemplate.isSaving}
        onUpdateFieldHandle={addEditServiceProgramTemplate.onUpdateFieldHandle}
        onClose={addEditServiceProgramTemplate.close}
        onSave={() => addEditServiceProgramTemplate.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search service / program templates...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditServiceProgramTemplate.open()} />
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
                  icon: 'mdi mdi-file-document-multiple-outline',
                  message: 'No service / program templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceProgramTemplates;
