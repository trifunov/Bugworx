import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {
  vehicles as initialVehicles,
  routes as initialRoutes,
  routeTemplates as initialRouteTemplates,
  appointments as initialAppointments,
  accounts as initialAccounts,
  sites as initialSites,
  technicians as initialTechnicians,
  inventory as initialInventory
} from '../data/mockData';
import {
  initializeStorage,
  getVehicles,
  getRoutes,
  getRoutesByDate,
  addRoute,
  updateRoute,
  deleteRoute,
  getTechnicians,
  getAppointments,
  getSites
} from '../utils/localStorage';
import {
  generateRouteFromAppointments,
  calculateDistance,
  optimizeRouteWithConstraints
} from '../utils/routeUtils';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Custom marker colors
const createColoredIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 24],
  });
};

const Routing = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRouteGenerator, setShowRouteGenerator] = useState(false);

  // Data state
  const [routes, setRoutesState] = useState([]);
  const [vehicles, setVehiclesState] = useState([]);
  const [technicians, setTechniciansState] = useState([]);
  const [appointments, setAppointmentsState] = useState([]);
  const [sites, setSitesState] = useState([]);

  // Route generator state
  const [selectedTechnicianForRoute, setSelectedTechnicianForRoute] = useState('');
  const [routeStartTime, setRouteStartTime] = useState('08:00');

  // Map center (Springfield, IL)
  const center = [39.7817, -89.6501];

  // Load data on mount
  useEffect(() => {
    // Initialize all mock data
    initializeStorage({
      appointments: initialAppointments,
      accounts: initialAccounts,
      sites: initialSites,
      technicians: initialTechnicians,
      inventory: initialInventory,
      vehicles: initialVehicles,
      routes: initialRoutes,
      routeTemplates: initialRouteTemplates
    });
    loadData();
  }, []);

  const loadData = () => {
    setRoutesState(getRoutes());
    setVehiclesState(getVehicles());
    setTechniciansState(getTechnicians());
    setAppointmentsState(getAppointments());
    setSitesState(getSites());
  };

  // Get routes for selected date
  const todayRoutes = getRoutesByDate(selectedDate);

  // Get technician name
  const getTechnicianName = (technicianId) => {
    const tech = technicians.find(t => t.id === technicianId);
    return tech ? tech.name : 'Unassigned';
  };

  // Get vehicle info
  const getVehicleInfo = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.vehicleNumber} (${vehicle.make} ${vehicle.model})` : 'N/A';
  };

  // Get site name
  const getSiteName = (siteId) => {
    const site = sites.find(s => s.id === siteId);
    return site ? site.siteName : 'Unknown Site';
  };

  // Get appointment info
  const getAppointmentInfo = (appointmentId) => {
    const apt = appointments.find(a => a.id === appointmentId);
    if (!apt) {
      console.warn('Appointment not found:', appointmentId);
      return null;
    }

    const site = sites.find(s => s.id === apt.siteId);
    if (!site) {
      console.warn('Site not found for appointment:', apt.siteId);
      return null;
    }

    if (!site.coordinates) {
      console.warn('Site has no coordinates:', site);
      return null;
    }

    return {
      ...apt,
      site,
      siteId: apt.siteId,
      coordinates: site.coordinates
    };
  };

  // Generate route for technician
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

    // Add site coordinates to appointments
    console.log('Tech appointments:', techAppointments);
    console.log('Available sites:', sites);

    const appointmentsWithCoords = techAppointments.map(apt => {
      const site = sites.find(s => s.id === apt.siteId);
      console.log(`Appointment ${apt.id} - siteId: ${apt.siteId}, found site:`, site);

      if (!site) {
        console.error(`Site ${apt.siteId} not found for appointment ${apt.id}`);
        return {
          ...apt,
          siteCoordinates: vehicle.currentLocation,
          coordinates: vehicle.currentLocation
        };
      }

      if (!site.coordinates) {
        console.error(`Site ${apt.siteId} has no coordinates:`, site);
        return {
          ...apt,
          siteCoordinates: vehicle.currentLocation,
          coordinates: vehicle.currentLocation
        };
      }

      return {
        ...apt,
        siteCoordinates: site.coordinates,
        coordinates: site.coordinates
      };
    });

    console.log('Appointments with coords:', appointmentsWithCoords);

    // Generate optimized route
    const generatedRoute = generateRouteFromAppointments(
      appointmentsWithCoords,
      vehicle.currentLocation,
      routeStartTime
    );

    if (!generatedRoute) {
      alert('Failed to generate route');
      return;
    }

    // Save route
    const newRoute = {
      date: selectedDate,
      technicianId: techId,
      vehicleId: vehicle.id,
      status: 'Planned',
      startTime: generatedRoute.startTime,
      endTime: generatedRoute.endTime,
      totalDistance: generatedRoute.totalDistance,
      totalDuration: generatedRoute.totalDuration,
      optimizationScore: generatedRoute.optimizationScore,
      stops: generatedRoute.stops
    };

    addRoute(newRoute);
    loadData();
    setShowRouteGenerator(false);
    alert(`Route created successfully! ${generatedRoute.stops.length} stops, ${generatedRoute.totalDistance} miles`);
  };

  // View route on map
  const handleViewRoute = (route) => {
    console.log('Viewing route:', route);
    setSelectedRoute(route);

    // Scroll to map
    const mapElement = document.querySelector('.row.mb-4');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Optimize existing route
  const handleOptimizeRoute = (routeId) => {
    const route = routes.find(r => r.id === routeId);
    if (!route) return;

    const vehicle = vehicles.find(v => v.id === route.vehicleId);
    if (!vehicle) return;

    // Get stops with coordinates
    const stopsWithCoords = route.stops.map(stop => {
      const aptInfo = getAppointmentInfo(stop.appointmentId);
      return {
        ...stop,
        coordinates: aptInfo?.coordinates || vehicle.currentLocation
      };
    });

    // Re-optimize
    const optimized = optimizeRouteWithConstraints(
      stopsWithCoords,
      vehicle.currentLocation,
      route.startTime
    );

    updateRoute(routeId, { stops: optimized });
    loadData();
    alert('Route optimized successfully!');
  };

  // Get route polyline coordinates
  const getRoutePolyline = (route) => {
    if (!route) return [];

    const vehicle = vehicles.find(v => v.id === route.vehicleId);
    if (!vehicle) return [];

    const coords = [vehicle.currentLocation];

    route.stops.forEach(stop => {
      const aptInfo = getAppointmentInfo(stop.appointmentId);
      if (aptInfo?.coordinates) {
        coords.push([aptInfo.coordinates.lat, aptInfo.coordinates.lng]);
      }
    });

    // Add return to start
    coords.push(vehicle.currentLocation);

    return coords;
  };

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Routing & Fleet Management</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="/">Bugworx</a></li>
                <li className="breadcrumb-item active">Routing</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selector and Actions */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
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
                <div className="col-md-6 text-end">
                  <div className="mt-4">
                    <span className="badge badge-soft-primary me-2">
                      <i className="mdi mdi-map me-1"></i>
                      {todayRoutes.length} Routes
                    </span>
                    <span className="badge badge-soft-success me-2">
                      <i className="mdi mdi-car me-1"></i>
                      {vehicles.filter(v => v.status === 'Active').length} Active Vehicles
                    </span>
                    <span className="badge badge-soft-info">
                      <i className="mdi mdi-account me-1"></i>
                      {technicians.filter(t => t.isActive).length} Technicians
                    </span>
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
                    onClick={() => setSelectedRoute(null)}
                  >
                    <i className="mdi mdi-close me-1"></i>
                    Clear Selection
                  </button>
                )}
              </div>

              <MapContainer
                center={center}
                zoom={12}
                style={{ width: '100%', height: '500px' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Vehicle markers */}
                {vehicles.map((vehicle) => (
                  vehicle.currentLocation && (
                    <Marker
                      key={`vehicle-${vehicle.id}`}
                      position={[vehicle.currentLocation.lat, vehicle.currentLocation.lng]}
                      icon={createColoredIcon('#3b82f6')}
                    >
                      <Popup>
                        <strong>{vehicle.vehicleNumber}</strong><br />
                        {vehicle.make} {vehicle.model}<br />
                        Status: {vehicle.status}
                      </Popup>
                    </Marker>
                  )
                ))}

                {/* Selected route stops and polyline */}
                {selectedRoute && selectedRoute.stops && (() => {
                  console.log('Rendering selected route with', selectedRoute.stops.length, 'stops');
                  return (
                    <>
                      {selectedRoute.stops.map((stop, index) => {
                        const aptInfo = getAppointmentInfo(stop.appointmentId);
                        console.log(`Stop ${index}:`, stop, 'AptInfo:', aptInfo);
                        if (!aptInfo?.coordinates) {
                          console.warn(`Stop ${index} has no coordinates`);
                          return null;
                        }

                        return (
                          <Marker
                            key={`stop-${index}-${stop.appointmentId}`}
                            position={[aptInfo.coordinates.lat, aptInfo.coordinates.lng]}
                            icon={createColoredIcon(index === 0 ? '#10b981' : '#f59e0b')}
                          >
                            <Popup>
                              <strong>Stop #{stop.order}</strong><br />
                              {getSiteName(aptInfo.siteId)}<br />
                              ETA: {stop.estimatedArrival}<br />
                              Service: {aptInfo.serviceType}
                            </Popup>
                          </Marker>
                        );
                      })}
                      <Polyline
                        positions={getRoutePolyline(selectedRoute)}
                        color="#3b82f6"
                        weight={3}
                        opacity={0.7}
                      />
                    </>
                  );
                })()}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Routes and Fleet Tabs */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
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

              <div className="tab-content p-3">
                {/* Routes Tab */}
                {activeTab === 'routes' && (
                  <div className="tab-pane active">
                    <h5 className="font-size-16 mb-3">Routes for {new Date(selectedDate).toLocaleDateString()}</h5>
                    {todayRoutes.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="mdi mdi-map display-4 text-muted"></i>
                        <p className="text-muted mt-2">No routes for this date. Click "Generate Route" to create one.</p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Technician</th>
                              <th>Vehicle</th>
                              <th>Stops</th>
                              <th>Distance</th>
                              <th>Duration</th>
                              <th>Time</th>
                              <th>Score</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {todayRoutes.map((route) => (
                              <tr key={route.id}>
                                <td>{getTechnicianName(route.technicianId)}</td>
                                <td>
                                  <small>{getVehicleInfo(route.vehicleId)}</small>
                                </td>
                                <td>{route.stops.length}</td>
                                <td>{route.totalDistance} mi</td>
                                <td>{Math.floor(route.totalDuration / 60)}h {route.totalDuration % 60}m</td>
                                <td>
                                  <small>{route.startTime} - {route.endTime}</small>
                                </td>
                                <td>
                                  <span className={`badge ${
                                    route.optimizationScore >= 80 ? 'badge-soft-success' :
                                    route.optimizationScore >= 60 ? 'badge-soft-warning' :
                                    'badge-soft-danger'
                                  }`}>
                                    {route.optimizationScore}%
                                  </span>
                                </td>
                                <td>
                                  <span className={`badge ${
                                    route.status === 'Active' ? 'badge-soft-success' :
                                    route.status === 'Completed' ? 'badge-soft-primary' :
                                    'badge-soft-warning'
                                  }`}>
                                    {route.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-primary"
                                      onClick={() => handleViewRoute(route)}
                                      title="View on map"
                                    >
                                      <i className="mdi mdi-map-marker"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-success"
                                      onClick={() => handleOptimizeRoute(route.id)}
                                      title="Re-optimize"
                                    >
                                      <i className="mdi mdi-refresh"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Fleet Tab */}
                {activeTab === 'fleet' && (
                  <div className="tab-pane active">
                    <h5 className="font-size-16 mb-3">Fleet Overview</h5>
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Vehicle</th>
                            <th>Make/Model</th>
                            <th>License Plate</th>
                            <th>Assigned To</th>
                            <th>Mileage</th>
                            <th>Status</th>
                            <th>Next Maintenance</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicles.map((vehicle) => (
                            <tr key={vehicle.id}>
                              <td>
                                <strong>{vehicle.vehicleNumber}</strong>
                              </td>
                              <td>{vehicle.make} {vehicle.model} {vehicle.year}</td>
                              <td>{vehicle.licensePlate}</td>
                              <td>{getTechnicianName(vehicle.assignedTechnicianId)}</td>
                              <td>{vehicle.mileage.toLocaleString()} mi</td>
                              <td>
                                <span className={`badge ${
                                  vehicle.status === 'Active' ? 'badge-soft-success' :
                                  vehicle.status === 'Maintenance' ? 'badge-soft-warning' :
                                  'badge-soft-danger'
                                }`}>
                                  {vehicle.status}
                                </span>
                              </td>
                              <td>
                                <small>{vehicle.nextMaintenance}</small>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-soft-info"
                                  title="View details"
                                >
                                  <i className="mdi mdi-information"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Technicians Tab */}
                {activeTab === 'technicians' && (
                  <div className="tab-pane active">
                    <h5 className="font-size-16 mb-3">Active Technicians</h5>
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Vehicle</th>
                            <th>Phone</th>
                            <th>Rating</th>
                            <th>Completed Jobs</th>
                            <th>Zones</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {technicians.filter(t => t.isActive).map((tech) => {
                            const vehicle = vehicles.find(v => v.assignedTechnicianId === tech.id);
                            return (
                              <tr key={tech.id}>
                                <td><strong>{tech.name}</strong></td>
                                <td>{tech.specialization}</td>
                                <td>{vehicle ? vehicle.vehicleNumber : 'Not Assigned'}</td>
                                <td>{tech.phone}</td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <i className="mdi mdi-star text-warning me-1"></i>
                                    {tech.rating}/5.0
                                  </div>
                                </td>
                                <td>{tech.completedJobs}</td>
                                <td>
                                  <small>{tech.preferredZones?.join(', ')}</small>
                                </td>
                                <td>
                                  <span className="badge badge-soft-success">Active</span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
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
    </>
  );
};

export default Routing;
