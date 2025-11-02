import { useState, useMemo } from 'react';

/**
 * @param {Array} items - Array of items to filter
 * @param {Array} searchableFields - Fields to search in (e.g., ['name', 'email'])
 * @returns {Object} { filteredItems, searchTerm, setSearchTerm, hasResults }
 */
const useTableSearch = (items, searchableFields) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const query = searchTerm.toLowerCase();

    return items.filter((item) => {
      return searchableFields.some((field) => {
        // Handle nested fields (e.g., 'address.city')
        const value = field.split('.').reduce((obj, key) => obj?.[key], item);

        if (value === null || value === undefined) {
          return false;
        }

        return String(value).toLowerCase().includes(query);
      });
    });
  }, [items, searchTerm, searchableFields]);

  return {
    filteredItems,
    searchTerm,
    setSearchTerm,
    hasResults: filteredItems.length > 0,
    totalResults: filteredItems.length,
  };
};

export default useTableSearch;
