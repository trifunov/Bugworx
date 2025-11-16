import { useState, useEffect } from 'react';
import { usePageSubHeader } from '../../contexts/PageSubHeaderContext';
import AddNewButton from '../../components/Common/AddNewButton';
import { useEditableFormContext } from '../../contexts/EditableFormContext';
import AddEditInventory from '../../components/InventoryDetails/AddEditInventory';
import Table from '../../components/Common/Table/Table';
import { useInventory } from './useInventory';

// Column definitions are constant and can live outside the component
const columns = [
    { label: 'SKU', accessor: 'sku', sortable: true },
    { label: 'Item Name', accessor: 'itemName', sortable: true },
    { label: 'Category', accessor: 'category', sortable: false },
    { label: 'Quantity', accessor: 'quantity', sortable: true },
    { label: 'Reorder Point', accessor: 'reorderPoint', sortable: false },
    { label: 'Cost', accessor: 'cost', sortable: true },
    { label: 'Total Value', accessor: 'totalValue', sortable: true },
    { label: 'Status', accessor: 'status', sortable: false },
    { label: 'Actions', accessor: 'actions', sortable: false },
];
const columnNames = columns.map(c => c.label);
const sortableColumns = columns.reduce((acc, col) => {
    if (col.sortable) acc[col.label] = col.accessor;
    return acc;
}, {});

