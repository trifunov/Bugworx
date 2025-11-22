import { useState } from 'react';
// Ensure these utility functions exist in your localStorage utils or replace with generic getItem/setItem
import { getInspectionPointTypes, saveInspectionPointTypes } from '../../../../utils/localStorage';

export const useInspectionPointTypes = () => {
    // Fallback to empty array if utility returns null/undefined
    const [items, setItems] = useState(getInspectionPointTypes() || []);

    const initialFormState = {
        targetPests: '',
        materials: '',
        equipment: '',
        observations: '',
        applicationMethods: '',
        reasons: ''
    };

    const [form, setForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        // Basic validation to ensure at least Target Pests is filled
        if (!form.targetPests.trim()) return;

        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        saveInspectionPointTypes(updated);
        setForm(initialFormState); // Reset form
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveInspectionPointTypes(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};

export default useInspectionPointTypes;