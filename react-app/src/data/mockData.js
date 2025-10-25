// Mock data for Pest Management System

export const accounts = [
  {
    id: 1,
    accountNum: 'ACC-001',
    name: 'Smith Residence',
    accountType: 1,
    companyId: 1,
    localeId: 1,
    sendInvoice: true,
    emailInvoice: true,
    isActive: 1,
    instructions: 'Please call before arrival',
    primaryNote: 'Regular monthly service',
    registrationNum: 'REG-2024-001',
    billingContact: { name: 'John Smith', email: 'john@example.com', phone: '555-0101' },
    billingAddress: { street: '123 Main St', city: 'Springfield', state: 'IL', zip: '62701' }
  },
  {
    id: 2,
    accountNum: 'ACC-002',
    name: 'Johnson Commercial Properties',
    accountType: 2,
    companyId: 1,
    localeId: 1,
    sendInvoice: true,
    emailInvoice: true,
    isActive: 1,
    instructions: 'Service after hours only',
    primaryNote: 'Quarterly inspections required',
    registrationNum: 'REG-2024-002',
    billingContact: { name: 'Sarah Johnson', email: 'sarah@jcp.com', phone: '555-0102' },
    billingAddress: { street: '456 Business Blvd', city: 'Springfield', state: 'IL', zip: '62702' }
  },
  {
    id: 3,
    accountNum: 'ACC-003',
    name: 'Downtown Restaurant Group',
    accountType: 2,
    companyId: 1,
    localeId: 1,
    sendInvoice: true,
    emailInvoice: false,
    isActive: 1,
    instructions: 'Service before 10 AM',
    primaryNote: 'Health inspection compliance',
    registrationNum: 'REG-2024-003',
    billingContact: { name: 'Mike Chen', email: 'mike@drg.com', phone: '555-0103' },
    billingAddress: { street: '789 Restaurant Row', city: 'Springfield', state: 'IL', zip: '62703' }
  }
];

export const sites = [
  {
    id: 1,
    accountId: 1,
    siteName: 'Main Residence',
    address: '123 Main St, Springfield, IL 62701',
    contactName: 'John Smith',
    contactPhone: '555-0101',
    siteType: 'Residential',
    instructions: 'Ring doorbell, dog in backyard',
    isActive: true,
    lastServiceDate: '2024-10-01',
    coordinates: { lat: 39.7817, lng: -89.6501 }, // Springfield downtown
    zone: 'North'
  },
  {
    id: 2,
    accountId: 2,
    siteName: 'Office Building A',
    address: '456 Business Blvd Suite 100, Springfield, IL 62702',
    contactName: 'Sarah Johnson',
    contactPhone: '555-0102',
    siteType: 'Commercial',
    instructions: 'Check in with security',
    isActive: true,
    lastServiceDate: '2024-09-15',
    coordinates: { lat: 39.7990, lng: -89.6440 }, // North Springfield
    zone: 'North'
  },
  {
    id: 3,
    accountId: 2,
    siteName: 'Warehouse Facility',
    address: '789 Industrial Dr, Springfield, IL 62704',
    contactName: 'Tom Wilson',
    contactPhone: '555-0104',
    siteType: 'Industrial',
    instructions: 'Use loading dock entrance',
    isActive: true,
    lastServiceDate: '2024-09-20',
    coordinates: { lat: 39.7456, lng: -89.6298 }, // South Springfield
    zone: 'South'
  },
  {
    id: 4,
    accountId: 3,
    siteName: 'Main Restaurant',
    address: '789 Restaurant Row, Springfield, IL 62703',
    contactName: 'Mike Chen',
    contactPhone: '555-0103',
    siteType: 'Food Service',
    instructions: 'Service before opening hours',
    isActive: true,
    lastServiceDate: '2024-10-10',
    coordinates: { lat: 39.8017, lng: -89.6537 }, // West Springfield
    zone: 'West'
  }
];

