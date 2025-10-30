/**
 * AI-Powered Routing Intelligence Service
 * Provides smart suggestions, emergency detection, and route optimization
 */

/**
 * Detect emergencies and analyze appointment priorities
 * @param {Array} appointments - Array of appointments
 * @param {string} currentTime - Current time in HH:MM format
 * @returns {Object} Emergency analysis with alerts and suggestions
 */
export const analyzeEmergencies = (appointments, currentTime = '08:00') => {
  const emergencies = appointments.filter(apt => apt.priority === 'Emergency');
  const alerts = [];
  const suggestions = [];

  const currentMinutes = timeToMinutes(currentTime);

  emergencies.forEach(emergency => {
    const scheduledMinutes = timeToMinutes(emergency.scheduledTime || '08:00');
    const hoursDifference = (scheduledMinutes - currentMinutes) / 60;

    // Alert if emergency is scheduled more than 2 hours from now
    if (hoursDifference > 2) {
      alerts.push({
        type: 'emergency_delayed',
        severity: 'high',
        appointmentId: emergency.id,
        message: `🚨 EMERGENCY at ${emergency.siteName || 'Unknown Service Address'} scheduled for ${emergency.scheduledTime} (${hoursDifference.toFixed(1)}h from now)`,
        recommendation: 'Consider immediate dispatch or reschedule to earlier time',
        impact: 'high'
      });

      suggestions.push({
        type: 'reschedule',
        appointmentId: emergency.id,
        suggestedTime: currentTime,
        reason: 'Emergency service should be prioritized for immediate dispatch'
      });
    }

    // Alert if emergency has no technician assigned
    if (!emergency.technicianId) {
      alerts.push({
        type: 'unassigned_emergency',
        severity: 'critical',
        appointmentId: emergency.id,
        message: `⚠️ CRITICAL: Emergency at ${emergency.siteName || 'Unknown Service Address'} has no technician assigned`,
        recommendation: 'Assign technician immediately',
        impact: 'critical'
      });
    }
  });

  return {
    emergencyCount: emergencies.length,
    urgentCount: appointments.filter(apt => apt.priority === 'Urgent').length,
    normalCount: appointments.filter(apt => apt.priority === 'Normal').length,
    alerts,
    suggestions,
    hasEmergencies: emergencies.length > 0,
    hasCriticalIssues: alerts.some(a => a.severity === 'critical')
  };
};

/**
 * Detect route conflicts and scheduling issues
 * @param {Object} route - Route object
 * @param {Array} appointments - All appointments
 * @param {Object} technician - Technician object
 * @returns {Object} Conflict analysis
 */
export const detectRouteConflicts = (route, appointments, technician) => {
  const conflicts = [];
  const warnings = [];

  // Check total work time vs available time
  const totalMinutes = route.totalDuration || 0;
  const totalHours = totalMinutes / 60;

  if (totalHours > 8) {
    conflicts.push({
      type: 'overtime',
      severity: 'medium',
      message: `⚠️ Route requires ${totalHours.toFixed(1)} hours - exceeds standard 8-hour workday`,
      recommendation: 'Consider splitting across multiple days or assigning additional technician',
      impact: 'Potential overtime costs and technician fatigue'
    });
  }

  // Check for time window conflicts
  route.stops?.forEach(stop => {
    const apt = appointments.find(a => a.id === stop.appointmentId);
    if (!apt) return;

    // Check if site has closing time
    if (apt.siteClosingTime) {
      const arrivalMinutes = timeToMinutes(stop.estimatedArrival);
      const closingMinutes = timeToMinutes(apt.siteClosingTime);

      if (arrivalMinutes > closingMinutes) {
        conflicts.push({
          type: 'time_window',
          severity: 'high',
          stopOrder: stop.order,
          message: `⏰ Stop #${stop.order} arrives at ${stop.estimatedArrival} but site closes at ${apt.siteClosingTime}`,
          recommendation: 'Move this stop earlier in the route',
          impact: 'Cannot complete service - will require rescheduling'
        });
      }
    }
  });

  // Check for equipment requirements
  const equipmentNeeded = new Set();
  route.stops?.forEach(stop => {
    const apt = appointments.find(a => a.id === stop.appointmentId);
    if (apt?.requiredEquipment) {
      apt.requiredEquipment.forEach(eq => equipmentNeeded.add(eq));
    }
  });

  if (equipmentNeeded.size > 0) {
    warnings.push({
      type: 'equipment',
      severity: 'low',
      message: `🔧 Route requires: ${Array.from(equipmentNeeded).join(', ')}`,
      recommendation: 'Ensure vehicle is stocked with required equipment before departure'
    });
  }

  return {
    hasConflicts: conflicts.length > 0,
    conflictCount: conflicts.length,
    warningCount: warnings.length,
    conflicts,
    warnings,
    isViable: conflicts.filter(c => c.severity === 'high').length === 0
  };
};

