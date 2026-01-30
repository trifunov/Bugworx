import { useState, useEffect, useMemo } from 'react';
import { getInventory, setInventory as saveInventoryToStorage } from '../../utils/localStorage';

const itemsPerPage = 10;

// --- Helpers ---

// Centralized logic for low stock to ensure Stats and Filters match
const isLowStock = (item) => {
  if (!item.trackStock) return false;
  const reorderPoint = Number(item.reorderPoint);
  const quantity = Number(item.quantity) || 0;

  // Must have a valid positive reorder point
  if (isNaN(reorderPoint) || reorderPoint <= 0) return false;

  return quantity <= reorderPoint;
};

// Extracted sorting logic for cleaner useMemo
const compareItems = (a, b, sortConfig) => {
  const field = sortConfig.field;
  const direction = sortConfig.direction === 'asc' ? 1 : -1;
  let valA = a[field],
    valB = b[field];

  if (field === 'totalValue') {
    valA = (Number(a.quantity) || 0) * (Number(a.costPerUnit) || 0);
    valB = (Number(b.quantity) || 0) * (Number(b.costPerUnit) || 0);
  }

  const isNullishA = valA === undefined || valA === null;
  const isNullishB = valB === undefined || valB === null;
  if (isNullishA && isNullishB) return 0;
  if (isNullishA) return 1;
  if (isNullishB) return -1;

  if (typeof valA === 'string' && typeof valB === 'string') return valA.localeCompare(valB) * direction;
  if (typeof valA === 'boolean' && typeof valB === 'boolean') return (valA === valB ? 0 : valA ? -1 : 1) * direction;
  if (typeof valA === 'number' && typeof valB === 'number') return (valA - valB) * direction;
  return 0;
};

export const useInventory = () => {
  // --- Core State ---
  const [inventory, setInventory] = useState(getInventory() || []);

  // --- UI State (Filters, Sorting, Pagination, Modals) ---
  const [activeView, setActiveView] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortConfig, setSortConfig] = useState({ field: 'itemName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState(0);

  // --- Effects ---
  // Persist inventory to localStorage whenever it changes.
  useEffect(() => {
    saveInventoryToStorage(inventory);
  }, [inventory]);

  // --- Derived Data (Memoized for performance) ---
  const { paginatedInventory, totalItems } = useMemo(() => {
    let filtered = [...inventory];

    // Apply filters
    if (activeView === 'lowStock') {
      filtered = filtered.filter(isLowStock);
    } else if (activeView === 'chemicals') {
      filtered = filtered.filter((item) => item.itemType === 'Chemical');
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.itemName.toLowerCase().includes(lowercasedTerm) ||
          item.sku.toLowerCase().includes(lowercasedTerm) ||
          (item.supplier && item.supplier.toLowerCase().includes(lowercasedTerm))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => compareItems(a, b, sortConfig));

    const totalItems = filtered.length;
    const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return { paginatedInventory: paginatedItems, totalItems };
  }, [inventory, activeView, selectedCategory, searchTerm, sortConfig, currentPage]);

  const categories = useMemo(() => ['All', ...new Set(inventory.map((item) => item.category).filter(Boolean))], [inventory]);

  const stats = useMemo(
    () => ({
      totalItems: inventory.length,
      lowStockItems: inventory.filter(isLowStock).length,
      outOfStock: inventory.filter((item) => item.trackStock && (Number(item.quantity) || 0) === 0 && Number(item.reorderPoint) > 0).length,
      totalValue: inventory.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.costPerUnit) || 0), 0),
      categories: categories.length - 1,
    }),
    [inventory, categories]
  );

  // --- Event Handlers ---
  const handleSort = (field, direction) => {
    setSortConfig((currentConfig) => ({
      field,
      direction: direction || (currentConfig.field === field && currentConfig.direction === 'asc' ? 'desc' : 'asc'),
    }));
    setCurrentPage(1);
  };

  const handleSave = (savedItem) => {
    setInventory((currentInventory) => {
      if (!savedItem.id) {
        // New item: generate ID and add
        const newItem = { ...savedItem, id: `${new Date().getTime()}` };
        return [...currentInventory, newItem];
      }
      // Update existing item. Assumes item with this id exists.
      return currentInventory.map((item) => (item.id === savedItem.id ? savedItem : item));
    });
    setCurrentPage(1);
  };

  const handleDeleteItem = () => {
    if (!selectedItem) return;
    setInventory((prev) => prev.filter((item) => item.id !== selectedItem.id));
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleRestock = () => {
    if (!selectedItem || restockQuantity <= 0) return;
    setInventory((prev) =>
      prev.map((item) => (item.id === selectedItem.id ? { ...item, quantity: Number(item.quantity || 0) + Number(restockQuantity) } : item))
    );
    setShowRestockModal(false);
    setSelectedItem(null);
    setRestockQuantity(0);
  };

  // Helper to escape CSV values
  function escapeCSV(value) {
    const str = value === undefined || value === null ? '' : String(value);
    // Wrap in quotes and escape existing quotes.
    // This handles commas, newlines, and quotes within the data.
    return `"${str.replace(/"/g, '""')}"`;
  }

  const exportToCSV = () => {
    const headers = [
      'SKU',
      'Item Name',
      'Item Type',
      'Category',
      'Quantity',
      'UOM',
      'Cost Per Unit',
      'Total Value',
      'Supplier',
      'Manufacturer',
      'Active',
    ];
    const rows = inventory.map((item) =>
      [
        escapeCSV(item.sku || ''),
        escapeCSV(item.itemName || ''),
        escapeCSV(item.itemType || ''),
        escapeCSV(item.category || ''),
        escapeCSV(Number(item.quantity) || 0),
        escapeCSV(item.uom || ''),
        escapeCSV(Number(item.costPerUnit) || 0),
        escapeCSV(((Number(item.quantity) || 0) * (Number(item.costPerUnit) || 0)).toFixed(2)),
        escapeCSV(item.supplier || ''),
        escapeCSV(item.manufacturer || ''),
        escapeCSV(item.active ? 'Yes' : 'No'),
      ].join(',')
    );

    // Join rows with \r\n for better Windows compatibility
    const csv = [headers.map(escapeCSV).join(','), ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Return all state and handlers needed by the UI
  return {
    paginatedInventory,
    totalItems,
    itemsPerPage,
    activeView,
    setActiveView,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    categories,
    stats,
    handleSave,
    exportToCSV,
    // Modals
    showRestockModal,
    setShowRestockModal,
    showDeleteModal,
    setShowDeleteModal,
    selectedItem,
    setSelectedItem,
    restockQuantity,
    setRestockQuantity,
    handleDeleteItem,
    handleRestock,
  };
};
