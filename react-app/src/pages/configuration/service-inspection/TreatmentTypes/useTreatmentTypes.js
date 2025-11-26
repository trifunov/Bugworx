import { useState } from 'react';
import { getTreatmentTypes, saveTreatmentTypes } from '../../../../utils/localStorage';

export const useTreatmentTypes = () => {
    const [items, setItems] = useState(getTreatmentTypes() || []);
    
    const initialFormState = {
        method: '',
        chemicals: '',
        protocols: '',
    };

    const [form, setForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.method.trim()) return;

        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        saveTreatmentTypes(updated);
        setForm(initialFormState); 
    };

    const removeItem = (id) => {
        if(!window.confirm('Are you sure you want to delete this treatment type?')) return;
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveTreatmentTypes(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};

export default useTreatmentTypes;