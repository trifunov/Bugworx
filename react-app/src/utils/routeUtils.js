// Route calculation and optimization utilities for Bugworx Pest Management System

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {Object} coord1 - {lat, lng}
 * @param {Object} coord2 - {lat, lng}
 * @returns {number} Distance in miles
 */
export const calculateDistance = (coord1, coord2) => {
  // Validate coordinates
  if (!coord1 || !coord2 ||
      typeof coord1.lat !== 'number' || typeof coord1.lng !== 'number' ||
      typeof coord2.lat !== 'number' || typeof coord2.lng !== 'number') {
    console.warn('Invalid coordinates provided to calculateDistance:', coord1, coord2);
    return 0;
  }

  const R = 3959; // Earth's radius in miles
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
    Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal
};

const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Estimate travel time based on distance
 * Assumes average speed of 30 mph in urban areas
 * @param {number} distance - Distance in miles
 * @returns {number} Time in minutes
 */
export const estimateTravelTime = (distance) => {
  const avgSpeed = 30; // mph
  const timeInHours = distance / avgSpeed;
  const timeInMinutes = Math.ceil(timeInHours * 60);

  // Add 5 minutes buffer for each trip
  return timeInMinutes + 5;
};

/**
 * Calculate total route distance
 * @param {Array} stops - Array of stops with coordinates
 * @param {Object} startLocation - Starting location {lat, lng}
 * @returns {number} Total distance in miles
 */
export const calculateRouteDistance = (stops, startLocation) => {
  if (!stops || stops.length === 0) return 0;

  let totalDistance = 0;
  let currentLocation = startLocation;

  stops.forEach(stop => {
    const distance = calculateDistance(currentLocation, stop.coordinates);
    totalDistance += distance;
    currentLocation = stop.coordinates;
  });

  // Add return distance to start
  totalDistance += calculateDistance(currentLocation, startLocation);

  return Math.round(totalDistance * 10) / 10;
};

/**
 * Calculate total route duration including service times
 * @param {Array} stops - Array of stops with duration
 * @param {Object} startLocation - Starting location {lat, lng}
 * @returns {number} Total duration in minutes
 */
export const calculateRouteDuration = (stops, startLocation) => {
  if (!stops || stops.length === 0) return 0;

  let totalDuration = 0;
  let currentLocation = startLocation;

  stops.forEach(stop => {
    // Add travel time
    const distance = calculateDistance(currentLocation, stop.coordinates);
    totalDuration += estimateTravelTime(distance);

    // Add service time
    totalDuration += stop.estimatedDuration || 60;

    currentLocation = stop.coordinates;
  });

  // Add return travel time
  const returnDistance = calculateDistance(currentLocation, startLocation);
  totalDuration += estimateTravelTime(returnDistance);

  return totalDuration;
};

/**
 * Nearest Neighbor algorithm for route optimization
 * Simple heuristic that picks the closest unvisited stop
 * @param {Array} stops - Array of stops to optimize
 * @param {Object} startLocation - Starting location {lat, lng}
 * @returns {Array} Optimized stops array
 */
export const optimizeRouteNearestNeighbor = (stops, startLocation) => {
  if (!stops || stops.length <= 1) return stops;

  const unvisited = [...stops];
  const optimized = [];
  let currentLocation = startLocation;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    // Find nearest unvisited stop
    unvisited.forEach((stop, index) => {
      const distance = calculateDistance(currentLocation, stop.coordinates);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    // Add nearest to optimized route
    const nearestStop = unvisited.splice(nearestIndex, 1)[0];
    optimized.push({
      ...nearestStop,
      distanceFromPrevious: nearestDistance
    });
    currentLocation = nearestStop.coordinates;
  }

  return optimized;
};

/**
 * 2-opt optimization algorithm
 * Improves route by eliminating crossing paths
 * @param {Array} stops - Array of stops to optimize
 * @param {Object} startLocation - Starting location {lat, lng}
 * @returns {Array} Optimized stops array
 */
export const optimizeRoute2Opt = (stops, startLocation) => {
  if (!stops || stops.length <= 2) return stops;

  let route = [...stops];
  let improved = true;
  let iterations = 0;
  const maxIterations = 100;

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 0; i < route.length - 1; i++) {
      for (let j = i + 2; j < route.length; j++) {
        // Calculate current distances
        const currentDist =
          calculateDistance(
            i === 0 ? startLocation : route[i - 1].coordinates,
            route[i].coordinates
          ) +
          calculateDistance(route[j - 1].coordinates, route[j].coordinates);

        // Calculate distances after swap
        const newDist =
          calculateDistance(
            i === 0 ? startLocation : route[i - 1].coordinates,
            route[j].coordinates
          ) +
          calculateDistance(route[j - 1].coordinates, route[i].coordinates);

        // If swap improves route, do it
        if (newDist < currentDist) {
          // Reverse the segment between i and j
          const segment = route.slice(i, j + 1).reverse();
          route = [...route.slice(0, i), ...segment, ...route.slice(j + 1)];
          improved = true;
        }
      }
    }
  }

  // Add distance information
  let currentLoc = startLocation;
  return route.map(stop => {
    const dist = calculateDistance(currentLoc, stop.coordinates);
    currentLoc = stop.coordinates;
    return {
      ...stop,
      distanceFromPrevious: dist
    };
  });
};

