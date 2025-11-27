import { useEffect } from 'react';
import { useRouteConfiguration } from './useRouteConfiguration';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditRoute from '../../../../components/Configuration/OperationalSetup/RouteConfiguration/AddEditRouteConfiguration';

const columns = [
    { label: 'Route', accessor: 'routeName', sortable: true },
    { label: 'Zone', accessor: 'zone', sortable: true },
    { label: 'Technician', accessor: 'defaultTechnician', sortable: true },
    { label: 'Stops', accessor: 'stops', sortable: false },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const RouteConfiguration = () => {
    const { items, zones, saveItem, removeItem } = useRouteConfiguration();
    const { addEditRouteConfiguration } = useEditableFormContext();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Route Configuration',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Operational Setup', path: '/configuration/operational-setup' },
                { label: 'Route Configuration', active: true },
            ],
        });
    }, [setPageSubHeader]);

    const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['routeName', 'zone', 'defaultTechnician']);
    const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'routeName' });

    const renderRow = (item) => (
        <tr key={item.id}>
            <td><strong>{item.routeName}</strong></td>
            <td>{item.zone}</td>
            <td>{item.defaultTechnician}</td>
            <td>{(item.stops || []).join(', ')}</td>
            <td>
                <div className="d-flex gap-3">
                    <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditRouteConfiguration.open(item); }}><i className="mdi mdi-pencil font-size-18"></i></a>
                    <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); removeItem(item.id); }}><i className="mdi mdi-delete font-size-18"></i></a>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            <AddEditRoute
                isOpen={addEditRouteConfiguration.isOpen}
                formData={addEditRouteConfiguration.formData}
                isSaving={addEditRouteConfiguration.isSaving}
                onUpdateFieldHandle={addEditRouteConfiguration.onUpdateFieldHandle}
                onClose={addEditRouteConfiguration.close}
                onSave={() => addEditRouteConfiguration.onSaveHandle(saveItem)}
                zones={zones}
            />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                                        <div className="flex-grow-1 w-100 me-md-3">
                                            <TableSearch
                                                value={searchTerm}
                                                onChange={setSearchTerm}
                                                placeholder="Search routes..."
                                            />
                                        </div>
                                        <div className="mt-2 mt-md-0">
                                            <AddNewButton handleAddNew={() => addEditRouteConfiguration.open()} />
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
                                    totalItems: tableProps.totalItems
                                }}
                                emptyState={{
                                    icon: 'mdi mdi-map-marker-path',
                                    message: 'No routes found. Click "Add New" to create one.'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RouteConfiguration;