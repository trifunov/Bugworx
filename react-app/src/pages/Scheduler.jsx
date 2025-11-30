import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  appointments as initialAppointments,
  serviceAddresses as initialServiceAddresses,
  technicians as initialTechnicians,
  customers as initialCustomers,
  priorities,
  appointmentStatuses,
  inventory as initialInventory,
  services,
  contracts
} from '../data/mockData';
import {
  initializeStorage,
  getAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getCustomers,
  getServiceAddresses,
  getTechnicians,
  isTechnicianAvailable,
  suggestTechnicians,
  getServiceTypes
} from '../utils/localStorage';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';

const Scheduler = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const calendarRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Data state from localStorage
  const [appointments, setAppointmentsState] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [serviceAddresses, setServiceAddresses] = useState([]);
  const [technicians, setTechniciansState] = useState([]);

  const serviceTypes = getServiceTypes();

  // Filter state
  const [filterTechnician, setFilterTechnician] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterServiceType, setFilterServiceType] = useState('all');

  // Technician suggestion state
  const [suggestedTechnicians, setSuggestedTechnicians] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Recurring appointment state
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringOptions, setRecurringOptions] = useState({
    frequency: 'weekly', // 'weekly', 'biweekly', 'monthly'
    occurrences: 4,
    endDate: ''
  });

  // Bulk operations state
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkTechnicianId, setBulkTechnicianId] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'

  // Appointment form state
  const [appointmentForm, setAppointmentForm] = useState({
    customerId: '',
    serviceAddressId: '',
    technicianId: '',
    scheduledDate: '',
    scheduledTime: '',
    serviceType: '',
    status: 'Scheduled',
    estimatedDuration: 60,
    priority: 'Normal',
    notes: ''
  });

  // Initialize localStorage on mount
  useEffect(() => {
    initializeStorage({
      appointments: initialAppointments,
      customers: initialCustomers,
      serviceAddresses: initialServiceAddresses,
      technicians: initialTechnicians,
      inventory: initialInventory,
      services: services,
      contracts: contracts
    });
    loadData();
    setPageSubHeader({
      title: 'Scheduler & Calendar',
      breadcrumbs: [
        { label: 'Scheduler & Calendar', path: '/scheduler' }
      ]
    });
  }, [setPageSubHeader]);

  // Load data from localStorage
  const loadData = () => {
    setAppointmentsState(getAppointments());
    setCustomers(getCustomers());
    setServiceAddresses(getServiceAddresses());
    setTechniciansState(getTechnicians());
  };

  // Handle modal animations with Bootstrap
  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  // Helper functions
  const getServiceAddressName = (serviceAddressId) => {
    const serviceAddress = serviceAddresses.find(s => s.id === serviceAddressId);
    return serviceAddress ? serviceAddress.serviceAddressName : 'N/A';
  };

  const getCustomerName = (serviceAddressId) => {
    const serviceAddress = serviceAddresses.find(s => s.id === serviceAddressId);
    if (!serviceAddress) return 'N/A';
    const customer = customers.find(a => a.id === serviceAddress.customerId);
    return customer ? customer.name : 'N/A';
  };

  const getTechnicianName = (technicianId) => {
    if (!technicianId) return 'Unassigned';
    const tech = technicians.find(t => t.id === technicianId);
    return tech ? tech.name : 'N/A';
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    if (filterTechnician !== 'all' && apt.technicianId !== parseInt(filterTechnician)) return false;
    if (filterStatus !== 'all' && apt.status !== filterStatus) return false;
    if (filterServiceType !== 'all' && apt.serviceType !== filterServiceType) return false;
    return true;
  });

  // Convert appointments to calendar events with color coding
  const calendarEvents = filteredAppointments.map(apt => {
    let className = 'bg-primary';
    if (apt.status === 'Completed') className = 'bg-success';
    else if (apt.status === 'Cancelled') className = 'bg-danger';
    else if (apt.status === 'In Progress') className = 'bg-warning';
    else if (apt.priority === 'Emergency') className = 'bg-danger';
    else if (apt.priority === 'Urgent') className = 'bg-warning';

    const calculateEndTime = (startDate, startTime, durationMinutes) => {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      startDateTime.setMinutes(startDateTime.getMinutes() + durationMinutes);
      return startDateTime.toISOString().slice(0, 16);
    };

    const endTime = calculateEndTime(apt.scheduledDate, apt.scheduledTime, apt.estimatedDuration || 60);

    return {
      id: apt.id,
      title: `${getCustomerName(apt.serviceAddressId)} - ${apt.serviceType}`,
      start: `${apt.scheduledDate}T${apt.scheduledTime}`,
      end: endTime,
      className: className,
      extendedProps: {
        appointment: apt,
        technician: getTechnicianName(apt.technicianId),
        serviceAddress: getServiceAddressName(apt.serviceAddressId),
        duration: apt.estimatedDuration,
        priority: apt.priority
      }
    };
  });

  // Get service addresses for selected customer
  const availableSites = appointmentForm.customerId
    ? serviceAddresses.filter(s => s.customerId === parseInt(appointmentForm.customerId))
    : [];

  // Modal handlers
  const openCreateModal = (dateInfo = null) => {
    setModalMode('create');
    setSelectedAppointment(null);
    setAppointmentForm({
      customerId: '',
      serviceAddressId: '',
      technicianId: '',
      scheduledDate: dateInfo ? dateInfo.dateStr : '',
      scheduledTime: dateInfo ? '09:00' : '',
      serviceType: '',
      status: 'Scheduled',
      estimatedDuration: 60,
      priority: 'Normal',
      notes: ''
    });
    setShowModal(true);
  };

  const openEditModal = (appointment) => {
    setModalMode('edit');
    setSelectedAppointment(appointment);
    const serviceAddress = serviceAddresses.find(s => s.id === appointment.serviceAddressId);
    setAppointmentForm({
      customerId: serviceAddress ? serviceAddress.customerId : '',
      serviceAddressId: appointment.serviceAddressId,
      technicianId: appointment.technicianId || '',
      scheduledDate: appointment.scheduledDate,
      scheduledTime: appointment.scheduledTime,
      serviceType: appointment.serviceType,
      status: appointment.status,
      estimatedDuration: appointment.estimatedDuration,
      priority: appointment.priority,
      notes: appointment.notes || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setSuggestedTechnicians([]);
    setShowSuggestions(false);
    setIsRecurring(false);
    setRecurringOptions({
      frequency: 'weekly',
      occurrences: 4,
      endDate: ''
    });
    setAppointmentForm({
      customerId: '',
      serviceAddressId: '',
      technicianId: '',
      scheduledDate: '',
      scheduledTime: '',
      serviceType: '',
      status: 'Scheduled',
      estimatedDuration: 60,
      priority: 'Normal',
      notes: ''
    });
  };

  // Handle technician suggestion request
  const handleSuggestTechnicians = () => {
    if (!appointmentForm.serviceType) {
      alert('Please select a service type first');
      return;
    }
    if (!appointmentForm.serviceAddressId) {
      alert('Please select a service address first');
      return;
    }
    if (!appointmentForm.scheduledDate) {
      alert('Please select a date first');
      return;
    }
    if (!appointmentForm.scheduledTime) {
      alert('Please select a time first');
      return;
    }

    const suggestions = suggestTechnicians(
      appointmentForm.serviceType,
      parseInt(appointmentForm.serviceAddressId),
      appointmentForm.scheduledDate,
      appointmentForm.scheduledTime,
      appointmentForm.estimatedDuration
    );

    setSuggestedTechnicians(suggestions);
    setShowSuggestions(true);
  };

  // Select a suggested technician
  const handleSelectSuggestedTechnician = (technicianId) => {
    handleFormChange('technicianId', technicianId);
    setShowSuggestions(false);
  };

  // Calculate recurring appointment dates
  const calculateRecurringDates = (startDate, frequency, occurrences) => {
    const dates = [];
    const start = new Date(startDate);

    for (let i = 0; i < occurrences; i++) {
      const newDate = new Date(start);

      if (frequency === 'weekly') {
        newDate.setDate(start.getDate() + (i * 7));
      } else if (frequency === 'biweekly') {
        newDate.setDate(start.getDate() + (i * 14));
      } else if (frequency === 'monthly') {
        newDate.setMonth(start.getMonth() + i);
      }

      dates.push(newDate.toISOString().split('T')[0]);
    }

    return dates;
  };

  // Bulk operations handlers
  const toggleAppointmentSelection = (appointmentId) => {
    setSelectedAppointments(prev => {
      if (prev.includes(appointmentId)) {
        return prev.filter(id => id !== appointmentId);
      } else {
        return [...prev, appointmentId];
      }
    });
  };

  const selectAllAppointments = () => {
    const scheduledAppointments = filteredAppointments
      .filter(apt => apt.status === 'Scheduled')
      .map(apt => apt.id);
    setSelectedAppointments(scheduledAppointments);
  };

  const clearSelection = () => {
    setSelectedAppointments([]);
    setBulkAction('');
    setBulkTechnicianId('');
    setBulkStatus('');
  };

  const handleBulkAction = () => {
    if (selectedAppointments.length === 0) {
      alert('Please select at least one appointment');
      return;
    }

    if (bulkAction === 'assign' && !bulkTechnicianId) {
      alert('Please select a technician');
      return;
    }

    if (bulkAction === 'status' && !bulkStatus) {
      alert('Please select a status');
      return;
    }

    let successCount = 0;
    let failCount = 0;

    selectedAppointments.forEach(aptId => {
      const appointment = appointments.find(a => a.id === aptId);
      if (!appointment) return;

      try {
        if (bulkAction === 'assign') {
          // Check availability before assigning
          const isAvailable = isTechnicianAvailable(
            parseInt(bulkTechnicianId),
            appointment.scheduledDate,
            appointment.scheduledTime,
            appointment.estimatedDuration,
            appointment.id
          );

          if (isAvailable) {
            updateAppointment(aptId, { technicianId: parseInt(bulkTechnicianId) });
            successCount++;
          } else {
            failCount++;
          }
        } else if (bulkAction === 'status') {
          updateAppointment(aptId, { status: bulkStatus });
          successCount++;
        } else if (bulkAction === 'delete') {
          deleteAppointment(aptId);
          successCount++;
        }
      } catch {
        failCount++;
      }
    });

    loadData();

    let message = `Successfully updated ${successCount} appointment(s).`;
    if (failCount > 0) {
      message += ` ${failCount} appointment(s) could not be updated (conflicts or errors).`;
    }

    alert(message);
    clearSelection();
  };

  // Event handlers
  const handleDateClick = (arg) => {
    openCreateModal(arg);
  };

  const handleEventClick = (clickInfo) => {
    const appointment = clickInfo.event.extendedProps.appointment;
    openEditModal(appointment);
  };

  const handleEventDrop = (info) => {
    const appointment = info.event.extendedProps.appointment;
    const newDate = info.event.startStr.split('T')[0];
    const newTime = info.event.startStr.split('T')[1] || appointment.scheduledTime;

    // Check technician availability
    if (appointment.technicianId && !isTechnicianAvailable(
      appointment.technicianId,
      newDate,
      newTime.substring(0, 5),
      appointment.estimatedDuration,
      appointment.id
    )) {
      alert('Technician is not available at this time. Please choose a different time slot.');
      info.revert();
      return;
    }

    updateAppointment(appointment.id, {
      scheduledDate: newDate,
      scheduledTime: newTime.substring(0, 5)
    });
    loadData();
  };

  const handleFormChange = (field, value) => {
    setAppointmentForm(prev => {
      const updated = { ...prev, [field]: value };

      // Reset serviceAddressId when customerId changes
      if (field === 'customerId') {
        updated.serviceAddressId = '';
      }

      return updated;
    });
  };

  const validateForm = () => {
    if (!appointmentForm.customerId) {
      alert('Please select a customer');
      return false;
    }
    if (!appointmentForm.serviceAddressId) {
      alert('Please select a service address');
      return false;
    }
    if (!appointmentForm.serviceType) {
      alert('Please select a service type');
      return false;
    }
    if (!appointmentForm.scheduledDate) {
      alert('Please select a date');
      return false;
    }
    if (!appointmentForm.scheduledTime) {
      alert('Please select a time');
      return false;
    }

    // Check technician availability
    if (appointmentForm.technicianId) {
      const isAvailable = isTechnicianAvailable(
        parseInt(appointmentForm.technicianId),
        appointmentForm.scheduledDate,
        appointmentForm.scheduledTime,
        appointmentForm.estimatedDuration,
        selectedAppointment?.id
      );

      if (!isAvailable) {
        alert('Selected technician is not available at this time. Please choose a different time or technician.');
        return false;
      }
    }

    return true;
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const appointmentData = {
      serviceAddressId: parseInt(appointmentForm.serviceAddressId),
      technicianId: appointmentForm.technicianId ? parseInt(appointmentForm.technicianId) : null,
      scheduledDate: appointmentForm.scheduledDate,
      scheduledTime: appointmentForm.scheduledTime,
      serviceType: appointmentForm.serviceType,
      status: appointmentForm.status,
      estimatedDuration: parseInt(appointmentForm.estimatedDuration),
      actualDuration: null,
      priority: appointmentForm.priority,
      notes: appointmentForm.notes
    };

    if (modalMode === 'create') {
      if (isRecurring) {
        // Create multiple recurring appointments
        const dates = calculateRecurringDates(
          appointmentForm.scheduledDate,
          recurringOptions.frequency,
          recurringOptions.occurrences
        );

        let successCount = 0;
        let conflictDates = [];

        dates.forEach((date, index) => {
          // Check for conflicts if technician is assigned
          if (appointmentData.technicianId) {
            const isAvailable = isTechnicianAvailable(
              appointmentData.technicianId,
              date,
              appointmentForm.scheduledTime,
              appointmentForm.estimatedDuration
            );

            if (!isAvailable) {
              conflictDates.push(date);
              return; // Skip this date
            }
          }

          const recurringAppointment = {
            ...appointmentData,
            scheduledDate: date,
            notes: `${appointmentData.notes}${appointmentData.notes ? '\n' : ''}[Recurring ${recurringOptions.frequency} - ${index + 1}/${dates.length}]`
          };

          addAppointment(recurringAppointment);
          successCount++;
        });

        if (conflictDates.length > 0) {
          alert(`Created ${successCount} appointments. Skipped ${conflictDates.length} dates due to technician conflicts:\n${conflictDates.join(', ')}`);
        } else {
          alert(`Successfully created ${successCount} recurring appointments!`);
        }
      } else {
        // Create single appointment
        addAppointment(appointmentData);
      }
    } else {
      updateAppointment(selectedAppointment.id, appointmentData);
    }

    loadData();
    closeModal();
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment && confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(selectedAppointment.id);
      loadData();
      closeModal();
    }
  };

  // Calculate stats for sidebar
  const unassignedAppointments = appointments.filter(apt => !apt.technicianId && apt.status === 'Scheduled');
  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.scheduledDate === today;
  });

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('calendar')}
                >
                  <i className="bx bx-calendar me-1"></i>Calendar
                </button>
                <button
                  type="button"
                  className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setViewMode('list')}
                >
                  <i className="bx bx-list-ul me-1"></i>List View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <label className="form-label mb-1">Filter by Technician</label>
                  <select
                    className="form-select"
                    value={filterTechnician}
                    onChange={(e) => setFilterTechnician(e.target.value)}
                  >
                    <option value="all">All Technicians</option>
                    {technicians.map(tech => (
                      <option key={tech.id} value={tech.id}>{tech.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label mb-1">Filter by Status</label>
                  <select
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    {appointmentStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label mb-1">Filter by Service Type</label>
                  <select
                    className="form-select"
                    value={filterServiceType}
                    onChange={(e) => setFilterServiceType(e.target.value)}
                  >
                    <option value="all">All Service Types</option>
                    {serviceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 d-flex align-items-end">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setFilterTechnician('all');
                      setFilterStatus('all');
                      setFilterServiceType('all');
                    }}
                  >
                    <i className="bx bx-refresh me-1"></i>
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="row mb-4">
          <div className="col-xl-3">
          <div className="card h-100">
            <div className="card-body">
              <button
                type="button"
                className="btn font-16 btn-primary waves-effect waves-light w-100"
                onClick={() => openCreateModal()}
              >
                <i className="bx bx-plus me-1"></i>
                Create New Appointment
              </button>

              <div className="mt-4">
                <h5 className="font-size-14 mb-3">Quick Stats</h5>
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <td><i className="mdi mdi-calendar-today text-primary me-2"></i>Today's Appointments</td>
                        <td className="text-end"><span className="badge badge-soft-primary">{todayAppointments.length}</span></td>
                      </tr>
                      <tr>
                        <td><i className="mdi mdi-account-alert text-warning me-2"></i>Unassigned</td>
                        <td className="text-end"><span className="badge badge-soft-warning">{unassignedAppointments.length}</span></td>
                      </tr>
                      <tr>
                        <td><i className="mdi mdi-check-circle text-success me-2"></i>Completed This Week</td>
                        <td className="text-end"><span className="badge badge-soft-success">{appointments.filter(a => a.status === 'Completed').length}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {unassignedAppointments.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-size-14 mb-3">Unassigned Appointments</h5>
                  <div className="list-group">
                    {unassignedAppointments.slice(0, 5).map(apt => (
                      <div
                        key={apt.id}
                        className="list-group-item list-group-item-action"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openEditModal(apt)}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="avatar-xs">
                              <span className="avatar-title rounded-circle bg-warning text-white">
                                <i className="bx bx-calendar-exclamation"></i>
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 font-size-12">{getCustomerName(apt.serviceAddressId)}</h6>
                            <p className="text-muted mb-0 font-size-11">{apt.scheduledDate} {apt.scheduledTime}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <h5 className="font-size-14 mb-3">Legend</h5>
                <div className="mb-2">
                  <span className="badge badge-soft-primary me-2">■</span>
                  <span className="text-muted font-size-12">Scheduled</span>
                </div>
                <div className="mb-2">
                  <span className="badge badge-soft-warning me-2">■</span>
                  <span className="text-muted font-size-12">In Progress / Urgent</span>
                </div>
                <div className="mb-2">
                  <span className="badge badge-soft-success me-2">■</span>
                  <span className="text-muted font-size-12">Completed</span>
                </div>
                <div className="mb-2">
                  <span className="badge badge-soft-danger me-2">■</span>
                  <span className="text-muted font-size-12">Cancelled / Emergency</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-9">
          <div className="card mb-0">
            <div className="card-body">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={calendarEvents}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                editable={true}
                droppable={false}
                selectable={true}
                height="auto"
              />
            </div>
          </div>
        </div>
      </div>
      )}

      {/* List View with Bulk Operations */}
      {viewMode === 'list' && (
        <div className="row mb-4">
          <div className="col-12">
            {/* Bulk Actions Toolbar */}
            {selectedAppointments.length > 0 && (
              <div className="card border-primary mb-3">
                <div className="card-body p-3">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <div className="text-primary fw-medium">
                        <i className="bx bx-check-square me-2"></i>
                        {selectedAppointments.length} selected
                      </div>
                    </div>
                    <div className="col-md-2">
                      <select
                        className="form-select form-select-sm"
                        value={bulkAction}
                        onChange={(e) => setBulkAction(e.target.value)}
                      >
                        <option value="">Select Action...</option>
                        <option value="assign">Assign Technician</option>
                        <option value="status">Change Status</option>
                        <option value="delete">Delete</option>
                      </select>
                    </div>
                    {bulkAction === 'assign' && (
                      <div className="col-md-3">
                        <select
                          className="form-select form-select-sm"
                          value={bulkTechnicianId}
                          onChange={(e) => setBulkTechnicianId(e.target.value)}
                        >
                          <option value="">Select Technician...</option>
                          {technicians.filter(t => t.isActive).map(tech => (
                            <option key={tech.id} value={tech.id}>{tech.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    {bulkAction === 'status' && (
                      <div className="col-md-3">
                        <select
                          className="form-select form-select-sm"
                          value={bulkStatus}
                          onChange={(e) => setBulkStatus(e.target.value)}
                        >
                          <option value="">Select Status...</option>
                          {appointmentStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="col-md">
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={handleBulkAction}
                          disabled={!bulkAction}
                        >
                          <i className="bx bx-check me-1"></i>
                          Apply
                        </button>
                        <button
                          className="btn btn-light btn-sm"
                          onClick={clearSelection}
                        >
                          <i className="bx bx-x me-1"></i>
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments List */}
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Appointments List</h5>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={selectAllAppointments}
                  >
                    <i className="bx bx-check-double me-1"></i>
                    Select All Scheduled
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openCreateModal()}
                  >
                    <i className="bx bx-plus me-1"></i>
                    New Appointment
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '40px' }}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedAppointments.length === filteredAppointments.filter(a => a.status === 'Scheduled').length && filteredAppointments.filter(a => a.status === 'Scheduled').length > 0}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  selectAllAppointments();
                                } else {
                                  clearSelection();
                                }
                              }}
                            />
                          </div>
                        </th>
                        <th>Date & Time</th>
                        <th>Customer</th>
                        <th>Service Address</th>
                        <th>Service Type</th>
                        <th>Technician</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center py-4 text-muted">
                            No appointments found
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map(apt => (
                          <tr key={apt.id}>
                            <td>
                              {apt.status === 'Scheduled' && (
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedAppointments.includes(apt.id)}
                                    onChange={() => toggleAppointmentSelection(apt.id)}
                                  />
                                </div>
                              )}
                            </td>
                            <td>
                              <div className="fw-medium">{new Date(apt.scheduledDate).toLocaleDateString()}</div>
                              <small className="text-muted">{apt.scheduledTime} ({apt.estimatedDuration} min)</small>
                            </td>
                            <td>{getCustomerName(apt.serviceAddressId)}</td>
                            <td>{getServiceAddressName(apt.serviceAddressId)}</td>
                            <td>
                              <span className="badge badge-soft-info">{apt.serviceType}</span>
                            </td>
                            <td>{getTechnicianName(apt.technicianId)}</td>
                            <td>
                              <span className={`badge ${
                                apt.status === 'Completed' ? 'badge-soft-success' :
                                apt.status === 'In Progress' ? 'badge-soft-warning' :
                                apt.status === 'Cancelled' ? 'badge-soft-danger' :
                                'badge-soft-primary'
                              }`}>
                                {apt.status}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${
                                apt.priority === 'Emergency' ? 'badge-soft-danger' :
                                apt.priority === 'Urgent' ? 'badge-soft-warning' :
                                'badge-soft-secondary'
                              }`}>
                                {apt.priority}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-soft-primary"
                                onClick={() => openEditModal(apt)}
                                title="Edit appointment"
                              >
                                <i className="bx bx-edit"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden={!showModal}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header py-3 px-4">
              <h5 className="modal-title">
                {modalMode === 'create' ? 'Create New Appointment' : 'Edit Appointment'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body p-4">
              <form onSubmit={handleSaveAppointment}>
                <div className="row">
                  {/* Customer Selection */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Customer <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={appointmentForm.customerId}
                      onChange={(e) => handleFormChange('customerId', e.target.value)}
                      required
                    >
                      <option value="">Select Customer...</option>
                      {customers.map(cust => (
                        <option key={cust.id} value={cust.id}>{cust.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Site Selection */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Service Address <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={appointmentForm.serviceAddressId}
                      onChange={(e) => handleFormChange('serviceAddressId', e.target.value)}
                      required
                      disabled={!appointmentForm.customerId}
                    >
                      <option value="">Select Service Address...</option>
                      {availableSites.map(serviceAddress => (
                        <option key={serviceAddress.id} value={serviceAddress.id}>{serviceAddress.serviceAddressName}</option>
                      ))}
                    </select>
                    {!appointmentForm.customerId && (
                      <small className="text-muted">Please select a customer first</small>
                    )}
                  </div>

                  {/* Service Type */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Service Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      value={appointmentForm.serviceType}
                      onChange={(e) => handleFormChange('serviceType', e.target.value)}
                      required
                    >
                      <option value="">Select Service...</option>
                      {serviceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Technician */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Technician</label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        value={appointmentForm.technicianId}
                        onChange={(e) => handleFormChange('technicianId', e.target.value)}
                      >
                        <option value="">Unassigned</option>
                        {technicians.filter(t => t.isActive).map(tech => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name} - {tech.specialization}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleSuggestTechnicians}
                        title="Suggest best technician based on expertise, location, and availability"
                      >
                        <i className="bx bx-bulb"></i> Suggest
                      </button>
                    </div>
                  </div>

                  {/* Technician Suggestions Panel */}
                  {showSuggestions && (
                    <div className="col-12 mb-3">
                      <div className="card border-primary">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                          <span><i className="bx bx-bulb me-2"></i>Suggested Technicians</span>
                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowSuggestions(false)}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="card-body p-2">
                          {suggestedTechnicians.length === 0 ? (
                            <div className="alert alert-warning mb-0">
                              <i className="bx bx-info-circle me-2"></i>
                              No available technicians found for the selected criteria.
                            </div>
                          ) : (
                            <div className="list-group list-group-flush">
                              {suggestedTechnicians.map((tech, index) => (
                                <div
                                  key={tech.id}
                                  className={`list-group-item list-group-item-action ${index === 0 ? 'border-success border-2' : ''}`}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleSelectSuggestedTechnician(tech.id)}
                                >
                                  <div className="d-flex align-items-start">
                                    <div className="flex-shrink-0">
                                      <div className={`avatar-sm ${index === 0 ? 'bg-success' : 'bg-soft-primary'} rounded-circle d-flex align-items-center justify-content-center`}>
                                        <span className={`${index === 0 ? 'text-white' : 'text-primary'} font-size-16 fw-bold`}>
                                          #{index + 1}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                      <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                          <h6 className="mb-1 font-size-14">
                                            {tech.name}
                                            {index === 0 && <span className="badge badge-soft-success ms-2">Best Match</span>}
                                          </h6>
                                          <p className="text-muted mb-1 font-size-12">
                                            <i className="bx bx-briefcase me-1"></i>{tech.specialization}
                                            <span className="mx-2">•</span>
                                            <i className="bx bx-star me-1"></i>{tech.rating}/5.0
                                          </p>
                                        </div>
                                        <div className="text-end">
                                          <div className="badge badge-soft-primary font-size-12">
                                            Score: {tech.score}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-2">
                                        <small className="text-muted d-block mb-1"><strong>Why this technician:</strong></small>
                                        <ul className="list-unstyled mb-0">
                                          {tech.reasons.map((reason, idx) => (
                                            <li key={idx} className="font-size-11 text-muted mb-1">
                                              <i className={`bx ${reason.includes('NOT AVAILABLE') ? 'bx-x-circle text-danger' : 'bx-check-circle text-success'} me-1`}></i>
                                              {reason}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="text-muted font-size-11 mt-2 px-2">
                            <i className="bx bx-info-circle me-1"></i>
                            Click on a technician to select them for this appointment.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Date */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date <span className="text-danger">*</span></label>
                    <input
                      type="date"
                      className="form-control"
                      value={appointmentForm.scheduledDate}
                      onChange={(e) => handleFormChange('scheduledDate', e.target.value)}
                      required
                    />
                  </div>

                  {/* Time */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Time <span className="text-danger">*</span></label>
                    <input
                      type="time"
                      className="form-control"
                      value={appointmentForm.scheduledTime}
                      onChange={(e) => handleFormChange('scheduledTime', e.target.value)}
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Duration (minutes)</label>
                    <select
                      className="form-select"
                      value={appointmentForm.estimatedDuration}
                      onChange={(e) => handleFormChange('estimatedDuration', e.target.value)}
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                      <option value="180">3 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={appointmentForm.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                    >
                      {appointmentStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={appointmentForm.priority}
                      onChange={(e) => handleFormChange('priority', e.target.value)}
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Notes / Instructions</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={appointmentForm.notes}
                      onChange={(e) => handleFormChange('notes', e.target.value)}
                      placeholder="Enter any special instructions or notes..."
                    ></textarea>
                  </div>

                  {/* Recurring Appointment Section */}
                  {modalMode === 'create' && (
                    <div className="col-12">
                      <div className="card bg-light border-0 mb-3">
                        <div className="card-body p-3">
                          <div className="form-check form-switch mb-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="recurringSwitch"
                              checked={isRecurring}
                              onChange={(e) => setIsRecurring(e.target.checked)}
                            />
                            <label className="form-check-label fw-medium" htmlFor="recurringSwitch">
                              <i className="bx bx-repeat me-2"></i>
                              Create Recurring Appointments
                            </label>
                          </div>

                          {isRecurring && (
                            <div className="row">
                              <div className="col-md-4 mb-2">
                                <label className="form-label font-size-12 mb-1">Frequency</label>
                                <select
                                  className="form-select form-select-sm"
                                  value={recurringOptions.frequency}
                                  onChange={(e) => setRecurringOptions({ ...recurringOptions, frequency: e.target.value })}
                                >
                                  <option value="weekly">Weekly</option>
                                  <option value="biweekly">Bi-weekly (Every 2 weeks)</option>
                                  <option value="monthly">Monthly</option>
                                </select>
                              </div>
                              <div className="col-md-4 mb-2">
                                <label className="form-label font-size-12 mb-1">Number of Occurrences</label>
                                <input
                                  type="number"
                                  className="form-control form-control-sm"
                                  min="2"
                                  max="52"
                                  value={recurringOptions.occurrences}
                                  onChange={(e) => setRecurringOptions({ ...recurringOptions, occurrences: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="col-md-4 mb-2">
                                <label className="form-label font-size-12 mb-1">Preview</label>
                                <div className="bg-white border rounded p-2 font-size-11">
                                  {appointmentForm.scheduledDate ? (
                                    <>
                                      <i className="bx bx-calendar me-1 text-primary"></i>
                                      {recurringOptions.occurrences} appointments
                                      <div className="text-muted mt-1">
                                        {new Date(appointmentForm.scheduledDate).toLocaleDateString()} - {
                                          calculateRecurringDates(
                                            appointmentForm.scheduledDate,
                                            recurringOptions.frequency,
                                            recurringOptions.occurrences
                                          )[recurringOptions.occurrences - 1] &&
                                          new Date(
                                            calculateRecurringDates(
                                              appointmentForm.scheduledDate,
                                              recurringOptions.frequency,
                                              recurringOptions.occurrences
                                            )[recurringOptions.occurrences - 1]
                                          ).toLocaleDateString()
                                        }
                                      </div>
                                    </>
                                  ) : (
                                    <span className="text-muted">Select a date first</span>
                                  )}
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="alert alert-info mb-0 py-2 font-size-11">
                                  <i className="bx bx-info-circle me-1"></i>
                                  This will create {recurringOptions.occurrences} appointments {recurringOptions.frequency} starting from the selected date.
                                  {appointmentForm.technicianId && ' Dates with technician conflicts will be skipped.'}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="row mt-2">
                  <div className="col-6">
                    {modalMode === 'edit' && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeleteAppointment}
                      >
                        <i className="bx bx-trash me-1"></i>
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="col-6 text-end">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      <i className="bx bx-check me-1"></i>
                      {modalMode === 'create' ? 'Create Appointment' : 'Update Appointment'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Scheduler;
