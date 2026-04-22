import { useState } from 'react';
import { save, updateField } from '../../../utils/addEditFormUtils';

export const FREQUENCIES = ['weekly', 'biweekly', 'monthly', 'quarterly', 'annually'];
export const STATUSES = ['Active', 'Paused', 'Expired', 'Draft'];

const useAddEditProgram = () => {
    const [isOpen, setIsOpen] = useState(false);

    const defaultForm = {
        id: null,
        leadId: '',
        name: '',
        serviceType: '',
        frequency: 'monthly',
        status: 'Active',
        startDate: '',
        endDate: '',
        serviceAddressIds: [],
        assignedTechnicianId: '',
        estimatedDuration: 60,
        notes: '',
    };

    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const open = (program = null) => {
        if (program) {
            setFormData({
                ...program,
                leadId: program.leadId || '',
                endDate: program.endDate || '',
                serviceAddressIds: program.serviceAddressIds || [],
                assignedTechnicianId: program.assignedTechnicianId || '',
                estimatedDuration: program.estimatedDuration || 60,
                notes: program.notes || '',
            });
        } else {
            setFormData(defaultForm);
        }
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

    const toggleSite = (siteId) => {
        setFormData((prev) => {
            const ids = prev.serviceAddressIds.includes(siteId)
                ? prev.serviceAddressIds.filter((i) => i !== siteId)
                : [...prev.serviceAddressIds, siteId];
            return { ...prev, serviceAddressIds: ids };
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name?.trim()) newErrors.name = 'Program name is required';
        if (!formData.serviceType?.trim()) newErrors.serviceType = 'Service type is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
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
        onSaveHandle,
        toggleSite,
    };
};

export default useAddEditProgram;