export const technicians = [
  {
    id: 1,
    name: 'David Martinez',
    email: 'david.m@pestcontrol.com',
    phone: '555-0201',
    licenseNumber: 'LIC-2023-001',
    specialization: 'General Pest Control',
    serviceTypes: ['General Pest Control', 'Ant Control', 'Cockroach Treatment', 'Flea & Tick Treatment'],
    isActive: true,
    vehicleNumber: 'VEH-001',
    rating: 4.8,
    completedJobs: 245,
    preferredZones: ['North', 'West'],
    maxDailyAppointments: 8
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    email: 'emily.r@pestcontrol.com',
    phone: '555-0202',
    licenseNumber: 'LIC-2023-002',
    specialization: 'Termite Treatment',
    serviceTypes: ['Termite Treatment', 'Termite Inspection', 'General Pest Control'],
    isActive: true,
    vehicleNumber: 'VEH-002',
    rating: 4.9,
    completedJobs: 198,
    preferredZones: ['South', 'West'],
    maxDailyAppointments: 6
  },
  {
    id: 3,
    name: 'James Wilson',
    email: 'james.w@pestcontrol.com',
    phone: '555-0203',
    licenseNumber: 'LIC-2023-003',
    specialization: 'Rodent Control',
    serviceTypes: ['Rodent Control', 'Wildlife Removal', 'General Pest Control'],
    isActive: true,
    vehicleNumber: 'VEH-003',
    rating: 4.7,
    completedJobs: 312,
    preferredZones: ['North', 'South'],
    maxDailyAppointments: 7
  },
  {
    id: 4,
    name: 'Lisa Anderson',
    email: 'lisa.a@pestcontrol.com',
    phone: '555-0204',
    licenseNumber: 'LIC-2023-004',
    specialization: 'Wildlife Removal',
    serviceTypes: ['Wildlife Removal', 'Rodent Control', 'Bed Bug Treatment'],
    isActive: true,
    vehicleNumber: 'VEH-004',
    rating: 4.6,
    completedJobs: 156,
    preferredZones: ['West', 'South'],
    maxDailyAppointments: 5
  }
];

// Helper to get today's date and future dates
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const formatDate = (date) => date.toISOString().split('T')[0];

