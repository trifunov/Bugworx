import { useState } from 'react';

const useAddEditRole = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({});

    const open = (initialData = {}) => {
        // Convert permissions array to a comma-separated string for the form input
        const preparedData = {
            ...initialData,
            permissions: Array.isArray(initialData.permissions) ? initialData.permissions.join(', ') : '',
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
            console.error("Failed to save role:", error);
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

export default useAddEditRole;