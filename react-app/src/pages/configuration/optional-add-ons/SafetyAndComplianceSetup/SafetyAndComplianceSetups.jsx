import React, { useEffect } from 'react';
import { useSafetyAndComplianceSetups } from './useSafetyAndComplianceSetups';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditSafetyAndComplianceSetup from '../../../../components/Configuration/OptionalAddOns/SafetyAndComplianceSetup/useAddEditSafetyAndComplianceSetup';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditSafetyAndComplianceSetup from '../../../../components/Configuration/OptionalAddOns/SafetyAndComplianceSetup/AddEditSafetyAndComplianceSetup';

const COMPLIANCE_TYPE_BADGE = {
  'Chemical/Pesticide Safety': 'danger',
  'PPE Requirements': 'warning',
  'Site Safety': 'info',
  'Emergency Procedures': 'dark',
  'Regulatory Compliance': 'primary',
  'Environmental Safety': 'success',
  'Biological Hazard': 'danger',
  Other: 'secondary',
};

const HAZARD_BADGE = {
  None: 'secondary',
  Flammable: 'warning',
  Toxic: 'danger',
  Corrosive: 'info',
  Irritant: 'warning',
  'Environmental Hazard': 'success',
  Biohazard: 'danger',
  Oxidizer: 'warning',
  Explosive: 'dark',
};

const columns = [
  { label: 'Entry Name', accessor: 'name', sortable: true },
  { label: 'Compliance Type', accessor: 'complianceType', sortable: true },
  { label: 'Hazard Code(s)', accessor: 'hazardCode', sortable: false },
  { label: 'Hazard Classification', accessor: 'hazardClassification', sortable: true },
  { label: 'Review Date', accessor: 'reviewDate', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const SafetyAndComplianceSetups = () => {
  const { items, saveItem, removeItem } = useSafetyAndComplianceSetups();
  const addEditSafetyCompliance = useAddEditSafetyAndComplianceSetup();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Safety & Compliance Setup',
      description: 'MSDS links, hazard codes, safety instructions',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Optional Add-ons', path: '/configuration/addons/optional-add-ons' },
        { label: 'Safety & Compliance Setup', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'complianceType',
    'hazardCode',
    'hazardClassification',
    'regulatoryReference',
    'notes',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.applicableMaterials && <div className='text-muted font-size-12'>{item.applicableMaterials}</div>}
      </td>
      <td>
        <span className={`badge badge-soft-${COMPLIANCE_TYPE_BADGE[item.complianceType] || 'secondary'}`}>{item.complianceType || '—'}</span>
      </td>
      <td>{item.hazardCode ? <code className='font-size-12'>{item.hazardCode}</code> : <span className='text-muted'>—</span>}</td>
      <td>
        <span className={`badge badge-soft-${HAZARD_BADGE[item.hazardClassification] || 'secondary'}`}>{item.hazardClassification || 'None'}</span>
      </td>
      <td>{item.reviewDate || <span className='text-muted'>—</span>}</td>
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
              addEditSafetyCompliance.open(item);
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
      <AddEditSafetyAndComplianceSetup
        isOpen={addEditSafetyCompliance.isOpen}
        formData={addEditSafetyCompliance.formData}
        isSaving={addEditSafetyCompliance.isSaving}
        onUpdateFieldHandle={addEditSafetyCompliance.onUpdateFieldHandle}
        onClose={addEditSafetyCompliance.close}
        onSave={() => addEditSafetyCompliance.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search safety & compliance entries...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditSafetyCompliance.open()} />
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
                  icon: 'mdi mdi-shield-check-outline',
                  message: 'No safety & compliance entries found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SafetyAndComplianceSetups;