const Inventory = () => {
    const { setPageSubHeader } = usePageSubHeader();
    const { addEditInventory } = useEditableFormContext();

    // All logic and state is now managed by the custom hook
    const {
        paginatedInventory,
        totalItems,
        itemsPerPage,
        activeView, setActiveView,
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        sortConfig, handleSort,
        currentPage, setCurrentPage,
        categories,
        stats,
        handleSave,
        exportToCSV,
        showRestockModal, setShowRestockModal,
        showDeleteModal, setShowDeleteModal,
        selectedItem, setSelectedItem,
        restockQuantity, setRestockQuantity,
        handleDeleteItem,
        handleRestock
    } = useInventory();

    // Effect for setting the page header
    useEffect(() => {
        setPageSubHeader({
            title: 'Inventory Management',
            breadcrumbs: [{ label: 'Inventory Management', path: '/inventory' }]
        });
    }, [setPageSubHeader]);
 

    const renderRow = (item) => {
    const quantity = Number(item.quantity) || 0;
    const cost = Number(item.cost) || 0;
    const reorderPoint = Number(item.reorderPoint) || 0;
    const isLowStock = item.trackStock && quantity <= reorderPoint;
    const isOutOfStock = item.trackStock && quantity === 0;
    const totalValue = quantity * cost;

    return (
      <tr key={item.id}>
        <td><strong>{item.sku}</strong></td>
        <td>{item.itemName}</td>
        <td><span className="badge badge-soft-primary">{item.category}</span></td>
        <td><strong className={isOutOfStock ? 'text-danger' : isLowStock ? 'text-warning' : ''}>{quantity} {item.uom}</strong></td>
        <td>{item.trackStock ? `${reorderPoint} ${item.uom}` : 'N/A'}</td>
        <td>${cost.toFixed(2)}</td>
        <td><strong>${totalValue.toFixed(2)}</strong></td>
        <td>
          {!item.trackStock ? (<span className="badge badge-soft-secondary">Untracked</span>)
            : isOutOfStock ? (<span className="badge badge-soft-danger">Out of Stock</span>)
            : isLowStock ? (<span className="badge badge-soft-warning">Low Stock</span>)
            : (<span className="badge badge-soft-success">In Stock</span>)
          }
        </td>
        <td>
          <div className="d-flex gap-3">
            <a
              className={`text-success${!item.trackStock ? ' text-muted disabled' : ''}`}
              href="#"
              title="Restock"
              onClick={(e) => {
                e.preventDefault();
                if (!item.trackStock) return;
                setSelectedItem(item);
                setShowRestockModal(true);
              }}
              tabIndex={item.trackStock ? 0 : -1}
              aria-disabled={!item.trackStock}
            >
              <i className="mdi mdi-package-variant font-size-18"></i>
            </a>
            <a className="text-primary" href="#" title="Edit" onClick={(e) => { e.preventDefault(); addEditInventory.open(item); }}><i className="mdi mdi-pencil font-size-18"></i></a>
            <a className="text-danger" href="#" title="Delete" onClick={(e) => { e.preventDefault(); setSelectedItem(item); setShowDeleteModal(true); }}><i className="mdi mdi-delete font-size-18"></i></a>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <AddEditInventory
        isOpen={addEditInventory.isOpen}
        formData={addEditInventory.formData}
        errors={addEditInventory.errors}
        isSaving={addEditInventory.isSaving}
        onUpdateFieldHandle={addEditInventory.onUpdateFieldHandle}
        onClose={addEditInventory.close}
        onSave={() => addEditInventory.onSaveHandle(handleSave)}
      />

      {/* Page Title & Actions */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="page-title-right">
              <button className="btn btn-success me-2" onClick={exportToCSV}>
                <i className="mdi mdi-download me-1"></i> Export CSV
              </button>
              <AddNewButton handleAddNew={() => addEditInventory.open()} />
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
                    <span className="text-danger me-2">{stats.outOfStock} Out of Stock</span>
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
                  <h4 className="mb-2">${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
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
                <div className="col-md-3 mb-3 mb-md-0">
                  <div className="btn-group" role="group">
                    <button className={`btn ${activeView === 'all' ? 'btn-primary' : 'btn-soft-primary'}`} onClick={() => setActiveView('all')}>All Items</button>
                    <button className={`btn ${activeView === 'lowStock' ? 'btn-warning' : 'btn-soft-warning'}`} onClick={() => setActiveView('lowStock')}>Low Stock</button>
                    <button className={`btn ${activeView === 'chemicals' ? 'btn-info' : 'btn-soft-info'}`} onClick={() => setActiveView('chemicals')}>Chemicals</button>
                  </div>
                </div>
                <div className="col-md-3 mb-3 mb-md-0"><select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}</select></div>
                <div className="col-md-3 mb-3 mb-md-0"><select className="form-select" value={sortConfig.field} onChange={(e) => handleSort(e.target.value)}><option value="itemName">Sort by Name</option><option value="quantity">Sort by Quantity</option><option value="totalValue">Sort by Value</option></select></div>
                <div className="col-md-3"><input type="text" className="form-control" placeholder="Search inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
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
              <Table
                columns={columnNames}
                sortableColumns={sortableColumns}
                data={paginatedInventory}
                renderRow={renderRow}
                pagination={{
                  currentPage: currentPage,
                  totalPages: Math.ceil(totalItems / itemsPerPage),
                  onPageChange: setCurrentPage,
                }}
                emptyState={{
                  icon: 'mdi mdi-package-variant-closed',
                  message: 'No items found'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Restock Modal */}
      {showRestockModal && selectedItem && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header"><h5 className="modal-title">Restock Item</h5><button type="button" className="btn-close" onClick={() => { setShowRestockModal(false); setSelectedItem(null); setRestockQuantity(0); }}></button></div>
                <div className="modal-body">
                  <div className="mb-3"><h6>{selectedItem.itemName}</h6><p className="text-muted mb-2">SKU: {selectedItem.sku}</p>
                    <div className="alert alert-info">
                      <div className="d-flex justify-content-between"><span>Current Stock:</span><strong>{selectedItem.quantity || 0} {selectedItem.uom}</strong></div>
                      <div className="d-flex justify-content-between"><span>Reorder Point:</span><strong>{selectedItem.reorderPoint || 0} {selectedItem.uom}</strong></div>
                    </div>
                  </div>
                  <div className="mb-3"><label className="form-label">Restock Quantity *</label><input type="number" className="form-control" value={restockQuantity} onChange={(e) => setRestockQuantity(e.target.value)} min="1" placeholder="Enter quantity to add" /></div>
                  {restockQuantity > 0 && (
                    <div className="alert alert-success">
                      <div className="d-flex justify-content-between"><span>New Stock Level:</span><strong>{Number(selectedItem.quantity || 0) + Number(restockQuantity)} {selectedItem.uom}</strong></div>
                      <div className="d-flex justify-content-between"><span>Estimated Cost:</span><strong>${(restockQuantity * (selectedItem.cost || 0)).toFixed(2)}</strong></div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => { setShowRestockModal(false); setSelectedItem(null); setRestockQuantity(0); }}>Cancel</button>
                  <button type="button" className="btn btn-success" onClick={handleRestock} disabled={!restockQuantity || restockQuantity <= 0}><i className="mdi mdi-package-variant me-1"></i>Confirm Restock</button>
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
                <div className="modal-header"><h5 className="modal-title">Confirm Delete</h5><button type="button" className="btn-close" onClick={() => { setShowDeleteModal(false); setSelectedItem(null); }}></button></div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this item?</p>
                  <div className="alert alert-warning"><strong>{selectedItem.itemName}</strong><br />SKU: {selectedItem.sku}<br />Current Stock: {selectedItem.quantity || 0} {selectedItem.uom}</div>
                  <p className="text-danger mb-0"><i className="mdi mdi-alert me-1"></i>This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedItem(null); }}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteItem}><i className="mdi mdi-delete me-1"></i>Delete Item</button>
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