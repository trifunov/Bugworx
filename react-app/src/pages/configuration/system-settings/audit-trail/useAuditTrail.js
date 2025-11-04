import { useState, useMemo, useEffect } from 'react';
import { useAudit } from '../../../../contexts/AuditContext'
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

export const useAuditTrail = () => {
    const { setPageSubHeader } = usePageSubHeader();
    useEffect(() => {
        setPageSubHeader({
            title: "Audit Trail",
            breadcrumbs: [
                { label: "Configuration", path: "/configuration/general" },
                { label: "System Settings", path: "/configuration/general" },
                { label: "Audit Trail", isActive: true }
            ]
        });
    }, [setPageSubHeader]);

    const { auditTrail } = useAudit();
    const [auditFilter, setAuditFilter] = useState({ user: '', from: '', to: '' });

    const handleAuditFilterChange = (field, value) => {
        setAuditFilter({ ...auditFilter, [field]: value });
    };

    const filteredAudit = useMemo(() => auditTrail.filter(entry => {
        if (auditFilter.user && !entry.user.toLowerCase().includes(auditFilter.user.toLowerCase())) return false;
        if (auditFilter.from && new Date(entry.timestamp) < new Date(auditFilter.from)) return false;
        if (auditFilter.to && new Date(entry.timestamp) > new Date(auditFilter.to).setHours(23, 59, 59, 999)) return false;
        return true;
    }), [auditTrail, auditFilter]);

    return { auditFilter, handleAuditFilterChange, filteredAudit };
};