import { createContext, useContext, useState } from 'react';
import useAddEditCustomer from '../components/CustomerDetails/AddEditCustomer/useAddEditCustomer';
import useAddEditLead from '../components/CustomerDetails/AddEditLead/useAddEditLead';
import useAddEditProspect from '../components/CustomerDetails/Prospects/AddEditProspect/useAddEditProspect';
import useAddEditInventory from '../components/InventoryDetails/useAddEditInventory';
import useAddEditUser from '../components/Users/useAddEditUser';
import useAddEditRole from '../components/RolesPermissions/useAddEditRole';
import useAddEditEmployee from '../components/Configuration/EmployeeDirectory/useAddEditEmployee';
import useAddEditTeam from '../components/Configuration/TeamBranches/useAddEditTeam';
import useAddEditContractType from '../components/Configuration/OperationalSetup/ContractTypes/useAddEditContractTypes';
import useAddEditServiceTypes from '../components/Configuration/OperationalSetup/ServiceTypes/useAddEditServiceTypes';
import useAddEditFrequencyTemplate from '../components/Configuration/OperationalSetup/FrequencyTemplate/useFrequencyTemplate';
import useAddEditJobSetting from '../components/Configuration/OperationalSetup/JobSettings/useAddEditJobSettings';
import useAddEditRouteConfiguration from '../components/Configuration/OperationalSetup/RouteConfiguration/useAddEditRouteConfiguration';
import useAddEditOperationalZones from '../components/Configuration/OperationalSetup/OperationalZones/useAddEditOperationalZones';

import useAddEditEquipmentDevices from '../components/Configuration/ServiceInspection/EquipmentDevices/useAddEditEquipmentDevices';
import useAddEditInspectionPointCategory from '../components/Configuration/ServiceInspection/InspectionPointCategories/useAddEditInspectionPointCategory';
import useAddEditInspectionPointType from '../components/Configuration/ServiceInspection/InspectionPointTypes/useAddEditInspectionPointType';
import useAddEditMaterialSetup from '../components/Configuration/ServiceInspection/MaterialSetup/useAddEditMaterialSetup';

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
    const addEditRole = useAddEditRole();
    const addEditEmployee = useAddEditEmployee();
    const addEditTeam = useAddEditTeam();

    const addEditContractType = useAddEditContractType();
    const addEditServiceTypes = useAddEditServiceTypes();
    const addEditFrequencyTemplate = useAddEditFrequencyTemplate();
    const addEditJobSetting = useAddEditJobSetting();
    const addEditRouteConfiguration = useAddEditRouteConfiguration();
    const addEditOperationalZones = useAddEditOperationalZones();

    const addEditEquipmentDevices = useAddEditEquipmentDevices();
    const addEditInspectionPointCategory = useAddEditInspectionPointCategory();
    const addEditInspectionPointType = useAddEditInspectionPointType();
    const addEditMaterialSetup = useAddEditMaterialSetup();

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
        addEditRole,
        addEditEmployee,
        addEditTeam,
        addEditContractType,
        addEditServiceTypes,
        addEditFrequencyTemplate,
        addEditJobSetting,
        addEditRouteConfiguration,
        addEditOperationalZones,
        addEditEquipmentDevices,
        addEditInspectionPointCategory,
        addEditInspectionPointType,
        addEditMaterialSetup,
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