export const appointments = [
  // Today's appointments
  {
    id: 1,
    siteId: 1,
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '09:00',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 60,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Regular monthly service',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    siteId: 3,
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '11:00',
    serviceType: 'Rodent Control',
    status: 'Scheduled',
    estimatedDuration: 90,
    actualDuration: null,
    priority: 'Urgent',
    notes: 'Follow-up inspection',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    siteId: 4,
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '14:00',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 45,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Restaurant pre-opening service',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    siteId: 2,
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '16:00',
    serviceType: 'Termite Inspection',
    status: 'Scheduled',
    estimatedDuration: 60,
    actualDuration: null,
    priority: 'Emergency',
    notes: 'Urgent inspection requested by property manager',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Tomorrow's appointments
  {
    id: 5,
    siteId: 2,
    technicianId: 2,
    scheduledDate: formatDate(tomorrow),
    scheduledTime: '10:00',
    serviceType: 'Termite Treatment',
    status: 'Scheduled',
    estimatedDuration: 120,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Quarterly termite treatment',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    siteId: 1,
    technicianId: 2,
    scheduledDate: formatDate(tomorrow),
    scheduledTime: '13:30',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 60,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Standard service',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 7,
    siteId: 4,
    technicianId: 2,
    scheduledDate: formatDate(tomorrow),
    scheduledTime: '15:30',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 45,
    actualDuration: null,
    priority: 'Urgent',
    notes: 'Health inspection tomorrow',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Day after tomorrow's appointments
  {
    id: 8,
    siteId: 3,
    technicianId: 3,
    scheduledDate: formatDate(dayAfterTomorrow),
    scheduledTime: '08:30',
    serviceType: 'Rodent Control',
    status: 'Scheduled',
    estimatedDuration: 90,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Bait station check',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 9,
    siteId: 1,
    technicianId: 3,
    scheduledDate: formatDate(dayAfterTomorrow),
    scheduledTime: '11:00',
    serviceType: 'Wildlife Removal',
    status: 'Scheduled',
    estimatedDuration: 60,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Squirrel in attic',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 10,
    siteId: 2,
    technicianId: 3,
    scheduledDate: formatDate(dayAfterTomorrow),
    scheduledTime: '14:00',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 75,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Commercial building treatment',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Next week - unassigned
  {
    id: 11,
    siteId: 4,
    technicianId: null,
    scheduledDate: formatDate(nextWeek),
    scheduledTime: '10:00',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 45,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Unassigned - needs technician',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 12,
    siteId: 1,
    technicianId: null,
    scheduledDate: formatDate(nextWeek),
    scheduledTime: '13:00',
    serviceType: 'Bed Bug Treatment',
    status: 'Scheduled',
    estimatedDuration: 180,
    actualDuration: null,
    priority: 'Emergency',
    notes: 'Customer reported bed bugs - urgent',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Completed appointments from the past 30 days
  {
    id: 101,
    siteId: 1,
    technicianId: 1,
    scheduledDate: '2024-10-20',
    scheduledTime: '09:00',
    serviceType: 'General Pest Control',
    status: 'Completed',
    estimatedDuration: 60,
    actualDuration: 55,
    priority: 'Normal',
    notes: 'Completed successfully',
    createdAt: new Date('2024-10-15').toISOString(),
    updatedAt: new Date('2024-10-20').toISOString()
  },
  {
    id: 102,
    siteId: 2,
    technicianId: 2,
    scheduledDate: '2024-10-18',
    scheduledTime: '14:00',
    serviceType: 'Termite Inspection',
    status: 'Completed',
    estimatedDuration: 90,
    actualDuration: 85,
    priority: 'Normal',
    notes: 'No termites found',
    createdAt: new Date('2024-10-10').toISOString(),
    updatedAt: new Date('2024-10-18').toISOString()
  },
  {
    id: 103,
    siteId: 3,
    technicianId: 3,
    scheduledDate: '2024-10-15',
    scheduledTime: '10:30',
    serviceType: 'Rodent Control',
    status: 'Completed',
    estimatedDuration: 120,
    actualDuration: 115,
    priority: 'Urgent',
    notes: 'Bait stations installed',
    createdAt: new Date('2024-10-08').toISOString(),
    updatedAt: new Date('2024-10-15').toISOString()
  },
  {
    id: 104,
    siteId: 4,
    technicianId: 1,
    scheduledDate: '2024-10-12',
    scheduledTime: '08:00',
    serviceType: 'General Pest Control',
    status: 'Completed',
    estimatedDuration: 45,
    actualDuration: 50,
    priority: 'Normal',
    notes: 'Restaurant treatment completed',
    createdAt: new Date('2024-10-05').toISOString(),
    updatedAt: new Date('2024-10-12').toISOString()
  },
  {
    id: 105,
    siteId: 1,
    technicianId: 2,
    scheduledDate: '2024-10-08',
    scheduledTime: '11:00',
    serviceType: 'Ant Control',
    status: 'Completed',
    estimatedDuration: 60,
    actualDuration: 65,
    priority: 'Normal',
    notes: 'Ant infestation treated',
    createdAt: new Date('2024-10-01').toISOString(),
    updatedAt: new Date('2024-10-08').toISOString()
  },
  {
    id: 106,
    siteId: 2,
    technicianId: 3,
    scheduledDate: '2024-10-05',
    scheduledTime: '13:30',
    serviceType: 'General Pest Control',
    status: 'Completed',
    estimatedDuration: 75,
    actualDuration: 70,
    priority: 'Normal',
    notes: 'Regular quarterly service',
    createdAt: new Date('2024-09-28').toISOString(),
    updatedAt: new Date('2024-10-05').toISOString()
  },
  {
    id: 107,
    siteId: 3,
    technicianId: 1,
    scheduledDate: '2024-10-01',
    scheduledTime: '09:30',
    serviceType: 'Wildlife Removal',
    status: 'Completed',
    estimatedDuration: 90,
    actualDuration: 95,
    priority: 'Urgent',
    notes: 'Raccoon removed from warehouse',
    createdAt: new Date('2024-09-25').toISOString(),
    updatedAt: new Date('2024-10-01').toISOString()
  },
  {
    id: 108,
    siteId: 4,
    technicianId: 2,
    scheduledDate: '2024-09-28',
    scheduledTime: '07:30',
    serviceType: 'Cockroach Treatment',
    status: 'Completed',
    estimatedDuration: 60,
    actualDuration: 55,
    priority: 'Emergency',
    notes: 'Kitchen area treated',
    createdAt: new Date('2024-09-20').toISOString(),
    updatedAt: new Date('2024-09-28').toISOString()
  }
];

// Service types available
export const serviceTypes = [
  'General Pest Control',
  'Termite Treatment',
  'Termite Inspection',
  'Rodent Control',
  'Bed Bug Treatment',
  'Wildlife Removal',
  'Mosquito Control',
  'Ant Control',
  'Cockroach Treatment',
  'Flea & Tick Treatment'
];

// Appointment priorities
export const priorities = ['Normal', 'Urgent', 'Emergency'];

// Appointment statuses
export const appointmentStatuses = ['Scheduled', 'In Progress', 'Completed', 'Cancelled'];

export const dashboardStats = {
  totalAccounts: 156,
  totalSites: 423,
  totalTechnicians: 12,
  scheduledToday: 18,
  completedThisWeek: 67,
  activeSubscriptions: 142,
  pendingInvoices: 23,
  revenue: {
    thisMonth: 45230,
    lastMonth: 42150,
    percentChange: 7.3
  }
};

export const inventory = [
  {
    id: 1,
    productName: 'Termidor SC',
    category: 'Chemical',
    sku: 'TERM-SC-001',
    quantity: 45,
    unit: 'Gallons',
    reorderLevel: 20,
    supplier: 'BASF',
    lastRestocked: '2024-10-15',
    unitCost: 85.50,
    activeIngredient: 'Fipronil 9.1%',
    epaNumber: 'EPA Reg. No. 7969-210',
    expiryDate: '2026-12-31'
  },
  {
    id: 2,
    productName: 'Demon WP',
    category: 'Pesticide',
    sku: 'DMN-WP-002',
    quantity: 15,
    unit: 'Envelopes',
    reorderLevel: 25,
    supplier: 'Syngenta',
    lastRestocked: '2024-09-28',
    unitCost: 28.90,
    activeIngredient: 'Cypermethrin 40%',
    epaNumber: 'EPA Reg. No. 100-1066',
    expiryDate: '2025-06-30'
  },
  {
    id: 3,
    productName: 'Suspend SC',
    category: 'Chemical',
    sku: 'SUS-SC-003',
    quantity: 32,
    unit: 'Bottles',
    reorderLevel: 15,
    supplier: 'Bayer',
    lastRestocked: '2024-10-18',
    unitCost: 42.75,
    activeIngredient: 'Deltamethrin 4.75%',
    epaNumber: 'EPA Reg. No. 432-763',
    expiryDate: '2026-03-15'
  },
  {
    id: 4,
    productName: 'Talstar Professional',
    category: 'Pesticide',
    sku: 'TAL-PRO-004',
    quantity: 8,
    unit: 'Jugs',
    reorderLevel: 12,
    supplier: 'FMC Corporation',
    lastRestocked: '2024-09-20',
    unitCost: 95.00,
    activeIngredient: 'Bifenthrin 7.9%',
    epaNumber: 'EPA Reg. No. 279-3206',
    expiryDate: '2025-11-20'
  },
  {
    id: 5,
    productName: 'Advion Ant Gel',
    category: 'Pesticide',
    sku: 'ADV-ANT-005',
    quantity: 28,
    unit: 'Tubes',
    reorderLevel: 20,
    supplier: 'Syngenta',
    lastRestocked: '2024-10-12',
    unitCost: 24.50,
    activeIngredient: 'Indoxacarb 0.05%',
    epaNumber: 'EPA Reg. No. 100-1498',
    expiryDate: '2026-08-31'
  },
  {
    id: 6,
    productName: 'Phantom Termiticide',
    category: 'Herbicide',
    sku: 'PHN-TRM-006',
    quantity: 18,
    unit: 'Bottles',
    reorderLevel: 15,
    supplier: 'BASF',
    lastRestocked: '2024-10-05',
    unitCost: 67.25,
    activeIngredient: 'Chlorfenapyr 21.45%',
    epaNumber: 'EPA Reg. No. 241-392',
    expiryDate: '2025-09-30'
  },
  {
    id: 7,
    productName: 'Bait Stations',
    category: 'Equipment',
    sku: 'BS-STD-007',
    quantity: 120,
    unit: 'Units',
    reorderLevel: 50,
    supplier: 'Pest Supplies Inc',
    lastRestocked: '2024-10-10',
    unitCost: 12.75
  },
  {
    id: 8,
    productName: 'Granular Bait',
    category: 'Rodent Control',
    sku: 'GRN-BT-008',
    quantity: 67,
    unit: 'Pounds',
    reorderLevel: 30,
    supplier: 'Pest Supplies Inc',
    lastRestocked: '2024-10-12',
    unitCost: 15.25
  },
  {
    id: 9,
    productName: 'Contrac All-Weather Blox',
    category: 'Chemical',
    sku: 'CTR-BLX-009',
    quantity: 42,
    unit: 'Pounds',
    reorderLevel: 25,
    supplier: 'Bell Laboratories',
    lastRestocked: '2024-10-08',
    unitCost: 32.80,
    activeIngredient: 'Bromadiolone 0.005%',
    epaNumber: 'EPA Reg. No. 12455-79',
    expiryDate: '2026-04-30'
  },
  {
    id: 10,
    productName: 'Sprayer Equipment',
    category: 'Equipment',
    sku: 'SPR-EQ-010',
    quantity: 8,
    unit: 'Units',
    reorderLevel: 3,
    supplier: 'Equipment Depot',
    lastRestocked: '2024-09-15',
    unitCost: 145.00
  },
  {
    id: 11,
    productName: 'Safety Gloves',
    category: 'Safety Equipment',
    sku: 'SFT-GLV-011',
    quantity: 156,
    unit: 'Pairs',
    reorderLevel: 50,
    supplier: 'Safety First Inc',
    lastRestocked: '2024-10-20',
    unitCost: 8.50
  },
  {
    id: 12,
    productName: 'Respirator Cartridges',
    category: 'Safety Equipment',
    sku: 'RSP-CRT-012',
    quantity: 24,
    unit: 'Cartridges',
    reorderLevel: 30,
    supplier: 'Safety First Inc',
    lastRestocked: '2024-09-25',
    unitCost: 18.75
  }
];

export const recentActivity = [
  {
    id: 1,
    type: 'appointment',
    description: 'Service completed at Smith Residence',
    timestamp: '2024-10-25T14:30:00',
    technician: 'David Martinez'
  },
  {
    id: 2,
    type: 'account',
    description: 'New account created: ABC Corp',
    timestamp: '2024-10-25T11:15:00',
    user: 'Admin'
  },
  {
    id: 3,
    type: 'inventory',
    description: 'Low stock alert: Demon WP',
    timestamp: '2024-10-25T09:00:00',
    user: 'System'
  },
  {
    id: 4,
    type: 'appointment',
    description: 'Appointment scheduled for Downtown Restaurant',
    timestamp: '2024-10-24T16:45:00',
    user: 'Admin'
  }
];

// Fleet/Vehicle data
export const vehicles = [
  {
    id: 1,
    vehicleNumber: 'VEH-001',
    make: 'Ford',
    model: 'Transit',
    year: 2022,
    licensePlate: 'ABC-1234',
    vin: '1FTBW3XM8NKA12345',
    mileage: 45230,
    fuelType: 'Gasoline',
    status: 'Active',
    assignedTechnicianId: 1,
    lastMaintenance: '2024-09-15',
    nextMaintenance: '2024-12-15',
    nextMaintenanceMileage: 50000,
    insuranceExpiry: '2025-06-30',
    registrationExpiry: '2025-08-15',
    gpsEnabled: true,
    currentLocation: { lat: 39.7990, lng: -89.6440 }, // North Springfield
    equipment: [
      { name: 'Sprayer System', condition: 'Good' },
      { name: 'Ladder - 16ft', condition: 'Good' },
      { name: 'Safety Equipment', condition: 'Good' }
    ],
    maintenanceHistory: [
      { date: '2024-09-15', type: 'Oil Change', cost: 85, mileage: 45000 },
      { date: '2024-06-10', type: 'Tire Rotation', cost: 120, mileage: 42000 },
      { date: '2024-03-20', type: 'Brake Service', cost: 450, mileage: 39000 }
    ]
  },
  {
    id: 2,
    vehicleNumber: 'VEH-002',
    make: 'Chevrolet',
    model: 'Express',
    year: 2021,
    licensePlate: 'XYZ-5678',
    vin: '1GCWGAFG8M1234567',
    mileage: 52100,
    fuelType: 'Gasoline',
    status: 'Active',
    assignedTechnicianId: 2,
    lastMaintenance: '2024-10-01',
    nextMaintenance: '2025-01-01',
    nextMaintenanceMileage: 55000,
    insuranceExpiry: '2025-05-15',
    registrationExpiry: '2025-07-20',
    gpsEnabled: true,
    currentLocation: { lat: 39.7456, lng: -89.6298 }, // South Springfield
    equipment: [
      { name: 'Termite Treatment System', condition: 'Excellent' },
      { name: 'Drill Equipment', condition: 'Good' },
      { name: 'Safety Equipment', condition: 'Good' }
    ],
    maintenanceHistory: [
      { date: '2024-10-01', type: 'Oil Change', cost: 90, mileage: 52000 },
      { date: '2024-07-15', type: 'Brake Inspection', cost: 75, mileage: 49000 }
    ]
  },
  {
    id: 3,
    vehicleNumber: 'VEH-003',
    make: 'Ram',
    model: 'ProMaster',
    year: 2023,
    licensePlate: 'DEF-9012',
    vin: '3C6TRVAG5NE123456',
    mileage: 28500,
    fuelType: 'Gasoline',
    status: 'Active',
    assignedTechnicianId: 3,
    lastMaintenance: '2024-08-20',
    nextMaintenance: '2024-11-20',
    nextMaintenanceMileage: 32000,
    insuranceExpiry: '2025-09-10',
    registrationExpiry: '2025-10-05',
    gpsEnabled: true,
    currentLocation: { lat: 39.7817, lng: -89.6501 }, // Springfield downtown
    equipment: [
      { name: 'Rodent Control Equipment', condition: 'Excellent' },
      { name: 'Trapping Supplies', condition: 'Good' },
      { name: 'Safety Equipment', condition: 'Excellent' }
    ],
    maintenanceHistory: [
      { date: '2024-08-20', type: 'Oil Change', cost: 95, mileage: 28000 },
      { date: '2024-05-10', type: 'Tire Rotation', cost: 110, mileage: 25000 }
    ]
  },
  {
    id: 4,
    vehicleNumber: 'VEH-004',
    make: 'Ford',
    model: 'Transit',
    year: 2022,
    licensePlate: 'GHI-3456',
    vin: '1FTBW3XM2NKA98765',
    mileage: 38900,
    fuelType: 'Gasoline',
    status: 'Maintenance',
    assignedTechnicianId: 4,
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2025-01-20',
    nextMaintenanceMileage: 42000,
    insuranceExpiry: '2025-07-25',
    registrationExpiry: '2025-09-30',
    gpsEnabled: true,
    currentLocation: { lat: 39.8017, lng: -89.6537 }, // West Springfield
    equipment: [
      { name: 'General Pest Equipment', condition: 'Good' },
      { name: 'Ladder - 12ft', condition: 'Fair' },
      { name: 'Safety Equipment', condition: 'Good' }
    ],
    maintenanceHistory: [
      { date: '2024-10-20', type: 'Transmission Service', cost: 650, mileage: 38900 },
      { date: '2024-07-05', type: 'Oil Change', cost: 85, mileage: 36000 }
    ]
  }
];

// Daily routes - initially empty, will be generated by user
export const routes = [];

// Route templates (for recurring routes)
export const routeTemplates = [
  {
    id: 1,
    name: 'North Zone - Monday Route',
    zone: 'North',
    dayOfWeek: 'Monday',
    technicianId: 1,
    vehicleId: 1,
    estimatedDistance: 50,
    estimatedDuration: 480,
    isActive: true
  },
  {
    id: 2,
    name: 'South Zone - Weekly Inspection',
    zone: 'South',
    dayOfWeek: 'Wednesday',
    technicianId: 3,
    vehicleId: 3,
    estimatedDistance: 40,
    estimatedDuration: 420,
    isActive: true
  }
];
