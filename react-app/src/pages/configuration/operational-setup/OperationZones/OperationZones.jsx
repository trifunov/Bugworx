import { useEffect } from 'react';
import { useOperationalZones } from './useOperationZones';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditZone from '../../../../components/Configuration/OperationalSetup/OperationalZones/AddEditOperationalZones';

const columns = [
    { label: 'Zone Name', accessor: 'zoneName', sortable: true },
    { label: 'Description', accessor: 'description', sortable: false },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const OperationalZones = () => {
    const { items, saveItem, removeItem } = useOperationalZones();
    const { addEditOperationalZones } = useEditableFormContext();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Operational Zones',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Operational Setup', path: '/configuration/operational-setup' },
                { label: 'Operational Zones', active: true },
            ],
        });
    }, [setPageSubHeader]);

    const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['zoneName', 'description']);
    const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'zoneName' });

    const renderRow = (item) => (
        <tr key={item.id}>
            <td><strong>{item.zoneName}</strong></td>
            <td>{item.description}</td>
            <td>
                <div className="d-flex gap-3">
                    <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditOperationalZones.open(item); }}><i className="mdi mdi-pencil font-size-18"></i></a>
                    <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); removeItem(item.id); }}><i className="mdi mdi-delete font-size-18"></i></a>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            <AddEditZone
                isOpen={addEditOperationalZones.isOpen}
                formData={addEditOperationalZones.formData}
                isSaving={addEditOperationalZones.isSaving}
                onUpdateFieldHandle={addEditOperationalZones.onUpdateFieldHandle}
                onClose={addEditOperationalZones.close}
                onSave={() => addEditOperationalZones.onSaveHandle(saveItem)}
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
                                                placeholder="Search zones..."
                                            />
                                        </div>
                                        <div className="mt-2 mt-md-0">
                                            <AddNewButton handleAddNew={() => addEditOperationalZones.open()} />
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
                                    icon: 'mdi mdi-map-marker-radius-outline',
                                    message: 'No operational zones found. Click "Add New" to create one.'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OperationalZones;