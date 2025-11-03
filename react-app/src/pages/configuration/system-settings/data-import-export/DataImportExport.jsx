import React from 'react';
import { useDataImportExport } from './useDataImportExport';

const DataImportExport = () => {
    const { importEntityRef, exportEntityRef, exportFormatRef, handleImportFile, handleExport } = useDataImportExport();

    return (
        <div className="row">
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Bulk Import</h5>
                        <p className="text-muted">Bulk upload master data (customers, service addresses, assets).</p>
                        <div className="mb-3">
                            <label className="form-label">Entity</label>
                            <select ref={importEntityRef} className="form-select" defaultValue="Customers">
                                <option>Customers</option>
                                <option>Service Addresses</option>
                                <option>Assets</option>
                                <option>Work Orders</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload File (CSV, JSON)</label>
                            <input onChange={e => handleImportFile(e.target.files?.[0])} type="file" className="form-control" accept=".csv,.json" />
                        </div>
                        <button className="btn btn-primary" onClick={() => alert('Choose a file to import above')}>Upload</button>
                    </div>
                </div>
            </div>

            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Export</h5>
                        <p className="text-muted">Export master data for offline processing.</p>
                        <div className="mb-3">
                            <label className="form-label">Entity</label>
                            <select ref={exportEntityRef} className="form-select" defaultValue="Customers">
                                <option>Customers</option>
                                <option>Service Addresses</option>
                                <option>Assets</option>
                                <option>Work Orders</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Format</label>
                            <select ref={exportFormatRef} className="form-select" defaultValue="CSV">
                                <option>CSV</option>
                                <option>Excel</option>
                                <option>JSON</option>
                            </select>
                        </div>
                        <button onClick={handleExport} className="btn btn-outline-primary">Export</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataImportExport;