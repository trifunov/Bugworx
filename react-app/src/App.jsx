import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import AccountDetail from './pages/AccountDetail';
import Sites from './pages/Sites';
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
import InspectionPoints from './pages/InspectionPoints';
import Facilities from './pages/Facilities';
import Areas from './pages/Areas';
import UserProfile from './pages/UserProfile';

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
        <Route path="accounts" element={<Accounts />} />
        <Route path="accounts/:id" element={<AccountDetail />} />
        <Route path="accounts/:id/sites" element={<AccountDetail />} />
        <Route path="accounts/:id/appointments" element={<AccountDetail />} />
        <Route path="accounts/:id/service-history" element={<AccountDetail />} />
        <Route path="accounts/:id/invoices" element={<AccountDetail />} />
        <Route path="accounts/:id/contracts" element={<AccountDetail />} />
        <Route path="accounts/:id/documents" element={<AccountDetail />} />
        <Route path="accounts/:id/notes" element={<AccountDetail />} />
        <Route path="accounts/:id/schedule-service" element={<AccountDetail />} />
        <Route path="accounts/:id/create-invoice" element={<AccountDetail />} />
        <Route path="accounts/:id/inspection-points" element={<InspectionPoints />} />
        <Route path="accounts/:id/facilities" element={<Facilities />} />
        <Route path="accounts/:id/areas" element={<Areas />} />
        <Route path="sites" element={<Sites />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="scheduler" element={<Scheduler />} />
        <Route path="technicians" element={<Technicians />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="routing" element={<Routing />} />
        <Route path="billing" element={<Billing />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="configuration" element={<Configuration />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Route>

      {/* Catch all - redirect to login or dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
