// localStorage utility functions for Bugworx Pest Management System
import { users as staticUsers } from '../data/users';

const STORAGE_KEYS = {
  APPOINTMENTS: 'bugworx_appointments',
  CUSTOMERS: 'bugworx_customers',
  SERVICE_ADDRESSES: 'bugworx_service_addresses',
  TECHNICIANS: 'bugworx_technicians',
  INVENTORY: 'bugworx_inventory',
  VEHICLES: 'bugworx_vehicles',
  ROUTES: 'bugworx_routes',
  ROUTE_TEMPLATES: 'bugworx_route_templates',
  FACILITIES: 'bugworx_facilities',
  AREAS: 'bugworx_areas',
  INSPECTION_POINTS: 'bugworx_inspection_points',
  SERVICE_TYPES: 'bugworx_service_types',
  USERS_KEY: 'bugworx_users',
  ROLES_KEY: 'bugworx_roles',
  TEAMS_KEY: 'bugworx_teams_branches',
  EMPLOYEES_KEY: 'bugworx_employees',
  ACTIVITY_KEY: 'bugworx_activity_log',
  PROSPECTS: 'bugworx_prospects',
  OPERATIONAL_SETUP_CONTRACT_TYPES: 'bugworx_operational_setup_contract_types',
  OPERATIONAL_SETUP_SERVICE_TYPES: 'bugworx_operational_setup_service_types',
  OPERATIONAL_SETUP_FREQUENCY_TEMPLATES: 'bugworx_operational_setup_frequency_templates',
  OPERATIONAL_SETUP_JOB_SETTINGS: 'bugworx_operational_setup_job_settings',
  OPERATIONAL_SETUP_ROUTE_CONFIGURATION: 'bugworx_operational_setup_route_configuration',
  OPERATIONAL_SETUP_ZONES: 'bugworx_operational_setup_zones',
  SERVICE_INSPECTION_PEST_TYPES: 'bugworx_service_inspection_pest_types',
  SERVICE_INSPECTION_POINT_TYPES: 'bugworx_service_inspection_point_types',
  SERVICE_INSPECTION_TREATMENT_TYPES: 'bugworx_service_inspection_treatment_types',
  SERVICE_INSPECTION_SERVICE_TEMPLATES: 'bugworx_service_inspection_service_templates',
  SERVICE_INSPECTION_EQUIPMENT_DEVICES: 'bugworx_service_inspection_equipment_devices',
  SERVICE_INSPECTION_MATERIAL_SETUP: 'bugworx_service_inspection_material_setup',
  SERVICE_INSPECTION_INSPECTION_POINT_CATEGORIES: 'bugworx_service_inspection_inspection_point_categories',
  LEADS: 'bugworx_leads',
  SERVICE_TYPES: 'bugworx_service_types',
  PROPOSALS: 'bugworx_proposals',
  CONFIGURATION: 'bugworx_configuration',
  INVOICES_KEY: 'bugworx_invoices',
  PROGRAMS: 'bugworx_programs',
};

// Generic storage functions
export const getFromStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
};

export const clearAllStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Appointment-specific functions
export const getAppointments = () => {
  return getFromStorage(STORAGE_KEYS.APPOINTMENTS, []);
};

export const setAppointments = (appointments) => {
  return setToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
};

