import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddNewButton from '../components/Common/AddNewButton';
import AddEditArea from '../components/CustomerDetails/Area/AddEditArea/AddEditArea';
import { addArea, updateArea, getAreas, getFacilitiesByAccountId, getSitesByAccountId } from '../utils/localStorage';
import useAddEditArea from '../components/CustomerDetails/Area/AddEditArea/useAddEditArea';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';

const Areas = () => {
    const { setPageSubHeader } = usePageSubHeader();
    const [searchTerm, setSearchTerm] = useState('');

    const { id } = useParams();
    const accountId = parseInt(id);
    const { isOpen, formData, errors, isSaving, open, close, onUpdateFieldHandle, onSaveHandle } = useAddEditArea();

    // Load dynamic data from localStorage helpers so saved changes persist
    const facilities = getFacilitiesByAccountId(accountId);
    const sites = getSitesByAccountId(accountId);

    const computeAreasForAccount = () => getAreas().filter(a => facilities.some(f => f.id === a.facilityId));
    const [areas, setAreas] = useState(computeAreasForAccount());

    const getFacility = (facilityId) => facilities.find((f) => f.id === facilityId) || null;

    const getSiteAddress = (facility) => {
        if (!facility) return 'N/A';
        const site = sites.find((s) => s.id === facility.siteId);
        return site ? site.address : 'N/A';
    };

    const filtered = areas.filter((a) => {
        const q = searchTerm.toLowerCase();
        const facility = getFacility(a.facilityId);
        const facilityName = facility ? facility.name : '';
        const siteAddress = getSiteAddress(facility);

        return (
            (a.name && a.name.toLowerCase().includes(q)) ||
            (facilityName && facilityName.toLowerCase().includes(q)) ||
            (siteAddress && siteAddress.toLowerCase().includes(q))
        );
    });

    const handleSave = () => onSaveHandle((data) => {
        if (data.id > 0) {
            updateArea(data.id, data);
        } else {
            addArea(data);
        }
        setAreas(computeAreasForAccount());
    });

    useEffect(() => {
        setPageSubHeader({
            title: 'Areas',
            breadcrumbs: [
                { label: 'Accounts', path: '/accounts' },
                { label: searchTerm, path: `/accounts/${id}` },
                { label: 'Areas' }
            ]
        });
    }, [setPageSubHeader, id, searchTerm]);

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Areas</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/">Bugworx</Link></li>
                                <li className="breadcrumb-item active">Areas</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <AddEditArea
                isOpen={isOpen}
                formData={formData}
                errors={errors}
                isSaving={isSaving}
                onUpdateField={onUpdateFieldHandle}
                onClose={close}
                onSave={handleSave}
                accountId={accountId}
            />

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
                                                    placeholder="Search areas, facilities or addresses..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    autoComplete="off"
                                                />
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>

                                        <div className="mt-2 mt-md-0">
                                            <AddNewButton handleAddNew={() => open({ id: 0 })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table align-middle table-nowrap table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Service address</th>
                                            <th>Facility</th>
                                            <th>Area</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((a) => {
                                            const facility = getFacility(a.facilityId);
                                            const siteAddress = getSiteAddress(facility);
                                            return (
                                                <tr key={a.id}>
                                                    <td>{siteAddress}</td>
                                                    <td>{facility ? facility.name : '-'}</td>
                                                    <td>
                                                        {a.name}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-3">
                                                            <a href="#" className="text-success" title="View">
                                                                <i className="mdi mdi-eye font-size-18"></i>
                                                            </a>
                                                            <a href="#" className="text-primary" title="Edit"
                                                                onClick={() => open(a)}>
                                                                <i className="mdi mdi-pencil font-size-18"></i>
                                                            </a>
                                                            <a href="#" className="text-danger" title="Delete">
                                                                <i className="mdi mdi-delete font-size-18"></i>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {filtered.length === 0 && (
                                <div className="text-center py-4">
                                    <i className="mdi mdi-map-marker-off font-size-48 text-muted"></i>
                                    <p className="text-muted mt-2">No areas found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Areas;
