import React, { useEffect } from 'react';
import { useQualityAssuranceSetups } from './useQualityAssuranceSetups';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditQualityAssuranceSetup from '../../../../components/Configuration/optional-add-ons/QualityAssuranceSetup/useAddEditQualityAssuranceSetup';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditQualityAssuranceSetup from '../../../../components/Configuration/optional-add-ons/QualityAssuranceSetup/AddEditQualityAssuranceSetup';

const CHECK_TYPE_BADGE = {
  'Inspection Scoring': 'primary',
  'Service Quality Audit': 'info',
  'Technician Performance Review': 'warning',
  'Customer Satisfaction Check': 'success',
  'Chemical Application Accuracy': 'danger',
  'Route Compliance Check': 'secondary',
  'Documentation Review': 'dark',
  'Equipment Condition Check': 'secondary',
};

const SCORING_BADGE = {
  Percentage: 'primary',
  'Points-Based': 'info',
  'Pass / Fail': 'secondary',
  'Star Rating (1–5)': 'warning',
  'Weighted Criteria': 'dark',
};

const columns = [
  { label: 'Entry Name', accessor: 'name', sortable: true },
  { label: 'Check Type', accessor: 'checkType', sortable: true },
  { label: 'Scoring Method', accessor: 'scoringMethod', sortable: true },
  { label: 'Pass Threshold', accessor: 'passThreshold', sortable: true },
  { label: 'Frequency', accessor: 'frequency', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const QualityAssuranceSetups = () => {
  const { items, saveItem, removeItem } = useQualityAssuranceSetups();
  const addEditQA = useAddEditQualityAssuranceSetup();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Quality Assurance Setup',
      description: 'Define inspection scoring rules or pass/fail criteria.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Optional Add-ons', path: '/configuration/addons' },
        { label: 'Quality Assurance Setup', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'checkType',
    'scoringMethod',
    'frequency',
    'reviewerRole',
    'description',
    'notes',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.description && <div className='text-muted font-size-12'>{item.description}</div>}
      </td>
      <td>
        <span className={`badge badge-soft-${CHECK_TYPE_BADGE[item.checkType] || 'secondary'}`}>{item.checkType || '—'}</span>
      </td>
      <td>
        <span className={`badge badge-soft-${SCORING_BADGE[item.scoringMethod] || 'secondary'}`}>{item.scoringMethod || '—'}</span>
      </td>
      <td>
        {item.passThreshold ? (
          <span className='fw-semibold text-success'>
            {item.passThreshold}
            {item.scoringMethod === 'Points-Based' ? ' pts' : item.scoringMethod === 'Star Rating (1–5)' ? ' / 5' : '%'}
          </span>
        ) : (
          <span className='text-muted'>—</span>
        )}
      </td>
      <td>{item.frequency || <span className='text-muted'>—</span>}</td>
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
              addEditQA.open(item);
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
      <AddEditQualityAssuranceSetup
        isOpen={addEditQA.isOpen}
        formData={addEditQA.formData}
        isSaving={addEditQA.isSaving}
        onUpdateFieldHandle={addEditQA.onUpdateFieldHandle}
        onClose={addEditQA.close}
        onSave={() => addEditQA.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search quality assurance entries...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditQA.open()} />
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
                  icon: 'mdi mdi-shield-star-outline',
                  message: 'No quality assurance entries found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualityAssuranceSetups;
