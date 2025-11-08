import { useEditableFormContext } from "../../contexts/EditableFormContext";

export default function useEditableForms() {
    const { addEditCustomer, addEditLead, addEditProspect, loadCustomers, loadLeads, loadProspects } = useEditableFormContext();

    return { addEditCustomer, addEditLead, addEditProspect, loadCustomers, loadLeads, loadProspects };
}