import { useState, useEffect } from 'react';
import { appointments } from '../data/mockData';

/**
 * Hook for managing customer appointments
 * @param {number} customerId - Customer ID
 * @param {Array} serviceAddresses - Service addresses for the customer
 * @returns {Object} Appointments data
 */
const useCustomerAppointments = (customerId, serviceAddresses = []) => {
  const [customerAppointments, setCustomerAppointments] = useState([]);

  useEffect(() => {
    const filteredAppointments = appointments.filter((apt) => {
      const serviceAddress = serviceAddresses.find(
        (s) => s.id === apt.serviceAddressId
      );
      return serviceAddress && serviceAddress.customerId === parseInt(customerId);
    });
    setCustomerAppointments(filteredAppointments);
  }, [customerId, serviceAddresses]);

  const completedAppointments = customerAppointments.filter(
    (apt) => apt.status === 'Completed'
  );

  return {
    appointments: customerAppointments,
    completedAppointments,
  };
};

export default useCustomerAppointments;
