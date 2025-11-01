import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerDetail from './pages/CustomerDetail';
import ServiceAddresses from './pages/ServiceAddresses';
import Appointments from './pages/Appointments';
import Scheduler from './pages/Scheduler';
import Technicians from './pages/Technicians';
import Inventory from './pages/Inventory';
import Routing from './pages/Routing';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Configuration from './pages/Configuration';
import ConfigurationDetails from './pages/ConfigurationDetails';
import InspectionPoints from './pages/InspectionPoints';
import Facilities from './pages/Facilities';
import Areas from './pages/Areas';
import UserProfile from './pages/UserProfile';
import Proposals from './pages/Proposals';
import Leads from './pages/Leads';

import Users from './pages/configuration/user-access/Users/Users';
import EmployeeDirectory from './pages/configuration/user-access/EmployeeDirectory/EmployeeDirectory';
import RolesPermissions from './pages/configuration/user-access/RolesPermissions/RolesPermissions';
import TeamsBranches from './pages/configuration/user-access/TeamsBranches/TeamsBranches';
import UserActivityLog from './pages/configuration/user-access/UserActivityLog/UserActivityLog';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="customers/:id/service-addresses" element={<CustomerDetail />} />
        <Route path="customers/:id/appointments" element={<CustomerDetail />} />
        <Route path="customers/:id/service-history" element={<CustomerDetail />} />
        <Route path="customers/:id/invoices" element={<CustomerDetail />} />
        <Route path="customers/:id/contracts" element={<CustomerDetail />} />
        <Route path="customers/:id/proposals" element={<CustomerDetail />} />
        <Route path="customers/:id/documents" element={<CustomerDetail />} />
        <Route path="customers/:id/notes" element={<CustomerDetail />} />
        <Route path="customers/:id/schedule-service" element={<CustomerDetail />} />
        <Route path="customers/:id/create-invoice" element={<CustomerDetail />} />
        <Route path="customers/:id/inspection-points" element={<InspectionPoints />} />
        <Route path="customers/:id/facilities" element={<Facilities />} />
        <Route path="customers/:id/areas" element={<Areas />} />
        <Route path="customers/:id/leads" element={<Leads />} />
        <Route path="service-addresses" element={<ServiceAddresses />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="scheduler" element={<Scheduler />} />
        <Route path="technicians" element={<Technicians />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="routing" element={<Routing />} />
        <Route path="billing" element={<Billing />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="configuration" element={<Configuration />} />
        <Route path="configuration/general/company-profile" element={<ConfigurationDetails />} />
        <Route path="configuration/general/custom-fields" element={<ConfigurationDetails />} />
        <Route path="configuration/general/api-integrations" element={<ConfigurationDetails />} />
        <Route path="configuration/general/data-import-export" element={<ConfigurationDetails />} />
        <Route path="configuration/general/audit-trail" element={<ConfigurationDetails />} />
        <Route path="configuration/general/backup-and-restore" element={<ConfigurationDetails />} />
        <Route path="user-profile" element={<UserProfile />} />

        {/* User Access Management Routes */}
        <Route path="configuration/user-access/users" element={<Users />} />
        <Route path="configuration/user-access/employee-directory" element={<EmployeeDirectory />} />
        <Route path="configuration/user-access/roles-permissions" element={<RolesPermissions />} />
        <Route path="configuration/user-access/teams-branches" element={<TeamsBranches />} />
        <Route path="configuration/user-access/user-activity-log" element={<UserActivityLog />} />
      </Route>

      {/* Catch all - redirect to login or dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
