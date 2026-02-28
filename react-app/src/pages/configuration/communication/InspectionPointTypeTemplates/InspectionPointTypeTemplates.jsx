import React, { useEffect } from 'react';
import { useInspectionPointTypeTemplates } from './useInspectionPointTypeTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditInspectionPointTypeTemplate from '../../../../components/Configuration/communication/InspectionPointTypeTemplates/useAddEditInspectionPointTypeTemplate';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditInspectionPointTypeTemplate from '../../../../components/Configuration/communication/InspectionPointTypeTemplates/AddEditInspectionPointTypeTemplate';

const METHOD_BADGE = {
  Visual: 'primary',
  'Touch / Probe': 'info',
  'Device / Sensor': 'secondary',
  Trap: 'warning',
  'Sample Collection': 'dark',
  'Camera / Photo Only': 'success',
};

const SEVERITY_BADGE = {
  None: 'secondary',
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
  Critical: 'dark',
};

const RESULT_BADGE = {
  'Pass / Fail': 'primary',
  'Severity Level': 'danger',
  Count: 'info',
  'Score (0–10)': 'warning',
  Measurement: 'secondary',
  'Notes Only': 'light',
};

const ENV_BADGE = {
  Indoor: 'info',
  Outdoor: 'success',
  Both: 'secondary',
};

const columns = [
  { label: 'Type', accessor: 'name', sortable: true },
  { label: 'Code', accessor: 'code', sortable: true },
  { label: 'Parent Category', accessor: 'parentCategory', sortable: true },
  { label: 'Method', accessor: 'inspectionMethod', sortable: true },
  { label: 'Result Type', accessor: 'resultType', sortable: true },
  { label: 'Default Severity', accessor: 'defaultSeverity', sortable: true },
  { label: 'Environment', accessor: 'applicableEnvironment', sortable: false },
  { label: 'Flags', accessor: 'flags', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const InspectionPointTypeTemplates = () => {
  const { items, saveItem, removeItem } = useInspectionPointTypeTemplates();
  const addEditTemplate = useAddEditInspectionPointTypeTemplate();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Inspection Point Type Templates',
      description:
        'Define granular inspection point types linked to categories — specifying inspection methods, result types, severity defaults, documentation requirements, and corrective action guidance for technicians.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Inspection Point Type Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'code',
    'parentCategory',
    'description',
    'inspectionMethod',
    'resultType',
    'defaultSeverity',
    'applicableEnvironment',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const buildFlagBadges = (item) => {
    const flags = [];
    if (item.requiresPhoto) flags.push({ label: 'Photo', color: 'primary' });
    if (item.requiresSignature) flags.push({ label: 'Signature', color: 'info' });
    if (item.requiresMeasurement) flags.push({ label: 'Measurement', color: 'secondary' });
    if (item.triggerFollowUp) flags.push({ label: 'Follow-Up', color: 'danger' });
    return flags;
  };

  const renderRow = (item) => {
    const flags = buildFlagBadges(item);

    return (
      <tr key={item.id}>
        <td>
          <strong>{item.name}</strong>
          {item.description && (
            <div
              className='text-muted font-size-12'
              style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {item.description}
            </div>
          )}
        </td>
        <td>{item.code ? <span className='badge badge-soft-dark font-size-12'>{item.code}</span> : <span className='text-muted'>—</span>}</td>
        <td className='font-size-13'>{item.parentCategory || <span className='text-muted'>—</span>}</td>
        <td>
          <span className={`badge badge-soft-${METHOD_BADGE[item.inspectionMethod] || 'secondary'}`}>{item.inspectionMethod || '—'}</span>
        </td>
        <td>
          <span className={`badge badge-soft-${RESULT_BADGE[item.resultType] || 'secondary'}`}>{item.resultType || '—'}</span>
        </td>
        <td>
          <span className={`badge badge-soft-${SEVERITY_BADGE[item.defaultSeverity] || 'secondary'}`}>{item.defaultSeverity || '—'}</span>
        </td>
        <td>
          <span className={`badge badge-soft-${ENV_BADGE[item.applicableEnvironment] || 'secondary'}`}>{item.applicableEnvironment || '—'}</span>
        </td>
        <td>
          {flags.length > 0 ? (
            <div className='d-flex flex-wrap gap-1'>
              {flags.map((f) => (
                <span key={f.label} className={`badge badge-soft-${f.color} font-size-11`}>
                  {f.label}
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
      <AddEditInspectionPointTypeTemplate
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
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search inspection point type templates...' />
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
                  icon: 'mdi mdi-format-list-bulleted-type',
                  message: 'No inspection point type templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionPointTypeTemplates;
