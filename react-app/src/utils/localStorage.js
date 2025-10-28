// localStorage utility functions for Bugworx Pest Management System
import { users as staticUsers } from '../data/users';

const STORAGE_KEYS = {
  APPOINTMENTS: 'bugworx_appointments',
  ACCOUNTS: 'bugworx_accounts',
  SITES: 'bugworx_sites',
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
  ACTIVITY_KEY: 'bugworx_activity_log'
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
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
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
    updatedAt: new Date().toISOString()
  };
  appointments.push(newAppointment);
  setAppointments(appointments);
  return newAppointment;
};

export const updateAppointment = (id, updates) => {
  const appointments = getAppointments();
  const index = appointments.findIndex(apt => apt.id === id);
  if (index !== -1) {
    appointments[index] = {
      ...appointments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setAppointments(appointments);
    return appointments[index];
  }
  return null;
};

export const deleteAppointment = (id) => {
  const appointments = getAppointments();
  const filtered = appointments.filter(apt => apt.id !== id);
  setAppointments(filtered);
  return filtered.length < appointments.length;
};

export const getAppointmentById = (id) => {
  const appointments = getAppointments();
  return appointments.find(apt => apt.id === id);
};

// Account-specific functions
export const getAccounts = () => {
  return getFromStorage(STORAGE_KEYS.ACCOUNTS, []);
};

export const setAccounts = (accounts) => {
  return setToStorage(STORAGE_KEYS.ACCOUNTS, accounts);
};

// Site-specific functions
export const getSites = () => {
  return getFromStorage(STORAGE_KEYS.SITES, []);
};

export const setSites = (sites) => {
  return setToStorage(STORAGE_KEYS.SITES, sites);
};

export const addAccount = (account) => {
  const accounts = getAccounts();
  const newAccount = {
    ...account,
    id: Date.now(),
    accountNum: `ACC-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  accounts.push(newAccount);
  setAccounts(accounts);
  return newAccount;
};

export const updateAccount = (id, updates) => {
  const accounts = getAccounts();
  const index = accounts.findIndex(acc => acc.id === id);
  if (index !== -1) {
    accounts[index] = {
      ...accounts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setAccounts(accounts);
    return accounts[index];
  }
  return null;
};

export const addSite = (site) => {
  const sites = getSites();
  const newSite = {
    ...site,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  sites.push(newSite);
  setSites(sites);
  return newSite;
};

export const updateSite = (id, updates) => {
  const sites = getSites();
  const index = sites.findIndex(s => s.id === id);
  if (index !== -1) {
    sites[index] = {
      ...sites[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setSites(sites);
    return sites[index];
  }
  return null;
};

export const getSitesByAccountId = (accountId) => {
  const sites = getSites();
  return sites.filter(site => site.accountId === accountId);
};

const DEFAULT_SERVICE_TYPES = [
  'General Pest Control',
  'Termite Treatment',
  'Rodent Control',
  'Bed Bug Treatment',
  'Ant Control',
  'Cockroach Control',
  'Spider Control',
  'Mosquito Control',
  'Flea & Tick Control',
  'Wildlife Removal'
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
  const filtered = serviceTypes.filter(st => st !== serviceType);
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
  return technicians.filter(tech => tech.isActive);
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
  return vehicles.find(v => v.id === id);
};

export const getVehicleByTechnician = (technicianId) => {
  const vehicles = getVehicles();
  return vehicles.find(v => v.assignedTechnicianId === technicianId);
};

export const updateVehicle = (id, updates) => {
  const vehicles = getVehicles();
  const index = vehicles.findIndex(v => v.id === id);
  if (index !== -1) {
    vehicles[index] = {
      ...vehicles[index],
      ...updates
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
  return routes.find(r => r.id === id);
};

export const getRoutesByDate = (date) => {
  const routes = getRoutes();
  return routes.filter(r => r.date === date);
};

export const getRoutesByTechnician = (technicianId) => {
  const routes = getRoutes();
  return routes.filter(r => r.technicianId === technicianId);
};

export const addRoute = (route) => {
  const routes = getRoutes();
  const newRoute = {
    ...route,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  routes.push(newRoute);
  setRoutes(routes);
  return newRoute;
};

export const updateRoute = (id, updates) => {
  const routes = getRoutes();
  const index = routes.findIndex(r => r.id === id);
  if (index !== -1) {
    routes[index] = {
      ...routes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setRoutes(routes);
    return routes[index];
  }
  return null;
};

export const deleteRoute = (id) => {
  const routes = getRoutes();
  const filtered = routes.filter(r => r.id !== id);
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
  const { appointments, accounts, sites, technicians, inventory, vehicles, routes, routeTemplates, facilities, areas, inspectionPoints } = mockData;

  if (getAppointments().length === 0) {
    setAppointments(appointments);
  }
  if (getAccounts().length === 0) {
    setAccounts(accounts);
  }
  if (getSites().length === 0) {
    setSites(sites);
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

  if (getFacilities().length === 0 && facilities) {
    setFacilities(facilities);
  }
  if (getAreas().length === 0 && areas) {
    setAreas(areas);
  }
  if (getInspectionPoints().length === 0 && inspectionPoints) {
    setInspectionPoints(inspectionPoints);
  }
};

// Check technician availability
export const isTechnicianAvailable = (technicianId, date, startTime, duration, excludeAppointmentId = null) => {
  const appointments = getAppointments();
  const techAppointments = appointments.filter(apt =>
    apt.technicianId === technicianId &&
    apt.scheduledDate === date &&
    apt.status !== 'Cancelled' &&
    apt.id !== excludeAppointmentId
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
    if ((newStart >= aptStart && newStart < aptEnd) ||
      (newEnd > aptStart && newEnd <= aptEnd) ||
      (newStart <= aptStart && newEnd >= aptEnd)) {
      return false;
    }
  }

  return true;
};

// Get technician's workload for a specific date
export const getTechnicianWorkload = (technicianId, date) => {
  const appointments = getAppointments();
  return appointments.filter(apt =>
    apt.technicianId === technicianId &&
    apt.scheduledDate === date &&
    apt.status !== 'Cancelled'
  ).length;
};

// Smart technician suggestion algorithm
export const suggestTechnicians = (serviceType, siteId, date, startTime, duration) => {
  const technicians = getTechnicians();
  const sites = getSites();
  const appointments = getAppointments();

  const site = sites.find(s => s.id === siteId);
  if (!site) return [];

  const activeTechs = technicians.filter(t => t.isActive);

  // Score each technician
  const scoredTechnicians = activeTechs.map(tech => {
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
    if (site.zone && tech.preferredZones && tech.preferredZones.includes(site.zone)) {
      score += 20;
      reasons.push(`Prefers ${site.zone} zone`);
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
      isAvailable
    };
  });

  // Filter out unavailable and sort by score
  return scoredTechnicians
    .filter(t => t.score > 0) // Remove unavailable technicians
    .sort((a, b) => b.score - a.score); // Highest score first
};

// Get suggested technician (top choice)
export const getSuggestedTechnician = (serviceType, siteId, date, startTime, duration) => {
  const suggestions = suggestTechnicians(serviceType, siteId, date, startTime, duration);
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
}

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
}

export const updateFacility = (id, updates) => {
  const facilities = getFacilities();
  const index = facilities.findIndex(f => f.id === id);
  if (index !== -1) {
    facilities[index] = {
      ...facilities[index],
      ...updates
    };
    setFacilities(facilities);
    return facilities[index];
  }
  return null;
};

export const updateArea = (id, updates) => {
  const areas = getAreas();
  const index = areas.findIndex(a => a.id === id);
  if (index !== -1) {
    areas[index] = {
      ...areas[index],
      ...updates
    };
    setAreas(areas);
    return areas[index];
  }
  return null;
};

export const updateInspectionPoint = (id, updates) => {
  const inspectionPoints = getInspectionPoints();
  const index = inspectionPoints.findIndex(ip => ip.id === id);
  if (index !== -1) {
    inspectionPoints[index] = {
      ...inspectionPoints[index],
      ...updates
    };
    setInspectionPoints(inspectionPoints);
    return inspectionPoints[index];
  }
  return null;
};

export const deleteFacility = (id) => {
  const facilities = getFacilities();
  const filtered = facilities.filter(f => f.id !== id);
  setFacilities(filtered);
  return filtered.length < facilities.length;
};

export const deleteArea = (id) => {
  const areas = getAreas();
  const filtered = areas.filter(a => a.id !== id);
  setAreas(filtered);
  return filtered.length < areas.length;
};

export const deleteInspectionPoint = (id) => {
  const inspectionPoints = getInspectionPoints();
  const filtered = inspectionPoints.filter(ip => ip.id !== id);
  setInspectionPoints(filtered);
  return filtered.length < inspectionPoints.length;
};

export const getFacilitiesByAccountId = (accountId) => {
  const sitesByAccountId = getSitesByAccountId(accountId).map(site => site.id);
  const facilities = getFacilities();
  return facilities.filter(facility => sitesByAccountId.includes(facility.siteId));
};

export const getCurrentUser = () => {
  return getFromStorage('currentUser', null);
}

export const updateCurrentUser = (userDetaisl) => {
  const currentUser = getFromStorage('currentUser', null);
  if (currentUser) {
    setToStorage('currentUser', userDetaisl);
    return currentUser;
  }
}

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
export const addActivityLog = ({ user = '', action = '', details = '' } = {}) => {
  const entry = { id: Date.now().toString(), timestamp: new Date().toISOString(), user, action, details };
  const next = [entry, ...getActivityLogs()];
  setToStorage(STORAGE_KEYS.ACTIVITY_KEY, next);
  return entry;
};
export const clearActivityLogs = () => setToStorage(STORAGE_KEYS.ACTIVITY_KEY, []);

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
  getAccounts,
  setAccounts,
  getSites,
  setSites,
  addSite,
  updateSite,
  getSitesByAccountId,
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
  updateFacility,
  updateArea,
  updateInspectionPoint,
  deleteFacility,
  deleteArea,
  deleteInspectionPoint,
  getFacilitiesByAccountId,
  getCurrentUser,
  updateCurrentUser,
  addAccount,
  updateAccount,
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
  addActivityLog,
  clearActivityLogs
};
