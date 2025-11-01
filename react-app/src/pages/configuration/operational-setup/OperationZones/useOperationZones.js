import { useState, useEffect } from 'react';
import { getOperationalZones, saveOperationalZones } from '../../../../utils/localStorage';

export const useOperationZones = () => {
    const [items, setItems] = useState(getOperationalZones());
    const [form, setForm] = useState({ zoneName: '', description: '', assignedClients: '', assignedSites: '' });

    useEffect(() => {
        setItems(getOperationalZones());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.zoneName.trim()) return;
        const updated = [...items, {
            id: Date.now(),
            zoneName: form.zoneName,
            description: form.description,
            assignedClients: form.assignedClients.split(',').map(s => s.trim()).filter(Boolean),
            assignedSites: form.assignedSites.split(',').map(s => s.trim()).filter(Boolean)
        }];
        setItems(updated);
        saveOperationalZones(updated);
        setForm({ zoneName: '', description: '', assignedClients: '', assignedSites: '' });
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveOperationalZones(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};