import { useState, useEffect } from 'react';
import customerService from '../services/customerService';

/**
 * Hook for managing customer data
 * @param {number} customerId - Customer ID
 * @returns {Object} Customer data and refresh function
 */
const useCustomerData = (customerId) => {
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCustomer = async () => {
    setLoading(true);
    try {
      if (customerId) {
        const data = await customerService.getCustomerById(customerId);
        setCustomer(data);
      }
      const allCustomers = await customerService.getCustomers();
      setCustomers(allCustomers || []);
    } catch {
      // Keep current state on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  return {
    customer,
    customers,
    loading,
    refresh: loadCustomer,
  };
};

export default useCustomerData;
