import { useState, useEffect } from 'react';
import { getCustomers } from '../utils/localStorage';

/**
 * Hook for managing customer data
 * @param {number} customerId - Customer ID
 * @returns {Object} Customer data and refresh function
 */
const useCustomerData = (customerId) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCustomers = () => {
    setLoading(true);
    const data = getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const customer = customers.find((c) => c.id === parseInt(customerId));

  return {
    customer,
    customers,
    loading,
    refresh: loadCustomers,
  };
};

export default useCustomerData;
