import { useState, useEffect, useCallback } from 'react';
import serviceAddressService from '../services/serviceAddressService';

/**
 * Hook for managing service addresses
 * @param {number} customerId - Customer ID
 * @returns {Object} Service addresses data and operations
 */
const useServiceAddresses = (customerId) => {
  const [serviceAddresses, setServiceAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServiceAddresses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await serviceAddressService.getByCustomerId(parseInt(customerId));
      setServiceAddresses(data || []);
    } catch (error) {
      console.error('Failed to load service addresses:', error);
      setServiceAddresses([]);
    } finally {
      setLoading(false);
    }
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
