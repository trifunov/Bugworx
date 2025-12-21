import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useCustomerData from '../../hooks/useCustomerData';
import { usePageSubHeader } from '../../contexts/PageSubHeaderContext';
import TableSearch from '../../components/Common/SearchBar/TableSearch';
import AddNewButton from '../../components/Common/AddNewButton';
import { getInvoices } from '../../utils/localStorage';
import useTable from '../../components/Common/Table/useTable';
import useTableSearch from '../../components/Common/SearchBar/useTableSearch';
import Table from '../../components/Common/Table/Table';

const columnsConfig = [
  { label: 'Invoice #', accessor: 'id', sortable: true },
  { label: 'Date', accessor: 'date', sortable: true },
  { label: 'Amount', accessor: 'total', sortable: true },
  { label: 'Status', accessor: 'status', sortable: true },
  { label: 'Due Date', accessor: 'dueDate', sortable: true },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columnsConfig.map((c) => c.label);
const sortableColumns = columnsConfig.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const CustomerInvoices = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id: customerId } = useParams();
  const navigate = useNavigate();
  const { customer } = useCustomerData(customerId);

  const allInvoices = getInvoices().filter((inv) => inv.customerId === parseInt(customerId, 10));

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(allInvoices, ['id', 'status', 'date']);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, {
    defaultSortField: 'date',
    defaultSortDirection: 'desc',
    itemsPerPage: 10,
  });

  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: 'Invoices',
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerNum, path: `/customers/${customerId}` },
          { label: 'Invoices' },
        ],
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, customerId]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return 'badge-soft-success';
      case 'Overdue':
        return 'badge-soft-danger';
      case 'Sent':
        return 'badge-soft-warning';
      case 'Draft':
        return 'badge-soft-secondary';
      default:
        return 'badge-soft-info';
    }
  };

  const renderRow = (invoice) => (
    <tr key={invoice.id}>
      <td>
        <Link to={`/customers/${customerId}/invoices/${invoice.id}`} className='fw-bold'>
          {invoice.id}
        </Link>
      </td>
      <td>{invoice.date}</td>
      <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.total)}</td>
      <td>
        <span className={`badge ${getStatusBadge(invoice.status)}`}>{invoice.status}</span>
      </td>
      <td>{invoice.dueDate}</td>
      <td>
        <div className='d-flex gap-3'>
          <Link to='#' className='text-secondary' title='Print'>
            <i className='mdi mdi-printer font-size-18'></i>
          </Link>
          <Link to='#' className='text-info' title='Email'>
            <i className='mdi mdi-email font-size-18'></i>
          </Link>
          <Link to={`/customers/${customerId}/invoices/${invoice.id}`} className='text-primary' title='Edit'>
            <i className='mdi mdi-pencil font-size-18'></i>
          </Link>
        </div>
      </td>
    </tr>
  );

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='row mb-3'>
          <div className='col-12'>
            <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
              <div className='flex-grow-1 w-100 me-md-3'>
                <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search invoices...' />
              </div>
              <div className='mt-2 mt-md-0'>
                <AddNewButton handleAddNew={() => navigate(`/customers/${customerId}/invoices/new`)} />
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
          }}
          emptyState={{
            message: 'No invoices found for this customer.',
          }}
        />
      </div>
    </div>
  );
};

export default CustomerInvoices;
