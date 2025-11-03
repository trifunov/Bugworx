import { useState, useEffect } from 'react';
import { getInventory, setInventory } from '../utils/localStorage';
import { usePageSubHeader } from '../contexts/PageSubHeaderContext';

const Inventory = () => {
  const { setPageSubHeader } = usePageSubHeader();
  const [inventory, setInventoryState] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  // View and filter state
  const [activeView, setActiveView] = useState('all'); // all, lowStock, chemicals
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // name, quantity, value

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Chemical',
    sku: '',
    quantity: 0,
    unit: 'Gallons',
    reorderLevel: 0,
    supplier: '',
    unitCost: 0,
    activeIngredient: '',
    epaNumber: '',
    expiryDate: ''
  });

  // Restock state
  const [restockQuantity, setRestockQuantity] = useState(0);

  // Load inventory on mount
  useEffect(() => {
    loadInventory();
  }, []);

  // Filter and search inventory
  useEffect(() => {
    let filtered = [...inventory];

    // Apply view filter
    if (activeView === 'lowStock') {
      filtered = filtered.filter(item => item.quantity <= item.reorderLevel);
    } else if (activeView === 'chemicals') {
      filtered = filtered.filter(item =>
        item.category === 'Chemical' ||
        item.category === 'Pesticide' ||
        item.category === 'Herbicide'
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.productName.localeCompare(b.productName);
        case 'quantity':
          return a.quantity - b.quantity;
        case 'value':
          return (b.quantity * b.unitCost) - (a.quantity * a.unitCost);
        default:
          return 0;
      }
    });

    setFilteredInventory(filtered);
    setPageSubHeader({
      title: 'Inventory Management',
      breadcrumbs: [
        { label: 'Inventory Management', path: '/inventory' }
      ]
    });

  }, [inventory, activeView, selectedCategory, searchTerm, sortBy, setPageSubHeader]);

  const loadInventory = () => {
    setInventoryState(getInventory());
  };

  // Get unique categories
  const categories = ['All', ...new Set(inventory.map(item => item.category))];

  // Calculate stats
  const stats = {
    totalItems: inventory.length,
    lowStockItems: inventory.filter(item => item.quantity <= item.reorderLevel).length,
    outOfStock: inventory.filter(item => item.quantity === 0).length,
    totalValue: inventory.reduce((sum, item) => sum + (item.quantity * (item.unitCost || item.costPerUnit || 0)), 0),
    categories: new Set(inventory.map(item => item.category)).size
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'reorderLevel' || name === 'unitCost'
        ? parseFloat(value) || 0
        : value
    }));
  };

  // Add new item
  const handleAddItem = () => {
    const newItem = {
      ...formData,
      id: Date.now(),
      lastRestocked: new Date().toISOString().split('T')[0]
    };

    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);
    setInventoryState(updatedInventory);
    setShowAddModal(false);
    resetForm();
  };

  // Edit item
  const handleEditItem = () => {
    const updatedInventory = inventory.map(item =>
      item.id === selectedItem.id ? { ...item, ...formData } : item
    );
    setInventory(updatedInventory);
    setInventoryState(updatedInventory);
    setShowEditModal(false);
    setSelectedItem(null);
    resetForm();
  };

  // Delete item
  const handleDeleteItem = () => {
    const updatedInventory = inventory.filter(item => item.id !== selectedItem.id);
    setInventory(updatedInventory);
    setInventoryState(updatedInventory);
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  // Restock item
  const handleRestock = () => {
    const updatedInventory = inventory.map(item =>
      item.id === selectedItem.id
        ? {
            ...item,
            quantity: item.quantity + restockQuantity,
            lastRestocked: new Date().toISOString().split('T')[0]
          }
        : item
    );
    setInventory(updatedInventory);
    setInventoryState(updatedInventory);
    setShowRestockModal(false);
    setSelectedItem(null);
    setRestockQuantity(0);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      productName: '',
      category: 'Chemical',
      sku: '',
      quantity: 0,
      unit: 'Gallons',
      reorderLevel: 0,
      supplier: '',
      unitCost: 0,
      activeIngredient: '',
      epaNumber: '',
      expiryDate: ''
    });
  };

  // Open edit modal
  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      productName: item.productName,
      category: item.category,
      sku: item.sku,
      quantity: item.quantity,
      unit: item.unit,
      reorderLevel: item.reorderLevel,
      supplier: item.supplier,
      unitCost: item.unitCost || item.costPerUnit || 0,
      activeIngredient: item.activeIngredient || '',
      epaNumber: item.epaNumber || '',
      expiryDate: item.expiryDate || ''
    });
    setShowEditModal(true);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['SKU', 'Product Name', 'Category', 'Quantity', 'Unit', 'Reorder Level', 'Unit Cost', 'Total Value', 'Supplier', 'Last Restocked'];
    const rows = inventory.map(item => {
      const unitCost = item.unitCost || item.costPerUnit || 0;
      return [
        item.sku,
        item.productName,
        item.category,
        item.quantity,
        item.unit,
        item.reorderLevel,
        unitCost,
        (item.quantity * unitCost).toFixed(2),
        item.supplier,
        item.lastRestocked || 'N/A'
      ];
    });

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <>
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="page-title-right">
              <button
                className="btn btn-success me-2"
                onClick={exportToCSV}
              >
                <i className="mdi mdi-download me-1"></i>
                Export CSV
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <i className="mdi mdi-plus me-1"></i>
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-truncate font-size-14 mb-2">Total Items</p>
                  <h4 className="mb-2">{stats.totalItems}</h4>
                </div>
                <div className="avatar-sm">
                  <span className="avatar-title bg-light text-primary rounded-3">
                    <i className="mdi mdi-package-variant font-size-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-truncate font-size-14 mb-2">Low Stock Items</p>
                  <h4 className="mb-2 text-warning">{stats.lowStockItems}</h4>
                  <p className="text-muted mb-0">
                    <span className="text-danger me-2">
                      {stats.outOfStock} Out of Stock
                    </span>
                  </p>
                </div>
                <div className="avatar-sm">
                  <span className="avatar-title bg-light text-warning rounded-3">
                    <i className="mdi mdi-alert-circle-outline font-size-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-truncate font-size-14 mb-2">Total Value</p>
                  <h4 className="mb-2">${stats.totalValue.toFixed(2)}</h4>
                </div>
                <div className="avatar-sm">
                  <span className="avatar-title bg-light text-success rounded-3">
                    <i className="mdi mdi-cash font-size-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <p className="text-truncate font-size-14 mb-2">Categories</p>
                  <h4 className="mb-2">{stats.categories}</h4>
                </div>
                <div className="avatar-sm">
                  <span className="avatar-title bg-light text-info rounded-3">
                    <i className="mdi mdi-shape font-size-24"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and View Tabs */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <div className="mb-3 mb-md-0">
                    <div className="btn-group" role="group">
                      <button
                        className={`btn ${activeView === 'all' ? 'btn-primary' : 'btn-soft-primary'}`}
                        onClick={() => setActiveView('all')}
                      >
                        All Items
                      </button>
                      <button
                        className={`btn ${activeView === 'lowStock' ? 'btn-warning' : 'btn-soft-warning'}`}
                        onClick={() => setActiveView('lowStock')}
                      >
                        Low Stock
                      </button>
                      <button
                        className={`btn ${activeView === 'chemicals' ? 'btn-info' : 'btn-soft-info'}`}
                        onClick={() => setActiveView('chemicals')}
                      >
                        Chemicals
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="quantity">Sort by Quantity</option>
                    <option value="value">Sort by Value</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search inventory..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>SKU</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Reorder Level</th>
                      <th>Unit Cost</th>
                      <th>Total Value</th>
                      <th>Supplier</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          <i className="mdi mdi-package-variant-closed display-4 text-muted"></i>
                          <p className="text-muted mt-2">No items found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredInventory.map((item) => {
                        const isLowStock = item.quantity <= item.reorderLevel;
                        const isOutOfStock = item.quantity === 0;
                        const unitCost = item.unitCost || item.costPerUnit || 0;
                        const totalValue = (item.quantity * unitCost).toFixed(2);

                        return (
                          <tr key={item.id}>
                            <td><strong>{item.sku}</strong></td>
                            <td>{item.productName}</td>
                            <td>
                              <span className="badge badge-soft-primary">
                                {item.category}
                              </span>
                            </td>
                            <td>
                              <strong className={isOutOfStock ? 'text-danger' : isLowStock ? 'text-warning' : ''}>
                                {item.quantity} {item.unit}
                              </strong>
                            </td>
                            <td>{item.reorderLevel} {item.unit}</td>
                            <td>${unitCost.toFixed(2)}</td>
                            <td><strong>${totalValue}</strong></td>
                            <td>{item.supplier}</td>
                            <td>
                              {isOutOfStock ? (
                                <span className="badge badge-soft-danger">Out of Stock</span>
                              ) : isLowStock ? (
                                <span className="badge badge-soft-warning">Low Stock</span>
                              ) : (
                                <span className="badge badge-soft-success">In Stock</span>
                              )}
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-soft-success"
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setShowRestockModal(true);
                                  }}
                                  title="Restock"
                                >
                                  <i className="mdi mdi-package-variant"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-soft-primary"
                                  onClick={() => openEditModal(item)}
                                  title="Edit"
                                >
                                  <i className="mdi mdi-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-soft-danger"
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setShowDeleteModal(true);
                                  }}
                                  title="Delete"
                                >
                                  <i className="mdi mdi-delete"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {showAddModal ? 'Add New Item' : 'Edit Item'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={formData.productName}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">SKU *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sku"
                        value={formData.sku}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category *</label>
                      <select
                        className="form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                      >
                        <option>Chemical</option>
                        <option>Pesticide</option>
                        <option>Herbicide</option>
                        <option>Equipment</option>
                        <option>Rodent Control</option>
                        <option>Safety Equipment</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Supplier *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Quantity *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleFormChange}
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Unit *</label>
                      <select
                        className="form-select"
                        name="unit"
                        value={formData.unit}
                        onChange={handleFormChange}
                      >
                        <option>Gallons</option>
                        <option>Bottles</option>
                        <option>Envelopes</option>
                        <option>Tubes</option>
                        <option>Pounds</option>
                        <option>Units</option>
                        <option>Pairs</option>
                        <option>Cartridges</option>
                        <option>Jugs</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Reorder Level *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="reorderLevel"
                        value={formData.reorderLevel}
                        onChange={handleFormChange}
                        min="0"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Unit Cost ($) *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="unitCost"
                        value={formData.unitCost}
                        onChange={handleFormChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleFormChange}
                      />
                    </div>
                    {(formData.category === 'Chemical' || formData.category === 'Pesticide' || formData.category === 'Herbicide') && (
                      <>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Active Ingredient</label>
                          <input
                            type="text"
                            className="form-control"
                            name="activeIngredient"
                            value={formData.activeIngredient}
                            onChange={handleFormChange}
                            placeholder="e.g., Fipronil 9.1%"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">EPA Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="epaNumber"
                            value={formData.epaNumber}
                            onChange={handleFormChange}
                            placeholder="e.g., EPA Reg. No. 7969-210"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={showAddModal ? handleAddItem : handleEditItem}
                  >
                    <i className="mdi mdi-check me-1"></i>
                    {showAddModal ? 'Add Item' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Restock Modal */}
      {showRestockModal && selectedItem && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Restock Item</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowRestockModal(false);
                      setSelectedItem(null);
                      setRestockQuantity(0);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <h6>{selectedItem.productName}</h6>
                    <p className="text-muted mb-2">SKU: {selectedItem.sku}</p>
                    <div className="alert alert-info">
                      <div className="d-flex justify-content-between">
                        <span>Current Stock:</span>
                        <strong>{selectedItem.quantity} {selectedItem.unit}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Reorder Level:</span>
                        <strong>{selectedItem.reorderLevel} {selectedItem.unit}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Restock Quantity *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={restockQuantity}
                      onChange={(e) => setRestockQuantity(parseFloat(e.target.value) || 0)}
                      min="0"
                      placeholder="Enter quantity to add"
                    />
                  </div>
                  {restockQuantity > 0 && (
                    <div className="alert alert-success">
                      <div className="d-flex justify-content-between">
                        <span>New Stock Level:</span>
                        <strong>{selectedItem.quantity + restockQuantity} {selectedItem.unit}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Estimated Cost:</span>
                        <strong>${(restockQuantity * (selectedItem.unitCost || selectedItem.costPerUnit || 0)).toFixed(2)}</strong>
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setShowRestockModal(false);
                      setSelectedItem(null);
                      setRestockQuantity(0);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleRestock}
                    disabled={restockQuantity <= 0}
                  >
                    <i className="mdi mdi-package-variant me-1"></i>
                    Confirm Restock
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedItem && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedItem(null);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this item?</p>
                  <div className="alert alert-warning">
                    <strong>{selectedItem.productName}</strong><br />
                    SKU: {selectedItem.sku}<br />
                    Current Stock: {selectedItem.quantity} {selectedItem.unit}
                  </div>
                  <p className="text-danger mb-0">
                    <i className="mdi mdi-alert me-1"></i>
                    This action cannot be undone.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedItem(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteItem}
                  >
                    <i className="mdi mdi-delete me-1"></i>
                    Delete Item
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default Inventory;