/**
 * Generate intelligent route suggestions (3 options)
 * @param {Array} appointments - Appointments to route
 * @param {Object} technician - Technician object
 * @param {Object} vehicle - Vehicle object
 * @param {string} startTime - Start time
 * @returns {Array} Three route options with different strategies
 */
export const generateRouteSuggestions = (appointments, technician, vehicle, startTime = '08:00') => {
  const emergencyAnalysis = analyzeEmergencies(appointments, startTime);

  const suggestions = [];

  // Option A: Fastest Route (Emergency-first, then distance-optimized)
  suggestions.push({
    id: 'fastest',
    name: 'Fastest Route',
    strategy: 'emergency_distance',
    description: 'Prioritizes emergencies first, then optimizes for shortest total distance',
    bestFor: 'Same-day emergencies or when time is critical',
    priority: {
      emergency: 100,
      urgent: 50,
      normal: 10,
      distance: 80
    },
    color: '#ef4444',
    icon: '🔥',
    features: [
      'Emergency-first routing',
      'Distance-optimized stops',
      'Minimal total drive time',
      'May skip some scheduled appointments'
    ],
    tradeoffs: [
      'Some non-emergency appointments may be delayed',
      'Less consideration for customer preferences',
      'Tighter schedule with less buffer time'
    ]
  });

  // Option B: Balanced Route (Emergency > Time Windows > Distance)
  suggestions.push({
    id: 'balanced',
    name: 'Balanced Route',
    strategy: 'balanced',
    description: 'Balances emergencies, scheduled time windows, and route efficiency',
    bestFor: 'Normal daily operations with mixed priorities',
    priority: {
      emergency: 100,
      urgent: 70,
      normal: 40,
      timeWindow: 80,
      distance: 60
    },
    color: '#3b82f6',
    icon: '⚖️',
    features: [
      'Respects customer time windows',
      'Balanced workload distribution',
      'Good customer satisfaction',
      'Reasonable total distance'
    ],
    tradeoffs: [
      'Slightly longer total distance than fastest route',
      'May require more precise timing',
      'Medium scheduling flexibility'
    ],
    recommended: true // Default recommendation
  });

  // Option C: Customer Priority Route (VIP and Contract First)
  suggestions.push({
    id: 'customer',
    name: 'Customer Priority Route',
    strategy: 'customer_first',
    description: 'Prioritizes VIP customers, contract compliance, and scheduled times',
    bestFor: 'Maintaining high customer satisfaction and meeting SLAs',
    priority: {
      emergency: 100,
      vip: 90,
      contract: 85,
      urgent: 60,
      normal: 30,
      scheduledTime: 70,
      distance: 40
    },
    color: '#10b981',
    icon: '⭐',
    features: [
      'VIP customer priority',
      'Contract compliance focus',
      'Scheduled time adherence',
      'High customer satisfaction'
    ],
    tradeoffs: [
      'Longest total distance',
      'Higher fuel costs',
      'Longer total route time',
      'Best for customer retention'
    ]
  });

  // Add emergency alerts to all suggestions
  suggestions.forEach(suggestion => {
    suggestion.emergencyAnalysis = emergencyAnalysis;
    suggestion.alerts = emergencyAnalysis.alerts;
  });

  return suggestions;
};

/**
 * Calculate efficiency score for a route
 * @param {Object} route - Route object
 * @param {number} baselineDistance - Baseline distance for comparison
 * @returns {Object} Efficiency metrics
 */