export const addAppointment = (appointment) => {
  const appointments = getAppointments();
  const newAppointment = {
    ...appointment,
    id: Date.now(), // Generate unique ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  setAppointments(appointments);
  return newAppointment;
};

export const updateAppointment = (id, updates) => {
  const appointments = getAppointments();
  const index = appointments.findIndex((apt) => apt.id === id);
  if (index !== -1) {
    appointments[index] = {
      ...appointments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setAppointments(appointments);
    return appointments[index];
  }
  return null;
};

export const deleteAppointment = (id) => {
  const appointments = getAppointments();
  const filtered = appointments.filter((apt) => apt.id !== id);
  setAppointments(filtered);
  return filtered.length < appointments.length;
};

export const getAppointmentById = (id) => {
  const appointments = getAppointments();
  return appointments.find((apt) => apt.id === id);
};

// Customer-specific functions
export const getCustomers = () => {
  return getFromStorage(STORAGE_KEYS.CUSTOMERS, []);
};

export const setCustomers = (customers) => {
  return setToStorage(STORAGE_KEYS.CUSTOMERS, customers);
};

// ServiceAddress-specific functions
export const getServiceAddresses = () => {
  return getFromStorage(STORAGE_KEYS.SERVICE_ADDRESSES, []);
};

export const setServiceAddresses = (serviceAddresses) => {
  return setToStorage(STORAGE_KEYS.SERVICE_ADDRESSES, serviceAddresses);
};

export const addCustomer = (customer) => {
  const customers = getCustomers();
  const newCustomer = {
    ...customer,
    id: Date.now(),
    customerNum: `ACC-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  customers.push(newCustomer);
  setCustomers(customers);
  return newCustomer;
};

export const updateCustomer = (id, updates) => {
  const customers = getCustomers();
  const index = customers.findIndex((cust) => cust.id === id);
  if (index !== -1) {
    customers[index] = {
      ...customers[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setCustomers(customers);
    return customers[index];
  }
  return null;
};

export const getCustomerById = (id) => {
  const customers = getCustomers();
  return customers.find((cust) => cust.id === id);
};

export const addServiceAddress = (serviceAddress) => {
  const serviceAddresses = getServiceAddresses();
  const newServiceAddress = {
    ...serviceAddress,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  serviceAddresses.push(newServiceAddress);
  setServiceAddresses(serviceAddresses);
  return newServiceAddress;
};

export const updateServiceAddress = (id, updates) => {
  const serviceAddresses = getServiceAddresses();
  const index = serviceAddresses.findIndex((s) => s.id === id);
  if (index !== -1) {
    serviceAddresses[index] = {
      ...serviceAddresses[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setServiceAddresses(serviceAddresses);
    return serviceAddresses[index];
  }
  return null;
};

export const getServiceAddressesByCustomerId = (customerId) => {
  const serviceAddresses = getServiceAddresses();
  return serviceAddresses.filter((serviceAddress) => serviceAddress.customerId === customerId);
};

const DEFAULT_SERVICE_TYPES = [
  { id: 1, name: 'General Pest Control' },
  { id: 2, name: 'Termite Treatment' },
  { id: 3, name: 'Rodent Control' },
  { id: 4, name: 'Bed Bug Treatment' },
  { id: 5, name: 'Ant Control' },
  { id: 6, name: 'Cockroach Control' },
  { id: 7, name: 'Spider Control' },
  { id: 8, name: 'Mosquito Control' },
  { id: 9, name: 'Flea & Tick Control' },
  { id: 10, name: 'Wildlife Removal' },
];

export const getServiceTypes = () => {
  const serviceTypes = getFromStorage(STORAGE_KEYS.SERVICE_TYPES, []);
  if (serviceTypes.length === 0) {
    setServiceTypes(DEFAULT_SERVICE_TYPES);
    return DEFAULT_SERVICE_TYPES;
  }
  return serviceTypes;
};

export const setServiceTypes = (serviceTypes) => {
  return setToStorage(STORAGE_KEYS.SERVICE_TYPES, serviceTypes);
};

export const addServiceType = (serviceType) => {
  const serviceTypes = getServiceTypes();
  if (!serviceTypes.includes(serviceType)) {
    serviceTypes.push(serviceType);
    setServiceTypes(serviceTypes);
    return true;
  }
  return false;
};

export const removeServiceType = (serviceType) => {
  const serviceTypes = getServiceTypes();
  const filtered = serviceTypes.filter((st) => st !== serviceType);
  if (filtered.length < serviceTypes.length) {
    setServiceTypes(filtered);
    return true;
  }
  return false;
};

// Technician-specific functions
export const getTechnicians = () => {
  return getFromStorage(STORAGE_KEYS.TECHNICIANS, []);
};

export const setTechnicians = (technicians) => {
  return setToStorage(STORAGE_KEYS.TECHNICIANS, technicians);
};

export const getActiveTechnicians = () => {
  const technicians = getTechnicians();
  return technicians.filter((tech) => tech.isActive);
};

// Inventory-specific functions
export const getInventory = () => {
  return getFromStorage(STORAGE_KEYS.INVENTORY, []);
};

export const setInventory = (inventory) => {
  return setToStorage(STORAGE_KEYS.INVENTORY, inventory);
};

// Vehicle-specific functions
export const getVehicles = () => {
  return getFromStorage(STORAGE_KEYS.VEHICLES, []);
};

export const setVehicles = (vehicles) => {
  return setToStorage(STORAGE_KEYS.VEHICLES, vehicles);
};

export const getVehicleById = (id) => {
  const vehicles = getVehicles();
  return vehicles.find((v) => v.id === id);
};

export const getVehicleByTechnician = (technicianId) => {
  const vehicles = getVehicles();
  return vehicles.find((v) => v.assignedTechnicianId === technicianId);
};

export const updateVehicle = (id, updates) => {
  const vehicles = getVehicles();
  const index = vehicles.findIndex((v) => v.id === id);
  if (index !== -1) {
    vehicles[index] = {
      ...vehicles[index],
      ...updates,
    };
    setVehicles(vehicles);
    return vehicles[index];
  }
  return null;
};

// Route-specific functions
export const getRoutes = () => {
  return getFromStorage(STORAGE_KEYS.ROUTES, []);
};

export const setRoutes = (routes) => {
  return setToStorage(STORAGE_KEYS.ROUTES, routes);
};

export const getRouteById = (id) => {
  const routes = getRoutes();
  return routes.find((r) => r.id === id);
};

export const getRoutesByDate = (date) => {
  const routes = getRoutes();
  return routes.filter((r) => r.date === date);
};

export const getRoutesByTechnician = (technicianId) => {
  const routes = getRoutes();
  return routes.filter((r) => r.technicianId === technicianId);
};

export const addRoute = (route) => {
  const routes = getRoutes();
  const newRoute = {
    ...route,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };
  routes.push(newRoute);
  setRoutes(routes);
  return newRoute;
};

export const updateRoute = (id, updates) => {
  const routes = getRoutes();
  const index = routes.findIndex((r) => r.id === id);
  if (index !== -1) {
    routes[index] = {
      ...routes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setRoutes(routes);
    return routes[index];
  }
  return null;
};

export const deleteRoute = (id) => {
  const routes = getRoutes();
  const filtered = routes.filter((r) => r.id !== id);
  setRoutes(filtered);
  return filtered.length < routes.length;
};

// Route Template functions
export const getRouteTemplates = () => {
  return getFromStorage(STORAGE_KEYS.ROUTE_TEMPLATES, []);
};

export const setRouteTemplates = (templates) => {
  return setToStorage(STORAGE_KEYS.ROUTE_TEMPLATES, templates);
};

// Initialize storage with mock data if empty
export const initializeStorage = (mockData) => {
  const {
    appointments,
    customers,
    serviceAddresses,
    technicians,
    inventory,
    vehicles,
    routes,
    routeTemplates,
    facilities,
    areas,
    inspectionPoints,
    leads,
    prospects,
    programs,
  } = mockData;

  if (getAppointments().length === 0) {
    setAppointments(appointments);
  }
  if (getCustomers().length === 0) {
    setCustomers(customers);
  }
  if (getServiceAddresses().length === 0) {
    setServiceAddresses(serviceAddresses);
  }
  if (getTechnicians().length === 0) {
    setTechnicians(technicians);
  }
  if (getInventory().length === 0) {
    setInventory(inventory);
  }
  if (vehicles && getVehicles().length === 0) {
    setVehicles(vehicles);
  }
  if (routes && getRoutes().length === 0) {
    setRoutes(routes);
  }
  if (routeTemplates && getRouteTemplates().length === 0) {
    setRouteTemplates(routeTemplates);
  }

  // Seed programs
  if (programs && getPrograms().length === 0) {
    setPrograms(programs);
  }

  if (getFacilities().length === 0 && facilities) {
    setFacilities(facilities);
  }
  if (getAreas().length === 0 && areas) {
    setAreas(areas);
  }
  if (getInspectionPoints().length === 0 && inspectionPoints) {
    setInspectionPoints(inspectionPoints);
  }
  if (getLeads().length === 0 && leads) {
    setLeads(leads);
  }
  if (getProspects().length === 0 && prospects) {
    setProspects(prospects);
  }
};

// Check technician availability
export const isTechnicianAvailable = (technicianId, date, startTime, duration, excludeAppointmentId = null) => {
  const appointments = getAppointments();
  const techAppointments = appointments.filter(
    (apt) => apt.technicianId === technicianId && apt.scheduledDate === date && apt.status !== 'Cancelled' && apt.id !== excludeAppointmentId
  );

  // Convert time to minutes for easier comparison
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const newStart = timeToMinutes(startTime);
  const newEnd = newStart + duration;

  // Check for conflicts
  for (const apt of techAppointments) {
    const aptStart = timeToMinutes(apt.scheduledTime);
    const aptEnd = aptStart + apt.estimatedDuration;

    // Check if times overlap
    if ((newStart >= aptStart && newStart < aptEnd) || (newEnd > aptStart && newEnd <= aptEnd) || (newStart <= aptStart && newEnd >= aptEnd)) {
      return false;
    }
  }

  return true;
};

// Get technician's workload for a specific date
export const getTechnicianWorkload = (technicianId, date) => {
  const appointments = getAppointments();
  return appointments.filter((apt) => apt.technicianId === technicianId && apt.scheduledDate === date && apt.status !== 'Cancelled').length;
};

// Smart technician suggestion algorithm
export const suggestTechnicians = (serviceType, serviceAddressId, date, startTime, duration) => {
  const technicians = getTechnicians();
  const serviceAddresses = getServiceAddresses();
  const appointments = getAppointments();

  const serviceAddress = serviceAddresses.find((s) => s.id === serviceAddressId);
  if (!serviceAddress) return [];

  const activeTechs = technicians.filter((t) => t.isActive);

  // Score each technician
  const scoredTechnicians = activeTechs.map((tech) => {
    let score = 0;
    const reasons = [];

    // 1. Service Type Match (40 points)
    if (tech.serviceTypes && tech.serviceTypes.includes(serviceType)) {
      score += 40;
      reasons.push('Specialized in this service');
    } else if (tech.serviceTypes && tech.serviceTypes.includes('General Pest Control')) {
      score += 20;
      reasons.push('General pest control specialist');
    }

    // 2. Primary Specialization Match (20 points bonus)
    if (tech.specialization === serviceType) {
      score += 20;
      reasons.push('Primary specialization match');
    }

    // 3. Zone Preference (20 points)
    if (serviceAddress.zone && tech.preferredZones && tech.preferredZones.includes(serviceAddress.zone)) {
      score += 20;
      reasons.push(`Prefers ${serviceAddress.zone} zone`);
    }

    // 4. Availability (REQUIRED - 0 points but eliminates if unavailable)
    const isAvailable = isTechnicianAvailable(tech.id, date, startTime, duration);
    if (!isAvailable) {
      score = -1000; // Eliminate unavailable technicians
      reasons.push('NOT AVAILABLE at this time');
    } else {
      reasons.push('Available');
    }

    // 5. Workload Balance (10 points - inverse scoring)
    const workload = getTechnicianWorkload(tech.id, date);
    const maxDaily = tech.maxDailyAppointments || 8;

    if (workload >= maxDaily) {
      score -= 50; // Penalize if at max capacity
      reasons.push(`At max capacity (${workload}/${maxDaily})`);
    } else {
      const loadPercentage = workload / maxDaily;
      score += Math.floor((1 - loadPercentage) * 10);
      reasons.push(`Workload: ${workload}/${maxDaily} appointments`);
    }

    // 6. Rating (10 points)
    if (tech.rating) {
      score += Math.floor(tech.rating * 2); // Max 10 points for 5-star rating
    }

    return {
      ...tech,
      score,
      reasons,
      workload,
      isAvailable,
    };
  });

  // Filter out unavailable and sort by score
  return scoredTechnicians
    .filter((t) => t.score > 0) // Remove unavailable technicians
    .sort((a, b) => b.score - a.score); // Highest score first
};

// Get suggested technician (top choice)
export const getSuggestedTechnician = (serviceType, serviceAddressId, date, startTime, duration) => {
  const suggestions = suggestTechnicians(serviceType, serviceAddressId, date, startTime, duration);
  return suggestions.length > 0 ? suggestions[0] : null;
};

export const getFacilities = () => {
  return getFromStorage(STORAGE_KEYS.FACILITIES, []);
};

export const setFacilities = (facilities) => {
  return setToStorage(STORAGE_KEYS.FACILITIES, facilities);
};

export const getAreas = () => {
  return getFromStorage(STORAGE_KEYS.AREAS, []);
};

export const setAreas = (areas) => {
  return setToStorage(STORAGE_KEYS.AREAS, areas);
};

export const getInspectionPoints = () => {
  return getFromStorage(STORAGE_KEYS.INSPECTION_POINTS, []);
};

export const setInspectionPoints = (inspectionPoints) => {
  return setToStorage(STORAGE_KEYS.INSPECTION_POINTS, inspectionPoints);
};

export const addFacility = (facility) => {
  const facilities = getFacilities();
  const newFacility = {
    ...facility,
    id: Date.now(), // Generate unique ID
  };
  facilities.push(newFacility);
  setFacilities(facilities);
  return newFacility;
};

export const addArea = (area) => {
  const areas = getAreas();
  const newArea = {
    ...area,
    id: Date.now(), // Generate unique ID
  };
  areas.push(newArea);
  setAreas(areas);
  return newArea;
};

export const addInspectionPoint = (inspectionPoint) => {
  const inspectionPoints = getInspectionPoints();
  const newInspectionPoint = {
    ...inspectionPoint,
    id: Date.now(), // Generate unique ID
  };
  inspectionPoints.push(newInspectionPoint);
  setInspectionPoints(inspectionPoints);
  return newInspectionPoint;
};

// Lead-specific functions
export const getLeads = () => {
  return getFromStorage(STORAGE_KEYS.LEADS, []);
};

export const setLeads = (leads) => {
  return setToStorage(STORAGE_KEYS.LEADS, leads);
};

export const addLead = (lead) => {
  const leads = getLeads();
  const newLead = {
    ...lead,
    id: Date.now(),
    dateCreated: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  setLeads(leads);
  return newLead;
};

export const updateLead = (id, updates) => {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index !== -1) {
    leads[index] = {
      ...leads[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setLeads(leads);
    return leads[index];
  }
  return null;
};

export const deleteLead = (id) => {
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  setLeads(filtered);
  return filtered.length < leads.length;
};

export const getLeadById = (id) => {
  const leads = getLeads();
  return leads.find((l) => l.id === id);
};

// Prospect-specific functions
export const getProspects = () => {
  return getFromStorage(STORAGE_KEYS.PROSPECTS, []);
};

export const setProspects = (prospects) => {
  return setToStorage(STORAGE_KEYS.PROSPECTS, prospects);
};

export const addProspect = (prospect) => {
  const prospects = getProspects();
  const newProspect = {
    ...prospect,
    id: Date.now(),
    dateCreated: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  prospects.unshift(newProspect);
  setProspects(prospects);
  return newProspect;
};

export const updateProspect = (id, updates) => {
  const prospects = getProspects();
  const index = prospects.findIndex((p) => p.id === id);
  if (index !== -1) {
    prospects[index] = {
      ...prospects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setProspects(prospects);
    return prospects[index];
  }
  return null;
};

export const deleteProspect = (id) => {
  const prospects = getProspects();
  const filtered = prospects.filter((p) => p.id !== id);
  setProspects(filtered);
  return filtered.length < prospects.length;
};

export const getProspectById = (id) => {
  const prospects = getProspects();
  return prospects.find((p) => p.id === id);
};

export const updateFacility = (id, updates) => {
  const facilities = getFacilities();
  const index = facilities.findIndex((f) => f.id === id);
  if (index !== -1) {
    facilities[index] = {
      ...facilities[index],
      ...updates,
    };
    setFacilities(facilities);
    return facilities[index];
  }
  return null;
};

export const updateArea = (id, updates) => {
  const areas = getAreas();
  const index = areas.findIndex((a) => a.id === id);
  if (index !== -1) {
    areas[index] = {
      ...areas[index],
      ...updates,
    };
    setAreas(areas);
    return areas[index];
  }
  return null;
};

export const updateInspectionPoint = (id, updates) => {
  const inspectionPoints = getInspectionPoints();
  const index = inspectionPoints.findIndex((ip) => ip.id === id);
  if (index !== -1) {
    inspectionPoints[index] = {
      ...inspectionPoints[index],
      ...updates,
    };
    setInspectionPoints(inspectionPoints);
    return inspectionPoints[index];
  }
  return null;
};

export const deleteFacility = (id) => {
  const facilities = getFacilities();
  const filtered = facilities.filter((f) => f.id !== id);
  setFacilities(filtered);
  return filtered.length < facilities.length;
};

export const deleteArea = (id) => {
  const areas = getAreas();
  const filtered = areas.filter((a) => a.id !== id);
  setAreas(filtered);
  return filtered.length < areas.length;
};

export const deleteInspectionPoint = (id) => {
  const inspectionPoints = getInspectionPoints();
  const filtered = inspectionPoints.filter((ip) => ip.id !== id);
  setInspectionPoints(filtered);
  return filtered.length < inspectionPoints.length;
};

export const getFacilitiesByCustomerId = (customerId) => {
  const serviceAddressesByCustomerId = getServiceAddressesByCustomerId(customerId).map((serviceAddress) => serviceAddress.id);
  const facilities = getFacilities();
  return facilities.filter((facility) => serviceAddressesByCustomerId.includes(parseInt(facility.serviceAddressId)));
};

export const getCurrentUser = () => {
  return getFromStorage('currentUser', null);
};

export const updateCurrentUser = (userDetails) => {
  const currentUser = getFromStorage('currentUser', null);
  if (currentUser) {
    setToStorage('currentUser', userDetails);
    return currentUser;
  }
};

/* ----- Users ----- */
export const getUsers = () => {
  const persisted = getFromStorage(STORAGE_KEYS.USERS_KEY, []);
  // ensure persisted users appear first so newly added users override static ones by username when checking auth
  return Array.isArray(persisted) ? [...persisted, ...staticUsers] : [...staticUsers];
};

export const saveUsers = (users) => setToStorage(STORAGE_KEYS.USERS_KEY, users);

export const addUser = (user) => {
  const newUser = { id: Date.now().toString(), ...user };
  const existing = getFromStorage(STORAGE_KEYS.USERS_KEY, []);
  const next = [newUser, ...(Array.isArray(existing) ? existing : [])];
  saveUsers(next);
  return newUser;
};

/* ----- Roles ----- */
export const getRoles = () => getFromStorage(STORAGE_KEYS.ROLES_KEY, []);
export const saveRoles = (roles) => {
  const ok = setToStorage(STORAGE_KEYS.ROLES_KEY, roles);
  // notify listeners that roles changed
  if (ok) window.dispatchEvent(new Event('roles:updated'));
  return ok;
};
export const addRole = (role) => {
  const newRole = { id: Date.now().toString(), ...role };
  const next = [newRole, ...getRoles()];
  saveRoles(next);
  return newRole;
};

/* ----- Teams ----- */
export const getTeams = () => getFromStorage(STORAGE_KEYS.TEAMS_KEY, []);
export const saveTeams = (teams) => {
  const ok = setToStorage(STORAGE_KEYS.TEAMS_KEY, teams);
  if (ok) window.dispatchEvent(new Event('teams:updated'));
  return ok;
};
export const addTeam = (team) => {
  const newTeam = { id: Date.now().toString(), ...team };
  const next = [newTeam, ...getTeams()];
  saveTeams(next);
  return newTeam;
};

/* ----- Employees ----- */
export const getEmployees = () => getFromStorage(STORAGE_KEYS.EMPLOYEES_KEY, []);
export const saveEmployees = (employees) => setToStorage(STORAGE_KEYS.EMPLOYEES_KEY, employees);
export const addEmployee = (employee) => {
  const newItem = { id: Date.now().toString(), ...employee };
  const next = [newItem, ...getEmployees()];
  saveEmployees(next);
  return newItem;
};

/* ----- Activity Log ----- */
export const getActivityLogs = () => getFromStorage(STORAGE_KEYS.ACTIVITY_KEY, []);
export const clearActivityLogs = () => setToStorage(STORAGE_KEYS.ACTIVITY_KEY, []);
// Proposal-specific functions
export const getProposals = () => {
  return getFromStorage(STORAGE_KEYS.PROPOSALS, []);
};

export const setProposals = (proposals) => {
  return setToStorage(STORAGE_KEYS.PROPOSALS, proposals);
};

export const addProposal = (proposal) => {
  const proposals = getProposals();
  const newProposal = {
    ...proposal,
    id: Date.now(),
    proposalNumber: `PROP-${String(Date.now()).slice(-6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  proposals.push(newProposal);
  setProposals(proposals);
  return newProposal;
};

export const updateProposal = (id, updates) => {
  const proposals = getProposals();
  const index = proposals.findIndex((p) => p.id === id);
  if (index !== -1) {
    proposals[index] = {
      ...proposals[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setProposals(proposals);
    return proposals[index];
  }
  return null;
};

export const deleteProposal = (id) => {
  const proposals = getProposals();
  const filtered = proposals.filter((p) => p.id !== id);
  setProposals(filtered);
  return filtered.length < proposals.length;
};

export const getProposalById = (id) => {
  const proposals = getProposals();
  return proposals.find((p) => p.id === id);
};

export const getProposalsByCustomerId = (customerId) => {
  const proposals = getProposals();
  return proposals.filter((p) => p.customerId === customerId);
};

// Program-specific functions
export const getPrograms = () => {
  return getFromStorage(STORAGE_KEYS.PROGRAMS, []);
};

export const setPrograms = (programs) => {
  return setToStorage(STORAGE_KEYS.PROGRAMS, programs);
};

export const addProgram = (program) => {
  const programs = getPrograms();
  const newProgram = {
    ...program,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  programs.push(newProgram);
  setPrograms(programs);
  return newProgram;
};

export const updateProgram = (updatedProgram) => {
  let programs = getPrograms();
  programs = programs.map(program =>
    program.id === updatedProgram.id ? { ...program, ...updatedProgram, updatedAt: new Date().toISOString() } : program
  );
  setPrograms(programs);
  return updatedProgram;
};

export const deleteProgram = (id) => {
  const programs = getPrograms();
  const filtered = programs.filter((p) => p.id !== id);
  setPrograms(filtered);
  return filtered.length < programs.length;
};

export const getProgramById = (id) => {
  const programs = getPrograms();
  return programs.find((p) => p.id === id);
};

// Configuration-specific functions
const DEFAULT_CONFIGURATION = {
  defaultTermsAndConditions: `1. Payment Terms: Net 30 days from invoice date.

2. Service Agreement: This proposal is valid for 30 days from the date of issuance. Services will be performed according to the scope of work outlined above.

3. Cancellation Policy: Client may cancel services with 48 hours written notice. Cancellations with less than 48 hours notice may incur a cancellation fee.

4. Liability: Company maintains comprehensive liability insurance. We are not responsible for damage to property caused by pests or pre-existing conditions.

5. Access: Client agrees to provide access to property for scheduled services. If access is denied, rescheduling fees may apply.

6. Treatment Guarantee: Services are guaranteed when client follows all recommendations and maintains regular service schedule.

7. Chemical Safety: All products used are EPA registered and applied according to label directions by licensed technicians.

8. Contract Terms: This proposal, once accepted, constitutes a binding agreement between the parties.`,
  companyInfo: {
    name: 'Bugworx Pest Management',
    address: '',
    phone: '',
    email: '',
    license: '',
  },
};

export const getConfiguration = () => {
  const config = getFromStorage(STORAGE_KEYS.CONFIGURATION, null);
  if (!config) {
    setConfiguration(DEFAULT_CONFIGURATION);
    return DEFAULT_CONFIGURATION;
  }
  return config;
};

export const setConfiguration = (configuration) => {
  return setToStorage(STORAGE_KEYS.CONFIGURATION, configuration);
};

export const updateConfiguration = (updates) => {
  const config = getConfiguration();
  const updatedConfig = {
    ...config,
    ...updates,
  };
  setConfiguration(updatedConfig);
  return updatedConfig;
};

// Generic helpers (used across operational-setup pages)
export const getContractTypes = () => getFromStorage(STORAGE_KEYS.OPERATIONAL_SETUP_CONTRACT_TYPES, []);
export const saveContractTypes = (items) => setToStorage(STORAGE_KEYS.OPERATIONAL_SETUP_CONTRACT_TYPES, items);

export const getServiceTypesSetup = () => getFromStorage(STORAGE_KEYS.OPERATIONAL_SETUP_SERVICE_TYPES, []);
export const saveServiceTypes = (items) => setToStorage(STORAGE_KEYS.OPERATIONAL_SETUP_SERVICE_TYPES, items);

export const getFrequencyTemplates = () => getFromStorage(STORAGE_KEYS.OPERATIONAL_SETUP_FREQUENCY_TEMPLATES, []);
export const saveFrequencyTemplates = (items) => setToStorage(STORAGE_KEYS.OPERATIONAL_SETUP_FREQUENCY_TEMPLATES, items);

export const getJobSettings = () => getFromStorage(STORAGE_KEYS.OPERATIONAL_SETUP_JOB_SETTINGS, []);
export const saveJobSettings = (obj) => setToStorage(STORAGE_KEYS.OPERATIONAL_SETUP_JOB_SETTINGS, obj);

export const getRouteConfiguration = () => getFromStorage(STORAGE_KEYS.OPERATIONAL_SETUP_ROUTE_CONFIGURATION, []);
export const saveRouteConfiguration = (items) => setToStorage(STORAGE_KEYS.OPERATIONAL_SETUP_ROUTE_CONFIGURATION, items);

export const getOperationalZones = () => getFromStorage(STORAGE_KEYS.OPERATIONAL_SETUP_ZONES, []);
export const saveOperationalZones = (items) => setToStorage(STORAGE_KEYS.OPERATIONAL_SETUP_ZONES, items);

// --- Company Profile ---
export const getCompanyProfile = () => getFromStorage('companyProfile', null);
export const saveCompanyProfile = (profile) => setToStorage('companyProfile', profile);

// --- Custom Fields ---
export const getCustomFields = () => getFromStorage('customFields', []);
export const saveCustomFields = (fields) => setToStorage('customFields', fields);

// --- API Integrations ---
const defaultApiIntegrations = [
  { id: 'gps', name: 'GPS / Telemetry', enabled: true, details: '', type: 'GPS', provider: 'DefaultGPS', clientId: '', clientSecret: '' },
  { id: 'hrms', name: 'HRMS', enabled: false, details: '', type: 'HRMS', provider: 'DefaultHRMS', clientId: '', clientSecret: '' },
  { id: 'acct', name: 'Accounting', enabled: false, details: '', type: 'Accounting', provider: 'DefaultAccounting', clientId: '', clientSecret: '' },
];
export const getApiIntegrations = () => getFromStorage('apiIntegrations', defaultApiIntegrations);
export const saveApiIntegrations = (integrations) => setToStorage('apiIntegrations', integrations);

// --- Backups ---
export const getBackups = () => getFromStorage('backups', []);
export const saveBackups = (backups) => setToStorage('backups', backups);

// --- Data Import/Export ---
// Note: The following import/export functions use dynamic keys (e.g., `import_${entity}` and `export_${entity}`).
// These keys are not tracked in STORAGE_KEYS, so clearing all app data requires special handling.
export const saveImportedFile = (entity, payload) => setToStorage(`import_${entity}`, payload);
export const getImportedFile = (entity, defaultValue) => getFromStorage(`import_${entity}`, defaultValue);
export const saveExportRecord = (entity, record) => setToStorage(`export_${entity}`, record);
export const getExportRecord = (entity, defaultValue) => getFromStorage(`export_${entity}`, defaultValue);
// --- Audit Trail ---
export const getAuditTrail = () => getFromStorage('auditTrail', []);
export const saveAuditTrail = (trail) => setToStorage('auditTrail', trail);

export const getInspectionPointTypes = () => getFromStorage(STORAGE_KEYS.SERVICE_INSPECTION_POINT_TYPES, []);
export const saveInspectionPointTypes = (items) => setToStorage(STORAGE_KEYS.SERVICE_INSPECTION_POINT_TYPES, items);

export const getPestTypes = () => getFromStorage(STORAGE_KEYS.SERVICE_INSPECTION_PEST_TYPES, []);
export const savePestTypes = (items) => setToStorage(STORAGE_KEYS.SERVICE_INSPECTION_PEST_TYPES, items);

export const getTreatmentTypes = () => getFromStorage(STORAGE_KEYS.SERVICE_INSPECTION_TREATMENT_TYPES, []);
export const saveTreatmentTypes = (items) => setToStorage(STORAGE_KEYS.SERVICE_INSPECTION_TREATMENT_TYPES, items);

export const getServiceTemplates = () => getFromStorage(STORAGE_KEYS.SERVICE_INSPECTION_SERVICE_TEMPLATES, []);
export const saveServiceTemplates = (items) => setToStorage(STORAGE_KEYS.SERVICE_INSPECTION_SERVICE_TEMPLATES, items);

export const getEquipmentDevices = () => getFromStorage(STORAGE_KEYS.SERVICE_INSPECTION_EQUIPMENT_DEVICES, []);
export const saveEquipmentDevices = (items) => setToStorage(STORAGE_KEYS.SERVICE_INSPECTION_EQUIPMENT_DEVICES, items);

export const getInspectionPointCategories = () => getFromStorage(STORAGE_KEYS.SERVICE_INSPECTION_INSPECTION_POINT_CATEGORIES, []);
export const saveInspectionPointCategories = (items) => setToStorage(STORAGE_KEYS.SERVICE_INSPECTION_INSPECTION_POINT_CATEGORIES, items);

export const getMaterialSetups = () => getFromStorage(STORAGE_KEYS.SERVICE_INSPECTION_MATERIAL_SETUP, []);
export const saveMaterialSetups = (items) => setToStorage(STORAGE_KEYS.SERVICE_INSPECTION_MATERIAL_SETUP, items);

export const getInvoices = () => {
  let invoices = getFromStorage(STORAGE_KEYS.INVOICES_KEY);
  // Always return fresh mock data for demonstration if it's empty
  if (!invoices || invoices.length === 0) {
    invoices = [
      {
        id: 'INV-001',
        customerId: 1,
        date: '2025-11-15',
        dueDate: '2025-12-15',
        poNumber: 'PO-123',
        status: 'Paid',
        notes: 'Initial service setup fee.',
        items: [{ id: 1, description: 'Quarterly Pest Control Service', quantity: 1, unitPrice: 250.0 }],
        subtotal: 250.0,
        tax: 25.0,
        total: 275.0,
        amountPaid: 275.0,
        balanceDue: 0,
      },
      {
        id: 'INV-002',
        customerId: 1,
        date: '2025-10-20',
        dueDate: '2025-11-20',
        poNumber: '',
        status: 'Overdue',
        notes: 'Emergency call-out for rodent activity.',
        items: [
          { id: 2, description: 'Emergency Rodent Treatment', quantity: 1, unitPrice: 150.0 },
          { id: 3, description: 'Bait Station Installation', quantity: 4, unitPrice: 25.0 },
        ],
        subtotal: 250.0,
        tax: 25.0,
        total: 275.0,
        amountPaid: 100.0,
        balanceDue: 175.0,
      },
      {
        id: 'INV-003',
        customerId: 2,
        date: '2025-11-25',
        dueDate: '2025-12-25',
        poNumber: 'PO-456',
        status: 'Sent',
        notes: 'Monthly maintenance service.',
        items: [{ id: 4, description: 'Commercial Monthly Pest Service', quantity: 1, unitPrice: 400.0 }],
        subtotal: 400.0,
        tax: 40.0,
        total: 440.0,
        amountPaid: 0,
        balanceDue: 440.0,
      },
      {
        id: 'INV-004',
        customerId: 1,
        date: '2025-12-05',
        dueDate: '2026-01-05',
        poNumber: '',
        status: 'Draft',
        notes: '',
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        amountPaid: 0,
        balanceDue: 0,
      },
      {
        id: 'INV-005',
        customerId: 3,
        date: '2025-11-01',
        dueDate: '2025-12-01',
        poNumber: 'PO-789',
        status: 'Paid',
        notes: 'Annual termite inspection.',
        items: [{ id: 5, description: 'Annual Termite Inspection and Report', quantity: 1, unitPrice: 350.0 }],
        subtotal: 350.0,
        tax: 35.0,
        total: 385.0,
        amountPaid: 385.0,
        balanceDue: 0,
      },
    ];
    saveInvoices(invoices);
  }
  return invoices;
};

export const saveInvoices = (invoices) => {
  return setToStorage(STORAGE_KEYS.INVOICES_KEY, invoices);
};

export default {
  STORAGE_KEYS,
  getFromStorage,
  setToStorage,
  removeFromStorage,
  clearAllStorage,
  getAppointments,
  setAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getCustomers,
  setCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  getServiceAddresses,
  setServiceAddresses,
  addServiceAddress,
  updateServiceAddress,
  getServiceAddressesByCustomerId,
  getServiceTypes,
  setServiceTypes,
  addServiceType,
  removeServiceType,
  getTechnicians,
  setTechnicians,
  getActiveTechnicians,
  getInventory,
  setInventory,
  getVehicles,
  setVehicles,
  getVehicleById,
  getVehicleByTechnician,
  updateVehicle,
  getRoutes,
  setRoutes,
  getRouteById,
  getRoutesByDate,
  getRoutesByTechnician,
  addRoute,
  updateRoute,
  deleteRoute,
  getRouteTemplates,
  setRouteTemplates,
  initializeStorage,
  isTechnicianAvailable,
  getTechnicianWorkload,
  suggestTechnicians,
  getSuggestedTechnician,
  getFacilities,
  setFacilities,
  getAreas,
  setAreas,
  getInspectionPoints,
  setInspectionPoints,
  addFacility,
  addArea,
  addInspectionPoint,
  getLeads,
  setLeads,
  addLead,
  updateLead,
  deleteLead,
  getLeadById,
  getProspects,
  setProspects,
  addProspect,
  updateProspect,
  deleteProspect,
  getProspectById,
  updateFacility,
  updateArea,
  updateInspectionPoint,
  deleteFacility,
  deleteArea,
  deleteInspectionPoint,
  getFacilitiesByCustomerId,
  getCurrentUser,
  updateCurrentUser,
  getUsers,
  saveUsers,
  addUser,
  getRoles,
  saveRoles,
  addRole,
  getTeams,
  saveTeams,
  addTeam,
  getEmployees,
  saveEmployees,
  addEmployee,
  getActivityLogs,
  clearActivityLogs,
  getContractTypes,
  saveContractTypes,
  getServiceTypesSetup,
  saveServiceTypes,
  getFrequencyTemplates,
  saveFrequencyTemplates,
  getJobSettings,
  saveJobSettings,
  getRouteConfiguration,
  saveRouteConfiguration,
  getOperationalZones,
  saveOperationalZones,
  addCustomer,
  updateCustomer,
  getProposals,
  setProposals,
  addProposal,
  updateProposal,
  deleteProposal,
  getProposalById,
  getProposalsByCustomerId,
  getConfiguration,
  setConfiguration,
  updateConfiguration,
  getCompanyProfile,
  saveCompanyProfile,
  getCustomFields,
  saveCustomFields,
  getApiIntegrations,
  saveApiIntegrations,
  getBackups,
  saveBackups,
  saveImportedFile,
  getImportedFile,
  saveExportRecord,
  getAuditTrail,
  saveAuditTrail,
  getInspectionPointTypes,
  saveInspectionPointTypes,
  getPestTypes,
  savePestTypes,
  getTreatmentTypes,
  saveTreatmentTypes,
  getServiceTemplates,
  saveServiceTemplates,
  getEquipmentDevices,
  saveEquipmentDevices,
  getInspectionPointCategories,
  saveInspectionPointCategories,
  getMaterialSetups,
  saveMaterialSetups,
  getInvoices,
  saveInvoices,
};
