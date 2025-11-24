import { useState } from 'react';

const useAddEditServiceType = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({});

    const open = (initialData = { templateType: 'Scheduled Visit', durationMins: 60 }) => {
        setFormData(initialData);
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
            console.error("Failed to save service type:", error);
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

export default useAddEditServiceType;