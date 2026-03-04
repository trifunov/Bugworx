import React, { useEffect } from 'react';
import { useTaxConfiguration } from './useTaxConfiguration';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditTaxConfiguration from '../../../../components/Configuration/FinancialAndBilling/TaxConfiguration/AddEditTaxConfiguration';
import { useAddEditTaxConfiguration } from '../../../../components/Configuration/FinancialAndBilling/TaxConfiguration/useAddEditTaxConfiguration';

const columns = [
  { label: 'Tax Name', accessor: 'taxName', sortable: true },
  { label: 'Tax Rate (%)', accessor: 'taxRate', sortable: true },
  { label: 'Region', accessor: 'region', sortable: true },
  { label: 'Applies To', accessor: 'appliesTo', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const TaxConfiguration = () => {
  const { taxConfigs: items, addTaxConfig, editTaxConfig, deleteTaxConfig } = useTaxConfiguration();

  const saveItem = (item) => {
    if (item.id) {
      editTaxConfig(item.id, item);
    } else {
      addTaxConfig(item);
    }
  };

  const addEditTaxConfig = useAddEditTaxConfiguration(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Tax Configuration',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Financial & Billing Setup', path: '/configuration' },
        { label: 'Tax Configuration', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['taxName', 'region']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'taxName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.taxName}</strong>
      </td>
      <td>{item.taxRate}</td>
      <td>{item.region}</td>
      <td>
        {item.appliesToServices && 'Services '}
        {item.appliesToProducts && 'Products'}
      </td>
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
              addEditTaxConfig.open(item);
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
              deleteTaxConfig(item.id);
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
      <AddEditTaxConfiguration
        isOpen={addEditTaxConfig.isOpen}
        formData={addEditTaxConfig.formData}
        isSaving={addEditTaxConfig.isSaving}
        onUpdateFieldHandle={addEditTaxConfig.onUpdateFieldHandle}
        onClose={addEditTaxConfig.close}
        onSave={addEditTaxConfig.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search tax configurations...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditTaxConfig.open()} />
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
                  icon: 'ri-wallet-3-line',
                  message: 'No tax configurations found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxConfiguration;
