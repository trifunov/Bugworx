import React, { useEffect } from 'react';
import { useTechnicianFieldFormsChecklists } from './useTechnicianFieldFormsChecklists';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditTechnicianFieldFormsChecklist from '../../../../components/Configuration/communication/TechnicianFieldFormsChecklists/useAddEditTechnicianFieldFormsChecklist';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditTechnicianFieldFormsChecklist from '../../../../components/Configuration/communication/TechnicianFieldFormsChecklists/AddEditTechnicianFieldFormsChecklist';

const FORM_TYPE_BADGE = {
  Checklist: 'primary',
  'Inspection Form': 'info',
  'Service Report': 'secondary',
  'Safety Audit': 'warning',
  'Pre-Service Form': 'success',
  'Post-Service Form': 'success',
  'Quality Assurance Form': 'danger',
};

const columns = [
  { label: 'Form Name', accessor: 'name', sortable: true },
  { label: 'Form Type', accessor: 'formType', sortable: true },
  { label: 'Service Type', accessor: 'serviceType', sortable: true },
  { label: 'Frequency', accessor: 'frequency', sortable: true },
  { label: 'Signature', accessor: 'signatureRequired', sortable: false },
  { label: 'Photo', accessor: 'photoRequired', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const TechnicianFieldFormsChecklists = () => {
  const { items, saveItem, removeItem } = useTechnicianFieldFormsChecklists();
  const addEditForm = useAddEditTechnicianFieldFormsChecklist();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Technician Field Forms / Checklists',
      description:
        'Predefined on-site forms used by technicians during service visits — including inspection checklists, service reports, safety audits, and pre/post-service forms.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Technician Field Forms / Checklists', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'formType',
    'serviceType',
    'frequency',
    'description',
    'version',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.description && (
          <div className='text-muted font-size-12' style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.description}
          </div>
        )}
        {item.version && <div className='text-muted font-size-11'>{item.version}</div>}
      </td>
      <td>
        <span className={`badge badge-soft-${FORM_TYPE_BADGE[item.formType] || 'secondary'}`}>{item.formType || '—'}</span>
      </td>
      <td>{item.serviceType || '—'}</td>
      <td>{item.frequency || '—'}</td>
      <td>
        {item.signatureRequired ? (
          <span className='badge badge-soft-warning'>
            <i className='ri-pen-nib-line me-1' />
            Yes
          </span>
        ) : (
          <span className='text-muted font-size-12'>No</span>
        )}
      </td>
      <td>
        {item.photoRequired ? (
          <span className='badge badge-soft-info'>
            <i className='ri-image-line me-1' />
            Yes
          </span>
        ) : (
          <span className='text-muted font-size-12'>No</span>
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
              addEditForm.open(item);
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
      <AddEditTechnicianFieldFormsChecklist
        isOpen={addEditForm.isOpen}
        formData={addEditForm.formData}
        isSaving={addEditForm.isSaving}
        onUpdateFieldHandle={addEditForm.onUpdateFieldHandle}
        onClose={addEditForm.close}
        onSave={() => addEditForm.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search technician field forms & checklists...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditForm.open()} />
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
                  icon: 'mdi mdi-clipboard-list-outline',
                  message: 'No field forms or checklists found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechnicianFieldFormsChecklists;
