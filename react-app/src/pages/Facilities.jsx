import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Drawing from '../components/CustomerDetails/Drawing';
import AddNewButton from '../components/Common/AddNewButton';
import AddEditFacility from '../components/CustomerDetails/Facility/AddEditFacility/AddEditFacility';
import { addFacility, updateFacility, getFacilitiesByCustomerId, getServiceAddressesByCustomerId } from '../utils/localStorage';
import useAddEditFacility from '../components/CustomerDetails/Facility/AddEditFacility/useAddEditFacility';

const Facilities = () => {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDrawing, setSelectedDrawing] = useState(null);
    const customerId = parseInt(id);
    const { isOpen, formData, errors, isSaving, open, close, onUpdateFieldHandle, onSaveHandle } = useAddEditFacility(customerId);

    const [facilities, setFacilities] = useState(getFacilitiesByCustomerId(customerId));
    const serviceAddresses = getServiceAddressesByCustomerId(customerId);

    const getServiceAddressName = (serviceAddressId) => {
        const serviceAddress = serviceAddresses.find((s) => s.id === serviceAddressId);
        return serviceAddress ? serviceAddress.address : 'N/A';
    };

    const filtered = facilities.filter((f) => {
        const q = searchTerm.toLowerCase();
        return (
            (f.name && f.name.toLowerCase().includes(q)) ||
            getServiceAddressName(f.serviceAddressId).toLowerCase().includes(q)
        );
    });

    const handleSave = () => onSaveHandle((data) => {
        if (data.id > 0) {
            updateFacility(data.id, data);
        } else {
            addFacility(data);
        }

        setFacilities(getFacilitiesByCustomerId(customerId));
    });

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Facilities</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/">Bugworx</Link></li>
                                <li className="breadcrumb-item active">Facilities</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <Drawing
                drawing={selectedDrawing}
                show={selectedDrawing !== null}
                onClose={() => setSelectedDrawing(null)}
            />

            <AddEditFacility
                isOpen={isOpen}
                formData={formData}
                errors={errors}
                isSaving={isSaving}
                onUpdateField={onUpdateFieldHandle}
                onClose={close}
                onSave={handleSave}
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
                                                    placeholder="Search facilities..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    autoComplete="off"
                                                />
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>

                                        <div className="mt-2 mt-md-0">
                                            <AddNewButton handleAddNew={() => open({
                                                id: 0,
                                            })} />
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
                                            <th>Drawing</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((f) => (
                                            <tr key={f.id}>
                                                <td>{getServiceAddressName(f.serviceAddressId)}</td>
                                                <td>
                                                    <h5 className="font-size-14 mb-0">{f.name}</h5>
                                                </td>
                                                <td>
                                                    {f.drawing ? (
                                                        <a href="#" className="text-primary" title="View" onClick={() => {
                                                            setSelectedDrawing(f.drawing);
                                                        }}>
                                                            <i className="font-size-18 me-1"></i>
                                                            <span>{f.drawing?.name}</span>
                                                        </a>
                                                    ) : (<span>-</span>)}
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <a href="#" className="text-success" title="View">
                                                            <i className="mdi mdi-eye font-size-18"></i>
                                                        </a>
                                                        <a href="#" className="text-primary" title="Edit"
                                                            onClick={() => open(f)}>
                                                            <i className="mdi mdi-pencil font-size-18"></i>
                                                        </a>
                                                        <a href="#" className="text-danger" title="Delete">
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
                                    <i className="mdi mdi-office-building-cog font-size-48 text-muted"></i>
                                    <p className="text-muted mt-2">No facilities found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Facilities;
