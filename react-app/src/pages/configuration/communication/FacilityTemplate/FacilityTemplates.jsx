import React, { useEffect } from 'react';
import { useFacilityTemplates } from './useFacilityTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditFacilityTemplate from '../../../../components/Configuration/communication/FacilityTemplate/useAddEditFacilityTemplate';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditFacilityTemplate from '../../../../components/Configuration/communication/FacilityTemplate/AddEditFacilityTemplate';

const RISK_BADGE = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
  Critical: 'dark',
};

const FACILITY_TYPE_BADGE = {
  Commercial: 'primary',
  Residential: 'info',
  Industrial: 'secondary',
  'Government / Municipal': 'warning',
  Healthcare: 'danger',
  Educational: 'success',
  Hospitality: 'primary',
  Other: 'secondary',
};

const columns = [
  { label: 'Template Name', accessor: 'name', sortable: true },
  { label: 'Facility Type', accessor: 'facilityType', sortable: true },
  { label: 'Industry', accessor: 'industryCategory', sortable: true },
  { label: 'Risk Level', accessor: 'riskLevel', sortable: true },
  { label: 'Inspection Freq.', accessor: 'inspectionFrequency', sortable: true },
  { label: 'Pest Targets', accessor: 'defaultPestTargets', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const FacilityTemplates = () => {
  const { items, saveItem, removeItem } = useFacilityTemplates();
  const addEditTemplate = useAddEditFacilityTemplate();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Facility Templates',
      description:
        'Pre-configured facility profiles that define default inspection areas, pest targets, service types, risk levels, and compliance requirements for different facility categories.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Facility Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'facilityType',
    'industryCategory',
    'riskLevel',
    'inspectionFrequency',
    'defaultPestTargets',
    'description',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => {
    const pestList = item.defaultPestTargets
      ? item.defaultPestTargets
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    return (
      <tr key={item.id}>
        <td>
          <strong>{item.name}</strong>
          {item.description && (
            <div
              className='text-muted font-size-12'
              style={{ maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {item.description}
            </div>
          )}
        </td>
        <td>
          <span className={`badge badge-soft-${FACILITY_TYPE_BADGE[item.facilityType] || 'secondary'}`}>{item.facilityType || '—'}</span>
        </td>
        <td>{item.industryCategory || '—'}</td>
        <td>
          <span className={`badge badge-soft-${RISK_BADGE[item.riskLevel] || 'secondary'}`}>{item.riskLevel || '—'}</span>
        </td>
        <td>{item.inspectionFrequency || '—'}</td>
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
      <AddEditFacilityTemplate
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
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search facility templates...' />
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
                  icon: 'mdi mdi-office-building-outline',
                  message: 'No facility templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacilityTemplates;
