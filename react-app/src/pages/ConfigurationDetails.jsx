import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { accounts, sites, appointments } from '../data/mockData';
import * as ls from '../utils/localStorage';

const ConfigurationDetails = () => {
  // Determine which section to display based on the current path
  const pathParts = location.pathname.split('/');
  const section = pathParts[2] || 'overview'; // Default to overview if no section specified

      // Get section title and breadcrumb
  const getSectionInfo = () => {
    const sections = {
      'company-profile': { title: 'Company Profile', breadcrumb: 'Company Profile' },
      'custom-fields': { title: 'Custom Fields', breadcrumb: 'Custom Fields' },
      'api-integrations': { title: 'API Integrations', breadcrumb: 'API Integrations' },
      'data-import-export': { title: 'Data Import/Export', breadcrumb: 'Data Import/Export' },
      'audit-trail': { title: 'Invoices', breadcrumb: 'Invoices' },
      'backup-and-restore': { title: 'Contracts', breadcrumb: 'Contracts' }
    };
    return sections[section] || sections['company-profile'];
  };
  
const sectionInfo = getSectionInfo();
// --- State for various sections (persisted to localStorage) ---
  const [companyProfile, setCompanyProfile] = useState({
    name: '',
    regNumber: '',
    address: '',
    phone: '',
    email: '',
    logo: ''
  });

  const [customFields, setCustomFields] = useState([]);
  const customFieldLabelRef = useRef('');
  const customFieldAppliesRef = useRef('Customers');
  const customFieldTypeRef = useRef('Text');

  const [apiIntegrations, setApiIntegrations] = useState([]);
  const apiTypeRef = useRef('GPS');
  const apiProviderRef = useRef('');
  // new refs for client credentials when creating
  const apiClientIdRef = useRef('');
  const apiClientSecretRef = useRef('');

  const [auditTrail, setAuditTrail] = useState([]);
  const [auditFilter, setAuditFilter] = useState({ user: '', from: '', to: '' });

  const [backups, setBackups] = useState([]);
  const importEntityRef = useRef('Customers');
  const exportEntityRef = useRef('Customers');
  const exportFormatRef = useRef('CSV');

  // UI: which integration is open for configuration
  const [integrationConfigOpen, setIntegrationConfigOpen] = useState(null);
  // temporary credentials editing map { [id]: { clientId, clientSecret } }
  const [credsById, setCredsById] = useState({});

  // Load stored data when component mounts
  useEffect(() => {
    const cp = ls.getFromStorage('companyProfile', null);
    if (cp) setCompanyProfile(cp);

    setCustomFields(ls.getFromStorage('customFields', []));
    setApiIntegrations(ls.getFromStorage('apiIntegrations', [
      { id: 'gps', name: 'GPS / Telemetry', enabled: true, details: '', type: 'GPS', provider: 'DefaultGPS', clientId: '', clientSecret: '' },
      { id: 'hrms', name: 'HRMS', enabled: false, details: '', type: 'HRMS', provider: 'DefaultHRMS', clientId: '', clientSecret: '' },
      { id: 'acct', name: 'Accounting', enabled: false, details: '', type: 'Accounting', provider: 'DefaultAccounting', clientId: '', clientSecret: '' }
    ]));
    setAuditTrail(ls.getFromStorage('auditTrail', []));
    setBackups(ls.getFromStorage('backups', []));
  }, []);

  // Utility to append audit log
  const pushAudit = (user, action, entity, details) => {
    const entry = {
      timestamp: new Date().toISOString(),
      user: user || 'system',
      action,
      entity,
      details
    };
    const next = [entry, ...auditTrail];
    setAuditTrail(next);
    ls.setToStorage('auditTrail', next);
  };

  // --- COMPANY PROFILE handlers ---
  const handleCompanyChange = (field, value) => {
    const next = { ...companyProfile, [field]: value };
    setCompanyProfile(next);
  };

  const saveCompanyProfile = () => {
    ls.setToStorage('companyProfile', companyProfile);
    pushAudit('admin', 'Update', 'CompanyProfile', 'Saved company profile');
    alert('Company profile saved to local storage.');
  };

  const handleLogoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target.result;
      const next = { ...companyProfile, logo: dataUrl };
      setCompanyProfile(next);
      ls.setToStorage('companyProfile', next);
      pushAudit('admin', 'Upload', 'CompanyLogo', file.name);
    };
    reader.readAsDataURL(file);
  };

  // --- CUSTOM FIELDS handlers ---
  const addCustomField = () => {
    const label = customFieldLabelRef.current.value?.trim();
    const applies = customFieldAppliesRef.current.value;
    const type = customFieldTypeRef.current.value;
    if (!label) { alert('Field label required'); return; }
    const newField = { id: Date.now().toString(), label, type, applies };
    const next = [...customFields, newField];
    setCustomFields(next);
    ls.setToStorage('customFields', next);
    pushAudit('admin', 'Create', 'CustomField', label);
    customFieldLabelRef.current.value = '';
  };

  const deleteCustomField = (id) => {
    if (!confirm('Delete this field?')) return;
    const next = customFields.filter(f => f.id !== id);
    setCustomFields(next);
    ls.setToStorage('customFields', next);
    pushAudit('admin', 'Delete', 'CustomField', id);
  };

  const editCustomField = (id) => {
    const f = customFields.find(x => x.id === id);
    const newLabel = prompt('Edit label', f?.label || '');
    if (newLabel == null) return;
    const next = customFields.map(x => x.id === id ? { ...x, label: newLabel } : x);
    setCustomFields(next);
    ls.setToStorage('customFields', next);
    pushAudit('admin', 'Update', 'CustomField', id);
  };

  // --- API INTEGRATIONS handlers ---
  const toggleIntegration = (id) => {
    const next = apiIntegrations.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i);
    setApiIntegrations(next);
    ls.setToStorage('apiIntegrations', next);
    pushAudit('admin', 'Toggle', 'APIIntegration', id);
  };

  const addIntegration = () => {
    const type = apiTypeRef.current.value;
    const provider = apiProviderRef.current.value?.trim();
    const clientId = apiClientIdRef.current.value?.trim() || '';
    const clientSecret = apiClientSecretRef.current.value?.trim() || '';
    if (!provider) { alert('Provider required'); return; }
    const newInt = { id: Date.now().toString(), name: `${type} - ${provider}`, type, provider, enabled: true, clientId, clientSecret };
    const next = [...apiIntegrations, newInt];
    setApiIntegrations(next);
    ls.setToStorage('apiIntegrations', next);
    pushAudit('admin', 'Create', 'APIIntegration', provider);
    apiProviderRef.current.value = '';
    apiClientIdRef.current.value = '';
    apiClientSecretRef.current.value = '';
  };

  const openIntegrationConfig = (id) => {
    setIntegrationConfigOpen(id);
    const target = apiIntegrations.find(i => i.id === id);
    setCredsById(prev => ({ ...prev, [id]: { clientId: target?.clientId || '', clientSecret: target?.clientSecret || '' } }));
  };

  const changeCredField = (id, field, value) => {
    setCredsById(prev => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: value } }));
  };

  const saveIntegrationCredentials = (id) => {
    const creds = credsById[id] || { clientId: '', clientSecret: '' };
    const next = apiIntegrations.map(i => i.id === id ? { ...i, clientId: creds.clientId, clientSecret: creds.clientSecret } : i);
    setApiIntegrations(next);
    ls.setToStorage('apiIntegrations', next);
    pushAudit('admin', 'Update', 'APIIntegrationCredentials', id);
    setIntegrationConfigOpen(null);
    alert('Integration credentials saved.');
  };

  // --- DATA IMPORT / EXPORT handlers ---
  const handleImportFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target.result;
      const key = `import_${importEntityRef.current.value || importEntityRef.current}`;
      const payload = { fileName: file.name, content, date: new Date().toISOString() };
      ls.setToStorage(key, payload);
      pushAudit('admin', 'Import', importEntityRef.current.value || importEntityRef.current, file.name);
      alert(`Imported ${file.name} saved to key ${key}`);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const entity = exportEntityRef.current.value || exportEntityRef.current;
    const format = exportFormatRef.current.value || exportFormatRef.current;
    const key = `export_${entity}`;
    const payload = ls.getFromStorage(`import_${entity}`, { fileName: `${entity}.csv`, content: `Sample export for ${entity}`, date: new Date().toISOString() });
    let blob;
    if (format === 'JSON') {
      blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    } else if (format === 'Excel') {
      blob = new Blob([payload.content], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    } else {
      blob = new Blob([payload.content], { type: 'text/csv' });
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entity}_export.${format === 'JSON' ? 'json' : format === 'Excel' ? 'xlsx' : 'csv'}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    pushAudit('admin', 'Export', entity, `${format}`);
    ls.setToStorage(key, { exportedAt: new Date().toISOString(), format });
  };

  // --- AUDIT TRAIL handlers ---
  const handleAuditFilterChange = (field, value) => {
    setAuditFilter({ ...auditFilter, [field]: value });
  };

  const filteredAudit = auditTrail.filter(entry => {
    if (auditFilter.user && !entry.user.includes(auditFilter.user)) return false;
    if (auditFilter.from && new Date(entry.timestamp) < new Date(auditFilter.from)) return false;
    if (auditFilter.to && new Date(entry.timestamp) > new Date(auditFilter.to)) return false;
    return true;
  });

  // --- BACKUP & RESTORE handlers ---
  const createBackup = () => {
    const snapshot = {
      companyProfile: ls.getFromStorage('companyProfile', {}),
      customFields: ls.getFromStorage('customFields', []),
      apiIntegrations: ls.getFromStorage('apiIntegrations', []),
      auditTrail: ls.getFromStorage('auditTrail', [])
    };
    const content = JSON.stringify(snapshot);
    const name = `backup_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'_')}.json`;
    const entry = { id: Date.now().toString(), name, date: new Date().toISOString(), size: `${Math.round(content.length/1024)} KB`, content };
    const next = [entry, ...backups];
    setBackups(next);
    ls.setToStorage('backups', next);
    pushAudit('admin', 'Backup', 'System', name);
    alert('Backup created and saved to local storage.');
  };

  const downloadBackup = (id) => {
    const b = backups.find(x => x.id === id);
    if (!b) return;
    const blob = new Blob([b.content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = b.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    pushAudit('admin', 'Download', 'Backup', b.name);
  };

  const restoreBackup = (id) => {
    if (!confirm('This will overwrite stored configuration from the backup. Proceed?')) return;
    const b = backups.find(x => x.id === id);
    if (!b) return;
    try {
      const data = JSON.parse(b.content);
      if (data.companyProfile) { ls.setToStorage('companyProfile', data.companyProfile); setCompanyProfile(data.companyProfile); }
      if (data.customFields) { ls.setToStorage('customFields', data.customFields); setCustomFields(data.customFields); }
      if (data.apiIntegrations) { ls.setToStorage('apiIntegrations', data.apiIntegrations); setApiIntegrations(data.apiIntegrations); }
      if (data.auditTrail) { ls.setToStorage('auditTrail', data.auditTrail); setAuditTrail(data.auditTrail); }
      pushAudit('admin', 'Restore', 'Backup', b.name);
      alert('Restore completed.');
    } catch (e) {
      alert('Restore failed: invalid backup content.');
    }
  };

  const deleteBackup = (id) => {
    if (!confirm('Delete this backup?')) return;
    const next = backups.filter(b => b.id !== id);
    setBackups(next);
    ls.setToStorage('backups', next);
    pushAudit('admin', 'Delete', 'Backup', id);
  };

  const handleBackupUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target.result;
      const name = file.name;
      const entry = { id: Date.now().toString(), name, date: new Date().toISOString(), size: `${Math.round(content.length/1024)} KB`, content };
      const next = [entry, ...backups];
      setBackups(next);
      ls.setToStorage('backups', next);
      pushAudit('admin', 'Upload', 'Backup', name);
      alert('Backup uploaded and stored.');
    };
    reader.readAsText(file);
  };


 // Render section content based on current section
  const renderSectionContent = () => {
    switch (section) {
      case 'company-profile':
        return (
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Legal Entity</h5>
                  <form onSubmit={e => { e.preventDefault(); saveCompanyProfile(); }}>
                    <div className="mb-3">
                      <label className="form-label">Company Name</label>
                      <input value={companyProfile.name} onChange={e => handleCompanyChange('name', e.target.value)} type="text" className="form-control" placeholder="Enter company name" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Registration Number</label>
                      <input value={companyProfile.regNumber} onChange={e => handleCompanyChange('regNumber', e.target.value)} type="text" className="form-control" placeholder="Registration number" />
                    </div>
                    <h6 className="mt-3">Contact Info</h6>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input value={companyProfile.address} onChange={e => handleCompanyChange('address', e.target.value)} type="text" className="form-control" placeholder="Address" />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input value={companyProfile.phone} onChange={e => handleCompanyChange('phone', e.target.value)} type="text" className="form-control" placeholder="+1 (555) 555-5555" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input value={companyProfile.email} onChange={e => handleCompanyChange('email', e.target.value)} type="email" className="form-control" placeholder="contact@company.com" />
                      </div>
                    </div>
                    <button type="button" onClick={saveCompanyProfile} className="btn btn-primary">Save</button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">Company Logo</h5>
                  <div className="mb-3">
                    <img src={companyProfile.logo || "/assets/images/placeholder-logo.png"} alt="logo" className="img-fluid mb-2" style={{maxHeight: '120px'}} />
                    <div>
                      <input onChange={e => handleLogoUpload(e.target.files?.[0])} type="file" className="form-control" />
                    </div>
                  </div>
                  <button type="button" onClick={() => { ls.setToStorage('companyProfile', companyProfile); pushAudit('admin','Upload','CompanyLogo','manual'); alert('Logo saved (if changed)'); }} className="btn btn-secondary">Upload</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'custom-fields':
         return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Custom Fields</h5>
                  <p className="text-muted">Add user-defined fields for Customers, Sites, or Work Orders.</p>

                  <div className="mb-3">
                    <label className="form-label">Apply to</label>
                    <select ref={customFieldAppliesRef} className="form-select">
                      <option>Customers</option>
                      <option>Sites</option>
                      <option>Work Orders</option>
                    </select>
                  </div>

                  <div className="row align-items-end">
                    <div className="col-md-5 mb-3">
                      <label className="form-label">Field Label</label>
                      <input ref={customFieldLabelRef} className="form-control" placeholder="e.g. Customer Type" />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Field Type</label>
                      <select ref={customFieldTypeRef} className="form-select">
                        <option>Text</option>
                        <option>Number</option>
                        <option>Date</option>
                        <option>Dropdown</option>
                        <option>Checkbox</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3 text-end">
                      <button type="button" onClick={addCustomField} className="btn btn-primary">Add Field</button>
                    </div>
                  </div>

                  <hr />

                  <h6>Existing Fields</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Label</th>
                          <th>Type</th>
                          <th>Applies To</th>
                          <th style={{width: '120px'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customFields.map(f => (
                          <tr key={f.id}>
                            <td>{f.label}</td>
                            <td>{f.type}</td>
                            <td>{f.applies}</td>
                            <td>
                              <button onClick={() => editCustomField(f.id)} className="btn btn-sm btn-outline-secondary me-1">Edit</button>
                              <button onClick={() => deleteCustomField(f.id)} className="btn btn-sm btn-outline-danger">Delete</button>
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
        );

      case 'api-integrations':
         return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">API Integrations</h5>
                  <p className="text-muted">Configure third-party integrations (GPS, HRMS, Accounting).</p>

                  <div className="list-group mb-3">
                    {apiIntegrations.map(i => (
                      <div key={i.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{i.name}</h6>
                            <small className="text-muted">{i.provider || i.type}</small>
                            <div className="mt-2">
                              <small className="text-muted">Client ID: {i.clientId ? '●●●●●' : <em>not set</em>}</small>
                              <br />
                              <small className="text-muted">Secret: {i.clientSecret ? '●●●●●' : <em>not set</em>}</small>
                            </div>
                          </div>
                          <div className="text-end">
                            <button onClick={() => openIntegrationConfig(i.id)} className="btn btn-sm btn-outline-primary me-2">{integrationConfigOpen === i.id ? 'Close' : 'Configure'}</button>
                            <button onClick={() => toggleIntegration(i.id)} className={`btn btn-sm ${i.enabled ? 'btn-outline-secondary' : 'btn-outline-success'}`}>{i.enabled ? 'Disable' : 'Enable'}</button>
                          </div>
                        </div>

                        {integrationConfigOpen === i.id && (
                          <div className="mt-3 border-top pt-3">
                            <div className="row g-2 align-items-end">
                              <div className="col-md-4">
                                <label className="form-label">Client ID</label>
                                <input className="form-control" value={(credsById[i.id]?.clientId) || ''} onChange={e => changeCredField(i.id, 'clientId', e.target.value)} />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">Client Secret</label>
                                <input className="form-control" type="password" value={(credsById[i.id]?.clientSecret) || ''} onChange={e => changeCredField(i.id, 'clientSecret', e.target.value)} />
                              </div>
                              <div className="col-md-4 text-end">
                                <button className="btn btn-primary me-2" onClick={() => saveIntegrationCredentials(i.id)}>Save</button>
                                <button className="btn btn-secondary" onClick={() => setIntegrationConfigOpen(null)}>Cancel</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <hr />

                  <h6 className="mt-3">Add New Integration</h6>
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Integration Type</label>
                      <select ref={apiTypeRef} className="form-select">
                        <option>GPS</option>
                        <option>HRMS</option>
                        <option>Accounting</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Provider</label>
                      <input ref={apiProviderRef} className="form-control" placeholder="e.g. Provider name or API endpoint" />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Client ID</label>
                      <input ref={apiClientIdRef} className="form-control" placeholder="client id (optional)" />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Client Secret</label>
                      <input ref={apiClientSecretRef} className="form-control" placeholder="client secret (optional)" />
                    </div>
                  </div>
                  <button onClick={addIntegration} className="btn btn-primary">Add Integration</button>

                </div>
              </div>
            </div>
          </div>
        );

      case 'data-import-export':
         return (
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Bulk Import</h5>
                  <p className="text-muted">Bulk upload master data (customers, sites, assets).</p>
                  <div className="mb-3">
                    <label className="form-label">Entity</label>
                    <select ref={importEntityRef} className="form-select">
                      <option>Customers</option>
                      <option>Sites</option>
                      <option>Assets</option>
                      <option>Work Orders</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Upload File (CSV)</label>
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
                    <select ref={exportEntityRef} className="form-select">
                      <option>Customers</option>
                      <option>Sites</option>
                      <option>Assets</option>
                      <option>Work Orders</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Format</label>
                    <select ref={exportFormatRef} className="form-select">
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

      case 'audit-trail':
         return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Audit Trail</h5>
                  <p className="text-muted">System-wide log of changes.</p>

                  <div className="mb-3 row">
                    <div className="col-md-3 mb-2">
                      <input value={auditFilter.user} onChange={e => handleAuditFilterChange('user', e.target.value)} className="form-control" placeholder="User" />
                    </div>
                    <div className="col-md-3 mb-2">
                      <input value={auditFilter.from} onChange={e => handleAuditFilterChange('from', e.target.value)} type="date" className="form-control" />
                    </div>
                    <div className="col-md-3 mb-2">
                      <input value={auditFilter.to} onChange={e => handleAuditFilterChange('to', e.target.value)} type="date" className="form-control" />
                    </div>
                    <div className="col-md-3 text-end">
                      <button className="btn btn-primary" onClick={() => pushAudit('admin','Filter','Audit','Applied filters')}>Filter</button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Timestamp</th>
                          <th>User</th>
                          <th>Action</th>
                          <th>Entity</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAudit.map((row, idx) => (
                          <tr key={idx}>
                            <td>{new Date(row.timestamp).toLocaleString()}</td>
                            <td>{row.user}</td>
                            <td>{row.action}</td>
                            <td>{row.entity}</td>
                            <td>{row.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );

      case 'backup-and-restore':
         return (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Backup & Restore</h5>
                  <p className="text-muted">Manage database backups and restores.</p>

                  <div className="mb-3">
                    <button className="btn btn-primary me-2" onClick={createBackup}>Create Backup</button>
                    <button className="btn btn-outline-secondary" onClick={() => { if (backups[0]) downloadBackup(backups[0].id); else alert('No backups available'); }}>Download Latest</button>
                  </div>

                  <hr />

                  <h6>Available Backups</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Backup Name</th>
                          <th>Date</th>
                          <th>Size</th>
                          <th style={{width: '160px'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {backups.map(b => (
                          <tr key={b.id}>
                            <td>{b.name}</td>
                            <td>{new Date(b.date).toLocaleString()}</td>
                            <td>{b.size}</td>
                            <td>
                              <button onClick={() => restoreBackup(b.id)} className="btn btn-sm btn-outline-primary me-1">Restore</button>
                              <button onClick={() => downloadBackup(b.id)} className="btn btn-sm btn-outline-secondary me-1">Download</button>
                              <button onClick={() => deleteBackup(b.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <hr />

                  <h6 className="mt-3">Restore from File</h6>
                  <div className="mb-3">
                    <input onChange={e => handleBackupUpload(e.target.files?.[0])} type="file" className="form-control" />
                  </div>
                  <button onClick={() => alert('Choose a backup file to upload above')} className="btn btn-danger">Upload & Restore</button>

                </div>
              </div>
            </div>
          </div>
        );

      default:
        // Overview section
        return (
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Configuration Overview</h5>
                    <p className="text-muted">Select a configuration area from the menu to manage settings.</p>
                  </div>
                </div>
              </div>
            </div>
        );
    }
  };

return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">{sectionInfo.title}</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="/configuration">Configuration</Link>
                </li>
                <li className="breadcrumb-item active">{sectionInfo.breadcrumb}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {renderSectionContent()}
    </>
  );
};

export default ConfigurationDetails;