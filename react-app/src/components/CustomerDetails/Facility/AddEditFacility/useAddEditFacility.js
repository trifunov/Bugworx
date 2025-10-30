import { useState } from 'react';
import { save, updateField } from '../../../../utils/addEditFormUtils'

const useAddEditFacility = (accountId) => {
    const [isOpen, setIsOpen] = useState(false);
    const defaultForm = {
        id: 0,
        name: '',
        siteId: null, // required
        drawing: {
            id: '',
            name: '',
            url: ''
        }
    };
    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const open = (facility) => {
        setFormData({
            id: facility?.id || 0,
            name: facility?.name || '',
            siteId: facility?.siteId ?? null,
            drawing: {
                id: facility?.drawing?.id || '',
                name: facility?.drawing?.name || '',
                url: facility?.drawing?.url || ''
            }
        });
        setErrors({});
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setFormData(defaultForm);
        setErrors({});
    };

    const onUpdateFieldHandle = (field, value) => {
        updateField(field, value, setFormData, errors, setErrors);
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name?.trim()) {
            newErrors.name = 'Facility name is required';
        }

        if (formData.siteId === null || formData.siteId === undefined || formData.siteId === '') {
            newErrors.siteId = 'Site is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSaveHandle = async (onSaveCallback) => {
        save(formData, onSaveCallback, setIsSaving, close, setErrors, validate);
    };

    return {
        isOpen,
        formData,
        errors,
        isSaving,
        open,
        close,
        onUpdateFieldHandle,
        onSaveHandle
    };
};

export default useAddEditFacility;
