/**
 * Dashboard Sidebar Menu Configuration
 * Defines the modules available on the main dashboard
 */

export const dashboardMenuConfig = [
  {
    id: 'customers',
    label: 'Customers',
    route: '/customers',
    icon: 'mdi mdi-account-circle',
    description: 'Customer profiles, addresses, and service history.'
  },
  {
    id: 'scheduler',
    label: 'Scheduler',
    route: '/scheduler',
    icon: 'mdi mdi-calendar-multiselect',
    description: 'Schedule pest control visits and assign techs.'
  },
  {
    id: 'routing',
    label: 'Routing & Fleet',
    route: '/routing',
    icon: 'mdi mdi-map-marker-path',
    description: 'Optimize routes to save time and fuel.'
  },
  {
    id: 'reports',
    label: 'Reports',
    route: '/reports',
    icon: 'mdi mdi-file-chart',
    description: 'Service history, performance and customer feedback.'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    route: '/analytics',
    icon: 'mdi mdi-view-dashboard',
    description: 'Customizable dashboards and KPIs.'
  },
  {
    id: 'inventory',
    label: 'Inventory',
    route: '/inventory',
    icon: 'mdi mdi-flask',
    description: 'Track chemicals, supplies and equipment.'
  },
  {
    id: 'billing',
    label: 'Billing & Invoices',
    route: '/billing',
    icon: 'mdi mdi-bank',
    description: 'Automated invoicing and payment tracking.'
  },
  {
    id: 'notifications',
    label: 'Notification Hub',
    route: '/notifications',
    icon: 'mdi mdi-email',
    description: 'SMS and email notifications.'
  },
  {
    id: 'configuration',
    label: 'Configuration',
    route: '/configuration',
    icon: 'mdi mdi-cog',
    description: 'System settings and preferences.'
  }
];
