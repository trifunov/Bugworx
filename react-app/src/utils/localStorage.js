// localStorage utility functions for Bugworx Pest Management System

const STORAGE_KEYS = {
  APPOINTMENTS: 'bugworx_appointments',
  ACCOUNTS: 'bugworx_accounts',
  SITES: 'bugworx_sites',
  TECHNICIANS: 'bugworx_technicians',
  INVENTORY: 'bugworx_inventory',
  VEHICLES: 'bugworx_vehicles',
  ROUTES: 'bugworx_routes',
  ROUTE_TEMPLATES: 'bugworx_route_templates'
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

export const getSitesByAccountId = (accountId) => {
  const sites = getSites();
  return sites.filter(site => site.accountId === accountId);
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
  const { appointments, accounts, sites, technicians, inventory, vehicles, routes, routeTemplates } = mockData;

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
  getSitesByAccountId,
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
  getSuggestedTechnician
};
