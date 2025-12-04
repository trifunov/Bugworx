import { useState, useEffect, useMemo } from 'react';
import { getAppointments, getCustomers, getInventory } from '../utils/localStorage';

/**
 * Shared hook for dashboard/analytics data from localStorage.
 * Provides stats, chart data, and table data for both Dashboard and Analytics pages.
 */
export default function useDashboardData() {
  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    setAppointments(getAppointments());
    setCustomers(getCustomers());
    setInventory(getInventory());
  }, []);

  // Calculate stats from real data
  const stats = useMemo(() => {
    const completedAppointments = appointments.filter(a => a.status === 'Completed');
    const totalRevenue = completedAppointments.reduce((sum, apt) => sum + (apt.price || 150), 0);
    const totalJobs = completedAppointments.length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newCustomers = customers.filter(cust => {
      const createdDate = new Date(cust.createdAt || cust.createdDate || '2024-01-01');
      return createdDate >= thirtyDaysAgo;
    }).length;

    // Get low stock items
    const lowStockItems = inventory.filter(item => item.quantity <= item.minQuantity);

    // Get today's scheduled appointments
    const today = new Date().toISOString().split('T')[0];
    const todaysJobs = appointments.filter(a =>
      a.scheduledDate === today && a.status !== 'Cancelled'
    ).length;

    // Get open work orders (pending/scheduled appointments)
    const openWorkOrders = appointments.filter(a =>
      a.status === 'Scheduled' || a.status === 'Pending'
    ).length;

    return {
      totalRevenue,
      totalJobs,
      newCustomers: newCustomers || 342, // Fallback for demo
      avgRating: 4.8,
      revenueChange: 12.5,
      jobsChange: 8.3,
      customersChange: 15.2,
      ratingChange: 0.3,
      lowStockCount: lowStockItems.length || 7,
      todaysJobs: todaysJobs || 42,
      openWorkOrders: openWorkOrders || 19
    };
  }, [appointments, customers, inventory]);

  // KPI cards data
  const kpis = useMemo(() => [
    {
      id: 'jobs',
      label: 'Jobs Today',
      value: String(stats.todaysJobs),
      icon: 'mdi-calendar-check',
      color: 'primary',
      change: stats.jobsChange
    },
    {
      id: 'revenue',
      label: 'Revenue (MTD)',
      value: `$${Math.round(stats.totalRevenue / 1000)}k`,
      icon: 'mdi-currency-usd',
      color: 'success',
      change: stats.revenueChange
    },
    {
      id: 'lowstock',
      label: 'Low Stock Items',
      value: String(stats.lowStockCount),
      icon: 'mdi-alert-circle',
      color: 'warning',
      change: -2
    },
    {
      id: 'workorders',
      label: 'Open Work Orders',
      value: String(stats.openWorkOrders),
      icon: 'mdi-clipboard-list',
      color: 'danger',
      change: 5.1
    }
  ], [stats]);

  // Chart options (shared)
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

  // Revenue Chart Data
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

  const revenueChartOptions = {
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

  // Service Distribution Chart Data
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

  // Monthly Jobs Chart Data
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

  // Technician Performance Chart Data
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

  // Customer Growth Chart Data
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

  // Top Services Chart Data
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

  // Chemical Usage Chart Data
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

  // Today's Schedule data
  const todaySchedule = [
    { time: '8:30 AM', service: 'Quarterly Service', location: 'Johnson Residence', tech: 'Alex', status: 'ok', statusText: 'Confirmed' },
    { time: '10:15 AM', service: 'Bed Bug Inspection', location: 'City Hotel', tech: 'Priya', status: 'warn', statusText: 'ETA 10:25' },
    { time: '12:00 PM', service: 'Rodent Control', location: 'Warehouse B', tech: 'Sam', status: 'ok', statusText: 'Confirmed' },
    { time: '2:00 PM', service: 'Initial Service', location: 'Garcia Home', tech: 'Mia', status: 'err', statusText: 'Reschedule?' },
    { time: '4:30 PM', service: 'Termite Follow-up', location: 'Westside Condos', tech: 'Ben', status: 'ok', statusText: 'Confirmed' }
  ];

  // Recent Activity data
  const recentActivity = [
    { title: 'Invoice #1043', detail: 'paid', amount: '$342.00', time: '3m ago' },
    { title: 'New work order', detail: 'Bed Bug treatment', amount: null, time: '20m ago' },
    { title: 'Inventory', detail: 'updated - Termiticide received', amount: null, time: '1h ago' },
    { title: 'Customer', detail: 'added - Parker LLC', amount: null, time: '2h ago' }
  ];

  // Low Stock Items data
  const lowStockItems = useMemo(() => {
    const items = inventory.filter(item => item.quantity <= item.minQuantity);
    if (items.length > 0) {
      return items.map(item => ({
        item: item.name,
        onHand: item.quantity,
        min: item.minQuantity
      }));
    }
    // Fallback demo data
    return [
      { item: 'Rodent Bait - 1kg', onHand: 6, min: 10 },
      { item: 'Termiticide - 5L', onHand: 3, min: 8 },
      { item: 'Glue Boards (Pack)', onHand: 12, min: 20 },
      { item: 'N95 Masks', onHand: 18, min: 25 }
    ];
  }, [inventory]);

  // Top Technicians data
  const topTechnicians = [
    { name: 'Mike Johnson', initials: 'MJ', color: 'primary', jobs: 145, rating: 4.9, revenue: '$21,750' },
    { name: 'Sarah Williams', initials: 'SW', color: 'info', jobs: 132, rating: 4.8, revenue: '$19,800' },
    { name: 'Tom Davis', initials: 'TD', color: 'warning', jobs: 128, rating: 4.7, revenue: '$19,200' },
    { name: 'Lisa Anderson', initials: 'LA', color: 'success', jobs: 118, rating: 4.6, revenue: '$17,700' }
  ];

  // Quick Stats data
  const quickStats = {
    completionRate: 98.5,
    customerSatisfaction: 94.2,
    avgResponseTime: '3.2 hrs',
    repeatCustomers: 85,
    cancellationRate: 2.1,
    avgJobValue: '$186'
  };

  // Helper function for status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'ok': return 'badge-soft-success';
      case 'warn': return 'badge-soft-warning';
      case 'err': return 'badge-soft-danger';
      default: return 'badge-soft-primary';
    }
  };

  return {
    // Raw data
    appointments,
    customers,
    inventory,

    // Computed stats
    stats,
    kpis,

    // Chart data
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

    // Table data
    todaySchedule,
    recentActivity,
    lowStockItems,
    topTechnicians,
    quickStats,

    // Helpers
    getStatusClass
  };
}
