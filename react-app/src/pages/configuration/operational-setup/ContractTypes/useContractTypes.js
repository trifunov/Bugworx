import { useState } from 'react';
import { getContractTypes, saveContractTypes } from '../../../../utils/localStorage';

export const useContractTypes = () => {
    const [items, setItems] = useState(getContractTypes());
    const [form, setForm] = useState({ name: '', description: '', billingCycle: 'Monthly', active: true });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const addItem = () => {
        if (!form.name.trim()) return;
        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        saveContractTypes(updated);
        setForm({ name: '', description: '', billingCycle: 'Monthly', active: true }); // Reset form
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveContractTypes(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};