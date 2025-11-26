import { useState } from 'react';

const useAddEditRoute = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({});

    const open = (initialData = {}) => {
        // Convert stops array to a comma-separated string for the form input
        const preparedData = {
            ...initialData,
            stops: Array.isArray(initialData.stops) ? initialData.stops.join(', ') : '',
        };
        setFormData(preparedData);
        setIsOpen(true);
    };

    const close = () => {
        if (isSaving) return;
        setIsOpen(false);
        setFormData({});
    };

    const onUpdateFieldHandle = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const onSaveHandle = async (saveFunction) => {
        setIsSaving(true);
        try {
            await saveFunction(formData);
            close();
        } catch (error) {
            console.error("Failed to save route:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return {
        isOpen,
        isSaving,
        formData,
        open,
        close,
        onUpdateFieldHandle,
        onSaveHandle
    };
};

export default useAddEditRoute;