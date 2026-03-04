import React, { useEffect } from 'react';
import { useInspectionPointCategoryTemplates } from './useInspectionPointCategoryTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditInspectionPointCategoryTemplate from '../../../../components/Configuration/communication/InspectionPointCategoryTemplates/useAddEditInspectionPointCategoryTemplate';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditInspectionPointCategoryTemplate from '../../../../components/Configuration/communication/InspectionPointCategoryTemplates/AddEditInspectionPointCategoryTemplate';

const RISK_BADGE = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
  Critical: 'dark',
};

const INSPECTION_TYPE_BADGE = {
  Interior: 'primary',
  Exterior: 'info',
  Both: 'secondary',
};

const columns = [
  { label: 'Category', accessor: 'name', sortable: true },
  { label: 'Code', accessor: 'code', sortable: true },
  { label: 'Inspection Type', accessor: 'inspectionType', sortable: true },
  { label: 'Default Risk', accessor: 'defaultRiskLevel', sortable: true },
  { label: 'Frequency', accessor: 'defaultFrequency', sortable: true },
  { label: 'Pest Types', accessor: 'applicablePestTypes', sortable: false },
  { label: 'Documentation', accessor: 'documentation', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const InspectionPointCategoryTemplates = () => {
  const { items, saveItem, removeItem } = useInspectionPointCategoryTemplates();
  const addEditTemplate = useAddEditInspectionPointCategoryTemplate();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Inspection Point Category Templates',
      description:
        'Define reusable inspection point categories that organise what technicians inspect on each visit — including applicable pest types, risk levels, documentation requirements, and technical guidance notes.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Inspection Point Category Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'code',
    'description',
    'inspectionType',
    'defaultRiskLevel',
    'applicablePestTypes',
    'defaultFrequency',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const buildDocsBadges = (item) => {
    const docs = [];
    if (item.requiresPhoto) docs.push({ label: 'Photo', color: 'primary' });
    if (item.requiresSignature) docs.push({ label: 'Signature', color: 'info' });
    if (item.requiresWrittenReport) docs.push({ label: 'Report', color: 'warning' });
    if (item.requiresMeasurement) docs.push({ label: 'Measurement', color: 'secondary' });
    return docs;
  };

  const renderRow = (item) => {
    const pestList = item.applicablePestTypes
      ? item.applicablePestTypes
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const docs = buildDocsBadges(item);

    return (
      <tr key={item.id}>
        <td>
          <strong>{item.name}</strong>
          {item.description && (
            <div
              className='text-muted font-size-12'
              style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {item.description}
            </div>
          )}
        </td>
        <td>{item.code ? <span className='badge badge-soft-dark font-size-12'>{item.code}</span> : <span className='text-muted'>—</span>}</td>
        <td>
          <span className={`badge badge-soft-${INSPECTION_TYPE_BADGE[item.inspectionType] || 'secondary'}`}>{item.inspectionType || '—'}</span>
        </td>
        <td>
          <span className={`badge badge-soft-${RISK_BADGE[item.defaultRiskLevel] || 'secondary'}`}>{item.defaultRiskLevel || '—'}</span>
        </td>
        <td className='font-size-13'>{item.defaultFrequency || '—'}</td>
        <td>
          {pestList.length > 0 ? (
            <div className='d-flex flex-wrap gap-1'>
              {pestList.slice(0, 3).map((p) => (
                <span key={p} className='badge badge-soft-secondary font-size-11'>
                  {p}
                </span>
              ))}
              {pestList.length > 3 && (
                <span className='badge badge-soft-secondary font-size-11' title={pestList.slice(3).join(', ')}>
                  +{pestList.length - 3}
                </span>
              )}
            </div>
          ) : (
            <span className='text-muted'>—</span>
          )}
        </td>
        <td>
          {docs.length > 0 ? (
            <div className='d-flex flex-wrap gap-1'>
              {docs.map((d) => (
                <span key={d.label} className={`badge badge-soft-${d.color} font-size-11`}>
                  {d.label}
                </span>
              ))}
            </div>
          ) : (
            <span className='text-muted'>—</span>
          )}
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
                addEditTemplate.open(item);
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
  };

  return (
    <>
      <AddEditInspectionPointCategoryTemplate
        isOpen={addEditTemplate.isOpen}
        formData={addEditTemplate.formData}
        isSaving={addEditTemplate.isSaving}
        onUpdateFieldHandle={addEditTemplate.onUpdateFieldHandle}
        onClose={addEditTemplate.close}
        onSave={() => addEditTemplate.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search inspection point category templates...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditTemplate.open()} />
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
                  icon: 'mdi mdi-tag-multiple-outline',
                  message: 'No inspection point category templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionPointCategoryTemplates;
