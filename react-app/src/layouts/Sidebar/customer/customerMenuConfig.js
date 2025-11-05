/**
 * Customer Sidebar Menu Configuration
 * Defines the hierarchical structure for customer detail sidebar navigation
 */

export const customerMenuConfig = [
  // ========================================
  // SECTION 1: HOME
  // ========================================
  {
    id: 'home',
    label: 'Home',
    icon: 'ri-home-line',
    children: [
      {
        id: 'overview',
        label: 'Overview',
        route: '',
        icon: 'ri-dashboard-line'
      },
      {
        id: 'alerts-compliance',
        label: 'Alerts & Compliance',
        route: '/alerts-compliance',
        icon: 'ri-alarm-warning-line'
      },
      {
        id: 'activity-timeline',
        label: 'Activity Timeline',
        route: '/activity-timeline',
        icon: 'ri-time-line'
      },
      {
        id: 'customer-scorecard',
        label: 'Customer Scorecard',
        route: '/scorecard',
        icon: 'ri-star-line'
      }
    ]
  },

  // ========================================
  // SECTION 2: LOCATIONS & ASSETS
  // ========================================
  {
    id: 'locations-assets',
    label: 'Locations & Assets',
    icon: 'ri-building-line',
    children: [
      {
        id: 'sites-locations',
        label: 'Sites & Locations',
        route: '/service-addresses',
        icon: 'ri-map-pin-line'
      },
      {
        id: 'site-contacts',
        label: 'Site Contacts',
        route: '/site-contacts',
        icon: 'ri-contacts-line'
      },
      {
        id: 'facility-maps',
        label: 'Facility Maps',
        route: '/facilities',
        icon: 'ri-layout-line'
      },
      {
        id: 'devices-inspection-points',
        label: 'Devices & Stations',
        route: '/inspection-points',
        icon: 'ri-radar-line'
      }
    ]
  },

  // ========================================
  // SECTION 3: SERVICE MANAGEMENT
  // ========================================
  {
    id: 'service-management',
    label: 'Service Management',
    icon: 'ri-tools-line',
    children: [
      {
        id: 'service-agreements',
        label: 'Agreements & Events',
        route: '/service-agreements',
        icon: 'ri-file-text-line'
      },
      {
        id: 'work-orders',
        label: 'Work Orders',
        route: '/work-orders',
        icon: 'ri-file-list-3-line'
      },
      {
        id: 'scheduler-view',
        label: 'Scheduler View',
        route: '/appointments',
        icon: 'ri-calendar-check-line'
      }
    ]
  },

  // ========================================
  // SECTION 4: ANALYTICS & REPORTS
  // ========================================
  {
    id: 'analytics-reports',
    label: 'Analytics & Reports',
    icon: 'ri-bar-chart-line',
    children: [
      {
        id: 'service-history-reports',
        label: 'Service History',
        route: '/service-history',
        icon: 'ri-history-line'
      },
      {
        id: 'infestation-trends',
        label: 'Infestation Trends',
        route: '/infestation-trends',
        icon: 'ri-line-chart-line'
      },
      {
        id: 'device-performance',
        label: 'Device Analytics',
        route: '/device-analytics',
        icon: 'ri-pie-chart-line'
      },
      {
        id: 'kpi-dashboards',
        label: 'KPI Dashboards',
        route: '/kpi-dashboards',
        icon: 'ri-speed-line'
      },
      {
        id: 'chemical-usage',
        label: 'Chemical Usage',
        route: '/chemical-usage',
        icon: 'ri-flask-line'
      },
      {
        id: 'export-center',
        label: 'Export Center',
        route: '/export-center',
        icon: 'ri-download-cloud-line'
      }
    ]
  },

  // ========================================
  // SECTION 5: DOCUMENTS
  // ========================================
  {
    id: 'documents',
    label: 'Documents',
    icon: 'ri-folder-line',
    children: [
      {
        id: 'contracts-agreements',
        label: 'Contracts',
        route: '/contracts',
        icon: 'ri-file-text-line'
      },
      {
        id: 'proposals-quotes',
        label: 'Proposals & Quotes',
        route: '/proposals',
        icon: 'ri-file-paper-line'
      },
      {
        id: 'work-reports',
        label: 'Service Logs',
        route: '/work-reports',
        icon: 'ri-file-list-line'
      },
      {
        id: 'photos-files',
        label: 'Photos & Files',
        route: '/documents',
        icon: 'ri-image-line'
      },
      {
        id: 'certificates-warranty',
        label: 'Certificates',
        route: '/certificates',
        icon: 'ri-award-line'
      }
    ]
  },

  // ========================================
  // SECTION 6: FINANCIALS
  // ========================================
  {
    id: 'financials',
    label: 'Financials',
    icon: 'ri-wallet-line',
    children: [
      {
        id: 'invoices',
        label: 'Invoices',
        route: '/invoices',
        icon: 'ri-file-list-3-line'
      },
      {
        id: 'payments',
        label: 'Payments',
        route: '/payments',
        icon: 'ri-money-dollar-circle-line'
      },
      {
        id: 'billing-plans',
        label: 'Billing plans',
        route: '/billing-plans',
        icon: 'ri-calendar-line'
      },
      {
        id: 'payment-methods',
        label: 'Payment methods',
        route: '/payment-methods',
        icon: 'ri-bank-card-line'
      },
      {
        id: 'auto-pay',
        label: 'Auto-pay settings',
        route: '/auto-pay',
        icon: 'ri-repeat-line'
      },
      {
        id: 'credit-cards',
        label: 'Credit Cards',
        route: '/credit-cards',
        icon: 'ri-bank-card-2-line'
      },
      {
        id: 'statements',
        label: 'Statements',
        route: '/statements',
        icon: 'ri-file-chart-line'
      },
      {
        id: 'po-budget',
        label: 'PO & Budget',
        route: '/po-budget',
        icon: 'ri-funds-line'
      },
      {
        id: 'download-financial',
        label: 'Download Records',
        route: '/download-financial',
        icon: 'ri-download-2-line'
      }
    ]
  },

  // ========================================
  // SECTION 7: COMMUNICATION
  // ========================================
  {
    id: 'communication',
    label: 'Communication',
    icon: 'ri-message-3-line',
    children: [
      {
        id: 'messages-notes',
        label: 'Messages & Notes',
        route: '/notes',
        icon: 'ri-sticky-note-line'
      },
      {
        id: 'technician-chat',
        label: 'Technician Chat',
        route: '/technician-chat',
        icon: 'ri-chat-3-line'
      },
      {
        id: 'notification-preferences',
        label: 'Notifications',
        route: '/notification-preferences',
        icon: 'ri-notification-line'
      },
      {
        id: 'contact-directory',
        label: 'Contact Directory',
        route: '/contact-directory',
        icon: 'ri-phone-line'
      }
    ]
  },

  // ========================================
  // SECTION 8: OPERATIONS
  // ========================================
  {
    id: 'operations',
    label: 'Operations',
    icon: 'ri-settings-3-line',
    children: [
      {
        id: 'access-instructions',
        label: 'Access Instructions',
        route: '/access-instructions',
        icon: 'ri-key-2-line'
      },
      {
        id: 'site-safety',
        label: 'Safety Requirements',
        route: '/site-safety',
        icon: 'ri-shield-star-line'
      },
      {
        id: 'approved-materials',
        label: 'Approved Materials',
        route: '/approved-materials',
        icon: 'ri-list-check-2'
      },
      {
        id: 'escalation-matrix',
        label: 'Escalation Matrix',
        route: '/escalation-matrix',
        icon: 'ri-arrow-up-circle-line'
      },
      {
        id: 'sla-rules',
        label: 'SLA & Obligations',
        route: '/sla-rules',
        icon: 'ri-file-shield-line'
      },
      {
        id: 'gate-instructions',
        label: 'Gate Instructions',
        route: '/gate-instructions',
        icon: 'ri-roadster-line'
      }
    ]
  },

  // ========================================
  // SECTION 9: USERS & PERMISSIONS
  // ========================================
  {
    id: 'users-permissions',
    label: 'Users & Permissions',
    icon: 'ri-team-line',
    children: [
      {
        id: 'customer-user-management',
        label: 'User Management',
        route: '/user-management',
        icon: 'ri-user-settings-line'
      },
      {
        id: 'user-roles',
        label: 'Roles & Permissions',
        route: '/user-roles',
        icon: 'ri-shield-user-line'
      },
      {
        id: 'access-history',
        label: 'Access History',
        route: '/access-history',
        icon: 'ri-history-line'
      }
    ]
  },

  // ========================================
  // SECTION 10: INTEGRATIONS
  // ========================================
  {
    id: 'integrations',
    label: 'Integrations',
    icon: 'ri-links-line',
    children: [
      {
        id: 'api-connect',
        label: 'API Connect',
        route: '/api-connect',
        icon: 'ri-plug-line'
      },
      {
        id: 'erp-integration',
        label: 'ERP Integration',
        route: '/erp-integration',
        icon: 'ri-git-merge-line'
      },
      {
        id: 'b2b-portal-tokens',
        label: 'B2B Portal Tokens',
        route: '/b2b-tokens',
        icon: 'ri-key-line'
      },
      {
        id: 'document-webhooks',
        label: 'Document Webhooks',
        route: '/webhooks',
        icon: 'ri-share-forward-line'
      },
      {
        id: 'facility-management-integration',
        label: 'Facility System',
        route: '/facility-integration',
        icon: 'ri-building-2-line'
      }
    ]
  },

  // ========================================
  // SECTION 11: CUSTOMER PORTAL
  // ========================================
  {
    id: 'customer-portal',
    label: 'Customer Portal',
    icon: 'ri-global-line',
    children: [
      {
        id: 'portal-users-roles',
        label: 'Users & Roles',
        route: '/portal/users-roles',
        icon: 'ri-user-3-line'
      },
      {
        id: 'portal-reports',
        label: 'Reports',
        route: '/portal/reports',
        icon: 'ri-file-chart-line'
      },
      {
        id: 'portal-history',
        label: 'History',
        route: '/portal/history',
        icon: 'ri-history-line'
      }
    ]
  }
];

/**
 * Navigation actions configuration (separate from main menu)
 */
export const navigationActionsConfig = [
  {
    id: 'back-to-customers',
    label: 'Back to Customers',
    route: '/customers',
    icon: 'ri-arrow-left-line',
    absolute: true // Indicates this is an absolute route, not customer-specific
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    route: '/',
    icon: 'ri-home-4-line',
    absolute: true
  }
];
