import useEditableForms from "./useEditableForms";
import AddEditCustomer from "../../components/CustomerDetails/AddEditCustomer/AddEditCustomer";
import AddEditLead from "../../components/CustomerDetails/AddEditLead/AddEditLead";
import AddEditProspect from "../../components/CustomerDetails/Prospects/AddEditProspect/AddEditProspect";
import AddEditProgram from "../../components/CustomerDetails/AddEditProgram/AddEditProgram";
import { addCustomer, updateCustomer, addLead, updateLead, addProspect, updateProspect, addProgram, updateProgram } from "../../utils/localStorage";

const EditableForms = () => {

    const { addEditCustomer, addEditLead, addEditProspect, addEditProgram, loadCustomers, loadLeads, loadProspects, loadPrograms } = useEditableForms();

    return (
        <>
            <AddEditCustomer
                isOpen={addEditCustomer.isOpen}
                formData={addEditCustomer.formData}
                errors={addEditCustomer.errors}
                isSaving={addEditCustomer.isSaving}
                onUpdateField={addEditCustomer.onUpdateFieldHandle}
                onClose={addEditCustomer.close}
                onSave={() => addEditCustomer.onSaveHandle((data) => {
                    let updatedCustomer = null;
                    if (data.id && data.id !== 0) {
                        updatedCustomer = updateCustomer(data.id, data);
                    }
                    else {
                        updatedCustomer = addCustomer(data);
                    }
                    loadCustomers();
                    return updatedCustomer;
                })}
            />

            <AddEditLead
                isOpen={addEditLead.isOpen}
                formData={addEditLead.formData}
                errors={addEditLead.errors}
                isSaving={addEditLead.isSaving}
                onUpdateField={addEditLead.onUpdateFieldHandle}
                onClose={addEditLead.close}
                onSave={() => addEditLead.onSaveHandle((data) => {
                    let updatedLead = null;
                    if (data.id && data.id !== 0) {
                        updatedLead = updateLead(data.id, data);
                    }
                    else {
                        updatedLead = addLead(data);
                    }

                    loadLeads();
                    return updatedLead;
                })}
            />

            <AddEditProspect
                isOpen={addEditProspect.isOpen}
                formData={addEditProspect.formData}
                errors={addEditProspect.errors}
                isSaving={addEditProspect.isSaving}
                onUpdateField={addEditProspect.onUpdateFieldHandle}
                onClose={addEditProspect.close}
                onSave={() => addEditProspect.onSaveHandle((data) => {
                    let updatedProspect = null;
                    if (data.id && data.id !== 0) {
                        updatedProspect = updateProspect(data.id, data);
                    }
                    else {
                        updatedProspect = addProspect(data);
                    }

                    loadProspects();
                    return updatedProspect;
                })}
            />

            <AddEditProgram
                isOpen={addEditProgram.isOpen}
                formData={addEditProgram.formData}
                errors={addEditProgram.errors}
                isSaving={addEditProgram.isSaving}
                onUpdateField={addEditProgram.onUpdateFieldHandle}
                onToggleSite={addEditProgram.toggleSite}
                onClose={addEditProgram.close}
                onSave={() => addEditProgram.onSaveHandle((data) => {
                    const payload = {
                        ...data,
                        leadId: data.leadId ? parseInt(data.leadId) : null,
                        assignedTechnicianId: data.assignedTechnicianId ? parseInt(data.assignedTechnicianId) : null,
                        estimatedDuration: parseInt(data.estimatedDuration),
                        endDate: data.endDate || null,
                        totalWorkOrders: data.totalWorkOrders || 0,
                        completedWorkOrders: data.completedWorkOrders || 0,
                    };
                    let result = null;
                    if (data.id) {
                        result = updateProgram(data.id, payload);
                    } else {
                        result = addProgram(payload);
                    }
                    loadPrograms();
                    return result;
                })}
            />

        </>
    );
};

export default EditableForms;