import { useState, useEffect, useRef } from 'react';
import * as ls from '../../../../utils/localStorage'
import { useAudit } from '../../../../contexts/AuditContext'

export const useApiIntegrations = () => {
    const { pushAudit } = useAudit();
    const [apiIntegrations, setApiIntegrations] = useState([]);
    const apiTypeRef = useRef(null);
    const apiProviderRef = useRef(null);
    const apiClientIdRef = useRef(null);
    const apiClientSecretRef = useRef(null);
    const [integrationConfigOpen, setIntegrationConfigOpen] = useState(null);
    const [credsById, setCredsById] = useState({});

    useEffect(() => {
        setApiIntegrations(ls.getFromStorage('apiIntegrations', [
            { id: 'gps', name: 'GPS / Telemetry', enabled: true, details: '', type: 'GPS', provider: 'DefaultGPS', clientId: '', clientSecret: '' },
            { id: 'hrms', name: 'HRMS', enabled: false, details: '', type: 'HRMS', provider: 'DefaultHRMS', clientId: '', clientSecret: '' },
            { id: 'acct', name: 'Accounting', enabled: false, details: '', type: 'Accounting', provider: 'DefaultAccounting', clientId: '', clientSecret: '' }
        ]));
    }, []);

    const toggleIntegration = (id) => {
        const next = apiIntegrations.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i);
        setApiIntegrations(next);
        ls.setToStorage('apiIntegrations', next);
        pushAudit('admin', 'Toggle', 'APIIntegration', id);
    };

    const addIntegration = () => {
        const type = apiTypeRef.current?.value;
        const provider = apiProviderRef.current?.value?.trim();
        const clientId = apiClientIdRef.current?.value?.trim() || '';
        const clientSecret = apiClientSecretRef.current?.value?.trim() || '';
        if (!provider) {
            alert('Provider required');
            return;
        }
        const newInt = { id: Date.now().toString(), name: `${type} - ${provider}`, type, provider, enabled: true, clientId, clientSecret };
        const next = [...apiIntegrations, newInt];
        setApiIntegrations(next);
        ls.setToStorage('apiIntegrations', next);
        pushAudit('admin', 'Create', 'APIIntegration', provider);
        if (apiProviderRef.current) apiProviderRef.current.value = '';
        if (apiClientIdRef.current) apiClientIdRef.current.value = '';
        if (apiClientSecretRef.current) apiClientSecretRef.current.value = '';
    };

    const openIntegrationConfig = (id) => {
        const nextId = integrationConfigOpen === id ? null : id;
        setIntegrationConfigOpen(nextId);
        if (nextId) {
            const target = apiIntegrations.find(i => i.id === id);
            setCredsById(prev => ({ ...prev, [id]: { clientId: target?.clientId || '', clientSecret: target?.clientSecret || '' } }));
        }
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

    return {
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
    };
};