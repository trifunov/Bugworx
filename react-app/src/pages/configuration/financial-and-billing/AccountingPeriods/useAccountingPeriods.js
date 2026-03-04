import { useState, useEffect, useCallback } from 'react';
import { getAccountingPeriods, saveAccountingPeriods } from '../../../../utils/localStorage';
import useTable from '../../../../components/Common/Table/useTable';
import useTableSearch from '../../../../components/Common/SearchBar/useTableSearch';

export const useAccountingPeriods = () => {
  const [accountingPeriods, setAccountingPeriods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(null);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      const data = getAccountingPeriods();
      setAccountingPeriods(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleAdd = useCallback(
    (newPeriodData) => {
      const { id, ...rest } = newPeriodData; // Destructure to omit any existing id before assigning a new one
      const newPeriod = {
        id: new Date().getTime(),
        ...rest, // Use the rest of the form data
      };
      const updatedPeriods = [...accountingPeriods, newPeriod];
      setAccountingPeriods(updatedPeriods);
      saveAccountingPeriods(updatedPeriods);
      setOpenForm(false);
    },
    [accountingPeriods]
  );

  const handleUpdate = useCallback(
    (updatedPeriodData) => {
      const updatedPeriods = accountingPeriods.map((p) => (p.id === updatedPeriodData.id ? updatedPeriodData : p));
      setAccountingPeriods(updatedPeriods);
      saveAccountingPeriods(updatedPeriods);
      setOpenForm(false);
      setCurrentPeriod(null);
    },
    [accountingPeriods]
  );

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm('Are you sure you want to delete this accounting period?')) {
        const updatedPeriods = accountingPeriods.filter((p) => p.id !== id);
        setAccountingPeriods(updatedPeriods);
        saveAccountingPeriods(updatedPeriods);
      }
    },
    [accountingPeriods]
  );

  const { filteredItems, searchTerm, setSearchTerm } = useTableSearch(accountingPeriods, ['name', 'status']);
  const { data: paginatedData, ...tableProps } = useTable(filteredItems, { defaultSortField: 'startDate', defaultSortDirection: 'desc' });

  return {
    accountingPeriods: paginatedData,
    isLoading,
    openForm,
    setOpenForm,
    currentPeriod,
    setCurrentPeriod,
    handleAdd,
    handleUpdate,
    handleDelete,
    searchTerm,
    setSearchTerm,
    tableProps,
    totalItems: filteredItems.length,
  };
};
