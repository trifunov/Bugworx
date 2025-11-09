import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { serviceAddresses, areas, facilities, addInspectionPoint, updateInspectionPoint, getInspectionPointsByCustomerId } from '../data/mockData';
import { statusIntToHtmlBadge } from '../utils/inspectionPointUtils';
import AddNewButton from '../components/Common/AddNewButton';
import { getCustomerById } from '../utils/localStorage';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';
import AddEditInspectionPoint from '../components/CustomerDetails/InspectionPoint/AddEditInspectionPoint/AddEditInspectionPoint';
import useAddEditInspectionPoint from '../components/CustomerDetails/InspectionPoint/AddEditInspectionPoint/useAddEditInspectionPoint';

const InspectionPoints = () => {
    const { setPageSubHeader } = usePageSubHeader();
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useParams();
    const customerId = parseInt(id);
    const customer = getCustomerById(customerId);
    // Use the inspectionPoints array from mockData
    const [inspectionPoints, setInspectionPointsState] = useState(getInspectionPointsByCustomerId(customerId));
    const { isOpen, formData, errors, isSaving, open, close, onUpdateFieldHandle, onSaveHandle } = useAddEditInspectionPoint();

    const getServiceAddress = (areaId) => {
        const area = areas.find((a) => a.id === areaId);
        const facility = area ? facilities.find((f) => f.id === area.facilityId) : null;
        const serviceAddress = facility ? serviceAddresses.find((s) => s.id === facility.serviceAddressId) : null;
        return serviceAddress ? serviceAddress.address : 'N/A';
    };

    const getAreaName = (areaId) => {
        const area = areas.find((a) => a.id === areaId);
        return area ? area.name : 'N/A';
    };

    const getFacilityName = (areaId) => {
        const area = areas.find((a) => a.id === areaId);
        const facility = area ? facilities.find((f) => f.id === area.facilityId) : null;
        return facility ? facility.name : 'N/A';
    }

    const filtered = inspectionPoints.filter((ip) => {
        const matchesSearch =
            (ip.pointName && ip.pointName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (ip.barcode && ip.barcode.toLowerCase().includes(searchTerm.toLowerCase())) ||
            getServiceAddress(ip.areaId).toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ip.type && ip.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (ip.typeCategory && ip.typeCategory.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesSearch;
    });

    const handleSave = () => onSaveHandle((data) => {
        if (data.id > 0) {
            updateInspectionPoint(data.id, data);
        } else {
            addInspectionPoint(data);
        }
        setInspectionPointsState(getInspectionPointsByCustomerId(customerId));
    });

    useEffect(() => {
        setPageSubHeader({
            title: 'Inspection Points',
            breadcrumbs: [
                { label: 'Customers', path: '/customers' },
                { label: customer.customerNum, path: `/customers/${id}` },
                { label: 'Inspection Points' }
            ]
        });
    }, [setPageSubHeader, id, customer.customerNum]);

    return (
        <>
            <AddEditInspectionPoint
                isOpen={isOpen}
                formData={formData}
                errors={errors}
                isSaving={isSaving}
                onUpdateField={onUpdateFieldHandle}
                onClose={close}
                onSave={handleSave}
                customerId={customerId}
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
                                                    placeholder="Search inspection points..."
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
                                            <th>Service Address</th>
                                            <th>Facility</th>
                                            <th>Area</th>
                                            <th>Point</th>
                                            <th>Barcode</th>
                                            <th>Status</th>
                                            <th>Type</th>
                                            <th>Category</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((ip) => (
                                            <tr key={ip.id}>
                                                <td>{getServiceAddress(ip.areaId)}</td>
                                                <td>{getFacilityName(ip.areaId)}</td>
                                                <td>{getAreaName(ip.areaId)}</td>
                                                <td>
                                                    <h5 className="font-size-14 mb-0">{ip.pointName}</h5>
                                                </td>
                                                <td>
                                                    <span className="fw-bold">{ip.barcode}</span>
                                                </td>
                                                <td dangerouslySetInnerHTML={{ __html: statusIntToHtmlBadge(ip.status) }} />
                                                <td>{ip.type || '-'}</td>
                                                <td>{ip.typeCategory || '-'}</td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <a href="#" className="text-success" title="View">
                                                            <i className="mdi mdi-eye font-size-18"></i>
                                                        </a>
                                                        <a href="#" className="text-primary" title="Edit">
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
                                    <i className="mdi mdi-map-marker-off font-size-48 text-muted"></i>
                                    <p className="text-muted mt-2">No inspection points found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InspectionPoints;
