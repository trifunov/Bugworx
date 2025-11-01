import { useState, useEffect } from 'react';
import { getServiceTypesSetup, saveServiceTypes } from '../../../../utils/localStorage';

export const useServiceTypes = () => {
    const [items, setItems] = useState(getServiceTypesSetup());
    const [form, setForm] = useState({ name: '', templateType: 'Scheduled Visit', durationMins: 60, notes: '' });

    useEffect(() => {
        setItems(getServiceTypesSetup());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'durationMins' ? Number(value) : value }));
    };

    const addItem = () => {
        if (!form.name.trim()) return;
        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        saveServiceTypes(updated);
        setForm({ name: '', templateType: 'Scheduled Visit', durationMins: 60, notes: '' });
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveServiceTypes(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};