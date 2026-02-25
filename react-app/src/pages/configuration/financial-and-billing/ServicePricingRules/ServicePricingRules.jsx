import React, { useEffect } from 'react';
import { useServicePricingRules } from './useServicePricingRules';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditServicePricingRule from '../../../../components/Configuration/FinancialAndBilling/ServicePricingRules/AddEditServicePricingRule';
import { useAddEditServicePricingRule } from '../../../../components/Configuration/FinancialAndBilling/ServicePricingRules/useAddEditServicePricingRule';

const columns = [
  { label: 'Rule Name', accessor: 'ruleName', sortable: true },
  { label: 'Service Type', accessor: 'serviceType', sortable: true },
  { label: 'Price', accessor: 'price', sortable: true },
  { label: 'Method', accessor: 'pricingMethod', sortable: true },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const ServicePricingRules = () => {
  const { servicePricingRules: items, addServicePricingRule, editServicePricingRule, deleteServicePricingRule } = useServicePricingRules();

  const saveItem = (item) => {
    if (item.id) {
      editServicePricingRule(item.id, item);
    } else {
      addServicePricingRule(item);
    }
  };

  const addEditModal = useAddEditServicePricingRule(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Service Pricing Rules',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Financial & Billing Setup', path: '/configuration' },
        { label: 'Service Pricing Rules', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['ruleName', 'serviceType']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'ruleName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.ruleName}</strong>
        <div className='text-muted'>
          {item.clientTier && <span className='me-2'>Tier: {item.clientTier}</span>}
          {item.pestType && <span>Pest: {item.pestType}</span>}
        </div>
      </td>
      <td>{item.serviceType}</td>
      <td>
        {`$${Number(item.price).toFixed(2)}`}
        {item.pricingMethod === 'Per Unit' && <span className='text-muted ms-1'>/ {item.unitLabel}</span>}
        {item.pricingMethod === 'Per Hour' && <span className='text-muted ms-1'>/ hr</span>}
      </td>
      <td>{item.pricingMethod}</td>
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
              addEditModal.open(item);
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
              deleteServicePricingRule(item.id);
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
      <AddEditServicePricingRule
        isOpen={addEditModal.isOpen}
        formData={addEditModal.formData}
        isSaving={addEditModal.isSaving}
        onUpdateFieldHandle={addEditModal.onUpdateFieldHandle}
        onClose={addEditModal.close}
        onSave={addEditModal.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search pricing rules...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditModal.open()} />
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
                  icon: 'ri-price-tag-3-line',
                  message: 'No service pricing rules found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicePricingRules;
