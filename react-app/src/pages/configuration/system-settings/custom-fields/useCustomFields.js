import { useState, useEffect, useRef } from 'react';
import * as ls from '../../../../utils/localStorage'
import { useAudit } from '../../../../contexts/AuditContext'

export const useCustomFields = () => {
    const { pushAudit } = useAudit();
    const [customFields, setCustomFields] = useState([]);
    const customFieldLabelRef = useRef(null);
    const customFieldAppliesRef = useRef(null);
    const customFieldTypeRef = useRef(null);

    useEffect(() => {
        setCustomFields(ls.getFromStorage('customFields', []));
    }, []);

    const addCustomField = () => {
        const label = customFieldLabelRef.current?.value?.trim();
        const applies = customFieldAppliesRef.current?.value;
        const type = customFieldTypeRef.current?.value;
        if (!label) {
            alert('Field label required');
            return;
        }
        const newField = { id: Date.now().toString(), label, type, applies };
        const next = [...customFields, newField];
        setCustomFields(next);
        ls.setToStorage('customFields', next);
        pushAudit('admin', 'Create', 'CustomField', label);
        if (customFieldLabelRef.current) {
            customFieldLabelRef.current.value = '';
        }
    };

    const deleteCustomField = (id) => {
        if (!window.confirm('Delete this field?')) return;
        const next = customFields.filter(f => f.id !== id);
        setCustomFields(next);
        ls.setToStorage('customFields', next);
        pushAudit('admin', 'Delete', 'CustomField', id);
    };

    const editCustomField = (id) => {
        const f = customFields.find(x => x.id === id);
        const newLabel = prompt('Edit label', f?.label || '');
        if (newLabel === null) return;
        const next = customFields.map(x => x.id === id ? { ...x, label: newLabel } : x);
        setCustomFields(next);
        ls.setToStorage('customFields', next);
        pushAudit('admin', 'Update', 'CustomField', id);
    };

    return {
        customFields,
        customFieldLabelRef,
        customFieldAppliesRef,
        customFieldTypeRef,
        addCustomField,
        deleteCustomField,
        editCustomField
    };
};