import React, { useEffect } from 'react';
import { useCurrencies } from './useCurrencies';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditCurrency from '../../../../components/Configuration/FinancialAndBilling/CurrencyAndLocalization/AddEditCurrency';
import { useAddEditCurrency } from '../../../../components/Configuration/FinancialAndBilling/CurrencyAndLocalization/useAddEditCurrency';

const columns = [
  { label: 'Currency Name', accessor: 'currencyName', sortable: true },
  { label: 'Code', accessor: 'currencyCode', sortable: true },
  { label: 'Symbol', accessor: 'symbol', sortable: false },
  { label: 'Default', accessor: 'isDefault', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const Currencies = () => {
  const { currencies: items, addCurrency, editCurrency, deleteCurrency } = useCurrencies();

  const saveItem = (item) => {
    if (item.id) {
      editCurrency(item.id, item);
    } else {
      addCurrency(item);
    }
  };

  const addEditCurrency = useAddEditCurrency(saveItem);
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Currency & Localization',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Financial & Billing Setup', path: '/configuration' },
        { label: 'Currency & Localization', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['currencyName', 'currencyCode']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'currencyName' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.currencyName}</strong>
      </td>
      <td>{item.currencyCode}</td>
      <td>{item.symbol}</td>
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
              addEditCurrency.open(item);
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
              deleteCurrency(item.id);
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
      <AddEditCurrency
        isOpen={addEditCurrency.isOpen}
        formData={addEditCurrency.formData}
        isSaving={addEditCurrency.isSaving}
        onUpdateFieldHandle={addEditCurrency.onUpdateFieldHandle}
        onClose={addEditCurrency.close}
        onSave={addEditCurrency.onSaveHandle}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search currencies...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditCurrency.open()} />
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
                  icon: 'ri-currency-line',
                  message: 'No currencies found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Currencies;
