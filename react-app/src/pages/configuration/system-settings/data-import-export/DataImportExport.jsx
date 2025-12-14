import React, { useEffect } from 'react';
import { useDataImportExport } from './useDataImportExport';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

const DataImportExport = () => {
  const {
    importEntity,
    setImportEntity,
    exportEntity,
    setExportEntity,
    exportFormat,
    setExportFormat,
    fileToImport,
    setFileToImport,
    isImporting,
    isExporting,
    handleImport,
    handleExport,
  } = useDataImportExport();

  const { setPageSubHeader } = usePageSubHeader();

  useEffect(() => {
    setPageSubHeader({
      title: 'Data Import/Export',
      breadcrumbs: [
        { label: 'Configuration', path: '/configuration' },
        { label: 'System Settings', path: '/configuration/system-settings' },
        { label: 'Data Import/Export', active: true },
      ],
    });
  }, [setPageSubHeader]);

  const handleFileChange = (e) => {
    setFileToImport(e.target.files ? e.target.files[0] : null);
  };

  return (
    <div className='row'>
      <div className='col-lg-6'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>Bulk Import</h5>
            <p className='text-muted'>Bulk upload master data (customers, service addresses, assets).</p>
            <div className='mb-3'>
              <label className='form-label'>Entity</label>
              <select value={importEntity} onChange={(e) => setImportEntity(e.target.value)} className='form-select' disabled={isImporting}>
                <option>Customers</option>
                <option>Service Addresses</option>
                <option>Assets</option>
                <option>Work Orders</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Upload File (CSV, JSON)</label>
              <input
                key={fileToImport?.name || 'file-input'} // Reset input when file is cleared
                onChange={handleFileChange}
                type='file'
                className='form-control'
                accept='.csv,.json'
                disabled={isImporting}
              />
            </div>
            <button onClick={handleImport} className='btn btn-primary' disabled={isImporting || !fileToImport}>
              {isImporting ? 'Importing...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>

      <div className='col-lg-6'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>Export</h5>
            <p className='text-muted'>Export master data for offline processing.</p>
            <div className='mb-3'>
              <label className='form-label'>Entity</label>
              <select value={exportEntity} onChange={(e) => setExportEntity(e.target.value)} className='form-select' disabled={isExporting}>
                <option>Customers</option>
                <option>Service Addresses</option>
                <option>Assets</option>
                <option>Work Orders</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Format</label>
              <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} className='form-select' disabled={isExporting}>
                <option>CSV</option>
                <option>Excel</option>
                <option>JSON</option>
              </select>
            </div>
            <button onClick={handleExport} className='btn btn-outline-primary' disabled={isExporting}>
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataImportExport;
