// Mock data for Pest Management System

export const customers = [
  {
    id: 1,
    customerNum: 'ACC-001',
    name: 'Smith Residence',
    customerType: 1,
    companyId: 1,
    localeId: 1,
    sendInvoice: true,
    emailInvoice: true,
    isActive: 1,
    instructions: 'Please call before arrival',
    primaryNote: 'Regular monthly service',
    registrationNum: 'REG-2024-001',
    billingContact: {
      firstName: 'John',
      middleName: '',
      lastName: 'Smith',
      email: 'john@example.com',
      alternateEmails: ['j.smith@personal.com'],
      phones: [{ type: 'mobile', number: '+15550101' }]
    },
    billingAddress: { street: '123 Main St', city: 'Springfield', state: 'IL', zip: '62701' }
  },
  {
    id: 2,
    customerNum: 'ACC-002',
    name: 'Johnson Commercial Properties',
    customerType: 2,
    companyId: 1,
    localeId: 1,
    sendInvoice: true,
    emailInvoice: true,
    isActive: 1,
    instructions: 'Service after hours only',
    primaryNote: 'Quarterly inspections required',
    registrationNum: 'REG-2024-002',
    billingContact: {
      firstName: 'Sarah',
      middleName: '',
      lastName: 'Johnson',
      email: 'sarah@jcp.com',
      alternateEmails: ['sjohnson@company.com'],
      phones: [
        { type: 'mobile', number: '+15550102' },
        { type: 'landline', number: '+15550199' }
      ]
    },
    billingAddress: { street: '456 Business Blvd', city: 'Springfield', state: 'IL', zip: '62702' }
  },
  {
    id: 3,
    customerNum: 'ACC-003',
    name: 'Downtown Restaurant Group',
    customerType: 2,
    companyId: 1,
    localeId: 1,
    sendInvoice: true,
    emailInvoice: false,
    isActive: 1,
    instructions: 'Service before 10 AM',
    primaryNote: 'Health inspection compliance',
    registrationNum: 'REG-2024-003',
    billingContact: {
      firstName: 'Mike',
      middleName: '',
      lastName: 'Chen',
      email: 'mike@drg.com',
      alternateEmails: [],
      phones: [{ type: 'mobile', number: '+15550103' }]
    },
    billingAddress: { street: '789 Restaurant Row', city: 'Springfield', state: 'IL', zip: '62703' }
  }
];

