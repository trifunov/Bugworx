import React, { useEffect } from 'react';
import { useProposalTemplates } from './useProposalTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditProposalTemplate from '../../../../components/Configuration/communication/ProposalTemplates/useAddEditProposalTemplate';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditProposalTemplates from '../../../../components/Configuration/communication/ProposalTemplates/AddEditProposalTemplates';

const PROPOSAL_TYPE_BADGE = {
  Standard: 'primary',
  Recurring: 'info',
  'One-Time': 'secondary',
  'Contract Renewal': 'warning',
  'Upsell / Add-on': 'success',
  Emergency: 'danger',
};

const APPROVAL_BADGE = {
  None: 'secondary',
  'Manager Approval': 'info',
  'Senior Manager Approval': 'warning',
  'Client Signature Required': 'primary',
  'Internal + Client Approval': 'danger',
};

const columns = [
  { label: 'Template Name', accessor: 'name', sortable: true },
  { label: 'Proposal Type', accessor: 'proposalType', sortable: true },
  { label: 'Pricing Format', accessor: 'pricingFormat', sortable: true },
  { label: 'Validity', accessor: 'validityPeriod', sortable: true },
  { label: 'Approval Workflow', accessor: 'approvalWorkflow', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const ProposalTemplates = () => {
  const { items, saveItem, removeItem } = useProposalTemplates();
  const addEditProposalTemplate = useAddEditProposalTemplate();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Proposal Templates',
      description:
        'Used when creating quotes, offers, or program proposals for clients — including predefined text blocks, standard pricing format, default disclaimers or terms, and approval workflow options.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Proposal Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'proposalType',
    'pricingFormat',
    'approvalWorkflow',
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
        <span className={`badge badge-soft-${PROPOSAL_TYPE_BADGE[item.proposalType] || 'secondary'}`}>{item.proposalType || '—'}</span>
      </td>
      <td>{item.pricingFormat || '—'}</td>
      <td>{item.validityPeriod || '—'}</td>
      <td>
        <span className={`badge badge-soft-${APPROVAL_BADGE[item.approvalWorkflow] || 'secondary'}`}>{item.approvalWorkflow || 'None'}</span>
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
              addEditProposalTemplate.open(item);
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
      <AddEditProposalTemplates
        isOpen={addEditProposalTemplate.isOpen}
        formData={addEditProposalTemplate.formData}
        isSaving={addEditProposalTemplate.isSaving}
        onUpdateFieldHandle={addEditProposalTemplate.onUpdateFieldHandle}
        onClose={addEditProposalTemplate.close}
        onSave={() => addEditProposalTemplate.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search proposal templates...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditProposalTemplate.open()} />
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
                  icon: 'mdi mdi-file-sign',
                  message: 'No proposal templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalTemplates;
