// filepath: [InvoiceDetails.jsx](http://_vscodecontentref_/0)
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageSubHeader } from '../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../contexts/EditableFormContext';
import useInvoice from '../../hooks/useInvoice';
import AddEditLineItem from '../../components/CustomerInvoices/AddEditLineItem';
import AddNewButton from '../../components/Common/AddNewButton';
import Table from '../../components/Common/Table/Table';
import useTable from '../../components/Common/Table/useTable';
import useTableSearch from '../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../components/Common/SearchBar/TableSearch';

const lineItemColumnsConfig = [
  { label: 'Description', accessor: 'description', sortable: true },
  { label: 'Qty', accessor: 'quantity', sortable: true },
  { label: 'Unit Price', accessor: 'unitPrice', sortable: true },
  { label: 'Total', accessor: 'total', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const lineItemColumnNames = lineItemColumnsConfig.map((c) => c.label);
const lineItemSortableColumns = lineItemColumnsConfig.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const InvoiceDetails = () => {
  const { id: customerId, invoiceId } = useParams();
  const { setPageSubHeader } = usePageSubHeader();
  const { addEditLineItem } = useEditableFormContext();
  const {
    invoice,
    customer,
    loading,
    handleSaveAndExit,
    handleFieldChange,
    formatCurrency,
    formatAddress,
    addLineItem,
    updateLineItem,
    removeLineItem,
    handleCancel,
  } = useInvoice(invoiceId, customerId);

  const isNewInvoice = invoiceId === 'new';

  const { filteredItems: filteredLineItems, searchTerm, setSearchTerm } = useTableSearch(invoice?.items || [], ['description']);

  const { data: paginatedLineItems, ...lineItemTableProps } = useTable(filteredLineItems, {
    defaultSortField: 'description',
    itemsPerPage: 5,
  });

  const handleSaveItem = (itemData) => {
    if (itemData.id) {
      updateLineItem(itemData);
    } else {
      addLineItem(itemData);
    }
  };

  useEffect(() => {
    if (customer && invoice) {
      setPageSubHeader({
        title: isNewInvoice ? 'Create Invoice' : `Invoice ${invoice.id}`,
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${customerId}` },
          { label: 'Invoices', path: `/customers/${customerId}/invoices` },
          { label: isNewInvoice ? 'Create' : invoice.id },
        ],
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, invoice, customerId, isNewInvoice]);

  const renderLineItemRow = (item) => (
    <tr key={item.id}>
      <td>{item.description}</td>
      <td>{item.quantity}</td>
      <td>{formatCurrency(item.unitPrice)}</td>
      <td className='text-end'>{formatCurrency(item.quantity * item.unitPrice)}</td>
      <td className='text-end'>
        <div className='d-flex gap-2 justify-content-end'>
          <button className='btn btn-sm btn-soft-primary' onClick={() => addEditLineItem.open(item)}>
            <i className='mdi mdi-pencil font-size-16'></i>
          </button>
          <button className='btn btn-sm btn-soft-danger' onClick={() => removeLineItem(item.id)}>
            <i className='mdi mdi-delete font-size-16'></i>
          </button>
        </div>
      </td>
    </tr>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice || !customer) {
    return <div>Invoice or Customer not found.</div>;
  }

  return (
    <>
      <div className='row align-items-stretch'>
        {/* Customer & Billing Details */}
        <div className='col-lg-8'>
          <div className='card h-100'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Customer & Billing Details</h5>
            </div>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-4 mb-3'>
                  <label className='form-label'>Customer</label>
                  <p className='form-control-plaintext'>{customer.name}</p>
                </div>
                <div className='col-md-4 mb-3'>
                  <label className='form-label'>Customer #</label>
                  <p className='form-control-plaintext'>{customer.customerNum}</p>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='invoice-type' className='form-label'>
                    Invoice Type
                  </label>
                  <select
                    id='invoice-type'
                    className='form-select'
                    value={invoice.invoiceType || 'Standard'}
                    onChange={(e) => handleFieldChange('invoiceType', e.target.value)}
                  >
                    <option>Standard</option>
                    <option>Recurring</option>
                    <option>Proforma</option>
                    <option>Final</option>
                    <option>Retainer</option>
                  </select>
                </div>
                <div className='col-md-8 mb-3'>
                  <label className='form-label'>Billing Address</label>
                  <p className='form-control-plaintext'>{formatAddress(customer.billingAddress)}</p>
                </div>
                <div className='col-md-4 mb-3'>
                  <label className='form-label'>Invoice #</label>
                  <p className='form-control-plaintext'>{invoice.id}</p>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='invoice-date' className='form-label'>
                    Invoice Date
                  </label>
                  <input
                    type='date'
                    id='invoice-date'
                    className='form-control'
                    value={invoice.date}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                  />
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='due-date' className='form-label'>
                    Due Date
                  </label>
                  <input
                    type='date'
                    id='due-date'
                    className='form-control'
                    value={invoice.dueDate}
                    onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                  />
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='invoice-status' className='form-label'>
                    Status
                  </label>
                  <select
                    id='invoice-status'
                    className='form-select'
                    value={invoice.status}
                    onChange={(e) => handleFieldChange('status', e.target.value)}
                  >
                    <option>Draft</option>
                    <option>Sent</option>
                    <option>Paid</option>
                    <option>Overdue</option>
                    <option>Void</option>
                  </select>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='po-number' className='form-label'>
                    P.O. Number
                  </label>
                  <input
                    type='text'
                    id='po-number'
                    className='form-control'
                    value={invoice.poNumber}
                    onChange={(e) => handleFieldChange('poNumber', e.target.value)}
                  />
                </div>
                <div className='col-md-8 mb-3'>
                  <label htmlFor='notes' className='form-label'>
                    Notes
                  </label>
                  <textarea
                    type='text'
                    id='notes'
                    className='form-control'
                    value={invoice.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary & Actions Column */}
        <div className='col-lg-4'>
          {/* Summary Card */}
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Summary</h5>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-sm table-borderless mb-0'>
                  <tbody>
                    <tr>
                      <td>Sub Total :</td>
                      <td className='text-end'>{formatCurrency(invoice.subtotal)}</td>
                    </tr>
                    <tr>
                      <td>Estimated Tax (10%) :</td>
                      <td className='text-end'>{formatCurrency(invoice.tax)}</td>
                    </tr>
                    <tr className='border-top'>
                      <th scope='row'>Total :</th>
                      <td className='text-end fw-bold'>{formatCurrency(invoice.total)}</td>
                    </tr>
                    <tr>
                      <td>Amount Paid :</td>
                      <td className='text-end'>{formatCurrency(invoice.amountPaid)}</td>
                    </tr>
                    <tr className='border-top'>
                      <th scope='row'>Balance Due :</th>
                      <td className='text-end fw-bold'>{formatCurrency(invoice.balanceDue)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className='card'>
            <div className='card-header'>
              <h5 className='card-title mb-0'>Actions</h5>
            </div>
            <div className='card-body'>
              <div className='d-grid gap-2'>
                <button className='btn btn-primary' onClick={() => alert('Add Payment clicked')}>
                  Add Payment
                </button>
                <button className='btn btn-success' onClick={() => window.print()}>
                  Print
                </button>
                <button className='btn btn-info' onClick={() => alert('Email clicked')}>
                  Email
                </button>
                <button className='btn btn-secondary' onClick={() => alert('Download PDF clicked')}>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className='card mt-4'>
        <div className='card-header d-flex flex-wrap justify-content-between align-items-center gap-2'>
          <h5 className='card-title mb-0'>Line Items</h5>
        </div>
        <div className='card-body'>
          <div className='row mb-3'>
            <div className='col-12'>
              <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                <div className='flex-grow-1 w-100 me-md-3'>
                  <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search items...' />
                </div>
                <div className='mt-2 mt-md-0'>
                  <AddNewButton handleAddNew={() => addEditLineItem.open()} buttonText='Add Item' />
                </div>
              </div>
            </div>
          </div>
          <Table
            columns={lineItemColumnNames}
            data={paginatedLineItems}
            renderRow={renderLineItemRow}
            sortableColumns={lineItemSortableColumns}
            onSort={lineItemTableProps.handleSort}
            sortField={lineItemTableProps.sortField}
            sortDirection={lineItemTableProps.sortDirection}
            pagination={{
              currentPage: lineItemTableProps.currentPage,
              totalPages: lineItemTableProps.totalPages,
              onPageChange: lineItemTableProps.setCurrentPage,
            }}
            emptyState={{
              message: 'No line items have been added yet.',
            }}
          />
        </div>
      </div>

      {/* Page Actions */}
      <div className='d-flex justify-content-end gap-2 mt-4'>
        <button type='button' className='btn btn-secondary' onClick={handleCancel}>
          Cancel
        </button>
        <button type='button' className='btn btn-primary' onClick={handleSaveAndExit}>
          {isNewInvoice ? 'Create Invoice' : 'Save Changes'}
        </button>
      </div>

      <AddEditLineItem
        isOpen={addEditLineItem.isOpen}
        formData={addEditLineItem.formData}
        onClose={addEditLineItem.close}
        onUpdateField={addEditLineItem.onUpdateFieldHandle}
        onSave={() => addEditLineItem.onSaveHandle(handleSaveItem)}
      />
    </>
  );
};

export default InvoiceDetails;
