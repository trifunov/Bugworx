import { useEditableFormContext } from "../../contexts/EditableFormContext";

export default function useEditableForms() {
    const { addEditCustomer, addEditLead, addEditProspect, loadCustomers, loadLeads, loadProspects, addEditInventory, loadInventory } = useEditableFormContext();

    return { addEditCustomer, addEditLead, addEditProspect, loadCustomers, loadLeads, loadProspects, addEditInventory, loadInventory };
}