import { api } from './api';

const mapFormToApi = (data) => ({
  name: data.name,
  customerType: data.customerType, // string: 'Residential' or 'Commercial'
  isActive: data.customerStatus === 'Active',
  sendInvoice: data.sendInvoice ?? false,
  emailInvoice: data.emailInvoice ?? false,
  instructions: data.instructions ?? '',
  primaryNote: data.primaryNote ?? '',
  registrationNum: data.registrationNum ?? '',
  preferredContactMethod: data.preferredContactMethod ?? '',
  billingAddress: data.billingAddress ?? { street: '', city: '', state: '', zip: '' },
  billingContact: data.billingContact ? {
    firstName: data.billingContact.firstName ?? '',
    middleName: data.billingContact.middleName ?? '',
    lastName: data.billingContact.lastName ?? '',
    email: data.billingContact.email ?? '',
    alternateEmails: data.billingContact.alternateEmails ?? [],
    phones: (data.billingContact.phones ?? []).map(p => ({
      type: p.type,
      number: p.number,
    })),
  } : null,
});

const customerService = {
  getCustomers: async () => {
    return api.get('/api/customers');
  },

  getCustomerById: async (id) => {
    return api.get(`/api/customers/${id}`);
  },

  createCustomer: async (data) => {
    const payload = mapFormToApi(data);
    return api.post('/api/customers', payload);
  },

  updateCustomer: async (id, data) => {
    const payload = mapFormToApi(data);
    return api.put(`/api/customers/${id}`, payload);
  },

  deleteCustomer: async (id) => {
    return api.delete(`/api/customers/${id}`);
  },
};

export default customerService;
