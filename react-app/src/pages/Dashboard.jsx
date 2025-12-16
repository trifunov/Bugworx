import { useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import Table from '../components/Common/Table/Table';
import useDashboardData from '../hooks/useDashboardData';
import { initializeStorage } from '../utils/localStorage';
import {
  appointments as initialAppointments,
  serviceAddresses as initialServiceAddresses,
  technicians as initialTechnicians,
  customers as initialCustomers,
  inventory as initialInventory,
  facilities,
  areas,
  inspectionPoints
} from '../data/mockData';

const Dashboard = () => {
  // Initialize localStorage on mount
  useEffect(() => {
    initializeStorage({
      appointments: initialAppointments,
      customers: initialCustomers,
      serviceAddresses: initialServiceAddresses,
      technicians: initialTechnicians,
      inventory: initialInventory,
      facilities: facilities,
      areas: areas,
      inspectionPoints: inspectionPoints
    });
  }, []);

  // Use shared dashboard data hook
  const {
    kpis,
    revenueChartData,
    revenueChartOptions,
    serviceDistributionData,
    chartOptions,
    todaySchedule,
    recentActivity,
    lowStockItems,
    getStatusClass
  } = useDashboardData();

  return (
    <>
      {/* Stats Cards - Same style as Analytics */}
      <div className="row">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="col-xl-3 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-muted fw-medium mb-2">{kpi.label}</p>
                    <h4 className="mb-0">{kpi.value}</h4>
                    <p className="text-muted mb-0">
                      <span className={`${kpi.change >= 0 ? 'text-success' : 'text-danger'} me-2`}>
                        <i className={`mdi ${kpi.change >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'}`}></i> {Math.abs(kpi.change)}%
                      </span>
                      vs last month
                    </p>
                  </div>
                  <div className="flex-shrink-0 align-self-center">
                    <div className={`mini-stat-icon avatar-sm rounded-circle bg-${kpi.color}`}>
                      <span className="avatar-title">
                        <i className={`mdi ${kpi.icon} font-size-24`}></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trends & Service Distribution - Same style as Analytics */}
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

      {/* Today's Schedule & Recent Activity */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Today's Schedule</h4>
              <Table
                columns={['Time', 'Service', 'Location', 'Tech', 'Status']}
                data={todaySchedule}
                renderRow={(item, idx) => (
                  <tr key={idx}>
                    <td>{item.time}</td>
                    <td>{item.service}</td>
                    <td>{item.location}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-xs me-2">
                          <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                            {item.tech.charAt(0)}
                          </span>
                        </div>
                        <span>{item.tech}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusClass(item.status)} font-size-12`}>
                        {item.statusText}
                      </span>
                    </td>
                  </tr>
                )}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Recent Activity</h4>
              <Table
                columns={['Activity', 'Details', 'Time']}
                data={recentActivity}
                renderRow={(item, idx) => (
                  <tr key={idx}>
                    <td className="fw-medium">{item.title}</td>
                    <td>
                      {item.detail}
                      {item.amount && <span className="text-success ms-2">{item.amount}</span>}
                    </td>
                    <td><span className="text-muted">{item.time}</span></td>
                  </tr>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock */}
      <div className="row">
        <div className="col-xl-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Low Stock Items</h4>
              <Table
                columns={['Item', 'On Hand', 'Min Required', 'Status']}
                data={lowStockItems}
                renderRow={(item, idx) => (
                  <tr key={idx}>
                    <td>{item.item}</td>
                    <td>{item.onHand}</td>
                    <td>{item.min}</td>
                    <td>
                      <span className={`badge ${item.onHand < item.min / 2 ? 'badge-soft-danger' : 'badge-soft-warning'} font-size-12`}>
                        {item.onHand < item.min / 2 ? 'Critical' : 'Low'}
                      </span>
                    </td>
                  </tr>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
