import { useState, useEffect, useCallback } from 'react';
import { getCurrencies, saveCurrencies } from '../../../../utils/localStorage';

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedCurrencies = getCurrencies();
    setCurrencies(storedCurrencies);
  }, []);

  const addCurrency = useCallback(
    (formData) => {
      setIsSaving(true);
      const newCurrency = { ...formData, id: new Date().getTime() };
      const newCurrencies = [...currencies, newCurrency];
      setCurrencies(newCurrencies);
      saveCurrencies(newCurrencies);
      setIsSaving(false);
    },
    [currencies]
  );

  const editCurrency = useCallback(
    (id, updatedCurrency) => {
      setIsSaving(true);
      const newCurrencies = currencies.map((currency) => (currency.id === id ? { ...updatedCurrency, id } : currency));
      setCurrencies(newCurrencies);
      saveCurrencies(newCurrencies);
      setIsSaving(false);
    },
    [currencies]
  );

  const deleteCurrency = useCallback(
    (id) => {
      const newCurrencies = currencies.filter((currency) => currency.id !== id);
      setCurrencies(newCurrencies);
      saveCurrencies(newCurrencies);
    },
    [currencies]
  );

  return {
    currencies,
    addCurrency,
    editCurrency,
    deleteCurrency,
    isSaving,
  };
};
