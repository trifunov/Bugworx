import { useState, useEffect, useCallback } from 'react';
import {
  getTechnicians,
  getServiceAddresses,
  getLeads,
} from '../utils/localStorage';

const usePrograms = (programs) => {
  const [technicians, setTechnicians] = useState([]);
  const [serviceAddresses, setServiceAddresses] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const load = useCallback(() => {
    setLoading(true);
    setTechnicians(getTechnicians());
    setServiceAddresses(getServiceAddresses());
    setLeads(getLeads());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const getLeadName = (id) => leads.find((l) => l.id === id)?.name ?? '—';
  const getTechnicianName = (id) => technicians.find((t) => t.id === id)?.name ?? 'Unassigned';
  const getSiteCount = (ids) => (Array.isArray(ids) ? ids.length : 0);

  const getNextDate = (program) => {
    if (program.status !== 'Active') return '—';
    const today = new Date();
    const start = new Date(program.startDate);
    const freqDays = { weekly: 7, biweekly: 14, monthly: 30, quarterly: 90, annually: 365 };
    const days = freqDays[program.frequency] || 30;
    let next = new Date(start);
    while (next <= today) next.setDate(next.getDate() + days);
    return next.toLocaleDateString();
  };

  const getProgress = (program) => {
    const total = program.totalWorkOrders || 0;
    const done = program.completedWorkOrders || 0;
    if (total === 0) return null;
    return { done, total, pct: Math.round((done / total) * 100) };
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return 'badge-soft-success';
      case 'Paused': return 'badge-soft-warning';
      case 'Expired': return 'badge-soft-danger';
      case 'Draft': return 'badge-soft-secondary';
      default: return 'badge-soft-secondary';
    }
  };

  const getFrequencyLabel = (freq) =>
    freq ? freq.charAt(0).toUpperCase() + freq.slice(1) : '—';

  const filteredPrograms = (programs || []).filter((p) => {
    const nameMatch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const leadMatch = getLeadName(p.leadId).toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || p.status === statusFilter;
    return (nameMatch || leadMatch) && statusMatch;
  });

  return {
    technicians,
    serviceAddresses,
    leads,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredPrograms,
    getLeadName,
    getTechnicianName,
    getSiteCount,
    getNextDate,
    getProgress,
    getStatusBadge,
    getFrequencyLabel,
  };
};

export default usePrograms;