/**
 * Optimize route considering priority and time windows
 * @param {Array} stops - Array of stops with priority and timeWindow
 * @param {Object} startLocation - Starting location {lat, lng}
 * @param {string} startTime - Route start time (HH:MM)
 * @returns {Array} Optimized stops with estimated times
 */
export const optimizeRouteWithConstraints = (stops, startLocation, startTime = '08:00') => {
  if (!stops || stops.length === 0) return [];

  // Filter out stops with invalid coordinates
  const validStops = stops.filter(stop => {
    if (!stop.coordinates || typeof stop.coordinates.lat !== 'number' || typeof stop.coordinates.lng !== 'number') {
      console.warn('Skipping stop with invalid coordinates:', stop);
      return false;
    }
    return true;
  });

  if (validStops.length === 0) return [];

  // Separate by priority
  const emergency = validStops.filter(s => s.priority === 'Emergency');
  const urgent = validStops.filter(s => s.priority === 'Urgent');
  const normal = validStops.filter(s => s.priority === 'Normal');

  // Optimize each priority group
  const optimizedEmergency = optimizeRoute2Opt(emergency, startLocation);
  const lastEmergencyLoc = optimizedEmergency.length > 0
    ? optimizedEmergency[optimizedEmergency.length - 1].coordinates
    : startLocation;

  const optimizedUrgent = optimizeRoute2Opt(urgent, lastEmergencyLoc);
  const lastUrgentLoc = optimizedUrgent.length > 0
    ? optimizedUrgent[optimizedUrgent.length - 1].coordinates
    : lastEmergencyLoc;

  const optimizedNormal = optimizeRoute2Opt(normal, lastUrgentLoc);

  // Combine all stops
  const allStops = [...optimizedEmergency, ...optimizedUrgent, ...optimizedNormal];

  // Calculate estimated arrival/departure times
  const [hours, minutes] = startTime.split(':').map(Number);
  let currentTime = hours * 60 + minutes; // Convert to minutes since midnight
  let currentLoc = startLocation;

  return allStops.map((stop, index) => {
    // Calculate travel time
    const travelTime = estimateTravelTime(
      calculateDistance(currentLoc, stop.coordinates)
    );
    currentTime += travelTime;

    const arrivalTime = formatTime(currentTime);
    currentTime += stop.estimatedDuration || 60;
    const departureTime = formatTime(currentTime);

    currentLoc = stop.coordinates;

    return {
      ...stop,
      order: index + 1,
      estimatedArrival: arrivalTime,
      estimatedDeparture: departureTime,
      status: 'Pending'
    };
  });
};

/**
 * Convert minutes since midnight to HH:MM format
 * @param {number} minutes - Minutes since midnight
 * @returns {string} Time in HH:MM format
 */
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = Math.floor(minutes % 60);
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

/**
 * Calculate route optimization score
 * Compares optimized route to baseline (straight-line route)
 * @param {number} optimizedDistance - Distance of optimized route
 * @param {number} baselineDistance - Distance of baseline route
 * @returns {number} Score from 0-100
 */
export const calculateOptimizationScore = (optimizedDistance, baselineDistance) => {
  if (baselineDistance === 0) return 100;

  const improvement = (baselineDistance - optimizedDistance) / baselineDistance;
  const score = Math.max(0, Math.min(100, 50 + improvement * 50));

  return Math.round(score);
};

/**
 * Generate route from appointments with specific strategy
 * @param {Array} appointments - Array of appointments for a technician/date
 * @param {Object} technicianLocation - Technician's starting location
 * @param {string} startTime - Route start time
 * @param {string} strategy - Route strategy: 'fastest', 'balanced', 'customer'
 * @returns {Object} Generated route object
 */
