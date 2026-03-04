import React, { useEffect } from 'react';
import { useInvoiceTemplates } from './useInvoiceTemplates';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditInvoiceTemplate from '../../../../components/Configuration/FinancialAndBilling/InvoiceTemplates/AddEditInvoiceTemplate';
import { useAddEditInvoiceTemplate } from '../../../../components/Configuration/FinancialAndBilling/InvoiceTemplates/useAddEditInvoiceTemplate';

const columns = [
  { label: 'Template Name', accessor: 'templateName', sortable: true },
  { label: 'Numbering Format', accessor: 'numberingFormat', sortable: false },
  { label: 'Default', accessor: 'isDefault', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const InvoiceTemplates = () => {
  const { invoiceTemplates: items, addInvoiceTemplate, editInvoiceTemplate, deleteInvoiceTemplate } = useInvoiceTemplates();

  const saveItem = (item) => {
    if (item.id) {
      editInvoiceTemplate(item.id, item);
    } else {
      addInvoiceTemplate(item);
    }
  };

  const addEditInvoiceTemplate = useAddEditInvoiceTemplate(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Invoice Templates',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Financial & Billing Setup', path: '/configuration' },
        { label: 'Invoice Templates', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['templateName']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'templateName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.templateName}</strong>
      </td>
      <td>{`${item.numberingPrefix || ''}${item.nextNumber}${item.numberingSuffix || ''}`}</td>
      <td>{item.isDefault && <span className='badge bg-primary'>Default</span>}</td>
      <td>
        <span className={`badge badge-soft-${item.active ? 'success' : 'danger'}`}>{item.active ? 'Active' : 'Inactive'}</span>
      </td>
      <td>
        <div className='d-flex gap-3'>
          <a
            className='text-primary'
            href='#'
            title='Edit'
            onClick={(e) => {
              e.preventDefault();
              addEditInvoiceTemplate.open(item);
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
              deleteInvoiceTemplate(item.id);
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
      <AddEditInvoiceTemplate
        isOpen={addEditInvoiceTemplate.isOpen}
        formData={addEditInvoiceTemplate.formData}
        isSaving={addEditInvoiceTemplate.isSaving}
        onUpdateFieldHandle={addEditInvoiceTemplate.onUpdateFieldHandle}
        onClose={addEditInvoiceTemplate.close}
        onSave={addEditInvoiceTemplate.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search invoice templates...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditInvoiceTemplate.open()} />
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
                  icon: 'ri-file-text-line',
                  message: 'No invoice templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplates;
