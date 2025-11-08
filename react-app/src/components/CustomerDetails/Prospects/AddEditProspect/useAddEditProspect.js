import { useState } from 'react';
import { save, updateField } from '../../../../utils/addEditFormUtils';

const useAddEditProspect = () => {
    const [isOpen, setIsOpen] = useState(false);

    const defaultForm = {
        id: 0,
        name: '',
        status: 1,
        dateCreated: '',
        customerId: null,
        serviceInterest: '',
        assignedSalesRep: null,
        sourceId: null
    };

    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const open = (prospect) => {
        setFormData({
            id: prospect?.id || 0,
            name: prospect?.name || '',
            status: prospect?.status ?? 1,
            dateCreated: prospect?.dateCreated || '',
            customerId: prospect?.customerId ?? null,
            serviceInterest: prospect?.serviceInterest || '',
            assignedSalesRep: prospect?.assignedSalesRep ?? null,
            sourceId: prospect?.sourceId ?? null
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
            newErrors.name = 'Prospect name is required';
        }

        if (formData.customerId === null || formData.customerId === undefined || formData.customerId === '') {
            newErrors.customerId = 'Customer is required';
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

export default useAddEditProspect;

