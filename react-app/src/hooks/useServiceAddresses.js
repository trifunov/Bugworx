import { useState, useEffect, useCallback } from 'react';
import { getServiceAddressesByCustomerId } from '../utils/localStorage';

/**
 * Hook for managing service addresses
 * @param {number} customerId - Customer ID
 * @returns {Object} Service addresses data and operations
 */
const useServiceAddresses = (customerId) => {
  const [serviceAddresses, setServiceAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServiceAddresses = useCallback(() => {
    setLoading(true);
    const data = getServiceAddressesByCustomerId(parseInt(customerId));
    setServiceAddresses(data);
    setLoading(false);
  }, [customerId]);

  useEffect(() => {
    loadServiceAddresses();
  }, [loadServiceAddresses]);

  return {
    serviceAddresses,
    loading,
    refresh: loadServiceAddresses,
  };
};

export default useServiceAddresses;
