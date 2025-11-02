import { useState, useMemo } from 'react';

/**
 * Table functionality (sorting, pagination)
 * @param {Array} data - Table data
 * @param {Object} config - Configuration options
 * @returns {Object} Table state and handlers
 */
const useDataTable = (data, config = {}) => {
  const {
    defaultSortField = null,
    defaultSortDirection = 'asc',
    pageSize = 10,
  } = config;

  const [sortField, setSortField] = useState(defaultSortField);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField || !data.length) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = sortField.split('.').reduce((obj, key) => obj?.[key], a);
      const bValue = sortField.split('.').reduce((obj, key) => obj?.[key], b);

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    if (!pageSize) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  return {
    data: paginatedData,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems: data.length,
  };
};

export default useDataTable;
