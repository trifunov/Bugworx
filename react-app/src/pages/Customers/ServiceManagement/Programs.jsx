import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import usePrograms from './usePrograms';
import Table from '../../../components/Common/Table/Table';
import TableSearch from '../../../components/Common/SearchBar/TableSearch';
import AddNewButton from '../../../components/Common/AddNewButton';
import { usePageSubHeader } from '../../../contexts/PageSubHeaderContext';
import AddEditProgram from '../../../components/CustomerDetails/AddEditProgram/AddEditProgram';
import useCustomerData from '../../../hooks/useCustomerData';
import useServiceAddresses from '../../../hooks/useServiceAddresses';
import { getProgramTypeLabel, getProgramStatusLabel } from '../../../utils/programLookups';

const Programs = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const { id } = useParams();
  const { customer } = useCustomerData(id);
  const { serviceAddresses } = useServiceAddresses(id);

  const {
    paginatedData,
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    isOffcanvasOpen,
    formData,
    formErrors,
    isSaving,
    handleAddNew,
    handleEdit,
    handleClose,
    handleSave,
    handleUpdateField,
  } = usePrograms();

  useEffect(() => {
    if (customer) {
      setPageSubHeader({
        title: 'Programs',
        breadcrumbs: [
          { label: 'Customers', path: '/customers' },
          { label: customer.customerName, path: `/customers/${id}` },
          { label: 'Service Management', path: `/customers/${id}/service-management` },
          { label: 'Programs' },
        ],
      });
    }
    return () => setPageSubHeader({ title: '', breadcrumbs: [] });
  }, [setPageSubHeader, customer, id]);

  const columns = ['Program Name', 'Service Address', 'Program Type', 'Status', 'Start Date', 'End Date', 'Actions'];

  const sortableColumns = {
    'Program Name': 'name',
    'Service Address': 'serviceAddressId',
    'Program Type': 'programTypeId',
    Status: 'statusId',
    'Start Date': 'startDate',
    'End Date': 'endDate',
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-soft-success';
      case 'Active':
        return 'badge-soft-primary';
      case 'Pending':
        return 'badge-soft-warning';
      case 'Cancelled':
      case 'Suspended':
        return 'badge-soft-danger';
      default:
        return 'badge-soft-secondary';
    }
  };

  const renderRow = (program) => {
    const serviceAddress = serviceAddresses.find((s) => s.id === program.serviceAddressId);
    const statusLabel = getProgramStatusLabel(program.statusId);
    return (
      <tr key={program.id}>
        <td>
          <span className='fw-bold'>{program.name}</span>
        </td>
        <td>{serviceAddress?.serviceAddressName || 'N/A'}</td>
        <td>{getProgramTypeLabel(program.programTypeId)}</td>
        <td>
          <span className={`badge ${getStatusBadgeClass(statusLabel)}`}>{statusLabel}</span>
        </td>
        <td>{program.startDate}</td>
        <td>{program.endDate}</td>
        <td>
          <div className='d-flex gap-3'>
            <Link to='#' className='text-primary' title='Edit' onClick={() => handleEdit(program)}>
              <i className='mdi mdi-pencil font-size-18'></i>
            </Link>
            <Link to='#' className='text-danger' title='Delete'>
              <i className='mdi mdi-trash-can font-size-18'></i>
            </Link>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search programs...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={handleAddNew} />
                    </div>
                  </div>
                </div>
              </div>

              <Table
                columns={columns}
                data={paginatedData}
                renderRow={renderRow}
                sortableColumns={sortableColumns}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                pagination={{
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  totalItems,
                }}
                emptyState={{
                  icon: 'mdi mdi-cogs',
                  message: 'No programs found',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <AddEditProgram
        isOpen={isOffcanvasOpen}
        formData={formData}
        errors={formErrors}
        isSaving={isSaving}
        onUpdateField={handleUpdateField}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
};

export default Programs;
