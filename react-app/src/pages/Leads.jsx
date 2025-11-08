import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewButton from '../components/Common/AddNewButton';
import { employees, sources, leadStatuses } from '../data/mockData';
import { getLeads, deleteLead } from '../utils/localStorage';
import { useEditableFormContext } from '../contexts/EditableFormContext';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';

const Leads = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { addEditLead, leads, customers } = useEditableFormContext();
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setPageSubHeader({
            title: 'Leads',
            breadcrumbs: [
                { label: 'Leads', path: '/leads' }
            ]
        });
    }, [setPageSubHeader]);

    const statusLabel = (statusId) => leadStatuses.find(s => s.id === Number(statusId))?.label || '-';
    const customerName = (customerId) => customers.find(c => c.id === customerId)?.name || 'N/A';
    const employeeName = (empId) => employees.find(e => e.id === empId)?.name || '-';
    const sourceName = (srcId) => sources.find(s => s.id === srcId)?.name || '-';

    const filtered = leads.filter((l) => {
        const q = searchTerm.toLowerCase();
        return (
            (l.name && l.name.toLowerCase().includes(q)) ||
            customerName(l.customerId).toLowerCase().includes(q) ||
            (l.serviceInterest && l.serviceInterest.toLowerCase().includes(q)) ||
            statusLabel(l.status).toLowerCase().includes(q) ||
            employeeName(l.assignedSalesRep).toLowerCase().includes(q) ||
            sourceName(l.sourceId).toLowerCase().includes(q) ||
            (l.dateCreated && l.dateCreated.toLowerCase().includes(q))
        );
    });

    const handleDelete = (id) => {
        if (window.confirm('Delete this lead?')) {
            deleteLead(id);
            setLeadsState(getLeads());
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Leads</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/">Bugworx</Link></li>
                                <li className="breadcrumb-item active">Leads</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
                                        <div className="flex-grow-1 w-100 me-md-3">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search leads..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    autoComplete="off"
                                                />
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>

                                        <div className="mt-2 mt-md-0">
                                            <AddNewButton handleAddNew={() => addEditLead.open({ id: 0 })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Lead</th>
                                            <th>Customer</th>
                                            <th>Service Interest</th>
                                            <th>Status</th>
                                            <th>Date Created</th>
                                            <th>Sales Rep</th>
                                            <th>Source</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((l) => (
                                            <tr key={l.id}>
                                                <td>
                                                    <h5 className="font-size-14 mb-0">{l.name}</h5>
                                                </td>
                                                <td>{customerName(l.customerId)}</td>
                                                <td>{l.serviceInterest || '-'}</td>
                                                <td>
                                                    <span className="badge badge-soft-primary">{statusLabel(l.status)}</span>
                                                </td>
                                                <td>{l.dateCreated || '-'}</td>
                                                <td>{employeeName(l.assignedSalesRep)}</td>
                                                <td>{sourceName(l.sourceId)}</td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <a href="#" className="text-success" title="View">
                                                            <i className="mdi mdi-eye font-size-18"></i>
                                                        </a>
                                                        <a href="#" className="text-primary" title="Edit" onClick={() => addEditLead.open(l)}>
                                                            <i className="mdi mdi-pencil font-size-18"></i>
                                                        </a>
                                                        <a href="#" className="text-danger" title="Delete" onClick={() => handleDelete(l.id)}>
                                                            <i className="mdi mdi-delete font-size-18"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filtered.length === 0 && (
                                <div className="text-center py-4">
                                    <i className="mdi mdi-account-search font-size-48 text-muted"></i>
                                    <p className="text-muted mt-2">No leads found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Leads;
