import { useState } from 'react';
import { getInventory, setInventory } from '../../utils/localStorage';
import { save, updateField } from '../../utils/addEditFormUtils';

export const useAddEditInventory = () => {
    const [isOpen, setIsOpen] = useState(false);

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
        costPerUnit: "",
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

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const open = (item) => {
        setFormData({
            id: item?.id || null,
            itemName: item?.itemName ||  "", 
            sku: item?.sku || "",
            itemType: item?.itemType || "",
            category: item?.category || "",
            subCategory: item?.subCategory || "",
            description: item?.description || "",
            manufacturer: item?.manufacturer || "",
            supplier: item?.supplier || "",
            active: item?.active !== undefined ? item.active : true,
            // Chemical
            epa: item?.epa || "",
            activeIng: item?.activeIng || "",
            concentration: item?.concentration || "",
            formulationType: item?.formulationType || "",
            hazardClassification: item?.hazardClassification || "",
            sds: item?.sds || null,
            sdsUrl: item?.sdsUrl || "",
            expiry: item?.expiry || "",
            batchEnabled: item?.batchEnabled || false,
            // Stock
            trackStock: item?.trackStock !== undefined ? item.trackStock : true,
            uom: item?.uom || "",
            quantity: item?.quantity || "",
            minStock: item?.minStock || "",
            reorderPoint: item?.reorderPoint || "",
            reorderQuantity: item?.reorderQuantity || "",
            cost: item?.cost || "",
            price: item?.price || "",
            sellingPricePerUnit: item?.sellingPricePerUnit || "",
            warehouseLocation: item?.warehouseLocation || "",
            storageRequirements: item?.storageRequirements || "",
            barcode: item?.barcode || "",
            // Usage
            assignedTo: item?.assignedTo || "",
            defaultUsageUnit: item?.defaultUsageUnit || "",
            trackPerSite: item?.trackPerSite || false,
            returnable: item?.returnable || false,
            serialized: item?.serialized || false,
            negativeStock: item?.negativeStock || false,
            // Admin
            createdBy: item?.createdBy || "",
            updatedBy: item?.updatedBy || "",
            notes: item?.notes || ""
        });
        setErrors({});
        setIsOpen(true);
    };

    const close = () => {
        if (isSaving) return;
        setIsOpen(false);
        setFormData(initialFormData);
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

    const validate = () => {
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

      const onSaveHandle = async (onSaveCallback) => {
           save(formData, onSaveCallback, setIsSaving, close, setErrors, validate);
       };
   

    return {
        // State
        isOpen,
        formData,
        errors,
        isSaving,
        // Actions
        open,
        close,
        onUpdateFieldHandle,
        onSaveHandle,
    };
};

export default useAddEditInventory;