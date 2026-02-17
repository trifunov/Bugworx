import { useState, useEffect, useCallback } from 'react';
import { getServicePricingRules, saveServicePricingRules } from '../../../../utils/localStorage';

export const useServicePricingRules = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const storedRules = getServicePricingRules();
    setRules(storedRules);
  }, []);

  const updateStorage = (updatedRules) => {
    saveServicePricingRules(updatedRules);
    setRules(updatedRules);
  };

  const addRule = useCallback(
    (rule) => {
      const newRule = { ...rule, id: new Date().getTime() };
      const updatedRules = [...rules, newRule];
      updateStorage(updatedRules);
    },
    [rules]
  );

  const editRule = useCallback(
    (id, updatedRule) => {
      const updatedRules = rules.map((rule) => (rule.id === id ? { ...rule, ...updatedRule } : rule));
      updateStorage(updatedRules);
    },
    [rules]
  );

  const deleteRule = useCallback(
    (id) => {
      const updatedRules = rules.filter((rule) => rule.id !== id);
      updateStorage(updatedRules);
    },
    [rules]
  );

  return {
    servicePricingRules: rules,
    addServicePricingRule: addRule,
    editServicePricingRule: editRule,
    deleteServicePricingRule: deleteRule,
  };
};
