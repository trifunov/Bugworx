import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
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
      </Route>
    </Routes>
  );
}

export default App;
