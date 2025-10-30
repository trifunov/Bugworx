import { useState, useEffect } from 'react';
import {
  getAppointments,
  getInventory,
  getCustomers,
  getServiceAddresses,
  getTechnicians
} from '../utils/localStorage';

const Reports = () => {
  const [appointments, setAppointments] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [serviceAddresses, setServiceAddresses] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  // Modal state
  const [activeReport, setActiveReport] = useState(null);
  const [reportData, setReportData] = useState([]);

  // Filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Load data on mount
  useEffect(() => {
    loadData();

    // Set default date range (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
  }, []);

  const loadData = () => {
    setAppointments(getAppointments());
    setInventory(getInventory());
    setCustomers(getCustomers());
    setServiceAddresses(getServiceAddresses());
    setTechnicians(getTechnicians());
  };

  // Generate Completed Services Report
  const generateCompletedServicesReport = () => {
    const completed = appointments.filter(apt => {
      const aptDate = new Date(apt.scheduledDate);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return apt.status === 'Completed' &&
             aptDate >= start &&
             aptDate <= end;
    });

    const reportData = completed.map(apt => {
      const serviceAddress = serviceAddresses.find(s => s.id === apt.siteId);
      const customer = customers.find(c => c.id === serviceAddress?.customerId);
      const tech = technicians.find(t => t.id === apt.technicianId);

      return {
        id: apt.id,
        date: apt.scheduledDate,
        time: apt.scheduledTime,
        account: customer?.companyName || 'Unknown',
        site: serviceAddress?.serviceAddressName || 'Unknown',
        serviceType: apt.serviceType,
        technician: tech?.name || 'Unassigned',
        duration: apt.estimatedDuration,
        status: apt.status
      };
    });

    setReportData(reportData);
    setActiveReport('completed-services');
  };

  // Generate Upcoming Services Report
  const generateUpcomingServicesReport = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = appointments.filter(apt => {
      const aptDate = new Date(apt.scheduledDate);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return (apt.status === 'Scheduled' || apt.status === 'Confirmed') &&
             aptDate >= today &&
             aptDate >= start &&
             aptDate <= end;
    });

    const reportData = upcoming.map(apt => {
      const serviceAddress = serviceAddresses.find(s => s.id === apt.siteId);
      const customer = customers.find(c => c.id === serviceAddress?.customerId);
      const tech = technicians.find(t => t.id === apt.technicianId);

      return {
        id: apt.id,
        date: apt.scheduledDate,
        time: apt.scheduledTime,
        account: customer?.companyName || 'Unknown',
        site: serviceAddress?.serviceAddressName || 'Unknown',
        serviceType: apt.serviceType,
        technician: tech?.name || 'Unassigned',
        priority: apt.priority,
        status: apt.status
      };
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    setReportData(reportData);
    setActiveReport('upcoming-services');
  };

  // Generate Chemical Usage Report
  const generateChemicalUsageReport = () => {
    const chemicals = inventory.filter(item =>
      item.category === 'Chemical' ||
      item.category === 'Pesticide' ||
      item.category === 'Herbicide'
    );

    const reportData = chemicals.map(item => ({
      id: item.id,
      name: item.productName,
      category: item.category,
      activeIngredient: item.activeIngredient || 'N/A',
      epaNumber: item.epaNumber || 'N/A',
      quantity: item.quantity,
      unit: item.unit,
      stockLevel: item.quantity,
      reorderLevel: item.reorderLevel,
      status: item.quantity <= item.reorderLevel ? 'Low Stock' : 'Adequate',
      lastRestocked: item.lastRestocked || 'N/A',
      expiryDate: item.expiryDate || 'N/A'
    }));

    setReportData(reportData);
    setActiveReport('chemical-usage');
  };

  // Generate Bait Station Inspection Report
  const generateBaitStationReport = () => {
    // Generate mock bait station data based on sites
    const baitStations = [];

    serviceAddresses.forEach(serviceAddress => {
      const customer = customers.find(c => c.id === serviceAddress.customerId);
      // Assume 3-5 bait stations per service address
      const numStations = Math.floor(Math.random() * 3) + 3;

      for (let i = 1; i <= numStations; i++) {
        const lastInspection = new Date();
        lastInspection.setDate(lastInspection.getDate() - Math.floor(Math.random() * 60));

        const nextInspection = new Date(lastInspection);
        nextInspection.setDate(nextInspection.getDate() + 30);

        const conditions = ['Good', 'Fair', 'Needs Replacement'];
        const baitLevels = ['Full', '75%', '50%', '25%', 'Empty'];
        const activities = ['No Activity', 'Low Activity', 'Moderate Activity', 'High Activity'];

        baitStations.push({
          id: `BS-${serviceAddress.id}-${i}`,
          stationNumber: `BS-${String(i).padStart(3, '0')}`,
          site: serviceAddress.serviceAddressName,
          account: customer?.companyName || 'Unknown',
          location: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
          lastInspection: lastInspection.toISOString().split('T')[0],
          nextInspection: nextInspection.toISOString().split('T')[0],
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          baitLevel: baitLevels[Math.floor(Math.random() * baitLevels.length)],
          activity: activities[Math.floor(Math.random() * activities.length)],
          status: Math.random() > 0.1 ? 'Active' : 'Needs Service'
        });
      }
    });

    setReportData(baitStations);
    setActiveReport('bait-station');
  };

  // Generate Inventory Management Report
  const generateInventoryReport = () => {
    const reportData = inventory.map(item => ({
      id: item.id,
      productName: item.productName,
      category: item.category,
      sku: item.sku,
      quantity: item.quantity,
      unit: item.unit,
      reorderLevel: item.reorderLevel,
      unitCost: item.unitCost,
      totalValue: (item.quantity * item.unitCost).toFixed(2),
      supplier: item.supplier,
      lastRestocked: item.lastRestocked || 'N/A',
      status: item.quantity <= item.reorderLevel ? 'Low Stock' :
              item.quantity <= item.reorderLevel * 1.5 ? 'Moderate' : 'Good'
    }));

    setReportData(reportData);
    setActiveReport('inventory');
  };

  // Generate Low Stock Alert Report
  const generateLowStockReport = () => {
    const lowStock = inventory.filter(item =>
      item.quantity <= item.reorderLevel
    );

    const reportData = lowStock.map(item => ({
      id: item.id,
      productName: item.productName,
      category: item.category,
      currentStock: item.quantity,
      reorderLevel: item.reorderLevel,
      unit: item.unit,
      shortage: item.reorderLevel - item.quantity,
      unitCost: item.unitCost,
      reorderCost: ((item.reorderLevel * 2 - item.quantity) * item.unitCost).toFixed(2),
      supplier: item.supplier,
      priority: item.quantity === 0 ? 'Critical' :
                item.quantity < item.reorderLevel * 0.5 ? 'High' : 'Medium'
    })).sort((a, b) => a.currentStock - b.currentStock);

    setReportData(reportData);
    setActiveReport('low-stock');
  };

  // Close modal
  const closeModal = () => {
    setActiveReport(null);
    setReportData([]);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (reportData.length === 0) return;

    const headers = Object.keys(reportData[0]).join(',');
    const rows = reportData.map(row =>
      Object.values(row).map(val =>
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeReport}-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Reports</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="/">Bugworx</a></li>
                <li className="breadcrumb-item active">Reports</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-end">
                <div className="col-md-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6 text-end">
                  <div className="mt-3 mt-md-0">
                    <span className="badge badge-soft-info me-2">
                      <i className="mdi mdi-calendar me-1"></i>
                      Date Range: {startDate} to {endDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="row">
        {/* Completed Services */}
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-2">Completed Services</h5>
                  <p className="text-muted mb-0">Completed services for selected period</p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <i className="mdi mdi-check-circle-outline display-4 text-success"></i>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={generateCompletedServicesReport}
                >
                  <i className="mdi mdi-eye me-1"></i> View Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Services */}
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-2">Upcoming Services</h5>
                  <p className="text-muted mb-0">Upcoming services for selected period</p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <i className="mdi mdi-calendar-clock display-4 text-info"></i>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={generateUpcomingServicesReport}
                >
                  <i className="mdi mdi-eye me-1"></i> View Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chemical Usage and Compliance */}
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-2">Chemical Usage and Compliance</h5>
                  <p className="text-muted mb-0">Stay compliant with environmental and safety regulations</p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <i className="mdi mdi-flask-outline display-4 text-warning"></i>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={generateChemicalUsageReport}
                >
                  <i className="mdi mdi-eye me-1"></i> View Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bait Station Inspection */}
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-2">Bait Station Inspection</h5>
                  <p className="text-muted mb-0">Monitor the condition and effectiveness of bait stations</p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <i className="mdi mdi-target display-4 text-danger"></i>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={generateBaitStationReport}
                >
                  <i className="mdi mdi-eye me-1"></i> View Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Management */}
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-2">Inventory Management</h5>
                  <p className="text-muted mb-0">Tracking inventory levels and usage</p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <i className="mdi mdi-package-variant display-4 text-primary"></i>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={generateInventoryReport}
                >
                  <i className="mdi mdi-eye me-1"></i> View Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="col-xl-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-2">Low Stock Alert</h5>
                  <p className="text-muted mb-0">Real-time list of low stock items</p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <i className="mdi mdi-alert-circle-outline display-4 text-danger"></i>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={generateLowStockReport}
                >
                  <i className="mdi mdi-eye me-1"></i> View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {activeReport && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {activeReport === 'completed-services' && 'Completed Services Report'}
                    {activeReport === 'upcoming-services' && 'Upcoming Services Report'}
                    {activeReport === 'chemical-usage' && 'Chemical Usage and Compliance Report'}
                    {activeReport === 'bait-station' && 'Bait Station Inspection Report'}
                    {activeReport === 'inventory' && 'Inventory Management Report'}
                    {activeReport === 'low-stock' && 'Low Stock Alert Report'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {reportData.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="mdi mdi-file-document-outline display-4 text-muted"></i>
                      <p className="text-muted mt-2">No data available for this report</p>
                    </div>
                  ) : (
                    <>
                      {/* Report Header */}
                      <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-0">
                            Total Records: <strong>{reportData.length}</strong>
                          </p>
                          {(activeReport === 'completed-services' || activeReport === 'upcoming-services') && (
                            <p className="text-muted mb-0">
                              Period: {startDate} to {endDate}
                            </p>
                          )}
                        </div>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={exportToCSV}
                        >
                          <i className="mdi mdi-download me-1"></i> Export CSV
                        </button>
                      </div>

                      {/* Completed Services Table */}
                      {activeReport === 'completed-services' && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Customer</th>
                                <th>Service Address</th>
                                <th>Service Type</th>
                                <th>Technician</th>
                                <th>Duration</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.map((row) => (
                                <tr key={row.id}>
                                  <td>{row.date}</td>
                                  <td>{row.time}</td>
                                  <td>{row.account}</td>
                                  <td>{row.site}</td>
                                  <td>{row.serviceType}</td>
                                  <td>{row.technician}</td>
                                  <td>{row.duration} min</td>
                                  <td>
                                    <span className="badge badge-soft-success">
                                      {row.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Upcoming Services Table */}
                      {activeReport === 'upcoming-services' && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Customer</th>
                                <th>Service Address</th>
                                <th>Service Type</th>
                                <th>Technician</th>
                                <th>Priority</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.map((row) => (
                                <tr key={row.id}>
                                  <td>{row.date}</td>
                                  <td>{row.time}</td>
                                  <td>{row.account}</td>
                                  <td>{row.site}</td>
                                  <td>{row.serviceType}</td>
                                  <td>{row.technician}</td>
                                  <td>
                                    <span className={`badge ${
                                      row.priority === 'Emergency' ? 'badge-soft-danger' :
                                      row.priority === 'Urgent' ? 'badge-soft-warning' :
                                      'badge-soft-info'
                                    }`}>
                                      {row.priority}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-primary">
                                      {row.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Chemical Usage Table */}
                      {activeReport === 'chemical-usage' && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Active Ingredient</th>
                                <th>EPA Number</th>
                                <th>Stock Level</th>
                                <th>Reorder Level</th>
                                <th>Status</th>
                                <th>Last Restocked</th>
                                <th>Expiry Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.map((row) => (
                                <tr key={row.id}>
                                  <td><strong>{row.name}</strong></td>
                                  <td>{row.category}</td>
                                  <td>{row.activeIngredient}</td>
                                  <td>{row.epaNumber}</td>
                                  <td>{row.stockLevel} {row.unit}</td>
                                  <td>{row.reorderLevel} {row.unit}</td>
                                  <td>
                                    <span className={`badge ${
                                      row.status === 'Low Stock' ? 'badge-soft-danger' :
                                      'badge-soft-success'
                                    }`}>
                                      {row.status}
                                    </span>
                                  </td>
                                  <td>{row.lastRestocked}</td>
                                  <td>{row.expiryDate}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Bait Station Table */}
                      {activeReport === 'bait-station' && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Station ID</th>
                                <th>Service Address</th>
                                <th>Customer</th>
                                <th>Location</th>
                                <th>Last Inspection</th>
                                <th>Next Inspection</th>
                                <th>Condition</th>
                                <th>Bait Level</th>
                                <th>Activity</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.map((row) => (
                                <tr key={row.id}>
                                  <td><strong>{row.stationNumber}</strong></td>
                                  <td>{row.site}</td>
                                  <td>{row.account}</td>
                                  <td>{row.location}</td>
                                  <td>{row.lastInspection}</td>
                                  <td>{row.nextInspection}</td>
                                  <td>
                                    <span className={`badge ${
                                      row.condition === 'Good' ? 'badge-soft-success' :
                                      row.condition === 'Fair' ? 'badge-soft-warning' :
                                      'badge-soft-danger'
                                    }`}>
                                      {row.condition}
                                    </span>
                                  </td>
                                  <td>{row.baitLevel}</td>
                                  <td>{row.activity}</td>
                                  <td>
                                    <span className={`badge ${
                                      row.status === 'Active' ? 'badge-soft-success' :
                                      'badge-soft-warning'
                                    }`}>
                                      {row.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Inventory Table */}
                      {activeReport === 'inventory' && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Reorder Level</th>
                                <th>Unit Cost</th>
                                <th>Total Value</th>
                                <th>Supplier</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.map((row) => (
                                <tr key={row.id}>
                                  <td><strong>{row.productName}</strong></td>
                                  <td>{row.category}</td>
                                  <td>{row.sku}</td>
                                  <td>{row.quantity} {row.unit}</td>
                                  <td>{row.reorderLevel} {row.unit}</td>
                                  <td>${row.unitCost}</td>
                                  <td>${row.totalValue}</td>
                                  <td>{row.supplier}</td>
                                  <td>
                                    <span className={`badge ${
                                      row.status === 'Good' ? 'badge-soft-success' :
                                      row.status === 'Moderate' ? 'badge-soft-warning' :
                                      'badge-soft-danger'
                                    }`}>
                                      {row.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Low Stock Table */}
                      {activeReport === 'low-stock' && (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Current Stock</th>
                                <th>Reorder Level</th>
                                <th>Shortage</th>
                                <th>Unit Cost</th>
                                <th>Reorder Cost</th>
                                <th>Supplier</th>
                                <th>Priority</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.map((row) => (
                                <tr key={row.id}>
                                  <td><strong>{row.productName}</strong></td>
                                  <td>{row.category}</td>
                                  <td>{row.currentStock} {row.unit}</td>
                                  <td>{row.reorderLevel} {row.unit}</td>
                                  <td className="text-danger">
                                    <strong>{row.shortage} {row.unit}</strong>
                                  </td>
                                  <td>${row.unitCost}</td>
                                  <td>${row.reorderCost}</td>
                                  <td>{row.supplier}</td>
                                  <td>
                                    <span className={`badge ${
                                      row.priority === 'Critical' ? 'badge-soft-danger' :
                                      row.priority === 'High' ? 'badge-soft-warning' :
                                      'badge-soft-info'
                                    }`}>
                                      {row.priority}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  {reportData.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={exportToCSV}
                    >
                      <i className="mdi mdi-download me-1"></i> Export CSV
                    </button>
                  )}
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

export default Reports;