export const serviceAddresses = [
  {
    id: 1,
    customerId: 1,
    serviceAddressName: 'Main Residence',
    address: '123 Main St, Springfield, IL 62701',
    contactName: 'John Smith',
    contactPhone: '555-0101',
    serviceAddressType: 'Residential',
    instructions: 'Ring doorbell, dog in backyard',
    isActive: true,
    lastServiceDate: '2024-10-01',
    coordinates: { lat: 39.7817, lng: -89.6501 }, // Springfield downtown
    zone: 'North',
    serviceAddressClosingTime: '18:00', // Closes at 6 PM
    customerTier: 'VIP' // VIP customer
  },
  {
    id: 2,
    customerId: 2,
    serviceAddressName: 'Office Building A',
    address: '456 Business Blvd Suite 100, Springfield, IL 62702',
    contactName: 'Sarah Johnson',
    contactPhone: '555-0102',
    serviceAddressType: 'Commercial',
    instructions: 'Check in with security',
    isActive: true,
    lastServiceDate: '2024-09-15',
    coordinates: { lat: 39.7990, lng: -89.6440 }, // North Springfield
    zone: 'North',
    serviceAddressClosingTime: '17:00', // Closes at 5 PM
    customerTier: 'Contract' // Contract customer
  },
  {
    id: 3,
    customerId: 2,
    serviceAddressName: 'Warehouse Facility',
    address: '789 Industrial Dr, Springfield, IL 62704',
    contactName: 'Tom Wilson',
    contactPhone: '555-0104',
    serviceAddressType: 'Industrial',
    instructions: 'Use loading dock entrance',
    isActive: true,
    lastServiceDate: '2024-09-20',
    coordinates: { lat: 39.7456, lng: -89.6298 }, // South Springfield
    zone: 'South',
    serviceAddressClosingTime: '16:00' // Closes at 4 PM
  },
  {
    id: 4,
    customerId: 3,
    serviceAddressName: 'Main Restaurant',
    address: '789 Restaurant Row, Springfield, IL 62703',
    contactName: 'Mike Chen',
    contactPhone: '555-0103',
    serviceAddressType: 'Food Service',
    instructions: 'Service before opening hours',
    isActive: true,
    lastServiceDate: '2024-10-10',
    coordinates: { lat: 39.8017, lng: -89.6537 }, // West Springfield
    zone: 'West',
    serviceAddressClosingTime: '10:00', // Service must be done before 10 AM opening
    customerTier: 'VIP'
  },
  {
    id: 5,
    customerId: 1,
    serviceAddressName: 'Luxury Apartments - East Wing',
    address: '500 Riverside Dr, Springfield, IL 62703',
    contactName: 'Patricia Davis',
    contactPhone: '555-0105',
    serviceAddressType: 'Multi-Family',
    instructions: 'Use service elevator, notify building manager',
    isActive: true,
    lastServiceDate: '2024-10-12',
    coordinates: { lat: 39.7920, lng: -89.6380 }, // East Springfield
    zone: 'East',
    serviceAddressClosingTime: '17:00',
    customerTier: 'Contract'
  },
  {
    id: 6,
    customerId: 3,
    serviceAddressName: 'Shopping Mall - Food Court',
    address: '1200 Shopping Plaza, Springfield, IL 62704',
    contactName: 'Robert Lee',
    contactPhone: '555-0106',
    serviceAddressType: 'Food Service',
    instructions: 'Service after closing at 9 PM',
    isActive: true,
    lastServiceDate: '2024-10-08',
    coordinates: { lat: 39.7650, lng: -89.6150 }, // Far South
    zone: 'South'
  },
  {
    id: 7,
    customerId: 2,
    serviceAddressName: 'Medical Center',
    address: '850 Hospital Rd, Springfield, IL 62702',
    contactName: 'Dr. Amanda Foster',
    contactPhone: '555-0107',
    serviceAddressType: 'Healthcare',
    instructions: 'URGENT: Active pest issue in kitchen area',
    isActive: true,
    lastServiceDate: '2024-09-28',
    coordinates: { lat: 39.8100, lng: -89.6520 }, // North West
    zone: 'North',
    customerTier: 'VIP',
    serviceAddressClosingTime: '20:00' // Open late but prefers service before 8 PM
  },
  {
    id: 8,
    customerId: 1,
    serviceAddressName: 'Storage Facility - Units A-F',
    address: '3400 Storage Lane, Springfield, IL 62701',
    contactName: 'James Mitchell',
    contactPhone: '555-0108',
    serviceAddressType: 'Storage',
    instructions: 'Gate code: 4521, check all units',
    isActive: true,
    lastServiceDate: '2024-10-05',
    coordinates: { lat: 39.7550, lng: -89.6800 }, // Far West
    zone: 'West'
  }
];

export const employees = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-0121',
    position: 'Sales Representative',
    isActive: true
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    phone: '555-0122',
    position: 'Operator',
    isActive: true
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    phone: '555-0123',
    position: 'Customer Support',
    isActive: true
  }
];

export const sources = [
  { id: 1, name: 'Website' },
  { id: 2, name: 'Call' },
  { id: 3, name: 'Email Campaign' },
  { id: 4, name: 'Social Media' },
  { id: 5, name: 'Referral' }
];

export const leadStatuses = [
  { id: 1, label: 'New' },
  { id: 2, label: 'Contacted' },
  { id: 3, label: 'Qualified' },
  { id: 4, label: 'Quote Sent' },
  { id: 5, label: 'Won' },
  { id: 6, label: 'Lost' },
  { id: 7, label: 'Disqualified' }
];

export const prospectStatuses = [
  { id: 1, label: 'New' },
  { id: 2, label: 'Contacted' },
  { id: 3, label: 'Qualified' },
  { id: 4, label: 'Lost' }
];

