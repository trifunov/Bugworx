import { createContext, useContext, useState } from 'react';
import useAddEditCustomer from '../components/CustomerDetails/AddEditCustomer/useAddEditCustomer';
import useAddEditLead from '../components/CustomerDetails/AddEditLead/useAddEditLead';
import useAddEditProspect from '../components/CustomerDetails/Prospects/AddEditProspect/useAddEditProspect';
import { getCustomers, getLeads, getProspects } from '../utils/localStorage';

const EditableFormContext = createContext(null);

export const useEditableFormContext = () => {
    const context = useContext(EditableFormContext);
    if (!context) {
        throw new Error('useEditableFormContext must be used within an EditableFormProvider');
    }
    return context;
};

export const EditableFormProvider = ({ children }) => {
    const addEditCustomer = useAddEditCustomer();
    const addEditLead = useAddEditLead();
    const addEditProspect = useAddEditProspect();

    const [customers, setCustomersState] = useState(getCustomers());
    const [leads, setLeadsState] = useState(getLeads());
    const [prospects, setProspectsState] = useState(getProspects());

    const loadCustomers = () => {
        const customers = getCustomers();
        setCustomersState(customers);
    };

    const loadLeads = () => {
        const leads = getLeads();
        setLeadsState(leads);
    };

    const loadProspects = () => {
        const prospects = getProspects();
        setProspectsState(prospects);
    };

    const value = {
        addEditCustomer,
        addEditLead,
        addEditProspect,
        loadCustomers,
        loadLeads,
        loadProspects,
        customers,
        leads,
        prospects,
        setCustomersState,
        setLeadsState,
        setProspectsState
    };

    return <EditableFormContext.Provider value={value}>{children}</EditableFormContext.Provider>;
};

export default EditableFormContext;