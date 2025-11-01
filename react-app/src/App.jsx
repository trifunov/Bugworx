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
import CustomerInvoices from './pages/CustomerInvoices';
import CustomerContracts from './pages/CustomerContracts';
import CustomerDocuments from './pages/CustomerDocuments';
import CustomerNotes from './pages/CustomerNotes';
import CustomerInspectionPoints from './pages/CustomerInspectionPoints';
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
import Facilities from './pages/Facilities';
import Areas from './pages/Areas';
import UserProfile from './pages/UserProfile';
import Proposals from './pages/Proposals';
import Leads from './pages/Leads';

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
        <Route path="customers/:id" element={<CustomerOverview />} />
        <Route path="customers/:id/service-addresses" element={<CustomerServiceAddresses />} />
        <Route path="customers/:id/appointments" element={<CustomerAppointments />} />
        <Route path="customers/:id/service-history" element={<CustomerServiceHistory />} />
        <Route path="customers/:id/proposals" element={<CustomerProposals />} />
        <Route path="customers/:id/invoices" element={<CustomerInvoices />} />
        <Route path="customers/:id/contracts" element={<CustomerContracts />} />
        <Route path="customers/:id/documents" element={<CustomerDocuments />} />
        <Route path="customers/:id/notes" element={<CustomerNotes />} />
        <Route path="customers/:id/inspection-points" element={<CustomerInspectionPoints />} />
        <Route path="customers/:id/schedule-service" element={<CustomerAppointments />} />
        <Route path="customers/:id/create-invoice" element={<CustomerInvoices />} />
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
      </Route>

      {/* Catch all - redirect to login or dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