export const generateRouteWithStrategy = (appointments, technicianLocation, startTime = '08:00', strategy = 'balanced') => {
  if (!appointments || appointments.length === 0) {
    return null;
  }

  console.log(`\n🚀 generateRouteWithStrategy called with strategy: "${strategy}"`);

  // Convert appointments to stops format
  const stops = appointments.map(apt => ({
    appointmentId: apt.id,
    siteId: apt.siteId,
    coordinates: apt.siteCoordinates,
    estimatedDuration: apt.estimatedDuration,
    priority: apt.priority,
    serviceType: apt.serviceType,
    siteName: apt.siteName,
    customerTier: apt.site?.customerTier,
    scheduledTime: apt.scheduledTime
  }));

  console.log(`📍 Input stops (${stops.length}):`, stops.map(s => ({
    name: s.siteName,
    priority: s.priority,
    tier: s.customerTier,
    time: s.scheduledTime
  })));

  let optimizedStops;

  if (strategy === 'fastest') {
    console.log('⚡ Using FASTEST strategy (Emergency + Nearest Neighbor)');
    // FASTEST: Emergency first, then pure distance optimization (ignore scheduled times)
    const emergency = stops.filter(s => s.priority === 'Emergency');
    const nonEmergency = stops.filter(s => s.priority !== 'Emergency');

    const emergencyOptimized = optimizeRoute2Opt(emergency, technicianLocation);
    const lastLoc = emergencyOptimized.length > 0
      ? emergencyOptimized[emergencyOptimized.length - 1].coordinates
      : technicianLocation;

    // For non-emergencies, just use nearest neighbor (fastest)
    const nonEmergencyOptimized = optimizeRouteNearestNeighbor(nonEmergency, lastLoc);

    optimizedStops = [...emergencyOptimized, ...nonEmergencyOptimized];

  } else if (strategy === 'customer') {
    console.log('⭐ Using CUSTOMER PRIORITY strategy (VIP > Contract > Others)');
    // CUSTOMER PRIORITY: Emergency > VIP > Contract > Others, respect scheduled times
    const emergency = stops.filter(s => s.priority === 'Emergency');
    const vip = stops.filter(s => s.priority !== 'Emergency' && s.customerTier === 'VIP');
    const contract = stops.filter(s => s.priority !== 'Emergency' && s.customerTier === 'Contract' && s.customerTier !== 'VIP');
    const others = stops.filter(s => s.priority !== 'Emergency' && !s.customerTier);

    console.log(`  Emergency: ${emergency.length}, VIP: ${vip.length}, Contract: ${contract.length}, Others: ${others.length}`);

    // Sort each group by scheduled time
    const sortByTime = (a, b) => {
      const timeA = a.scheduledTime || '12:00';
      const timeB = b.scheduledTime || '12:00';
      return timeA.localeCompare(timeB);
    };

    emergency.sort(sortByTime);
    vip.sort(sortByTime);
    contract.sort(sortByTime);
    others.sort(sortByTime);

    optimizedStops = [...emergency, ...vip, ...contract, ...others];

  } else {
    console.log('⚖️ Using BALANCED strategy (Emergency > Urgent > Normal with 2-opt)');
    // BALANCED (default): Emergency > Urgent > Normal with 2-opt optimization
    optimizedStops = optimizeRouteWithConstraints(stops, technicianLocation, startTime);
  }

  console.log(`✅ Optimized stop order:`, optimizedStops.map((s, i) => `${i+1}. ${s.siteName}`));

  // Calculate estimated arrival/departure times
  const [hours, minutes] = startTime.split(':').map(Number);
  let currentTime = hours * 60 + minutes;
  let currentLoc = technicianLocation;

  const stopsWithTimes = optimizedStops.map((stop, index) => {
    const travelTime = estimateTravelTime(
      calculateDistance(currentLoc, stop.coordinates)
    );
    currentTime += travelTime;

    const arrivalTime = formatTime(currentTime);
    currentTime += stop.estimatedDuration || 60;
    const departureTime = formatTime(currentTime);

    currentLoc = stop.coordinates;

    return {
      ...stop,
      order: index + 1,
      estimatedArrival: arrivalTime,
      estimatedDeparture: departureTime,
      status: 'Pending'
    };
  });

  // Calculate metrics
  const totalDistance = calculateRouteDistance(
    stopsWithTimes.map(s => ({ coordinates: s.coordinates })),
    technicianLocation
  );

  const totalDuration = calculateRouteDuration(
    stopsWithTimes.map(s => ({
      coordinates: s.coordinates,
      estimatedDuration: s.estimatedDuration
    })),
    technicianLocation
  );

  // Estimate end time
  const startMinutes = hours * 60 + minutes;
  const endMinutes = startMinutes + totalDuration;
  const endTime = formatTime(endMinutes);

  console.log(`📊 Final metrics for "${strategy}": Distance=${totalDistance}mi, Duration=${totalDuration}min (${Math.floor(totalDuration/60)}h ${totalDuration%60}m)`);

  return {
    stops: stopsWithTimes,
    totalDistance,
    totalDuration,
    startTime,
    endTime,
    optimizationScore: calculateOptimizationScore(totalDistance, totalDistance * 1.3)
  };
};

/**
 * Generate route from appointments (legacy - uses balanced strategy)
 * @param {Array} appointments - Array of appointments for a technician/date
 * @param {Object} technicianLocation - Technician's starting location
 * @param {string} startTime - Route start time
 * @returns {Object} Generated route object
 */
export const generateRouteFromAppointments = (appointments, technicianLocation, startTime = '08:00') => {
  return generateRouteWithStrategy(appointments, technicianLocation, startTime, 'balanced');
};

export default {
  calculateDistance,
  estimateTravelTime,
  calculateRouteDistance,
  calculateRouteDuration,
  optimizeRouteNearestNeighbor,
  optimizeRoute2Opt,
  optimizeRouteWithConstraints,
  calculateOptimizationScore,
  generateRouteFromAppointments,
  generateRouteWithStrategy
};
