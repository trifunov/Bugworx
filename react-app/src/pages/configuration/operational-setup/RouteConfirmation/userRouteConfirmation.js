import { useState, useEffect } from 'react';
import { getRouteConfiguration, saveRouteConfiguration, getOperationalZones } from '../../../utils/localStorage';

export const useRouteConfiguration = () => {
    const [items, setItems] = useState(getRouteConfiguration());
    const [zones, setZones] = useState(getOperationalZones());
    const [form, setForm] = useState({ routeName: '', zone: '', defaultTechnician: '', stops: '' });

    useEffect(() => {
        // This effect can refresh data if it changes elsewhere, e.g., if zones are updated.
        setItems(getRouteConfiguration());
        setZones(getOperationalZones());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.routeName.trim()) return;
        const updated = [...items, {
            id: Date.now(),
            ...form,
            stops: form.stops.split(',').map(s => s.trim()).filter(Boolean)
        }];
        setItems(updated);
        saveRouteConfiguration(updated);
        setForm({ routeName: '', zone: '', defaultTechnician: '', stops: '' });
    };

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveRouteConfiguration(updated);
    };

    return {
        items,
        zones,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};