export const inspectionPointStatuses = [
  { id: 0, label: 'Inactive' },
  { id: 1, label: 'Active' },
  { id: 2, label: 'Needs Attention' },
  { id: 3, label: 'Warning' },
  { id: 4, label: 'Critical' }
];

export const leads = [
  {
    id: 1,
    name: 'Lead 1',
    status: 1, // New
    dateCreated: '2024-09-01',
    customerId: 1,
    serviceInterest: 'General Pest Control',
    assignedSalesRep: 1,
    sourceId: 1
  },
  {
    id: 3,
    name: 'Lead 3',
    status: 2, // Contacted
    dateCreated: '2024-09-01',
    customerId: 1,
    serviceInterest: 'Termite Treatment',
    assignedSalesRep: 1,
    sourceId: 2
  },
  {
    id: 2,
    name: 'Lead 2',
    status: 2, // Contacted
    dateCreated: '2024-09-02',
    customerId: 2,
    serviceInterest: 'Termite Treatment',
    assignedSalesRep: 1,
    sourceId: 3
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

export const facilities = [
  {
    id: 1,
    name: 'Main Residence - Facility A',
    serviceAddressId: 1,
    drawing: {
      id: 'DRAW-001',
      name: 'Main Residence - Drawing A',
      url: 'https://mapme.com/wp-content/uploads/2024/10/interactive-map-manufacturing-plant-example.png'
    }
  },
  {
    id: 3,
    name: 'Main Residence - Facility B',
    serviceAddressId: 1,
    drawing: {
      id: 'DRAW-003',
      name: 'Main Residence - Drawing B',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Facility-map.jpg'
    }
  },
  {
    id: 2,
    name: 'Main Restaurant - Facility A',
    serviceAddressId: 2,
    drawing: {
      id: 'DRAW-002',
      name: 'Main Restaurant - Drawing A',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Facility-map.jpg'
    }
  },
  {
    id: 4,
    name: 'Main Restaurant - Facility B',
    serviceAddressId: 2,
    drawing: {
      id: 'DRAW-004',
      name: 'Main Restaurant - Drawing B',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Facility-map.jpg'
    }
  }
];

export const areas = [
  {
    id: 1,
    name: 'Kitchen',
    facilityId: 1,
  },
  {
    id: 2,
    name: 'Basement',
    facilityId: 1,
  },
  {
    id: 3,
    name: 'Storage Room',
    facilityId: 2,
  },
  {
    id: 4,
    name: 'Dining Area',
    facilityId: 2,
  }
];

export const inspectionPoints = [
  {
    id: 1,
    pointName: 'Main Residence - Inspection Point A',
    barcode: 'IP-0001',
    areaId: 1,
    type: 'Garbage Disposal Areas',
    typeCategory: 'Sanitation',
    status: 1
  },
  {
    id: 4,
    pointName: 'Main Residence - Inspection Point B',
    barcode: 'IP-0004',
    areaId: 1,
    type: 'Food Storage Areas',
    typeCategory: 'Sanitation',
    status: 4
  },
  {
    id: 5,
    pointName: 'Main Residence - Inspection Point C',
    barcode: 'IP-0005',
    areaId: 2,
    type: 'Garbage Disposal Areas',
    typeCategory: 'Sanitation',
    status: 3
  },
  {
    id: 2,
    pointName: 'Main Restaurant - Inspection Point A',
    barcode: 'IP-0002',
    areaId: 3,
    type: 'Bait Stations',
    typeCategory: 'Monitoring Devices',
    status: 2
  },
  {
    id: 3,
    pointName: 'Main Restaurant - Inspection Point B',
    barcode: 'IP-0003',
    areaId: 3,
    type: 'Rodent Boxes',
    typeCategory: 'Monitoring Devices',
    status: 0
  }
];

// ---- Inspection Point Helper Functions (mutable in-memory; use localStorage CRUD for persistence in app) ----
export const getInspectionPoints = () => inspectionPoints;

export const getInspectionPointsByCustomerId = (customerId) => {
  if (customerId === undefined || customerId === null) return [...inspectionPoints];
  return inspectionPoints.filter(ip => {
    const area = areas.find(a => a.id === ip.areaId);
    if (!area) return false;
    const facility = facilities.find(f => f.id === area.facilityId);
    if (!facility) return false;
    const serviceAddress = serviceAddresses.find(sa => sa.id === facility.serviceAddressId);
    if (!serviceAddress) return false;
    return serviceAddress.customerId === customerId;
  });
};

export const setInspectionPoints = (points) => {
  // Replace contents without reassigning reference (to keep existing imports reactive)
  inspectionPoints.length = 0;
  points.forEach(p => inspectionPoints.push(p));
  return inspectionPoints;
};

export const addInspectionPoint = (point) => {
  const nextId = point.id && point.id > 0 ? point.id : (inspectionPoints.reduce((m, p) => Math.max(m, p.id), 0) + 1);
  const newPoint = { ...point, id: nextId };
  inspectionPoints.push(newPoint);
  return newPoint;
};

export const updateInspectionPoint = (id, updated) => {
  const idx = inspectionPoints.findIndex(p => p.id === id);
  if (idx === -1) return null;
  inspectionPoints[idx] = { ...inspectionPoints[idx], ...updated, id };
  return inspectionPoints[idx];
};

export const deleteInspectionPoint = (id) => {
  const idx = inspectionPoints.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const [removed] = inspectionPoints.splice(idx, 1);
  return removed;
};

export const prospects = [
  {
    id: 1,
    name: 'Prospect 1',
    status: 1, // New
    dateCreated: '2024-09-01',
    customerId: 1,
    serviceInterest: 'General Pest Control',
    assignedSalesRep: 1,
    sourceId: 1
  },
  {
    id: 2,
    name: 'Prospect 2',
    status: 3, // Qualified
    dateCreated: '2024-09-05',
    customerId: 1,
    serviceInterest: 'Rodent Control',
    assignedSalesRep: 2,
    sourceId: 4
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
  // Today's appointments - Designed for realistic 8-hour workday testing

  // EMERGENCY scheduled for LATER in the day - Should trigger "emergency delayed" alert
  {
    id: 1,
    serviceAddressId: 7, // Medical Center - VIP
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '14:00', // 2 PM
    serviceType: 'Cockroach Treatment',
    status: 'Scheduled',
    estimatedDuration: 60, // Reduced from 90
    actualDuration: null,
    priority: 'Emergency',
    notes: 'CRITICAL: Active cockroach infestation in hospital kitchen - health code violation',
    requiredEquipment: ['Commercial Sprayer', 'Heavy-Duty Chemicals', 'Safety Gear'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Normal appointment - early morning
  {
    id: 2,
    serviceAddressId: 1, // Main Residence - VIP
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '08:30',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 45, // Reduced from 60
    actualDuration: null,
    priority: 'Normal',
    notes: 'Regular monthly service - VIP customer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Urgent appointment with equipment needs
  {
    id: 3,
    serviceAddressId: 3, // Warehouse - closes at 4 PM
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '10:00',
    serviceType: 'Rodent Control',
    status: 'Scheduled',
    estimatedDuration: 75, // Reduced from 120
    actualDuration: null,
    priority: 'Urgent',
    notes: 'Warehouse rodent control - bait stations',
    requiredEquipment: ['Bait Stations', 'Traps', 'Rodenticide'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Restaurant - MUST be done before 10 AM (service address closes at 10:00)
  {
    id: 4,
    serviceAddressId: 4, // Main Restaurant - VIP
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '07:00', // Early to avoid conflict
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 45,
    actualDuration: null,
    priority: 'Normal',
    notes: 'Pre-opening service - MUST complete before 10 AM',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Contract customer appointment
  {
    id: 5,
    serviceAddressId: 5, // Luxury Apartments - Contract
    technicianId: 1,
    scheduledDate: formatDate(today),
    scheduledTime: '12:00',
    serviceType: 'General Pest Control',
    status: 'Scheduled',
    estimatedDuration: 60, // Reduced from 90
    actualDuration: null,
    priority: 'Normal',
    notes: 'Multi-family building - common areas',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // UNASSIGNED EMERGENCY - Should trigger "critical" alert (not assigned to David)
  {
    id: 7,
    serviceAddressId: 2, // Office Building - Contract
    technicianId: null, // NO TECHNICIAN ASSIGNED
    scheduledDate: formatDate(today),
    scheduledTime: '09:00',
    serviceType: 'Bed Bug Treatment',
    status: 'Scheduled',
    estimatedDuration: 120, // Reduced from 180
    actualDuration: null,
    priority: 'Emergency',
    notes: '⚠️ UNASSIGNED EMERGENCY: Bed bugs reported in office - employees refusing to work',
    requiredEquipment: ['Heat Treatment Equipment', 'Bed Bug Chemicals', 'Vacuum'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Tomorrow's appointments
  {
    id: 9,
    serviceAddressId: 2,
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
    id: 10,
    serviceAddressId: 1,
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
    id: 11,
    serviceAddressId: 4,
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
    id: 12,
    serviceAddressId: 3,
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
    id: 13,
    serviceAddressId: 1,
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
    id: 14,
    serviceAddressId: 2,
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
    id: 15,
    serviceAddressId: 4,
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
    id: 16,
    serviceAddressId: 1,
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
    serviceAddressId: 1,
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
    serviceAddressId: 2,
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
    serviceAddressId: 3,
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
    serviceAddressId: 4,
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
    serviceAddressId: 1,
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
    serviceAddressId: 2,
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
    serviceAddressId: 3,
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
    serviceAddressId: 4,
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
export const priorities = [
  'Normal',
  'Urgent',
  'Emergency'
];

// Appointment statuses
export const appointmentStatuses = [
  'Scheduled',
  'In Progress',
  'Completed',
  'Cancelled'
];

export const dashboardStats = {
  totalCustomers: 156,
  totalServiceAddresses: 423,
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
    itemName: 'Termidor SC',
    sku: 'TERM-SC-001',
    itemType: 'Chemical',
    category: 'Termite Control',
    subCategory: 'Liquid Concentrate',
    description: 'Non-repellent termiticide for exterior perimeter treatment.',
    manufacturer: 'BASF',
    supplier: 'Global Pest Supplies',
    active: true,
    epa: '7969-210',
    activeIng: 'Fipronil 9.1%',
    concentration: '0.06%',
    formulationType: 'Liquid',
    hazardClassification: 'Toxic',
    sds: null,
    sdsUrl: 'https://example.com/sds/termidor-sc.pdf',
    expiry: '2026-12-31',
    batchEnabled: true,
    trackStock: true,
    uom: 'Gallon',
    quantity: 45,
    minStock: 10,
    reorderPoint: 20,
    reorderQuantity: 24,
    costPerUnit: 85.50,
    sellingPricePerUnit: 150.00,
    warehouseLocation: 'Main Warehouse',
    storageRequirements: 'Locked Store',
    barcode: 'CHEM-001-FIPRONIL',
    assignedTo: '',
    defaultUsageUnit: 'ml',
    trackPerSite: false,
    returnable: false,
    serialized: false,
    negativeStock: false,
    createdBy: 'Admin',
    updatedBy: 'Admin',
    notes: 'Primary termiticide for residential jobs.'
  },
  {
    id: 2,
    itemName: 'Demon WP',
    sku: 'DMN-WP-002',
    itemType: 'Chemical',
    category: 'Insect Control',
    subCategory: 'Wettable Powder',
    description: 'Long-lasting residual insecticide for various pests.',
    manufacturer: 'Syngenta',
    supplier: 'PestTech Distributors',
    active: true,
    epa: '100-1066',
    activeIng: 'Cypermethrin 40%',
    concentration: '1 scoop per gallon',
    formulationType: 'Dust',
    hazardClassification: 'Toxic',
    sds: null,
    sdsUrl: 'https://example.com/sds/demon-wp.pdf',
    expiry: '2025-06-30',
    batchEnabled: false,
    trackStock: true,
    uom: 'Pack',
    quantity: 15,
    minStock: 10,
    reorderPoint: 25,
    reorderQuantity: 50,
    costPerUnit: 28.90,
    sellingPricePerUnit: 45.00,
    warehouseLocation: 'Main Warehouse',
    storageRequirements: 'Room Temperature',
    barcode: 'CHEM-002-CYPER',
    assignedTo: '',
    defaultUsageUnit: 'g',
    trackPerSite: false,
    returnable: false,
    serialized: false,
    negativeStock: false,
    createdBy: 'Admin',
    updatedBy: 'Admin',
    notes: ''
  },
  {
    id: 3,
    itemName: 'Contrac All-Weather Blox',
    sku: 'CTR-BLX-009',
    itemType: 'Bait Station',
    category: 'Rodent Control',
    subCategory: 'Block Bait',
    description: 'Single-feeding anticoagulant rodenticide block bait.',
    manufacturer: 'Bell Laboratories',
    supplier: 'ABC Supply Co.',
    active: true,
    epa: '12455-79',
    activeIng: 'Bromadiolone 0.005%',
    concentration: 'N/A',
    formulationType: 'Gel',
    hazardClassification: 'Toxic',
    sds: null,
    sdsUrl: 'https://example.com/sds/contrac-blox.pdf',
    expiry: '2026-04-30',
    batchEnabled: false,
    trackStock: true,
    uom: 'Box',
    quantity: 42,
    minStock: 20,
    reorderPoint: 25,
    reorderQuantity: 20,
    costPerUnit: 32.80,
    sellingPricePerUnit: 55.00,
    warehouseLocation: 'Main Warehouse',
    storageRequirements: 'Locked Store',
    barcode: 'BAIT-001-BROMAD',
    assignedTo: '',
    defaultUsageUnit: 'pcs',
    trackPerSite: true,
    returnable: false,
    serialized: false,
    negativeStock: false,
    createdBy: 'Admin',
    updatedBy: 'Admin',
    notes: 'Use in tamper-resistant bait stations.'
  },
  {
    id: 7,
    itemName: 'Protecta EVO Express Bait Station',
    sku: 'BS-STD-007',
    itemType: 'Device',
    category: 'Rodent Control',
    subCategory: 'Bait Station',
    description: 'Tamper-resistant bait station for rodent control.',
    manufacturer: 'Bell Laboratories',
    supplier: 'Pest Supplies Inc',
    active: true,
    epa: '',
    activeIng: '',
    concentration: '',
    formulationType: '',
    hazardClassification: '',
    sds: null,
    sdsUrl: '',
    expiry: '',
    batchEnabled: false,
    trackStock: true,
    uom: 'Piece',
    quantity: 120,
    minStock: 25,
    reorderPoint: 50,
    reorderQuantity: 100,
    costPerUnit: 12.75,
    sellingPricePerUnit: 25.00,
    warehouseLocation: 'Main Warehouse',
    storageRequirements: 'Room Temperature',
    barcode: 'DEV-BS-PRO-001',
    assignedTo: '',
    defaultUsageUnit: 'pcs',
    trackPerSite: true,
    returnable: true,
    serialized: true,
    negativeStock: false,
    createdBy: 'Admin',
    updatedBy: 'Admin',
    notes: 'Serialized for tracking at customer sites.'
  },
  {
    id: 11,
    itemName: 'Nitrile Safety Gloves',
    sku: 'SFT-GLV-011',
    itemType: 'PPE',
    category: 'Safety',
    subCategory: 'Gloves',
    description: 'Disposable nitrile gloves for chemical handling.',
    manufacturer: 'Safety First Inc',
    supplier: 'Safety First Inc',
    active: true,
    epa: '',
    activeIng: '',
    concentration: '',
    formulationType: '',
    hazardClassification: '',
    sds: null,
    sdsUrl: '',
    expiry: '',
    batchEnabled: false,
    trackStock: true,
    uom: 'Box',
    quantity: 156,
    minStock: 20,
    reorderPoint: 50,
    reorderQuantity: 100,
    costPerUnit: 8.50,
    sellingPricePerUnit: 0.15,
    warehouseLocation: 'Main Warehouse',
    storageRequirements: 'Room Temperature',
    barcode: '',
    assignedTo: 'Technician',
    defaultUsageUnit: 'pcs',
    trackPerSite: false,
    returnable: false,
    serialized: false,
    negativeStock: true,
    createdBy: 'Admin',
    updatedBy: 'Admin',
    notes: 'Standard issue for all technicians.'
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
    type: 'customer',
    description: 'New customer created: ABC Corp',
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

export const programs = [
  {
    id: 1,
    name: 'Residential Pest Control',
    description: 'Comprehensive pest control for residential properties',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Commercial Pest Management',
    description: 'Professional pest management for commercial properties',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Termite Protection Plan',
    description: 'Specialized termite inspection and treatment services',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Rodent Control Program',
    description: 'Complete rodent control and prevention',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const services = [
  {
    id: 1,
    name: 'General Pest Control',
    programId: 1,
    productionPrice: 85.00,
    salesPrice: 125.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Ant Control',
    programId: 1,
    productionPrice: 65.00,
    salesPrice: 95.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: 'Cockroach Treatment',
    programId: 1,
    productionPrice: 75.00,
    salesPrice: 110.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Spider Control',
    programId: 1,
    productionPrice: 70.00,
    salesPrice: 100.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 5,
    name: 'Commercial Pest Inspection',
    programId: 2,
    productionPrice: 120.00,
    salesPrice: 175.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 6,
    name: 'Commercial Pest Treatment',
    programId: 2,
    productionPrice: 200.00,
    salesPrice: 295.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 7,
    name: 'Quarterly Maintenance',
    programId: 2,
    productionPrice: 150.00,
    salesPrice: 220.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 8,
    name: 'Termite Inspection',
    programId: 3,
    productionPrice: 95.00,
    salesPrice: 145.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 9,
    name: 'Termite Treatment',
    programId: 3,
    productionPrice: 450.00,
    salesPrice: 650.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 10,
    name: 'Termite Barrier Installation',
    programId: 3,
    productionPrice: 350.00,
    salesPrice: 525.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 11,
    name: 'Rodent Inspection',
    programId: 4,
    productionPrice: 75.00,
    salesPrice: 110.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 12,
    name: 'Rodent Control Treatment',
    programId: 4,
    productionPrice: 125.00,
    salesPrice: 185.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 13,
    name: 'Bait Station Installation',
    programId: 4,
    productionPrice: 95.00,
    salesPrice: 140.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 14,
    name: 'Wildlife Removal',
    programId: 4,
    productionPrice: 175.00,
    salesPrice: 260.00,
    taxType: 'Sales Tax',
    taxValue: 8.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const contracts = [
  {
    id: 1,
    contractNumber: 'CONT-001',
    serviceAddressId: 1,
    programId: 1,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    contractNumber: 'CONT-002',
    serviceAddressId: 2,
    programId: 2,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 3,
    contractNumber: 'CONT-003',
    serviceAddressId: 3,
    programId: 2,
    startDate: '2024-02-01',
    endDate: '2024-12-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 4,
    contractNumber: 'CONT-004',
    serviceAddressId: 4,
    programId: 1,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 5,
    contractNumber: 'CONT-005',
    serviceAddressId: 5,
    programId: 1,
    startDate: '2024-01-10',
    endDate: '2024-12-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: 6,
    contractNumber: 'CONT-006',
    serviceAddressId: 1,
    programId: 3,
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z'
  },
  {
    id: 7,
    contractNumber: 'CONT-007',
    serviceAddressId: 7,
    programId: 2,
    startDate: '2024-04-01',
    endDate: '2024-12-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z'
  },
  {
    id: 8,
    contractNumber: 'CONT-008',
    serviceAddressId: 3,
    programId: 4,
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    status: 'Active',
    isActive: true,
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-05-01T00:00:00Z'
  }
];
