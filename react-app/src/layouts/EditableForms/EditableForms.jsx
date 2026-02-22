import useEditableForms from "./useEditableForms";
import AddEditCustomer from "../../components/CustomerDetails/AddEditCustomer/AddEditCustomer";
import AddEditLead from "../../components/CustomerDetails/AddEditLead/AddEditLead";
import AddEditProspect from "../../components/CustomerDetails/Prospects/AddEditProspect/AddEditProspect";
import { addLead, updateLead, addProspect, updateProspect } from "../../utils/localStorage";
import customerService from "../../services/customerService";

const EditableForms = () => {

    const { addEditCustomer, addEditLead, addEditProspect, loadCustomers, loadLeads, loadProspects } = useEditableForms();

    return (
        <>
            <AddEditCustomer
                isOpen={addEditCustomer.isOpen}
                formData={addEditCustomer.formData}
                errors={addEditCustomer.errors}
                isSaving={addEditCustomer.isSaving}
                onUpdateField={addEditCustomer.onUpdateFieldHandle}
                onClose={addEditCustomer.close}
                onSave={() => addEditCustomer.onSaveHandle(async (data) => {
                    if (data.id && data.id !== 0) {
                        await customerService.updateCustomer(data.id, data);
                    }
                    else {
                        await customerService.createCustomer(data);
                    }
                    await loadCustomers();
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

        </>
    );
};

export default EditableForms;