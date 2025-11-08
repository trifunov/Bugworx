import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AddNewButton from '../components/Common/AddNewButton';
import { getProspects, deleteProspect } from '../utils/localStorage';
import { employees, sources, prospectStatuses, serviceTypes } from '../data/mockData';
import { useEditableFormContext } from '../contexts/EditableFormContext';

const Prospects = () => {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    const { addEditProspect, prospects, customers, setProspectsState } = useEditableFormContext();

    useEffect(() => {
        const query = searchParams.get('q');
        if (query) setSearchTerm(query);
    }, [searchParams]);

    useEffect(() => {
        setPageSubHeader({
            title: 'Prospects',
            breadcrumbs: [
                { label: 'Prospects', path: '/prospects' }
            ]
        });
    }, [setPageSubHeader]);

    const findCustomerName = (id) => customers.find(c => c.id === id)?.name || '';
    const findEmployeeName = (id) => employees.find(e => e.id === id)?.name || '';
    const findSourceName = (id) => sources.find(s => s.id === id)?.name || '';
    const findStatusLabel = (id) => prospectStatuses.find(s => s.id === Number(id))?.label || '';
    const findServiceTypeName = (id) => serviceTypes.find(st => st.id === Number(id))?.name || '';

    const filteredProspects = prospects.filter(p => {
        const term = searchTerm.toLowerCase();
        return (
            p.name?.toLowerCase()?.includes(term) ||
            findCustomerName(p.customerId).toLowerCase().includes(term) ||
            findEmployeeName(p.assignedSalesRep).toLowerCase().includes(term) ||
            findSourceName(p.sourceId).toLowerCase().includes(term) ||
            p.serviceInterest?.toLowerCase()?.includes(term)
        );
    });

    const handleDelete = (id) => {
        if (window.confirm('Delete this prospect?')) {
            deleteProspect(id);
            setProspectsState(getProspects());
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Prospects</h4>
                        <div className="page-title-right"></div>
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
                                                    placeholder="Search prospects..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    autoComplete="off"
                                                />
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>
                                        <div className="mt-2 mt-md-0">
                                            <AddNewButton handleAddNew={() => addEditProspect.open({ id: 0 })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Customer</th>
                                            <th>Status</th>
                                            <th>Service Interest</th>
                                            <th>Sales Rep</th>
                                            <th>Source</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProspects.map((p) => (
                                            <tr key={p.id}>
                                                <td className="fw-medium">{p.name}</td>
                                                <td>{findCustomerName(p.customerId)}</td>
                                                <td>
                                                    <span className="badge badge-soft-primary">{findStatusLabel(p.status)}</span>
                                                </td>
                                                <td>{findServiceTypeName(p.serviceInterest)}</td>
                                                <td>{findEmployeeName(p.assignedSalesRep)}</td>
                                                <td>{findSourceName(p.sourceId)}</td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <a href="#" className="text-primary" onClick={(e) => { e.preventDefault(); addEditProspect.open(p); }}>
                                                            <i className="mdi mdi-pencil font-size-18"></i>
                                                        </a>
                                                        <a href="#" className="text-danger" onClick={(e) => { e.preventDefault(); handleDelete(p.id); }}>
                                                            <i className="mdi mdi-delete font-size-18"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Prospects;

