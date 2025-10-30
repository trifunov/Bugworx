import { useState } from 'react';
import { save, updateField } from '../../../utils/addEditFormUtils';

// Lead shape (from mockData):
// {
//   id,
//   name,
//   status,            // number e.g., 1 (New), 2 (Contacted)
//   dateCreated,       // 'YYYY-MM-DD'
//   customerId,        // related account/customer id
//   serviceInterest,   // string (service type)
//   assignedSalesRep,  // employee id
//   sourceId           // lead source id
// }

const useAddEditLead = () => {
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

    const open = (lead) => {
        setFormData({
            id: lead?.id || 0,
            name: lead?.name || '',
            status: lead?.status ?? 1,
            dateCreated: lead?.dateCreated || '',
            customerId: lead?.customerId ?? null,
            serviceInterest: lead?.serviceInterest || '',
            assignedSalesRep: lead?.assignedSalesRep ?? null,
            sourceId: lead?.sourceId ?? null
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
            newErrors.name = 'Lead name is required';
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

export default useAddEditLead;
