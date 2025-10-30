import { useState } from 'react';
import { save, updateField } from '../../../../utils/addEditFormUtils';

const useAddEditArea = () => {
    const [isOpen, setIsOpen] = useState(false);

    const defaultForm = {
        id: 0,
        name: '',
        facilityId: null // required
    };

    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const open = (area) => {
        setFormData({
            id: area?.id || 0,
            name: area?.name || '',
            facilityId: area?.facilityId ?? null
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
            newErrors.name = 'Area name is required';
        }

        if (formData.facilityId === null || formData.facilityId === undefined || formData.facilityId === '') {
            newErrors.facilityId = 'Facility is required';
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

export default useAddEditArea;
