import { useState } from 'react';
import { getServiceTemplates, saveServiceTemplates } from '../../../../utils/localStorage';

export const useServiceTemplates = () => {
    const [items, setItems] = useState(getServiceTemplates() || []);
    
    const initialFormState = {
        name: '',
        description: '',
        checklist: '', // Stored as a string in the form, will be an array in the final item
    };

    const [form, setForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.name.trim() || !form.checklist.trim()) return;

        const checklistItems = form.checklist.split('\n').filter(item => item.trim() !== '');

        const newTemplate = { 
            id: Date.now(), 
            name: form.name,
            description: form.description,
            checklist: checklistItems 
        };

        const updated = [...items, newTemplate];
        setItems(updated);
        saveServiceTemplates(updated);
        setForm(initialFormState); 
    };

    const removeItem = (id) => {
        if(!window.confirm('Are you sure you want to delete this service template?')) return;
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveServiceTemplates(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};

export default useServiceTemplates;