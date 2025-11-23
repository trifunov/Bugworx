import { createContext, useContext, useState } from 'react';
import useAddEditCustomer from '../components/CustomerDetails/AddEditCustomer/useAddEditCustomer';
import useAddEditLead from '../components/CustomerDetails/AddEditLead/useAddEditLead';
import useAddEditProspect from '../components/CustomerDetails/Prospects/AddEditProspect/useAddEditProspect';
import useAddEditInventory from '../components/InventoryDetails/useAddEditInventory';
import useAddEditUser from '../components/Users/useAddEditUser';
import { getCustomers, getLeads, getProspects, getInventory } from '../utils/localStorage';

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
    const addEditInventory = useAddEditInventory();
    const addEditUser = useAddEditUser();

    const [customers, setCustomersState] = useState(getCustomers());
    const [leads, setLeadsState] = useState(getLeads());
    const [prospects, setProspectsState] = useState(getProspects());
    const [inventory, setInventoryState] = useState(getInventory());

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

    const loadInventory = () => {
        const inventory = getInventory();
        setInventoryState(inventory);
    };

    const value = {
        addEditCustomer,
        addEditLead,
        addEditProspect,
        addEditInventory,
        addEditUser,
        loadCustomers,
        loadLeads,
        loadProspects,
        loadInventory,
        customers,
        leads,
        prospects,
        inventory,
        setCustomersState,
        setLeadsState,
        setProspectsState,
        setInventoryState
    };

    return <EditableFormContext.Provider value={value}>{children}</EditableFormContext.Provider>;
};

export default EditableFormContext;