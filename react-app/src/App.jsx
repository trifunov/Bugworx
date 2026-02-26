import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerOverview from './pages/CustomerOverview';
import CustomerServiceAddresses from './pages/CustomerServiceAddresses';
import CustomerAppointments from './pages/CustomerAppointments';
import CustomerServiceHistory from './pages/CustomerServiceHistory';
import CustomerProposals from './pages/CustomerProposals';
import CustomerInvoices from './pages/CustomerInvoices/CustomerInvoices';
import InvoiceDetails from './pages/CustomerInvoices/InvoiceDetails';
import CustomerContracts from './pages/CustomerContracts';
import CustomerDocuments from './pages/CustomerDocuments';
import CustomerNotes from './pages/CustomerNotes';
import ServiceAddresses from './pages/ServiceAddresses';
import Appointments from './pages/Appointments';
import Scheduler from './pages/Scheduler';
import Technicians from './pages/Technicians';
import Inventory from './pages/inventory/Inventory';
import Routing from './pages/Routing';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Configuration from './pages/Configuration';
import Facilities from './pages/Facilities';
import Areas from './pages/Areas';
import UserProfile from './pages/UserProfile';
import Proposals from './pages/Proposals';
import Leads from './pages/Leads';
import SearchResults from './pages/SearchResults';
import InspectionPoints from './pages/InspectionPoints';
import Prospects from './pages/Prospects';

import ConfigurationLayout from './pages/configuration/ConfigurationLayout';
import ApiIntegrations from './pages/configuration/system-settings/api-integrations/ApiIntegrations';
import AuditTrail from './pages/configuration/system-settings/audit-trail/AuditTrail';
import BackupAndRestore from './pages/configuration/system-settings/backup-and-restore/BackupAndRestore';
import CompanyProfile from './pages/configuration/system-settings/company-profile/CompanyProfile';
import CustomFields from './pages/configuration/system-settings/custom-fields/CustomFields';
import DataImportExport from './pages/configuration/system-settings/data-import-export/DataImportExport';

import Users from './pages/configuration/user-access/Users/Users';
import EmployeeDirectory from './pages/configuration/user-access/EmployeeDirectory/EmployeeDirectory';
import RolesPermissions from './pages/configuration/user-access/RolesPermissions/RolesPermissions';
import TeamsBranches from './pages/configuration/user-access/TeamsBranches/TeamsBranches';
import UserActivityLog from './pages/configuration/user-access/UserActivityLog/UserActivityLog';

import ContractTypes from './pages/configuration/operational-setup/ContractTypes/ContractTypes';
import FrequencyTemplates from './pages/configuration/operational-setup/FrequencyTemplate/FrequencyTemplates';
import JobSettings from './pages/configuration/operational-setup/JobSettings/JobSettings';
import OperationZones from './pages/configuration/operational-setup/OperationZones/OperationZones';
import RouteConfiguration from './pages/configuration/operational-setup/RouteConfiguration/RouteConfiguration';
import ServiceTypes from './pages/configuration/operational-setup/ServiceTypes/ServiceTypes';

import InspectionPointTypes from './pages/configuration/service-inspection/InspectionPointTypes/InspectionPointTypes';
import PestTypes from './pages/configuration/service-inspection/PestTypes/PestTypes';
import TreatmentTypes from './pages/configuration/service-inspection/TreatmentTypes/TreatmentTypes';
import ServiceTemplates from './pages/configuration/service-inspection/ServiceTemplates/ServiceTemplates';
import EquipmentDevices from './pages/configuration/service-inspection/EquipmentDevices/EquipmentDevices';
import MaterialSetup from './pages/configuration/service-inspection/MaterialSetup/MaterialSetup';
import InspectionPointCategories from './pages/configuration/service-inspection/InspectionPointCategories/InspectionPointCategories';

