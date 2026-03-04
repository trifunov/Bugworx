import { useState, useEffect, useCallback } from 'react';
import { getServicePricingRules, saveServicePricingRules } from '../../../../utils/localStorage';

export const useServicePricingRules = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const storedRules = getServicePricingRules();
    setRules(storedRules);
  }, []);

  const addRule = useCallback(
    (rule) => {
      const newRule = { ...rule, id: new Date().getTime() };
      const updatedRules = [...rules, newRule];
      saveServicePricingRules(updatedRules);
      setRules(updatedRules);
    },
    [rules]
  );

  const editRule = useCallback(
    (id, updatedRule) => {
      const updatedRules = rules.map((rule) => (rule.id === id ? { ...rule, ...updatedRule } : rule));
      saveServicePricingRules(updatedRules);
      setRules(updatedRules);
    },
    [rules]
  );

  const deleteRule = useCallback(
    (id) => {
      if (!window.confirm('Are you sure you want to delete this pricing rule?')) return;
      const updatedRules = rules.filter((rule) => rule.id !== id);
      saveServicePricingRules(updatedRules);
      setRules(updatedRules);
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
