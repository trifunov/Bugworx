import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, Polyline, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import Table from '../components/Common/Table/Table';
import useTable from '../components/Common/Table/useTable';
import {
  vehicles as initialVehicles,
  routes as initialRoutes,
  routeTemplates as initialRouteTemplates,
  appointments as initialAppointments,
  customers as initialCustomers,
  serviceAddresses as initialServiceAddresses,
  technicians as initialTechnicians,
  inventory as initialInventory,
  services,
  contracts
} from '../data/mockData';
import {
  initializeStorage,
  getVehicles,
  getRoutes,
  getRoutesByDate,
  addRoute,
  updateRoute,
  getTechnicians,
  getAppointments,
  getServiceAddresses
} from '../utils/localStorage';
import {
  generateRouteWithStrategy,
  optimizeRouteWithConstraints
} from '../utils/routeUtils';
import { calculateDirections } from '../services/googleMapsService';
import {
  analyzeEmergencies,
  detectRouteConflicts,
  generateRouteSuggestions,
  calculateRouteEfficiency,
  generateImprovementSuggestions
} from '../services/routingAI';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';

// Google Maps libraries to load - MUST be defined outside component to prevent re-renders
const libraries = ['places', 'geometry'];

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

// Custom marker colors
const getMarkerIcon = (color) => {
  return {
    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#fff',
    strokeWeight: 2,
    scale: 1,
  };
};

