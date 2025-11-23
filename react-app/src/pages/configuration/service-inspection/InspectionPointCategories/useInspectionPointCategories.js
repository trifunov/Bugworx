import { useState } from 'react';
import { getInspectionPointCategories, saveInspectionPointCategories } from '../../../../utils/localStorage';

export const useInspectionPointCategories = () => {
    const [items, setItems] = useState(getInspectionPointCategories() || []);
    
    const initialFormState = {
        name: '',
        description: '',
    };

    const [form, setForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.name.trim()) return;

        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        saveInspectionPointCategories(updated);
        setForm(initialFormState); 
    };

    const removeItem = (id) => {
        if(!window.confirm('Are you sure you want to delete this inspection point category?')) return;
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveInspectionPointCategories(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};

export default useInspectionPointCategories;