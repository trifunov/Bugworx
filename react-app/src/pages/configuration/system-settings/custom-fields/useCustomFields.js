import { useState, useEffect, useRef } from 'react';
import { getCustomFields, saveCustomFields } from '../../../../utils/localStorage';
import { usePageSubHeader } from '../../../../contexts/PageSubHeaderContext';

export const useCustomFields = () => {
    const { setPageSubHeader } = usePageSubHeader();
    const [customFields, setCustomFields] = useState([]);
    const customFieldLabelRef = useRef(null);
    const customFieldAppliesRef = useRef(null);
    const customFieldTypeRef = useRef(null);

    useEffect(() => {
        setCustomFields(getCustomFields());
        setPageSubHeader({
            title: "Custom Fields",
            breadcrumbs: [
                { label: "Configuration", path: "/configuration/general" },
                { label: "System Settings", path: "/configuration/general" },
                { label: "Custom Fields", isActive: true }
            ]
        });
    }, [setPageSubHeader]);

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
        saveCustomFields(next);
        pushAudit('admin', 'Create', 'CustomField', label);
        if (customFieldLabelRef.current) {
            customFieldLabelRef.current.value = '';
        }
    };

    const deleteCustomField = (id) => {
        if (!window.confirm('Delete this field?')) return;
        const next = customFields.filter(f => f.id !== id);
        setCustomFields(next);
        saveCustomFields(next);
        pushAudit('admin', 'Delete', 'CustomField', id);
    };

    const editCustomField = (id) => {
        const f = customFields.find(x => x.id === id);
        const newLabel = prompt('Edit label', f?.label || '');
        if (newLabel === null) return;
        const next = customFields.map(x => x.id === id ? { ...x, label: newLabel } : x);
        setCustomFields(next);
        saveCustomFields(next);
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