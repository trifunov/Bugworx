import React from 'react';
import { useApiIntegrations } from './useApiIntegrations';

const ApiIntegrations = () => {
    const {
        apiIntegrations,
        apiTypeRef,
        apiProviderRef,
        apiClientIdRef,
        apiClientSecretRef,
        integrationConfigOpen,
        credsById,
        toggleIntegration,
        addIntegration,
        openIntegrationConfig,
        changeCredField,
        saveIntegrationCredentials
    } = useApiIntegrations();

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
                                                    <button className="btn btn-secondary" onClick={() => openIntegrationConfig(i.id)}>Cancel</button>
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
                                <select ref={apiTypeRef} className="form-select" defaultValue="GPS">
                                    <option>GPS</option>
                                    <option>HRMS</option>
                                    <option>Accounting</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Provider</label>
                                <input ref={apiProviderRef} className="form-control" placeholder="e.g. Provider name" />
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
};

export default ApiIntegrations;