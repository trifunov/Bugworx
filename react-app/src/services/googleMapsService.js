/**
 * Google Maps API Service Layer
 * Centralizes all Google Maps API calls for routing and distance calculations
 */

/**
 * Calculate driving directions using Google Directions API
 * @param {Object} origin - { lat, lng }
 * @param {Object} destination - { lat, lng }
 * @param {Array} waypoints - Array of { location: { lat, lng }, stopover: boolean }
 * @param {boolean} optimizeWaypoints - Let Google optimize waypoint order
 * @returns {Promise<Object>} DirectionsResult object
 */
export const calculateDirections = async (origin, destination, waypoints = [], optimizeWaypoints = false) => {
  if (!window.google) {
    throw new Error('Google Maps API not loaded');
  }

  const directionsService = new window.google.maps.DirectionsService();

  console.log('🗺️ Calculating directions:', {
    origin,
    destination,
    waypointCount: waypoints.length,
    optimizeWaypoints
  });

  try {
    const result = await directionsService.route({
      origin: new window.google.maps.LatLng(origin.lat, origin.lng),
      destination: new window.google.maps.LatLng(destination.lat, destination.lng),
      waypoints: waypoints.slice(0, 23), // Google limit: 25 total (origin + destination + 23 waypoints)
      optimizeWaypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true, // Get alternative routes
    });

    console.log('✅ Directions calculated successfully:', {
      totalDistance: result.routes[0]?.legs.reduce((sum, leg) => sum + leg.distance.value, 0) / 1609.34, // Convert to miles
      totalDuration: result.routes[0]?.legs.reduce((sum, leg) => sum + leg.duration.value, 0) / 60, // Convert to minutes
      alternativeRoutes: result.routes.length
    });

    return result;
  } catch (error) {
    console.error('❌ Directions API error:', error);

    // Handle specific error codes
    if (error.code === 'ZERO_RESULTS') {
      throw new Error('No route could be found between these locations');
    } else if (error.code === 'OVER_QUERY_LIMIT') {
      throw new Error('Too many requests to Directions API. Please try again later.');
    } else if (error.code === 'REQUEST_DENIED') {
      throw new Error('Directions API request denied. Check API key permissions.');
    } else if (error.code === 'INVALID_REQUEST') {
      throw new Error('Invalid request. Check that all locations are valid.');
    }

    throw error;
  }
};

/**
 * Calculate distance matrix for multiple origins and destinations
 * @param {Array} origins - Array of { lat, lng }
 * @param {Array} destinations - Array of { lat, lng }
 * @returns {Promise<Object>} DistanceMatrixResponse
 */
export const calculateDistanceMatrix = async (origins, destinations) => {
  if (!window.google) {
    throw new Error('Google Maps API not loaded');
  }

  const service = new window.google.maps.DistanceMatrixService();

  console.log('📊 Calculating distance matrix:', {
    originCount: origins.length,
    destinationCount: destinations.length
  });

  try {
    const result = await service.getDistanceMatrix({
      origins: origins.map(o => new window.google.maps.LatLng(o.lat, o.lng)),
      destinations: destinations.map(d => new window.google.maps.LatLng(d.lat, d.lng)),
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL, // Use miles
    });

    console.log('✅ Distance matrix calculated successfully');
    return result;
  } catch (error) {
    console.error('❌ Distance Matrix API error:', error);
    throw error;
  }
};

/**
 * Get real driving distance and duration between two points
 * @param {Object} origin - { lat, lng }
 * @param {Object} destination - { lat, lng }
 * @returns {Promise<Object>} { distance: number (miles), duration: number (minutes) }
 */
export const getRealDistance = async (origin, destination) => {
  try {
    const result = await calculateDistanceMatrix([origin], [destination]);

    const element = result.rows[0].elements[0];

    if (element.status !== 'OK') {
      throw new Error(`Distance calculation failed: ${element.status}`);
    }

    return {
      distance: element.distance.value / 1609.34, // Convert meters to miles
      duration: element.duration.value / 60, // Convert seconds to minutes
      distanceText: element.distance.text,
      durationText: element.duration.text
    };
  } catch (error) {
    console.error('Error getting real distance:', error);
    // Fallback to Haversine if API fails
    return null;
  }
};

/**
 * Batch calculate distances for route optimization
 * @param {Array} points - Array of { lat, lng } coordinates
 * @returns {Promise<Array>} Distance matrix (2D array)
 */
export const getBatchDistances = async (points) => {
  if (points.length < 2) return [];

  try {
    const result = await calculateDistanceMatrix(points, points);

    // Convert to 2D array of distances in miles
    const matrix = result.rows.map(row =>
      row.elements.map(element =>
        element.status === 'OK' ? element.distance.value / 1609.34 : Infinity
      )
    );

    return matrix;
  } catch (error) {
    console.error('Error getting batch distances:', error);
    return [];
  }
};

/**
 * Get traffic-aware travel time
 * @param {Object} origin - { lat, lng }
 * @param {Object} destination - { lat, lng }
 * @param {Date} departureTime - When the trip will start
 * @returns {Promise<Object>} { normal: number, inTraffic: number } (minutes)
 */
export const getTrafficAwareTime = async (origin, destination, departureTime = new Date()) => {
  if (!window.google) {
    throw new Error('Google Maps API not loaded');
  }

  const service = new window.google.maps.DistanceMatrixService();

  try {
    const result = await service.getDistanceMatrix({
      origins: [new window.google.maps.LatLng(origin.lat, origin.lng)],
      destinations: [new window.google.maps.LatLng(destination.lat, destination.lng)],
      travelMode: window.google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: departureTime,
        trafficModel: window.google.maps.TrafficModel.BEST_GUESS
      }
    });

    const element = result.rows[0].elements[0];

    return {
      normal: element.duration.value / 60,
      inTraffic: element.duration_in_traffic?.value / 60 || element.duration.value / 60,
      trafficDelay: ((element.duration_in_traffic?.value || element.duration.value) - element.duration.value) / 60
    };
  } catch (error) {
    console.error('Error getting traffic-aware time:', error);
    return null;
  }
};

/**
 * Geocode an address to coordinates
 * @param {string} address - Address string
 * @returns {Promise<Object>} { lat, lng, formattedAddress }
 */
export const geocodeAddress = async (address) => {
  if (!window.google) {
    throw new Error('Google Maps API not loaded');
  }

  const geocoder = new window.google.maps.Geocoder();

  try {
    const result = await geocoder.geocode({ address });

    if (result.results.length === 0) {
      throw new Error('Address not found');
    }

    const location = result.results[0].geometry.location;

    return {
      lat: location.lat(),
      lng: location.lng(),
      formattedAddress: result.results[0].formatted_address
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

/**
 * Reverse geocode coordinates to address
 * @param {Object} coordinates - { lat, lng }
 * @returns {Promise<string>} Formatted address
 */
export const reverseGeocode = async (coordinates) => {
  if (!window.google) {
    throw new Error('Google Maps API not loaded');
  }

  const geocoder = new window.google.maps.Geocoder();

  try {
    const result = await geocoder.geocode({
      location: new window.google.maps.LatLng(coordinates.lat, coordinates.lng)
    });

    if (result.results.length === 0) {
      throw new Error('No address found for these coordinates');
    }

    return result.results[0].formatted_address;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
};

export default {
  calculateDirections,
  calculateDistanceMatrix,
  getRealDistance,
  getBatchDistances,
  getTrafficAwareTime,
  geocodeAddress,
  reverseGeocode
};
