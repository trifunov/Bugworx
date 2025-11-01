import { useState, useEffect, useCallback } from 'react';
import { getProposalsByCustomerId } from '../utils/localStorage';

/**
 * Hook for managing customer proposals
 * @param {number} customerId - Customer ID
 * @returns {Object} Proposals data and operations
 */
const useCustomerProposals = (customerId) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProposals = useCallback(() => {
    setLoading(true);
    const data = getProposalsByCustomerId(parseInt(customerId));
    setProposals(data);
    setLoading(false);
  }, [customerId]);

  useEffect(() => {
    loadProposals();
  }, [loadProposals]);

  return {
    proposals,
    loading,
    refresh: loadProposals,
  };
};

export default useCustomerProposals;
