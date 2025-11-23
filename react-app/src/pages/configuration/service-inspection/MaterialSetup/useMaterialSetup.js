import { useState } from 'react';
import { getMaterialSetups, saveMaterialSetups } from '../../../../utils/localStorage';

export const useMaterialSetup = () => {
    const [items, setItems] = useState(getMaterialSetups() || []);
    
    const initialFormState = {
        name: '',
        inventoryId: '',
        sdsUrl: '',
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
        saveMaterialSetups(updated);
        setForm(initialFormState); 
    };

    const removeItem = (id) => {
        if(!window.confirm('Are you sure you want to delete this material setup?')) return;
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveMaterialSetups(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};

export default useMaterialSetup;