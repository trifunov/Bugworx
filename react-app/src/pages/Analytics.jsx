import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import { appointments, customers } from '../data/mockData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [dateRange, setDateRange] = useState('month');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalJobs: 0,
    newCustomers: 0,
    avgRating: 0,
    revenueChange: 0,
    jobsChange: 0,
    customersChange: 0,
    ratingChange: 0,
  });

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = () => {
    const completedAppointments = appointments.filter(a => a.status === 'Completed');
    const totalRevenue = completedAppointments.reduce((sum, apt) => sum + (apt.price || 150), 0);
    const totalJobs = completedAppointments.length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newCustomers = customers.filter(acc => {
      const createdDate = new Date(acc.createdDate || '2024-01-01');
      return createdDate >= thirtyDaysAgo;
    }).length;

    setStats({
      totalRevenue,
      totalJobs,
      newCustomers: newCustomers || 342,
      avgRating: 4.8,
      revenueChange: 12.5,
      jobsChange: 8.3,
      customersChange: 15.2,
      ratingChange: 0.3,
    });
  };

  // Chart.js default options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    }
  };

  // Revenue Trends Chart
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 14800, 16200, 18900, 21300, 19800, 22400, 24100, 26800, 28200, 25900, 31200],
        borderColor: '#1cbb8c',
        backgroundColor: 'rgba(28, 187, 140, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target',
        data: [15000, 15000, 17000, 19000, 20000, 21000, 23000, 24000, 25000, 27000, 28000, 30000],
        borderColor: '#0f9cf3',
        backgroundColor: 'rgba(15, 156, 243, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const revenueOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${(value / 1000).toFixed(0)}k`
        }
      }
    },
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`
        }
      }
    }
  };

  // Service Distribution Chart
  const serviceDistributionData = {
    labels: ['Residential Pest Control', 'Commercial Pest Control', 'Termite Treatment', 'Wildlife Removal', 'Bed Bug Treatment'],
    datasets: [{
      data: [45, 30, 15, 7, 3],
      backgroundColor: [
        '#1cbb8c',
        '#0f9cf3',
        '#fcb92c',
        '#4aa3ff',
        '#f32f53'
      ],
      borderWidth: 0
    }]
  };

  // Monthly Jobs Chart
  const monthlyJobsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Completed',
        data: [42, 56, 61, 74, 82, 78, 91, 98, 102, 115, 108, 124],
        backgroundColor: '#1cbb8c',
      },
      {
        label: 'Scheduled',
        data: [28, 32, 35, 41, 38, 45, 48, 52, 58, 61, 55, 67],
        backgroundColor: '#0f9cf3',
      },
      {
        label: 'Cancelled',
        data: [5, 8, 6, 9, 7, 10, 8, 11, 9, 12, 10, 14],
        backgroundColor: '#fcb92c',
      }
    ]
  };

  const monthlyJobsOptions = {
    ...chartOptions,
    scales: {
      x: { stacked: false },
      y: {
        stacked: false,
        beginAtZero: true
      }
    }
  };

  // Technician Performance Chart
  const techPerformanceData = {
    labels: ['Mike Johnson', 'Sarah Williams', 'Tom Davis', 'Lisa Anderson'],
    datasets: [{
      data: [92, 88, 85, 78],
      backgroundColor: [
        'rgba(28, 187, 140, 0.8)',
        'rgba(15, 156, 243, 0.8)',
        'rgba(252, 185, 44, 0.8)',
        'rgba(74, 163, 255, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const techPerformanceOptions = {
    ...chartOptions,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`
        }
      }
    }
  };

  // Customer Growth Chart
  const customerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'New Customers',
      data: [12, 18, 24, 31, 28, 35, 42, 38, 45, 51, 48, 56],
      borderColor: '#0f9cf3',
      backgroundColor: 'rgba(15, 156, 243, 0.2)',
      fill: true,
      tension: 0.4,
    }]
  };

  // Top Services Chart
  const topServicesData = {
    labels: [
      'General Pest Control',
      'Termite Inspection',
      'Rodent Control',
      'Bed Bug Treatment',
      'Ant Control',
      'Mosquito Control',
      'Wildlife Removal',
      'Cockroach Treatment'
    ],
    datasets: [{
      label: 'Services',
      data: [245, 189, 156, 134, 121, 98, 76, 65],
      backgroundColor: '#1cbb8c',
    }]
  };

  const topServicesOptions = {
    ...chartOptions,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true }
    },
    plugins: {
      ...chartOptions.plugins,
      legend: { display: false }
    }
  };

  // Chemical Usage Chart
  const chemicalUsageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        type: 'line',
        label: 'Termidor SC',
        data: [23, 28, 31, 27, 33, 29, 37, 35, 42, 38, 40, 45],
        borderColor: '#1cbb8c',
        backgroundColor: 'rgba(28, 187, 140, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        type: 'line',
        label: 'Talstar P',
        data: [15, 18, 22, 19, 25, 21, 28, 26, 31, 29, 33, 35],
        borderColor: '#fcb92c',
        backgroundColor: 'rgba(252, 185, 44, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        type: 'line',
        label: 'Phantom',
        data: [12, 14, 16, 15, 18, 17, 21, 19, 23, 22, 25, 27],
        borderColor: '#0f9cf3',
        backgroundColor: 'rgba(15, 156, 243, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chemicalUsageOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Usage (Gallons)'
        }
      }
    }
  };

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0 font-size-18">Analytics Dashboard</h4>
            <div className="page-title-right">
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${dateRange === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDateRange('month')}
                >
                  Month
                </button>
                <button
                  className={`btn btn-sm ${dateRange === 'quarter' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDateRange('quarter')}
                >
                  Quarter
                </button>
                <button
                  className={`btn btn-sm ${dateRange === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDateRange('year')}
                >
                  Year
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">Total Revenue</p>
                  <h4 className="mb-0">${stats.totalRevenue.toLocaleString()}</h4>
                  <p className="text-muted mb-0">
                    <span className="text-success me-2">
                      <i className="mdi mdi-arrow-up"></i> {stats.revenueChange}%
                    </span>
                    vs last month
                  </p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-primary">
                    <span className="avatar-title">
                      <i className="mdi mdi-currency-usd font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">Total Jobs</p>
                  <h4 className="mb-0">{stats.totalJobs.toLocaleString()}</h4>
                  <p className="text-muted mb-0">
                    <span className="text-success me-2">
                      <i className="mdi mdi-arrow-up"></i> {stats.jobsChange}%
                    </span>
                    vs last month
                  </p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-success">
                    <span className="avatar-title">
                      <i className="mdi mdi-calendar-check font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">New Customers</p>
                  <h4 className="mb-0">{stats.newCustomers}</h4>
                  <p className="text-muted mb-0">
                    <span className="text-success me-2">
                      <i className="mdi mdi-arrow-up"></i> {stats.customersChange}%
                    </span>
                    vs last month
                  </p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-info">
                    <span className="avatar-title">
                      <i className="mdi mdi-account-plus font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-muted fw-medium mb-2">Avg. Rating</p>
                  <h4 className="mb-0">{stats.avgRating}/5.0</h4>
                  <p className="text-muted mb-0">
                    <span className="text-success me-2">
                      <i className="mdi mdi-arrow-up"></i> {stats.ratingChange}
                    </span>
                    vs last month
                  </p>
                </div>
                <div className="flex-shrink-0 align-self-center">
                  <div className="mini-stat-icon avatar-sm rounded-circle bg-warning">
                    <span className="avatar-title">
                      <i className="mdi mdi-star font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trends & Service Distribution */}
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Revenue Trends</h4>
              <div style={{ height: '350px' }}>
                <Line data={revenueChartData} options={revenueOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Service Distribution</h4>
              <div style={{ height: '350px' }}>
                <Doughnut data={serviceDistributionData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Jobs & Technician Performance */}
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Monthly Jobs Overview</h4>
              <div style={{ height: '350px' }}>
                <Bar data={monthlyJobsData} options={monthlyJobsOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Technician Performance</h4>
              <div style={{ height: '350px' }}>
                <PolarArea data={techPerformanceData} options={techPerformanceOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Growth & Service Status */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Customer Growth</h4>
              <div style={{ height: '300px' }}>
                <Line data={customerGrowthData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Service Status Distribution</h4>
              <div style={{ height: '300px' }}>
                <Pie
                  data={{
                    labels: ['Completed', 'In Progress', 'Scheduled', 'Pending'],
                    datasets: [{
                      data: [68, 18, 12, 2],
                      backgroundColor: ['#1cbb8c', '#0f9cf3', '#fcb92c', '#f32f53'],
                      borderWidth: 0
                    }]
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Services & Chemical Usage */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Top Services by Volume</h4>
              <div style={{ height: '350px' }}>
                <Bar data={topServicesData} options={topServicesOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Chemical Usage Trends</h4>
              <div style={{ height: '350px' }}>
                <Line data={chemicalUsageData} options={chemicalUsageOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Technicians & Quick Stats */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Top Performing Technicians</h4>
              <div className="table-responsive">
                <table className="table align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Technician</th>
                      <th>Jobs Completed</th>
                      <th>Avg. Rating</th>
                      <th>Revenue Generated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-2">
                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                              MJ
                            </span>
                          </div>
                          <span>Mike Johnson</span>
                        </div>
                      </td>
                      <td>145</td>
                      <td>
                        <span className="badge badge-soft-success font-size-12">4.9</span>
                      </td>
                      <td>$21,750</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-2">
                            <span className="avatar-title rounded-circle bg-soft-info text-info">
                              SW
                            </span>
                          </div>
                          <span>Sarah Williams</span>
                        </div>
                      </td>
                      <td>132</td>
                      <td>
                        <span className="badge badge-soft-success font-size-12">4.8</span>
                      </td>
                      <td>$19,800</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-2">
                            <span className="avatar-title rounded-circle bg-soft-warning text-warning">
                              TD
                            </span>
                          </div>
                          <span>Tom Davis</span>
                        </div>
                      </td>
                      <td>128</td>
                      <td>
                        <span className="badge badge-soft-success font-size-12">4.7</span>
                      </td>
                      <td>$19,200</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs me-2">
                            <span className="avatar-title rounded-circle bg-soft-success text-success">
                              LA
                            </span>
                          </div>
                          <span>Lisa Anderson</span>
                        </div>
                      </td>
                      <td>118</td>
                      <td>
                        <span className="badge badge-soft-success font-size-12">4.6</span>
                      </td>
                      <td>$17,700</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Quick Stats</h4>
              <div className="row">
                <div className="col-6">
                  <div className="border-bottom pb-3 mb-3">
                    <h5 className="text-primary mb-1">98.5%</h5>
                    <p className="text-muted mb-0">Completion Rate</p>
                  </div>
                  <div className="border-bottom pb-3 mb-3">
                    <h5 className="text-success mb-1">94.2%</h5>
                    <p className="text-muted mb-0">Customer Satisfaction</p>
                  </div>
                  <div>
                    <h5 className="text-info mb-1">3.2 hrs</h5>
                    <p className="text-muted mb-0">Avg. Response Time</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border-bottom pb-3 mb-3">
                    <h5 className="text-warning mb-1">85%</h5>
                    <p className="text-muted mb-0">Repeat Customers</p>
                  </div>
                  <div className="border-bottom pb-3 mb-3">
                    <h5 className="text-danger mb-1">2.1%</h5>
                    <p className="text-muted mb-0">Cancellation Rate</p>
                  </div>
                  <div>
                    <h5 className="text-primary mb-1">$186</h5>
                    <p className="text-muted mb-0">Avg. Job Value</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
