import React, { useEffect } from 'react';
import { useObservationsRecommendations } from './useObservationsRecommendations';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import useAddEditObservationsRecommendation from '../../../../components/Configuration/communication/ObservationsRecommendations/useAddEditObservationsRecommendation';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditObservationsRecommendations from '../../../../components/Configuration/communication/ObservationsRecommendations/AddEditObservationsRecommendations';

const TYPE_BADGE = {
  Observation: 'info',
  Recommendation: 'primary',
};

const PRIORITY_BADGE = {
  Low: 'success',
  Medium: 'warning',
  High: 'danger',
  Critical: 'dark',
};

const RISK_BADGE = {
  'No Risk': 'success',
  Minor: 'secondary',
  Moderate: 'warning',
  Significant: 'danger',
  Severe: 'dark',
};

const columns = [
  { label: 'Title', accessor: 'name', sortable: true },
  { label: 'Type', accessor: 'type', sortable: true },
  { label: 'Category', accessor: 'category', sortable: true },
  { label: 'Priority', accessor: 'priority', sortable: true },
  { label: 'Risk Rating', accessor: 'riskRating', sortable: true },
  { label: 'Photo', accessor: 'includePhotoPlaceholder', sortable: false },
  { label: 'Status', accessor: 'active', sortable: false },
  { label: 'Actions', accessor: 'actions', sortable: false },
];

const columnNames = columns.map((c) => c.label);
const sortableColumns = columns.reduce((acc, col) => {
  if (col.sortable) acc[col.label] = col.accessor;
  return acc;
}, {});

const ObservationsRecommendations = () => {
  const { items, saveItem, removeItem } = useObservationsRecommendations();
  const addEditOR = useAddEditObservationsRecommendation();
  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Observations & Recommendations',
      description:
        'Templates for field technicians to record findings. Define common observations (e.g., "Rodent droppings detected"), standardized recommendations (e.g., "Set 2 bait stations"), priority or risk ratings, and optional photo placeholders.',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'Templates & Defaults', path: '/configuration/templates' },
        { label: 'Observations & Recommendations', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, [
    'name',
    'type',
    'category',
    'description',
    'priority',
    'riskRating',
    'suggestedProduct',
    'locationHint',
  ]);

  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

  const renderRow = (item) => (
    <tr key={item.id}>
      <td>
        <strong>{item.name}</strong>
        {item.description && (
          <div className='text-muted font-size-12' style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.description}
          </div>
        )}
      </td>
      <td>
        <span className={`badge badge-soft-${TYPE_BADGE[item.type] || 'secondary'}`}>{item.type || '—'}</span>
      </td>
      <td>{item.category || '—'}</td>
      <td>
        <span className={`badge badge-soft-${PRIORITY_BADGE[item.priority] || 'secondary'}`}>{item.priority || '—'}</span>
      </td>
      <td>
        <span className={`badge badge-soft-${RISK_BADGE[item.riskRating] || 'secondary'}`}>{item.riskRating || '—'}</span>
      </td>
      <td>
        {item.includePhotoPlaceholder ? (
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
              addEditOR.open(item);
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
      <AddEditObservationsRecommendations
        isOpen={addEditOR.isOpen}
        formData={addEditOR.formData}
        isSaving={addEditOR.isSaving}
        onUpdateFieldHandle={addEditOR.onUpdateFieldHandle}
        onClose={addEditOR.close}
        onSave={() => addEditOR.onSaveHandle(saveItem)}
      />

      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <div className='d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2'>
                    <div className='flex-grow-1 w-100 me-md-3'>
                      <TableSearch value={searchTerm} onChange={setSearchTerm} placeholder='Search observations & recommendations...' />
                    </div>
                    <div className='mt-2 mt-md-0'>
                      <AddNewButton handleAddNew={() => addEditOR.open()} />
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
                  icon: 'mdi mdi-clipboard-text-search-outline',
                  message: 'No observation or recommendation templates found. Click "Add New" to create one.',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ObservationsRecommendations;
