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
import Table from '../components/Common/Table/Table';
import useDashboardData from '../hooks/useDashboardData';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';

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
  const { setPageSubHeader } = usePageSubHeader();
  const [dateRange, setDateRange] = useState('month');

  // Use shared dashboard data hook
  const {
    stats,
    chartOptions,
    revenueChartData,
    revenueChartOptions,
    serviceDistributionData,
    monthlyJobsData,
    monthlyJobsOptions,
    techPerformanceData,
    techPerformanceOptions,
    customerGrowthData,
    topServicesData,
    topServicesOptions,
    chemicalUsageData,
    chemicalUsageOptions,
    topTechnicians,
    quickStats
  } = useDashboardData();

  useEffect(() => {
    setPageSubHeader({
      title: 'Analytics Dashboard',
      breadcrumbs: [
        { label: 'Analytics Dashboard', path: '/analytics' }
      ]
    });
  }, [setPageSubHeader]);

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
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
                <Line data={revenueChartData} options={revenueChartOptions} />
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
              <Table
                columns={['Technician', 'Jobs Completed', 'Avg. Rating', 'Revenue Generated']}
                data={topTechnicians}
                renderRow={(tech, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-xs me-2">
                          <span className={`avatar-title rounded-circle bg-soft-${tech.color} text-${tech.color}`}>
                            {tech.initials}
                          </span>
                        </div>
                        <span>{tech.name}</span>
                      </div>
                    </td>
                    <td>{tech.jobs}</td>
                    <td>
                      <span className="badge badge-soft-success font-size-12">{tech.rating}</span>
                    </td>
                    <td>{tech.revenue}</td>
                  </tr>
                )}
              />
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
                    <h5 className="text-primary mb-1">{quickStats.completionRate}%</h5>
                    <p className="text-muted mb-0">Completion Rate</p>
                  </div>
                  <div className="border-bottom pb-3 mb-3">
                    <h5 className="text-success mb-1">{quickStats.customerSatisfaction}%</h5>
                    <p className="text-muted mb-0">Customer Satisfaction</p>
                  </div>
                  <div>
                    <h5 className="text-info mb-1">{quickStats.avgResponseTime}</h5>
                    <p className="text-muted mb-0">Avg. Response Time</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border-bottom pb-3 mb-3">
                    <h5 className="text-warning mb-1">{quickStats.repeatCustomers}%</h5>
                    <p className="text-muted mb-0">Repeat Customers</p>
                  </div>
                  <div className="border-bottom pb-3 mb-3">
                    <h5 className="text-danger mb-1">{quickStats.cancellationRate}%</h5>
                    <p className="text-muted mb-0">Cancellation Rate</p>
                  </div>
                  <div>
                    <h5 className="text-primary mb-1">{quickStats.avgJobValue}</h5>
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
