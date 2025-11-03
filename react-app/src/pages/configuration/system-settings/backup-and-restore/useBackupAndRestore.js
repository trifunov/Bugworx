import { useState, useEffect } from 'react';
import * as ls from '../../../../utils/localStorage'
import { useAudit } from '../../../../contexts/AuditContext'

export const useBackupAndRestore = () => {
    const { pushAudit, setAuditTrail } = useAudit();
    const [backups, setBackups] = useState([]);

    useEffect(() => {
        setBackups(ls.getFromStorage('backups', []));
    }, []);

    const createBackup = () => {
        const snapshot = {
            companyProfile: ls.getFromStorage('companyProfile', {}),
            customFields: ls.getFromStorage('customFields', []),
            apiIntegrations: ls.getFromStorage('apiIntegrations', []),
            auditTrail: ls.getFromStorage('auditTrail', [])
        };
        const content = JSON.stringify(snapshot, null, 2);
        const name = `backup_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')}.json`;
        const entry = { id: Date.now().toString(), name, date: new Date().toISOString(), size: `${Math.round(content.length / 1024)} KB`, content };
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
        if (!window.confirm('This will overwrite stored configuration from the backup. Proceed?')) return;
        const b = backups.find(x => x.id === id);
        if (!b) return;
        try {
            const data = JSON.parse(b.content);
            // We need a way to update other sections' state. For now, we just update localStorage.
            // A full implementation would use a global state manager or context to propagate these changes.
            if (data.companyProfile) ls.setToStorage('companyProfile', data.companyProfile);
            if (data.customFields) ls.setToStorage('customFields', data.customFields);
            if (data.apiIntegrations) ls.setToStorage('apiIntegrations', data.apiIntegrations);
            if (data.auditTrail) {
                ls.setToStorage('auditTrail', data.auditTrail);
                setAuditTrail(data.auditTrail); // Update context state
            }
            pushAudit('admin', 'Restore', 'Backup', b.name);
            alert('Restore completed. Please refresh the page to see all changes.');
        } catch (e) {
            alert('Restore failed: invalid backup content.');
        }
    };

    const deleteBackup = (id) => {
        if (!window.confirm('Delete this backup?')) return;
        const b = backups.find(b => b.id === id);
        const next = backups.filter(b => b.id !== id);
        setBackups(next);
        ls.setToStorage('backups', next);
        pushAudit('admin', 'Delete', 'Backup', b?.name || id);
    };

    const handleBackupUpload = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = e => {
            const content = e.target.result;
            const name = file.name;
            const entry = { id: Date.now().toString(), name, date: new Date().toISOString(), size: `${Math.round(content.length / 1024)} KB`, content };
            const next = [entry, ...backups];
            setBackups(next);
            ls.setToStorage('backups', next);
            pushAudit('admin', 'Upload', 'Backup', name);
            alert('Backup uploaded and stored.');
        };
        reader.readAsText(file);
    };

    return { backups, createBackup, downloadBackup, restoreBackup, deleteBackup, handleBackupUpload };
};