export async function save(formData, onSaveCallback, setIsSaving, close, setErrors, validate) {
    if (!validate()) {
        return false;
    }

    setIsSaving(true);
    try {
        if (onSaveCallback) {
            await onSaveCallback(formData);
        }
        close();
        return true;
    } catch (error) {
        setErrors({ submit: error.message || 'Failed to save service address' });
        return false;
    } finally {
        setIsSaving(false);
    }
}

export function updateField(field, value, setFormData, errors, setErrors) {
    setFormData(prev => ({
        ...prev,
        [field]: value
    }));
    if (errors[field]) {
        setErrors(prev => ({
            ...prev,
            [field]: null
        }));
    }
}