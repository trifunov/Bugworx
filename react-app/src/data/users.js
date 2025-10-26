// Mock users for authentication

export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123', // In production, this would be hashed
    email: 'admin@bugworx.com',
    name: 'John Smith',
    role: 'Administrator',
    avatar: '/assets/images/users/avatar-1.jpg',
    permissions: ['all'], // Admin has all permissions
    createdAt: '2024-01-01',
    lastLogin: null
  },
  {
    id: 2,
    username: 'dispatcher',
    password: 'dispatch123',
    email: 'dispatcher@bugworx.com',
    name: 'Sarah Johnson',
    role: 'Dispatcher',
    avatar: '/assets/images/users/avatar-2.jpg',
    permissions: ['scheduler', 'routing', 'appointments', 'view_reports'],
    createdAt: '2024-01-15',
    lastLogin: null
  },
  {
    id: 3,
    username: 'manager',
    password: 'manager123',
    email: 'manager@bugworx.com',
    name: 'Michael Chen',
    role: 'Manager',
    avatar: '/assets/images/users/avatar-3.jpg',
    permissions: ['accounts', 'billing', 'reports', 'analytics', 'inventory', 'technicians'],
    createdAt: '2024-02-01',
    lastLogin: null
  },
  {
    id: 4,
    username: 'technician',
    password: 'tech123',
    email: 'david.m@bugworx.com',
    name: 'David Martinez',
    role: 'Technician',
    avatar: '/assets/images/users/avatar-4.jpg',
    permissions: ['view_schedule', 'update_appointments', 'view_inventory'],
    createdAt: '2024-03-01',
    lastLogin: null,
    technicianId: 1 // Links to technician in mockData
  }
];

// Default credentials for easy testing
export const defaultCredentials = {
  admin: { username: 'admin', password: 'admin123' },
  dispatcher: { username: 'dispatcher', password: 'dispatch123' },
  manager: { username: 'manager', password: 'manager123' },
  technician: { username: 'technician', password: 'tech123' }
};