import VehicleTypes from './pages/configuration/fleet-management/VehicleTypes/VehicleTypes';
import VehicleList from './pages/configuration/fleet-management/VehicleList/VehicleList';
import FuelTypes from './pages/configuration/fleet-management/FuelTypes/FuelTypes';
import MaintenanceTemplates from './pages/configuration/fleet-management/MaintenanceTemplates/MaintenanceTemplates';
import DriverAssignmentRules from './pages/configuration/fleet-management/DriverAssignmentRules/DriverAssignmentRules';
import GpsIntegration from './pages/configuration/fleet-management/GpsIntegration/GpsIntegration';
import InsuranceRegistration from './pages/configuration/fleet-management/InsuranceRegistration/InsuranceRegistration';
import UsagePolicy from './pages/configuration/fleet-management/UsagePolicy/UsagePolicy';

import TaxConfiguration from './pages/configuration/financial-and-billing/TaxConfiguration/TaxConfiguration';
import Currencies from './pages/configuration/financial-and-billing/CurrencyAndLocalization/Currencies';
import InvoiceTemplates from './pages/configuration/financial-and-billing/InvoiceTemplates/InvoiceTemplates';
import ServicePricingRules from './pages/configuration/financial-and-billing/ServicePricingRules/ServicePricingRules';
import PaymentTerms from './pages/configuration/financial-and-billing/PaymentTerms/PaymentTerms';
import BatchProcessingSetup from './pages/configuration/financial-and-billing/BatchProcessingSetup/BatchProcessingSetup';
import AccountingPeriods from './pages/configuration/financial-and-billing/AccountingPeriods/AccountingPeriods';
import PropertyTypeTemplates from './pages/configuration/communication/TemplatesAndDefaults/PropertyTypeTemplates';
import ServiceProgramTemplates from './pages/configuration/communication/ServiceProgramTemplates/ServiceProgramTemplates';
import ProposalTemplates from './pages/configuration/communication/ProposalTemplates/ProposalTemplates';
import ObservationsRecommendations from './pages/configuration/communication/ObservationsRecommendations/ObservationsRecommendations';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path='/login' element={<Login />} />

      {/* Protected Routes */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='search-results' element={<SearchResults />} />
        <Route path='customers' element={<Customers />} />
        <Route path='prospects' element={<Prospects />} />
        <Route path='leads' element={<Leads />} />
        <Route path='customers/:id' element={<CustomerOverview />} />
        <Route path='customers/:id/service-addresses' element={<CustomerServiceAddresses />} />
        <Route path='customers/:id/appointments' element={<CustomerAppointments />} />
        <Route path='customers/:id/service-history' element={<CustomerServiceHistory />} />
        <Route path='customers/:id/proposals' element={<CustomerProposals />} />
        <Route path='customers/:id/invoices' element={<CustomerInvoices />} />
        <Route path='customers/:id/invoices/:invoiceId' element={<InvoiceDetails />} />
        <Route path='customers/:id/contracts' element={<CustomerContracts />} />
        <Route path='customers/:id/documents' element={<CustomerDocuments />} />
        <Route path='customers/:id/notes' element={<CustomerNotes />} />
        <Route path='customers/:id/inspection-points' element={<InspectionPoints />} />
        <Route path='customers/:id/areas' element={<Areas />} />
        <Route path='customers/:id/schedule-service' element={<CustomerAppointments />} />
        <Route path='customers/:id/create-invoice' element={<CustomerInvoices />} />
        <Route path='customers/:id/facilities' element={<Facilities />} />
        <Route path='service-addresses' element={<ServiceAddresses />} />
        <Route path='appointments' element={<Appointments />} />
        <Route path='proposals' element={<Proposals />} />
        <Route path='scheduler' element={<Scheduler />} />
        <Route path='technicians' element={<Technicians />} />
        <Route path='inventory' element={<Inventory />} />
        <Route path='routing' element={<Routing />} />
        <Route path='billing' element={<Billing />} />
        <Route path='reports' element={<Reports />} />
        <Route path='analytics' element={<Analytics />} />
        <Route path='notifications' element={<Notifications />} />
        <Route path='configuration' element={<Configuration />} />
        <Route path='user-profile' element={<UserProfile />} />

        {/* System Settings Routes */}
        <Route path='configuration/general' element={<ConfigurationLayout />} />
        <Route path='configuration/system-settings/api-integrations' element={<ApiIntegrations />} />
        <Route path='configuration/system-settings/audit-trail' element={<AuditTrail />} />
        <Route path='configuration/system-settings/backup-restore' element={<BackupAndRestore />} />
        <Route path='configuration/system-settings/company-profile' element={<CompanyProfile />} />
        <Route path='configuration/system-settings/custom-fields' element={<CustomFields />} />
        <Route path='configuration/system-settings/data-import-export' element={<DataImportExport />} />

        {/* User Access Management Routes */}
        <Route path='configuration/user-access/users' element={<Users />} />
        <Route path='configuration/user-access/employee-directory' element={<EmployeeDirectory />} />
        <Route path='configuration/user-access/roles-permissions' element={<RolesPermissions />} />
        <Route path='configuration/user-access/teams-branches' element={<TeamsBranches />} />
        <Route path='configuration/user-access/user-activity-log' element={<UserActivityLog />} />

        {/* Operational Setup */}
        <Route path='configuration/operational-setup/route-configuration' element={<RouteConfiguration />} />
        <Route path='configuration/operational-setup/contract-types' element={<ContractTypes />} />
        <Route path='configuration/operational-setup/operational-zones' element={<OperationZones />} />
        <Route path='configuration/operational-setup/frequency-templates' element={<FrequencyTemplates />} />
        <Route path='configuration/operational-setup/job-settings' element={<JobSettings />} />
        <Route path='configuration/operational-setup/service-types' element={<ServiceTypes />} />

        {/* Fleet Management */}
        <Route path='configuration/fleet-management/vehicles' element={<VehicleList />} />
        <Route path='configuration/fleet-management/vehicle-types' element={<VehicleTypes />} />
        <Route path='configuration/fleet-management/fuel-types' element={<FuelTypes />} />
        <Route path='configuration/fleet-management/maintenance-templates' element={<MaintenanceTemplates />} />
        <Route path='configuration/fleet-management/driver-assignment' element={<DriverAssignmentRules />} />
        <Route path='configuration/fleet-management/gps-integration' element={<GpsIntegration />} />
        <Route path='configuration/fleet-management/insurance-registration' element={<InsuranceRegistration />} />
        <Route path='configuration/fleet-management/usage-policy' element={<UsagePolicy />} />

        {/* Financial & Billing Setup */}
        <Route path='/configuration/financial/tax-configuration' element={<TaxConfiguration />} />
        <Route path='/configuration/financial/currency-localization' element={<Currencies />} />
        <Route path='/configuration/financial/invoice-templates' element={<InvoiceTemplates />} />
        <Route path='/configuration/financial/service-pricing-rules' element={<ServicePricingRules />} />
        <Route path='/configuration/financial/payment-terms' element={<PaymentTerms />} />
        <Route path='/configuration/financial/batch-processing' element={<BatchProcessingSetup />} />
        <Route path='/configuration/financial/accounting-periods' element={<AccountingPeriods />} />

        {/* Templates & Defaults */}
        <Route path='configuration/templates/property-type' element={<PropertyTypeTemplates />} />
        <Route path='configuration/templates/service-program-templates' element={<ServiceProgramTemplates />} />
        <Route path='configuration/templates/proposal-templates' element={<ProposalTemplates />} />
        <Route path='configuration/templates/observations-recommendations' element={<ObservationsRecommendations />} />

        {/* Fallback/Default for Fleet Management */}
        <Route path='configuration/fleet-management' element={<Navigate to='/configuration/fleet-management/vehicles' />} />

        {/* Service Inspection */}
        <Route path='configuration/service-inspection/inspection-point-categories' element={<InspectionPointCategories />} />
        <Route path='configuration/service-inspection/inspection-point-types' element={<InspectionPointTypes />} />
        <Route path='configuration/service-inspection/pest-types' element={<PestTypes />} />
        <Route path='configuration/service-inspection/treatment-types' element={<TreatmentTypes />} />
        <Route path='configuration/service-inspection/service-templates' element={<ServiceTemplates />} />
        <Route path='configuration/service-inspection/equipment-devices' element={<EquipmentDevices />} />
        <Route path='configuration/service-inspection/material-setup' element={<MaterialSetup />} />
      </Route>

      {/* Catch all - redirect to login or dashboard */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
