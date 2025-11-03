import React, { createContext, useState, useContext, useEffect } from 'react';
import * as ls from '../utils/localStorage';

const AuditContext = createContext(null);

export const useAudit = () => {
    const context = useContext(AuditContext);
    if (context === null) {
        throw new Error('useAudit must be used within an AuditProvider');
    }
    return context;
};

export const AuditProvider = ({ children }) => {
    const [auditTrail, setAuditTrail] = useState(() => ls.getFromStorage('auditTrail', []));

    const pushAudit = (user, action, entity, details) => {
        const entry = {
            timestamp: new Date().toISOString(),
            user: user || 'system',
            action,
            entity,
            details
        };
        setAuditTrail(prevTrail => {
            const next = [entry, ...prevTrail];
            ls.setToStorage('auditTrail', next);
            return next;
        });
    };

    const value = { auditTrail, setAuditTrail, pushAudit };

    return (
        <AuditContext.Provider value={value}>
            {children}
        </AuditContext.Provider>
    );
};

export default AuditContext;