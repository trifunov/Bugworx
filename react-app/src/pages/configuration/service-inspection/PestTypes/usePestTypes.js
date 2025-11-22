import { useState } from 'react';
import { getPestTypes, savePestTypes } from '../../../../utils/localStorage';

export const usePestTypes = () => {
    const [items, setItems] = useState(getPestTypes() || []);
    
    const initialFormState = {
        name: '',
        category: '',
        riskLevel: 'Low',
    };

    const [form, setForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.name.trim() || !form.category.trim()) return;

        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        savePestTypes(updated);
        setForm(initialFormState); 
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        savePestTypes(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};

export default usePestTypes;