export const calculateRouteEfficiency = (route, baselineDistance) => {
  const totalDistance = route.totalDistance || 0;
  const totalDuration = route.totalDuration || 0;
  const stopCount = route.stops?.length || 0;

  // Distance efficiency (vs baseline)
  const distanceEfficiency = baselineDistance > 0
    ? Math.max(0, Math.min(100, ((baselineDistance - totalDistance) / baselineDistance) * 100 + 50))
    : 50;

  // Time efficiency (service time vs drive time)
  const estimatedServiceTime = stopCount * 60; // Assume 60 min per stop
  const driveTime = totalDuration - estimatedServiceTime;
  const timeEfficiency = totalDuration > 0
    ? (estimatedServiceTime / totalDuration) * 100
    : 0;

  // Stop density (distance per stop)
  const stopDensity = stopCount > 0 ? totalDistance / stopCount : 0;
  const densityScore = stopDensity > 0
    ? Math.max(0, Math.min(100, (10 - stopDensity) * 10)) // Lower is better
    : 0;

  // Overall efficiency
  const overallEfficiency = (distanceEfficiency * 0.4 + timeEfficiency * 0.4 + densityScore * 0.2);

  // Fuel estimate (assume 12 MPG for pest control truck, $3.50/gallon)
  const fuelGallons = totalDistance / 12;
  const fuelCost = fuelGallons * 3.50;

  return {
    distanceEfficiency: Math.round(distanceEfficiency),
    timeEfficiency: Math.round(timeEfficiency),
    densityScore: Math.round(densityScore),
    overallEfficiency: Math.round(overallEfficiency),
    fuelGallons: fuelGallons.toFixed(1),
    fuelCost: fuelCost.toFixed(2),
    avgDistancePerStop: stopDensity.toFixed(1),
    driveTimePercent: totalDuration > 0 ? ((driveTime / totalDuration) * 100).toFixed(0) : 0,
    serviceTimePercent: totalDuration > 0 ? ((estimatedServiceTime / totalDuration) * 100).toFixed(0) : 0
  };
};

/**
 * Generate actionable suggestions for route improvement
 * @param {Object} route - Current route
 * @param {Object} efficiency - Efficiency metrics
 * @param {Object} conflicts - Conflict analysis
 * @returns {Array} Actionable suggestions
 */
export const generateImprovementSuggestions = (route, efficiency, conflicts) => {
  const suggestions = [];

  // Low efficiency suggestions
  if (efficiency.overallEfficiency < 70) {
    suggestions.push({
      type: 'efficiency',
      icon: '💡',
      message: 'Route efficiency is below optimal',
      actions: [
        'Try re-optimizing stop order',
        'Consider combining with nearby unscheduled appointments',
        'Check for unnecessary backtracking'
      ],
      potentialSavings: `Could save ${(route.totalDistance * 0.15).toFixed(1)} miles`
    });
  }

  // High drive time
  if (efficiency.driveTimePercent > 40) {
    suggestions.push({
      type: 'drive_time',
      icon: '🚗',
      message: 'Drive time is high relative to service time',
      actions: [
        'Cluster stops more tightly',
        'Consider splitting route across multiple days',
        'Assign some stops to nearby technicians'
      ],
      potentialSavings: `Could reduce drive time by 20-30%`
    });
  }

  // Early start suggestion
  const startMinutes = timeToMinutes(route.startTime);
  if (startMinutes > 480 && route.stops?.some(s => s.priority === 'Emergency')) { // After 8:00 AM
    suggestions.push({
      type: 'start_time',
      icon: '⏰',
      message: 'Starting earlier would help with emergency response',
      actions: [
        'Move start time to 7:00 AM',
        'Complete emergencies before rush hour',
      ],
      potentialSavings: 'Could reduce travel time by 15-20% (avoid traffic)'
    });
  }

  // Add conflict-based suggestions
  if (conflicts.hasConflicts) {
    conflicts.conflicts.forEach(conflict => {
      suggestions.push({
        type: 'conflict',
        icon: '⚠️',
        message: conflict.message,
        actions: [conflict.recommendation],
        impact: conflict.impact
      });
    });
  }

  return suggestions;
};

/**
 * Helper function: Convert time string to minutes since midnight
 * @param {string} time - Time in HH:MM format
 * @returns {number} Minutes since midnight
 */
const timeToMinutes = (time) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export default {
  analyzeEmergencies,
  detectRouteConflicts,
  generateRouteSuggestions,
  calculateRouteEfficiency,
  generateImprovementSuggestions
};
