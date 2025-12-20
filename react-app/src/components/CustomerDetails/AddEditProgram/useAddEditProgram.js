import { useState } from 'react';
import { save, updateField } from '../../../utils/addEditFormUtils';
import { getProgramTypeId, getProgramStatusId, getProgramTypeLabel, getProgramStatusLabel } from '../../../utils/programLookups';
import { addProgram, updateProgram, getProgramById } from '../../../utils/localStorage';

// Program shape inferred from elena3.html Program section
// Required fields: name, serviceAddressId
// Arrays: technicianIds, targetPests, entryPoints, equipmentRequired, certificatesRequired,
//         customerNotificationPreferences

const useAddEditProgram = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const defaultForm = {
        id: 0,
        name: '',
        serviceAddressId: null, // mirrors Facility pattern (serviceAddressId required)
        programTypeId: 1, // default to first type (Contractual)
        statusId: 1, // Active
        startDate: '',
        endDate: '',
        renewalDate: '',
        contractDuration: '',
        programCategory: '',
        accountManager: '',
        // Combined Service & Billing Details (aligned with programs.serviceBillingDetails)
        serviceBillingDetails: [
            {
                serviceEvent: '',
                scheduledDate: '',
                durationWindow: '', // e.g. "08:00-12:00"
                technicianIds: [],
                frequencyPattern: '',
                targetPests: [],
                entryPoints: [],
                equipmentRequired: [],
                billingFrequency: '',
                pricingModel: '',
                billingAmount: '',
                taxType: '',
                taxAmount: '',
                salesAmount: '',
                productionAmount: '',
                discounts: '',
                invoiceTerms: '',
                paymentMethod: '',
                priceHistoryRef: ''
            }
        ],
        // Compliance
        termsAndConditions: '',
        regulatoryRequirements: '',
        healthAndSafetyGuidelines: '',
        certificatesRequired: [],
        // Notifications
        nextServiceReminder: '',
        pastDueAlerts: '',
        customerNotificationPreferences: [],
        technicianAlerts: '',
        // Notes & Logs
        customInstructions: '',
        serviceHistorySummary: '',
        renewalHistory: '',
        auditLogRef: ''
    };

    const [formData, setFormData] = useState(defaultForm);

    const open = (programOrId) => {
        let program = null;
        if (!programOrId) {
            setFormData(defaultForm);
        } else if (typeof programOrId === 'number') {
            program = getProgramById(programOrId) || null;
        } else {
            program = programOrId;
        }

        if (program) {
            setFormData({
                id: program.id || 0,
                name: program.name || '',
                serviceAddressId: program.serviceAddressId ?? null,
                // Migration: if legacy string fields exist convert them to IDs
                programTypeId: program.programTypeId !== undefined ? program.programTypeId : getProgramTypeId(program.programType) || 1,
                statusId: program.statusId !== undefined ? program.statusId : getProgramStatusId(program.status) || 1,
                startDate: program.startDate || '',
                endDate: program.endDate || '',
                renewalDate: program.renewalDate || '',
                contractDuration: program.contractDuration || '',
                programCategory: program.programCategory || '',
                accountManager: program.accountManager || '',
                // Combined Service & Billing Details migration
                serviceBillingDetails: (program.serviceBillingDetails || []).map(sb => ({
                    serviceEvent: sb.serviceEvent || '',
                    scheduledDate: sb.scheduledDate || '',
                    durationWindow: sb.durationWindow || '',
                    technicianIds: Array.isArray(sb.technicianIds) ? sb.technicianIds : [],
                    frequencyPattern: sb.frequencyPattern || '',
                    targetPests: Array.isArray(sb.targetPests) ? sb.targetPests : [],
                    entryPoints: Array.isArray(sb.entryPoints) ? sb.entryPoints : [],
                    equipmentRequired: Array.isArray(sb.equipmentRequired) ? sb.equipmentRequired : [],
                    billingFrequency: sb.billingFrequency || '',
                    pricingModel: sb.pricingModel || '',
                    billingAmount: sb.billingAmount !== undefined ? String(sb.billingAmount) : '',
                    taxType: sb.taxType || '',
                    taxAmount: sb.taxAmount !== undefined ? String(sb.taxAmount) : '',
                    salesAmount: sb.salesAmount !== undefined ? String(sb.salesAmount) : '',
                    productionAmount: sb.productionAmount !== undefined ? String(sb.productionAmount) : '',
                    discounts: sb.discounts || '',
                    invoiceTerms: sb.invoiceTerms || '',
                    paymentMethod: sb.paymentMethod || '',
                    priceHistoryRef: sb.priceHistoryRef || ''
                })),
                termsAndConditions: program.termsAndConditions || '',
                regulatoryRequirements: program.regulatoryRequirements || '',
                healthAndSafetyGuidelines: program.healthAndSafetyGuidelines || '',
                certificatesRequired: program.certificatesRequired || [],
                nextServiceReminder: program.nextServiceReminder || '',
                pastDueAlerts: program.pastDueAlerts || '',
                customerNotificationPreferences: program.customerNotificationPreferences || [],
                technicianAlerts: program.technicianAlerts || '',
                customInstructions: program.customInstructions || '',
                serviceHistorySummary: program.serviceHistorySummary || '',
                renewalHistory: program.renewalHistory || '',
                auditLogRef: program.auditLogRef || ''
            });
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

    const validate = () => {
        const newErrors = {};
        if (!formData.name?.trim()) {
            newErrors.name = 'Program name is required';
        }
        if (formData.serviceAddressId === null || formData.serviceAddressId === undefined || formData.serviceAddressId === '') {
            newErrors.serviceAddressId = 'Service address is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSaveHandle = async (onSaveCallback) => {
        const persist = async (data) => {
            if (data.id && data.id !== 0) {
                return updateProgram(data.id, data);
            }
            return addProgram(data);
        };
        const cb = onSaveCallback || persist;
        save(formData, cb, setIsSaving, close, setErrors, validate);
    };

    // Derived display labels (optional for UI consumers)
    const programTypeLabel = getProgramTypeLabel(formData.programTypeId);
    const statusLabel = getProgramStatusLabel(formData.statusId);

    return {
        isOpen,
        isSaving,
        formData,
        errors,
        programTypeLabel,
        statusLabel,
        open,
        close,
        onUpdateFieldHandle,
        onSaveHandle
    };
};

export default useAddEditProgram;
