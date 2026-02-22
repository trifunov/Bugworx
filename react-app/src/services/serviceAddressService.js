import { api } from './api';

const serviceAddressService = {
  getByCustomerId: async (customerId) => {
    return api.get(`/api/service-addresses?customerId=${customerId}`);
  },

  getById: async (id) => {
    return api.get(`/api/service-addresses/${id}`);
  },

  create: async (data) => {
    return api.post('/api/service-addresses', data);
  },

  update: async (id, data) => {
    return api.put(`/api/service-addresses/${id}`, data);
  },

  delete: async (id) => {
    return api.delete(`/api/service-addresses/${id}`);
  },
};

export default serviceAddressService;
