import { useState, useEffect } from 'react';
import { getBackups, saveBackups, getCompanyProfile, getCustomFields, getApiIntegrations, getAuditTrail, saveCompanyProfile, saveCustomFields, saveApiIntegrations, saveAuditTrail } from '../../../../utils/localStorage';
import { useAudit } from '../../../../contexts/AuditContext';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

export const useBackupAndRestore = () => {
    const { pushAudit, setAuditTrail } = useAudit();
    const [backups, setBackups] = useState([]);
    const { setPageSubHeader } = usePageSubHeader();

    useEffect(() => {
        setBackups(getBackups());
        setPageSubHeader({
            title: "Backup & Restore",
            breadcrumbs: [
                { label: "Configuration", path: "/configuration/general" },
                { label: "System Settings", path: "/configuration/general" },
                { label: "Backup & Restore", isActive: true }
            ]
        });
    }, [setPageSubHeader]);

    const createBackup = () => {
        const snapshot = {
            companyProfile: getCompanyProfile(),
            customFields: getCustomFields(),
            apiIntegrations: getApiIntegrations(),
            auditTrail: getAuditTrail()
        };
        const content = JSON.stringify(snapshot, null, 2);
        const name = `backup_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')}.json`;
        const entry = { id: Date.now().toString(), name, date: new Date().toISOString(), size: `${Math.round(content.length / 1024)} KB`, content };
        const next = [entry, ...backups];
        setBackups(next);
        saveBackups(next);
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
            if (data.companyProfile) saveCompanyProfile(data.companyProfile);
            if (data.customFields) saveCustomFields(data.customFields);
            if (data.apiIntegrations) saveApiIntegrations(data.apiIntegrations);
            if (data.auditTrail) {
                saveAuditTrail(data.auditTrail);
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
        saveBackups(next);
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
            saveBackups(next);
            pushAudit('admin', 'Upload', 'Backup', name);
            alert('Backup uploaded and stored.');
        };
        reader.readAsText(file);
    };

    return { backups, createBackup, downloadBackup, restoreBackup, deleteBackup, handleBackupUpload };
};