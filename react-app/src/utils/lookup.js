// Lookup utilities for translating ID fields to display names
import { serviceTypes, priorities, appointmentStatuses } from '../data/mockData';

const serviceTypeMap = new Map(serviceTypes.map((st, idx) => [idx, st]));
const priorityMap = new Map(priorities.map((p, idx) => [idx, p]));
const statusMap = new Map(appointmentStatuses.map(s => [s.id, s.name]));

export const getServiceTypeName = (id) => serviceTypeMap.get(id) || 'Unknown';
export const getPriorityName = (id) => priorityMap.get(id) || 'Unknown';
export const getAppointmentStatusName = (id) => statusMap.get(id) || 'Unknown';

// Generic helper if future arrays follow same shape
export const buildIdNameLookup = (items) => new Map(items.map(i => [i.id, i.name]));
