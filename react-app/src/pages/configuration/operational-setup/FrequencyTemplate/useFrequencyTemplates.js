import { useState } from 'react';

export const useFrequencyTemplates = () => {
    const [settings, setSettings] = useState({
        defaultStatus: 'Open',
        numberingFormat: '',
        slaHours: 0,
        escalations: '',
        repeatSchedule: 'weekly', // Default to weekly
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const save = () => {
        // Logic to save settings, e.g., API call
        console.log('Settings saved:', settings);
    };

    return { settings, handleChange, save };
};