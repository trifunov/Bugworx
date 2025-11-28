import { useEffect } from 'react';
import { useJobSettings } from './useJobSettings';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';
import { useEditableFormContext } from '../../../../contexts/EditableFormContext';
import Table from '../../../../components/Common/Table/Table';
import useTable from '../../../../components/Common/Table/useTable';
import AddNewButton from '../../../../components/Common/AddNewButton';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';
import TableSearch from '../../../../components/Common/SearchBar/TableSearch';
import AddEditJobSetting from '../../../../components/Configuration/OperationalSetup/JobSettings/AddEditJobSettings';

const columns = [
    { label: 'Profile Name', accessor: 'name', sortable: true },
    { label: 'Default Status', accessor: 'defaultStatus', sortable: true },
    { label: 'Numbering Format', accessor: 'numberingFormat', sortable: false },
    { label: 'SLA (Hours)', accessor: 'slaHours', sortable: true },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const JobSettings = () => {
    const { items, saveItem, removeItem } = useJobSettings();
    const { addEditJobSetting } = useEditableFormContext();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Job Settings',
            breadcrumbs: [
                { label: 'Configuration', path: '/configuration' },
                { label: 'Operational Setup', path: '/configuration/operational-setup' },
                { label: 'Job Settings', active: true },
            ],
        });
    }, [setPageSubHeader]);

    const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(items, ['name', 'defaultStatus']);
    const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'name' });

    const renderRow = (item) => (
        <tr key={item.id}>
            <td><strong>{item.name}</strong></td>
            <td><span className="badge badge-soft-info">{item.defaultStatus}</span></td>
            <td><code>{item.numberingFormat}</code></td>
            <td>{item.slaHours}</td>
            <td>
                <div className="d-flex gap-3">
                    <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditJobSetting.open(item); }}><i className="mdi mdi-pencil font-size-18"></i></a>
                    <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); removeItem(item.id); }}><i className="mdi mdi-delete font-size-18"></i></a>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            <AddEditJobSetting
                isOpen={addEditJobSetting.isOpen}
                formData={addEditJobSetting.formData}
                isSaving={addEditJobSetting.isSaving}
                onUpdateFieldHandle={addEditJobSetting.onUpdateFieldHandle}
                onClose={addEditJobSetting.close}
                onSave={() => addEditJobSetting.onSaveHandle(saveItem)}
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
                                                placeholder="Search job setting profiles..."
                                            />
                                        </div>
                                        <div className="mt-2 mt-md-0">
                                            <AddNewButton handleAddNew={() => addEditJobSetting.open()} />
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
                                    icon: 'mdi mdi-briefcase-outline',
                                    message: 'No job setting profiles found. Click "Add New" to create one.'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobSettings;