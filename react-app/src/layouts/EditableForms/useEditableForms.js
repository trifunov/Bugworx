import { useEditableFormContext } from "../../contexts/EditableFormContext";

export default function useEditableForms() {
    const { addEditCustomer, addEditLead, addEditProspect, addEditProgram, loadCustomers, loadLeads, loadProspects, loadPrograms, addEditInventory, loadInventory } = useEditableFormContext();

    return { addEditCustomer, addEditLead, addEditProspect, addEditProgram, loadCustomers, loadLeads, loadProspects, loadPrograms, addEditInventory, loadInventory };
}