const Routing = () => {
  const { setPageSubHeader } = usePageSubHeader();
  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  // Debug: Log API key status (remove in production)
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not defined in .env file');
    } else {
      console.log('Google Maps API key loaded successfully');
    }
  }, []);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRouteGenerator, setShowRouteGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState('routes');

  // Data state
  const [routes, setRoutesState] = useState([]);
  const [vehicles, setVehiclesState] = useState([]);
  const [technicians, setTechniciansState] = useState([]);
  const [appointments, setAppointmentsState] = useState([]);
  const [serviceAddresses, setServiceAddresses] = useState([]);

  // Route generator state
  const [selectedTechnicianForRoute, setSelectedTechnicianForRoute] = useState('');
  const [routeStartTime, setRouteStartTime] = useState('08:00');

  // Google Maps state
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // AI Routing state
  const [emergencyAnalysis, setEmergencyAnalysis] = useState(null);
  const [routeOptions, setRouteOptions] = useState([]);
  const [showRouteOptions, setShowRouteOptions] = useState(false);

  // Map center (Springfield, IL)
  const center = { lat: 39.7817, lng: -89.6501 };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Load data on mount
  useEffect(() => {

    setPageSubHeader({
      title: 'Routing',
      breadcrumbs: [
        { label: 'Routing', path: '/routing' }
      ]
    });
    console.log('Initializing mock data in local storage...');
    // Initialize all mock data
    initializeStorage({
      appointments: initialAppointments,
      customers: initialCustomers,
      serviceAddresses: initialServiceAddresses,
      technicians: initialTechnicians,
      inventory: initialInventory,
      vehicles: initialVehicles,
      routes: initialRoutes,
      routeTemplates: initialRouteTemplates,
      services: services,
      contracts: contracts
    });
    loadData();
  }, [setPageSubHeader]);

  const loadData = () => {
    setRoutesState(getRoutes());
    setVehiclesState(getVehicles());
    setTechniciansState(getTechnicians());
    setAppointmentsState(getAppointments());
    setServiceAddresses(getServiceAddresses());
  };

  // Get routes for selected date
  const todayRoutes = getRoutesByDate(selectedDate);

  // Pagination for routes table
  const {
    data: paginatedRoutes,
    currentPage: routesCurrentPage,
    setCurrentPage: setRoutesCurrentPage,
    totalPages: routesTotalPages,
    totalItems: routesTotalItems
  } = useTable(todayRoutes, {
    pageSize: 3
  });

  // Pagination for fleet table
  const {
    data: paginatedVehicles,
    currentPage: fleetCurrentPage,
    setCurrentPage: setFleetCurrentPage,
    totalPages: fleetTotalPages,
    totalItems: fleetTotalItems
  } = useTable(vehicles, {
    pageSize: 3
  });

  // Pagination for technicians table
  const {
    data: paginatedTechnicians,
    currentPage: techCurrentPage,
    setCurrentPage: setTechCurrentPage,
    totalPages: techTotalPages,
    totalItems: techTotalItems
  } = useTable(technicians.filter(t => t.isActive), {
    pageSize: 3
  });

  // Get technician name
  const getTechnicianName = (technicianId) => {
    const tech = technicians.find(t => t.id === technicianId);
    return tech ? tech.name : 'Unassigned';
  };

  // Get service address name
  const getServiceAddressName = (serviceAddressId) => {
    const serviceAddress = serviceAddresses.find(s => s.id === serviceAddressId);
    return serviceAddress ? serviceAddress.serviceAddressName : 'Unknown Service Address';
  };

  // Get appointment info
  const getAppointmentInfo = (appointmentId) => {
    const apt = appointments.find(a => a.id === appointmentId);
    if (!apt) {
      console.warn('Appointment not found:', appointmentId);
      return null;
    }

    const serviceAddress = serviceAddresses.find(s => s.id === apt.serviceAddressId);
    if (!serviceAddress) {
      console.warn('Service address not found for appointment:', apt.serviceAddressId);
      return null;
    }

    if (!serviceAddress.coordinates) {
      console.warn('Service address has no coordinates:', serviceAddress);
      return null;
    }

    return {
      ...apt,
      serviceAddress: serviceAddress,
      serviceAddressId: apt.serviceAddressId,
      coordinates: serviceAddress.coordinates
    };
  };

  // Generate route for technician - AI-Powered
  const handleGenerateRoute = () => {
    if (!selectedTechnicianForRoute) {
      alert('Please select a technician');
      return;
    }

    const techId = parseInt(selectedTechnicianForRoute);
    const tech = technicians.find(t => t.id === techId);
    const vehicle = vehicles.find(v => v.assignedTechnicianId === techId);

    if (!vehicle) {
      alert('No vehicle assigned to this technician');
      return;
    }

    // Get appointments for this technician and date
    const techAppointments = appointments.filter(
      apt => apt.technicianId === techId &&
             apt.scheduledDate === selectedDate &&
             apt.status === 'Scheduled'
    );

    if (techAppointments.length === 0) {
      alert('No scheduled appointments for this technician on selected date');
      return;
    }

    console.log('🤖 AI Route Generation Starting...');
    console.log('Technician:', tech.name);
    console.log('Appointments:', techAppointments.length);

    // Add service address coordinates to appointments
    const appointmentsWithCoords = techAppointments.map(apt => {
      const serviceAddress = serviceAddresses.find(s => s.id === apt.serviceAddressId);

      if (!serviceAddress || !serviceAddress.coordinates) {
        console.warn(`Service address ${apt.serviceAddressId} missing coordinates, using vehicle location`);
        return {
          ...apt,
          serviceAddressName: serviceAddress?.serviceAddressName || 'Unknown Service Address',
          serviceAddressCoordinates: vehicle.currentLocation,
          coordinates: vehicle.currentLocation,
          serviceAddress: serviceAddress
        };
      }

      return {
        ...apt,
        serviceAddressName: serviceAddress.serviceAddressName,
        serviceAddressCoordinates: serviceAddress.coordinates,
        coordinates: serviceAddress.coordinates,
        serviceAddress: serviceAddress // Include full service address object for customer tier
      };
    });

    // AI: Analyze emergencies
    const emergencyData = analyzeEmergencies(appointmentsWithCoords, routeStartTime);
    setEmergencyAnalysis(emergencyData);

    console.log('🚨 Emergency Analysis:', emergencyData);

    // Show emergency alerts if any
    if (emergencyData.hasEmergencies) {
      console.warn(`⚠️ Found ${emergencyData.emergencyCount} emergency appointment(s)`);
      emergencyData.alerts.forEach(alert => {
        console.warn(`  - ${alert.message}`);
      });
    }

    // AI: Generate 3 route options
    const suggestions = generateRouteSuggestions(
      appointmentsWithCoords,
      tech,
      vehicle,
      routeStartTime
    );

    console.log('💡 Generated route strategies:', suggestions.map(s => s.name).join(', '));

    // Generate actual routes for each strategy
    const generatedOptions = suggestions.map(suggestion => {
      console.log(`\n🔧 Generating ${suggestion.name} route with strategy: ${suggestion.id}`);

      // Use strategy-specific optimization
      const generatedRoute = generateRouteWithStrategy(
        appointmentsWithCoords,
        vehicle.currentLocation,
        routeStartTime,
        suggestion.id // 'fastest', 'balanced', or 'customer'
      );

      if (!generatedRoute) return null;

      console.log(`📊 ${suggestion.name} Results:`, {
        distance: generatedRoute.totalDistance,
        duration: generatedRoute.totalDuration,
        stops: generatedRoute.stops.length,
        firstStop: generatedRoute.stops[0]?.serviceAddressName,
        lastStop: generatedRoute.stops[generatedRoute.stops.length - 1]?.serviceAddressName
      });

      // Calculate efficiency
      const efficiency = calculateRouteEfficiency(
        generatedRoute,
        generatedRoute.totalDistance * 1.3 // baseline
      );

      // Detect conflicts
      const conflicts = detectRouteConflicts(
        generatedRoute,
        appointmentsWithCoords,
        tech
      );

      // Generate improvement suggestions
      const improvements = generateImprovementSuggestions(
        generatedRoute,
        efficiency,
        conflicts
      );

      return {
        ...suggestion,
        route: generatedRoute,
        efficiency,
        conflicts,
        improvements,
        technicianId: techId,
        vehicleId: vehicle.id,
        date: selectedDate
      };
    }).filter(Boolean);

    setRouteOptions(generatedOptions);
    setShowRouteGenerator(false);
    setShowRouteOptions(true);

    console.log('✅ AI route generation complete - showing options to user');
  };

  // Select and save a route option
  const handleSelectRouteOption = (option) => {
    console.log('✅ User selected route option:', option.name);

    // Save the selected route
    const newRoute = {
      date: option.date,
      technicianId: option.technicianId,
      vehicleId: option.vehicleId,
      status: 'Planned',
      strategy: option.id,
      strategyName: option.name,
      startTime: option.route.startTime,
      endTime: option.route.endTime,
      totalDistance: option.route.totalDistance,
      totalDuration: option.route.totalDuration,
      optimizationScore: option.route.optimizationScore,
      stops: option.route.stops,
      efficiency: option.efficiency,
      conflicts: option.conflicts
    };

    addRoute(newRoute);
    loadData();
    setShowRouteOptions(false);
    setRouteOptions([]);

    alert(`✅ ${option.name} created successfully!\n\n` +
          `${option.route.stops.length} stops • ${option.route.totalDistance} miles\n` +
          `Efficiency: ${option.efficiency.overallEfficiency}% • Fuel: $${option.efficiency.fuelCost}`);
  };

  // Calculate route using Google Directions API
  const calculateGoogleDirections = async (route) => {
    if (!window.google || !route) {
      console.warn('Google Maps not loaded or no route provided');
      return;
    }

    const vehicle = vehicles.find(v => v.id === route.vehicleId);
    if (!vehicle) {
      console.warn('Vehicle not found for route');
      return;
    }

    console.log('🗺️ Starting directions calculation for route:', route.id);

    // Build waypoints from route stops
    const waypoints = [];
    const validStops = [];

    for (const stop of route.stops) {
      const aptInfo = getAppointmentInfo(stop.appointmentId);
      if (aptInfo?.coordinates) {
        waypoints.push({
          location: {
            lat: aptInfo.coordinates.lat,
            lng: aptInfo.coordinates.lng
          },
          stopover: true
        });
        validStops.push(aptInfo);
      } else {
        console.warn('Stop has no coordinates:', stop);
      }
    }

    if (validStops.length === 0) {
      console.error('No valid stops with coordinates found');
      alert('This route has no valid stop locations.');
      return;
    }

    console.log(`📍 Found ${validStops.length} valid stops`);

    try {
      // Use the Google Maps service
      const result = await calculateDirections(
        vehicle.currentLocation, // origin
        vehicle.currentLocation, // destination (return to start)
        waypoints,
        false // don't let Google optimize - we already did
      );

      console.log('✅ Directions calculated successfully');
      setDirectionsResponse(result);

      // Fit map to route bounds
      if (map && result.routes[0]) {
        const bounds = result.routes[0].bounds;
        map.fitBounds(bounds);
        console.log('📏 Map bounds adjusted to fit route');
      }
    } catch (error) {
      console.error('❌ Error calculating directions:', error);
      alert(`Failed to calculate route directions: ${error.message}\n\nCheck console for details.`);
      // Fallback to simple polyline if Directions API fails
      setDirectionsResponse(null);
    }
  };

  // View route on map
  const handleViewRoute = (route) => {
    console.log('👁️ Viewing route on map:', route);

    // Clear previous route first
    setDirectionsResponse(null);
    setSelectedMarker(null);

    // Set new route and calculate directions
    setSelectedRoute(route);

    // Calculate directions after a brief delay to ensure state is updated
    setTimeout(() => {
      calculateGoogleDirections(route);
    }, 100);
 
    // Scroll to map
    const mapElement = document.querySelector('.row.mb-4');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Clear route selection
  const handleClearRoute = () => {
    console.log('🧹 Clearing route selection');
    setSelectedRoute(null);
    setDirectionsResponse(null);
    setSelectedMarker(null);
  };

  const handleSaveRoute = (routeId) => {
    loadData();
    const route = routes.find(r => r.id === routeId);
    if (!route) return;
    
    const routesToRemove = routes.filter(r =>
      r.technicianId === route.technicianId &&
      r.date === route.date &&
      r.id !== routeId
    );

    // Delete all other routes
    routesToRemove.forEach(r => {
      deleteRoute(r.id);
    });

    // Mark the selected route as saved/finalized
    updateRoute(routeId, {
      status: 'Planned',
      savedAt: new Date().toISOString()
    });

    loadData();
    alert('Route saved successfully! Other route options have been removed.');
  };

  // Delete route
  const handleDeleteRoute = (routeId) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      deleteRoute(routeId);
      loadData();
      alert('Route deleted successfully!');
    }
  };

  // Get route polyline coordinates (fallback when Directions API is not available)
  const getRoutePolyline = (route) => {
    if (!route) return [];

    const vehicle = vehicles.find(v => v.id === route.vehicleId);
    if (!vehicle) return [];

    const coords = [vehicle.currentLocation];

    route.stops.forEach(stop => {
      const aptInfo = getAppointmentInfo(stop.appointmentId);
      if (aptInfo?.coordinates) {
        coords.push({ lat: aptInfo.coordinates.lat, lng: aptInfo.coordinates.lng });
      }
    });

    // Add return to start
    coords.push(vehicle.currentLocation);

    return coords;
  };

  if (loadError) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger">
              <h4 className="alert-heading">Error loading Google Maps</h4>
              <p>Failed to load Google Maps API. Please check:</p>
              <ul>
                <li>API key is correctly set in .env file</li>
                <li>API key has Maps JavaScript API enabled in Google Cloud Console</li>
                <li>Your internet connection is working</li>
                <li>You've restarted the dev server after adding the .env file</li>
              </ul>
              <hr />
              <p className="mb-0">Error: {loadError.message || 'Unknown error'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Date Selector and Actions */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <label className="form-label mb-1">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label mb-1">&nbsp;</label>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setShowRouteGenerator(true)}
                  >
                    <i className="mdi mdi-plus me-1"></i>
                    Generate Route
                  </button>
                </div>
                <div className="col-md-6">
                  <ul className="nav nav-tabs nav-tabs-custom mb-3" role="tablist">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab === 'routes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('routes')}
                        role="tab"
                        style={{ cursor: 'pointer' }}
                      >
                        <span className="d-none d-md-block">
                          <i className="mdi mdi-map me-2"></i>Routes
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab === 'fleet' ? 'active' : ''}`}
                        onClick={() => setActiveTab('fleet')}
                        role="tab"
                        style={{ cursor: 'pointer' }}
                      >
                        <span className="d-none d-md-block">
                          <i className="mdi mdi-car me-2"></i>Fleet
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${activeTab === 'technicians' ? 'active' : ''}`}
                        onClick={() => setActiveTab('technicians')}
                        role="tab"
                        style={{ cursor: 'pointer' }}
                      >
                        <span className="d-none d-md-block">
                          <i className="mdi mdi-account me-2"></i>Technicians
                        </span>
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    {/* Routes Tab */}
                    {activeTab === 'routes' && (
                      <div className="tab-pane active">
                        <Table
                          columns={['Technician', 'Stops', 'Status', 'Actions']}
                          data={paginatedRoutes}
                          renderRow={(route) => (
                            <tr key={route.id}>
                              <td>{getTechnicianName(route.technicianId)}</td>
                              <td>{route.stops.length}</td>
                              <td>
                                <span className={`badge badge-soft-${
                                  route.status === 'Active' ? 'success' :
                                  route.status === 'Completed' ? 'primary' :
                                  'warning'
                                }`}>
                                  {route.status}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-3">
                                  <a
                                    href="#"
                                    className="text-primary"
                                    title="View on map"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleViewRoute(route);
                                    }}
                                  >
                                    <i className="mdi mdi-map-marker font-size-18"></i>
                                  </a>
                                  <a
                                    href="#"
                                    className="text-success"
                                    title="Save route"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleSaveRoute(route.id);
                                    }}
                                  >
                                    <i className="mdi mdi-content-save font-size-18"></i>
                                  </a>
                                  <a
                                    href="#"
                                    className="text-danger"
                                    title="Delete route"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleDeleteRoute(route.id);
                                    }}
                                  >
                                    <i className="mdi mdi-delete font-size-18"></i>
                                  </a>
                                </div>
                              </td>
                            </tr>
                          )}
                          emptyState={{
                            icon: 'mdi mdi-map',
                            message: 'No routes for this date',
                          }}
                          pagination={{
                            currentPage: routesCurrentPage,
                            totalPages: routesTotalPages,
                            onPageChange: setRoutesCurrentPage,
                            totalItems: routesTotalItems
                          }}
                        />
                      </div>
                    )}

                    {/* Fleet Tab */}
                    {activeTab === 'fleet' && (
                      <div className="tab-pane active">
                        <Table
                          columns={['Vehicle', 'Make/Model', 'Assigned To', 'Mileage', 'Status']}
                          data={paginatedVehicles}
                          renderRow={(vehicle) => (
                            <tr key={vehicle.id}>
                              <td><strong>{vehicle.vehicleNumber}</strong></td>
                              <td>{vehicle.make} {vehicle.model} {vehicle.year}</td>
                              <td>{getTechnicianName(vehicle.assignedTechnicianId)}</td>
                              <td>{vehicle.mileage.toLocaleString()} mi</td>
                              <td>
                                <span className={`badge badge-soft-${
                                  vehicle.status === 'Active' ? 'success' :
                                  vehicle.status === 'Maintenance' ? 'warning' :
                                  'danger'
                                }`}>
                                  {vehicle.status}
                                </span>
                              </td>
                            </tr>
                          )}
                          emptyState={{
                            icon: 'mdi mdi-car',
                            message: 'No vehicles found',
                          }}
                          pagination={{
                            currentPage: fleetCurrentPage,
                            totalPages: fleetTotalPages,
                            onPageChange: setFleetCurrentPage,
                            totalItems: fleetTotalItems
                          }}
                        />
                      </div>
                    )}

                    {/* Technicians Tab */}
                    {activeTab === 'technicians' && (
                      <div className="tab-pane active">
                        <Table
                          columns={['Name', 'Specialization', 'Vehicle', 'Phone', 'Rating']}
                          data={paginatedTechnicians}
                          renderRow={(tech) => {
                            const vehicle = vehicles.find(v => v.assignedTechnicianId === tech.id);
                            return (
                              <tr key={tech.id}>
                                <td><strong>{tech.name}</strong></td>
                                <td>{tech.specialization}</td>
                                <td>{vehicle ? vehicle.vehicleNumber : 'Not Assigned'}</td>
                                <td>{tech.phone}</td>
                                <td>
                                  <i className="mdi mdi-star text-warning me-1"></i>
                                  {tech.rating}/5.0
                                </td>
                              </tr>
                            );
                          }}
                          emptyState={{
                            icon: 'mdi mdi-account',
                            message: 'No technicians found',
                          }}
                          pagination={{
                            currentPage: techCurrentPage,
                            totalPages: techTotalPages,
                            onPageChange: setTechCurrentPage,
                            totalItems: techTotalItems
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="row mb-4">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title mb-0">Route Map</h4>
                {selectedRoute && (
                  <button
                    className="btn btn-sm btn-light"
                    onClick={handleClearRoute}
                  >
                    <i className="mdi mdi-close me-1"></i>
                    Clear Selection
                  </button>
                )}
              </div>

              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  zoomControl: true,
                  streetViewControl: true,
                  mapTypeControl: true,
                  fullscreenControl: true,
                }}
              >
                {/* Vehicle markers */}
                {vehicles.map((vehicle) => (
                  vehicle.currentLocation && (
                    <Marker
                      key={`vehicle-${vehicle.id}`}
                      position={{ lat: vehicle.currentLocation.lat, lng: vehicle.currentLocation.lng }}
                      icon={getMarkerIcon('#3b82f6')}
                      onClick={() => setSelectedMarker({ type: 'vehicle', data: vehicle })}
                    />
                  )
                ))}

                {/* Vehicle info windows */}
                {selectedMarker?.type === 'vehicle' && (
                  <InfoWindow
                    position={{ lat: selectedMarker.data.currentLocation.lat, lng: selectedMarker.data.currentLocation.lng }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div>
                      <strong>{selectedMarker.data.vehicleNumber}</strong><br />
                      {selectedMarker.data.make} {selectedMarker.data.model}<br />
                      Status: {selectedMarker.data.status}
                    </div>
                  </InfoWindow>
                )}

                {/* Selected route visualization */}
                {selectedRoute && selectedRoute.stops && (
                  <>
                    {/* Use Google Directions Renderer if available, otherwise use polyline */}
                    {directionsResponse ? (
                      <DirectionsRenderer
                        directions={directionsResponse}
                        options={{
                          suppressMarkers: true, // We show our own custom numbered markers
                          polylineOptions: {
                            strokeColor: '#2563eb', // Blue color
                            strokeWeight: 5,
                            strokeOpacity: 0.9,
                          },
                          preserveViewport: false, // Allow fitBounds to work
                        }}
                      />
                    ) : (
                      <Polyline
                        path={getRoutePolyline(selectedRoute)}
                        options={{
                          strokeColor: '#94a3b8', // Gray color for fallback
                          strokeWeight: 4,
                          strokeOpacity: 0.6,
                          strokeStyle: 'dashed',
                        }}
                      />
                    )}

                    {/* Route stop markers */}
                    {selectedRoute.stops.map((stop, index) => {
                      const aptInfo = getAppointmentInfo(stop.appointmentId);
                      if (!aptInfo?.coordinates) return null;

                      return (
                        <Marker
                          key={`stop-${index}-${stop.appointmentId}`}
                          position={{ lat: aptInfo.coordinates.lat, lng: aptInfo.coordinates.lng }}
                          icon={getMarkerIcon(index === 0 ? '#10b981' : '#f59e0b')}
                          label={{
                            text: `${stop.order}`,
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold',
                          }}
                          onClick={() => setSelectedMarker({ type: 'stop', data: { stop, aptInfo } })}
                        />
                      );
                    })}

                    {/* Stop info window */}
                    {selectedMarker?.type === 'stop' && (
                      <InfoWindow
                        position={{
                          lat: selectedMarker.data.aptInfo.coordinates.lat,
                          lng: selectedMarker.data.aptInfo.coordinates.lng
                        }}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div>
                          <strong>Stop #{selectedMarker.data.stop.order}</strong><br />
                          {getServiceAddressName(selectedMarker.data.aptInfo.serviceAddressId)}<br />
                          ETA: {selectedMarker.data.stop.estimatedArrival}<br />
                          Service: {selectedMarker.data.aptInfo.serviceType}
                        </div>
                      </InfoWindow>
                    )}
                  </>
                )}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>

      {/* Route Generator Modal */}
      {showRouteGenerator && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Generate Optimized Route</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowRouteGenerator(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Select Technician</label>
                    <select
                      className="form-select"
                      value={selectedTechnicianForRoute}
                      onChange={(e) => setSelectedTechnicianForRoute(e.target.value)}
                    >
                      <option value="">Choose technician...</option>
                      {technicians.filter(t => t.isActive).map(tech => (
                        <option key={tech.id} value={tech.id}>
                          {tech.name} - {tech.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={routeStartTime}
                      onChange={(e) => setRouteStartTime(e.target.value)}
                    />
                  </div>
                  <div className="alert alert-info mb-0">
                    <i className="mdi mdi-information me-2"></i>
                    Route will be automatically optimized based on distance, priorities, and time windows.
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowRouteGenerator(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleGenerateRoute}
                  >
                    <i className="mdi mdi-check me-1"></i>
                    Generate Route
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* AI Route Options Modal */}
      {showRouteOptions && routeOptions.length > 0 && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="mdi mdi-robot me-2"></i>
                    Choose Route Strategy
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowRouteOptions(false);
                      setRouteOptions([]);
                    }}
                  ></button>
                </div>

                <div className="modal-body">
                  {/* Emergency Alerts */}
                  {emergencyAnalysis && emergencyAnalysis.alerts.length > 0 && (
                    <div className="alert alert-danger mb-4">
                      <h6 className="alert-heading">
                        <i className="mdi mdi-alert-circle-outline me-2"></i>
                        Emergency Alerts ({emergencyAnalysis.alerts.length})
                      </h6>
                      {emergencyAnalysis.alerts.map((alert, idx) => (
                        <div key={idx} className="mb-2">
                          <strong>{alert.message}</strong>
                          <br />
                          <small>{alert.recommendation}</small>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Route Options */}
                  {routeOptions.map((option) => (
                    <div
                      key={option.id}
                      className="card mb-3"
                      style={{ borderLeft: `4px solid ${option.color}` }}
                    >
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <h5 className="mb-2" style={{ color: option.color }}>
                              {option.icon} {option.name}
                              {option.recommended && (
                                <span className="badge bg-success ms-2">Recommended</span>
                              )}
                            </h5>
                            <p className="text-muted small mb-3">{option.description}</p>

                            <div className="row g-2 mb-2">
                              <div className="col-3">
                                <div className="text-center">
                                  <div className="fw-bold">{option.route.stops.length}</div>
                                  <small className="text-muted">Stops</small>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="text-center">
                                  <div className="fw-bold">{option.route.totalDistance} mi</div>
                                  <small className="text-muted">Distance</small>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="text-center">
                                  <div className="fw-bold">{Math.floor(option.route.totalDuration / 60)}h {option.route.totalDuration % 60}m</div>
                                  <small className="text-muted">Duration</small>
                                </div>
                              </div>
                              <div className="col-3">
                                <div className="text-center">
                                  <div className="fw-bold">${option.efficiency.fuelCost}</div>
                                  <small className="text-muted">Fuel</small>
                                </div>
                              </div>
                            </div>

                            <div className="small text-muted">
                              <i className="mdi mdi-clock-outline me-1"></i>
                              {option.route.startTime} → {option.route.endTime}
                              <span className="ms-3">
                                <i className="mdi mdi-home-circle me-1"></i>
                                Includes return trip
                              </span>
                            </div>
                          </div>

                          <div className="col-md-4 text-center">
                            <div className="mb-2">
                              <span className={`badge ${
                                option.efficiency.overallEfficiency >= 80 ? 'bg-success' :
                                option.efficiency.overallEfficiency >= 60 ? 'bg-warning' : 'bg-danger'
                              } fs-6 px-3 py-2`}>
                                {option.efficiency.overallEfficiency}% Efficient
                              </span>
                            </div>
                            <button
                              className="btn btn-sm w-100"
                              style={{
                                backgroundColor: option.color,
                                borderColor: option.color,
                                color: 'white'
                              }}
                              onClick={() => handleSelectRouteOption(option)}
                            >
                              <i className="mdi mdi-check me-1"></i>
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setShowRouteOptions(false);
                      setRouteOptions([]);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default Routing;
