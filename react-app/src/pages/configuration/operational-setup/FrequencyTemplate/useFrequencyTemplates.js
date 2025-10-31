import { useState, useEffect } from 'react';
import { getJobSettings, saveJobSettings } from '../../../utils/localStorage';

const initialSettings = {
    defaultStatus: 'Open',
    numberingFormat: 'JOB-{YYYY}-{SEQ}',
    slaHours: 48,
    escalations: ''
};

export const useFrequencyTemplates = () => {
    const [settings, setSettings] = useState(initialSettings);

    useEffect(() => {
        const s = getJobSettings();
        setSettings(Object.keys(s).length ? s : initialSettings);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: name === 'slaHours' ? Number(value) : value }));
    };

    const save = () => {
        saveJobSettings(settings);
    };

    return {
        settings,
        handleChange,
        save,
    };
};