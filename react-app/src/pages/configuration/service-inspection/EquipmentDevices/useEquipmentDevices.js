import { useState } from 'react';
import { getEquipmentDevices, saveEquipmentDevices } from '../../../../utils/localStorage';

export const useEquipmentDevices = () => {
    const [items, setItems] = useState(getEquipmentDevices() || []);
    
    const initialFormState = {
        name: '',
        type: '',
        description: '',
    };

    const [form, setForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const addItem = () => {
        if (!form.name.trim() || !form.type.trim()) return;

        const updated = [...items, { id: Date.now(), ...form }];
        setItems(updated);
        saveEquipmentDevices(updated);
        setForm(initialFormState); 
    };

    const removeItem = (id) => {
        if(!window.confirm('Are you sure you want to delete this equipment device?')) return;
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        saveEquipmentDevices(updated);
    };

    return {
        items,
        form,
        handleChange,
        addItem,
        removeItem,
    };
};

export default useEquipmentDevices;