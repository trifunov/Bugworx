import { useState } from 'react';
import { getInventory, setInventory } from '../../utils/localStorage';

const randomint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// This would typically be in a separate API service file
const saveInventoryItemApi = async (itemData) => {
    console.log('Saving item:', itemData);

    // Read the current inventory, update it, and save it back to localStorage
    const inventory = getInventory() || [];
    const isExisting = itemData.id != null;
    let savedItem;
    console.log('Is existing item:', isExisting);
    if (isExisting) {
        const updatedInventory = inventory.map(item =>
            item.id === itemData.id ? itemData : item
        );
        setInventory(updatedInventory);
        savedItem = itemData;
    } else {
        // Assign a new ID for new items
        savedItem = { ...itemData, id: Date.now() };
        const updatedInventory = [...inventory, savedItem];
        setInventory(updatedInventory);
    }
    return savedItem;
};


export const useAddEditInventory = (onSuccess) => {
    const initialFormData = {
        id: null,
        itemName: "",
        sku: "",
        itemType: "",
        category: "",
        subCategory: "",
        description: "",
        manufacturer: "",
        supplier: "",
        active: true,
        // Chemical
        epa: "",
        activeIng: "",
        concentration: "",
        formulationType: "",
        hazardClassification: "",
        sds: null,
        sdsUrl: "",
        expiry: "",
        batchEnabled: false,
        // Stock
        trackStock: true,
        uom: "",
        quantity: "",
        minStock: "",
        reorderPoint: "",
        reorderQuantity: "",
        cost: "",
        price: "",
        sellingPricePerUnit: "",
        warehouseLocation: "",
        storageRequirements: "",
        barcode: "",
        // Usage
        assignedTo: "",
        defaultUsageUnit: "",
        trackPerSite: false,
        returnable: false,
        serialized: false,
        negativeStock: false,
        // Admin
        createdBy: "",
        updatedBy: "",
        notes: ""
    };

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const open = () => {
        setFormData(initialFormData);
        setErrors({});
        setIsOpen(true);
    };

    const onOpenEdit = (item) => {
        setFormData({ ...initialFormData, ...item });
        setErrors({});
        setIsOpen(true);
    };

    const close = () => {
        if (isSaving) return;
        setIsOpen(false);
        // Delay resetting form until after the closing animation
        setTimeout(() => {
            setFormData(initialFormData);
            setErrors({});
        }, 300);
    };

    const onUpdateFieldHandle = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear the error for the field being updated
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.itemName.trim()) {
            newErrors.itemName = 'Item Name is required.';
        }
        if (!formData.sku.trim()) {
            newErrors.sku = 'SKU is required.';
        }
        if (!formData.itemType) {
            newErrors.itemType = 'Item Type is required.';
        }
        if (formData.cost && isNaN(parseFloat(formData.cost))) {
            newErrors.cost = 'Cost must be a valid number.';
        }
        if (formData.price && isNaN(parseFloat(formData.price))) {
            newErrors.price = 'Price must be a valid number.';
        }
        return newErrors;
    };

    const onSaveHandle = async (handler) => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSaving(true);
        setErrors({});

        try {
            const savedItem = await saveInventoryItemApi(formData);
            if (onSuccess) {
                onSuccess(savedItem); // Notify parent component of success
            }
            close();
        } catch (error) {
            console.error('Save failed:', error);
            setErrors({ submit: error.message || 'Could not save the item. Please try again.' });
        } finally {
            setIsSaving(false);
            handler(formData); // Notify context to reload inventory
        }
    };

    return {
        // State
        isOpen,
        formData,
        errors,
        isSaving,
        // Actions
        open,
        onOpenEdit,
        close,
        onUpdateFieldHandle,
        onSaveHandle,
    };
};

export default useAddEditInventory;