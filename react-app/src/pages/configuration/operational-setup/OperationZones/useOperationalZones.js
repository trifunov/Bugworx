import { useState, useEffect } from 'react';
import { getOperationalZones, saveOperationalZones } from '../../../../utils/localStorage';

export const useOperationalZones = () => {
    const [items, setItems] = useState(getOperationalZones());

    useEffect(() => {
        saveOperationalZones(items);
    }, [items]);

    const saveItem = (formData) => {
        if (formData.id) {
            setItems(prev => prev.map(it => (it.id === formData.id ? formData : it)));
        } else {
            const newItem = { ...formData, id: Date.now().toString() };
            setItems(prev => [newItem, ...prev]);
        }
    };

    const removeItem = (id) => {
        if (!window.confirm('Are you sure you want to delete this zone?')) return;
        setItems(prev => prev.filter(it => it.id !== id));
    };

    return {
        items,
        saveItem,
        removeItem,
    };
};

export default useOperationalZones;