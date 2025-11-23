import { useState, useEffect } from 'react';

const AccordionItem = ({ id, title, children, isOpen, onToggle, className }) => (
     <div className={`card mb-1 shadow-none ${className || ''}`}>
        <a
            href={`#collapse-${id}`}
            className={`text-dark ${!isOpen ? 'collapsed' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                onToggle(id);
            }}
            aria-expanded={isOpen}
            aria-controls={`collapse-${id}`}
        >
             <div className="card-header" id={`heading-${id}`}>
                <h6 className="m-0">
                    {title}
                    <i className={`mdi ${isOpen ? 'mdi-minus' : 'mdi-plus'} float-end accor-plus-icon`}></i>
                 </h6>
             </div>
         </a>
            <div id={`collapse-${id}`} className={`collapse ${isOpen ? 'show' : ''}`} aria-labelledby={`heading-${id}`}>
                <div className="card-body">
                {children}
                </div>
            </div>
    </div>
);

const Switch = ({ label, name, checked, onChange, disabled }) => (
    <div className="form-check form-switch mb-3">
        <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id={name}
            name={name}
            checked={checked}
            onChange={e => onChange(name, e.target.checked)}
            disabled={disabled}
        />
        <label className="form-check-label" htmlFor={name}>{label}</label>
    </div>
);

const AddEditInventory = ({ isOpen, formData, errors, isSaving, onUpdateFieldHandle, onClose, onSave }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [openAccordions, setOpenAccordions] = useState({ general: true });

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsMounted(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsMounted(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (formData.itemType === 'Chemical') {
            setOpenAccordions(prev => ({ ...prev, chem: true }));
        }
    }, [formData.itemType]);

    const toggleAccordion = (id) => {
        setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleFieldChange = (e) => {
        onUpdateFieldHandle(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        onUpdateFieldHandle(e.target.name, e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className={`offcanvas  offcanvas-end ${isMounted ? 'show' : ''}`} style={{ width: '45%' }} tabIndex="-1">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="invTitle">{formData.id ? 'Edit Inventory Item' : 'Add Inventory Item'}</h5>
                    <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close" disabled={isSaving}></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleSubmit} id="itemForm" noValidate>
                        <div>
                            {/* General Information */}
                            <AccordionItem id="general" title="General Information" className="custom-accordion" isOpen={openAccordions.general} onToggle={toggleAccordion}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="itemName" className="form-label">Item Name</label>
                                        <input
                                            id="itemName"
                                            name="itemName"
                                            className={`form-control ${errors.itemName ? 'is-invalid' : ''}`}
                                            value={formData.itemName}
                                            onChange={handleFieldChange}
                                            required
                                            aria-describedby={errors.itemName ? "itemName-error" : undefined}
                                        />
                                        {errors.itemName && <div className="invalid-feedback" id="itemName-error">{errors.itemName}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="sku" className="form-label">Item Code / SKU</label>
                                        <input
                                            id="sku"
                                            name="sku"
                                            className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
                                            value={formData.sku}
                                            onChange={handleFieldChange}
                                            required
                                            aria-describedby={errors.sku ? "sku-error" : undefined}
                                        />
                                        {errors.sku && <div className="invalid-feedback" id="sku-error">{errors.sku}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="itemType" className="form-label">Item Type</label>
                                        <select
                                            id="itemType"
                                            name="itemType"
                                            className={`form-select ${errors.itemType ? 'is-invalid' : ''}`}
                                            value={formData.itemType}
                                            onChange={handleFieldChange}
                                            required
                                            aria-describedby={errors.itemType ? "itemType-error" : undefined}
                                        >
                                            <option value="">Select type…</option><option>Chemical</option><option>Device</option><option>Trap</option><option>Bait Station</option><option>PPE</option><option>Equipment</option><option>Consumable</option><option>Tool</option><option>Vehicle Supply</option><option>Marketing Material</option><option>Other</option>
                                        </select>
                                        {errors.itemType && <div className="invalid-feedback" id="itemType-error">{errors.itemType}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select id="category" name="category" className="form-select" value={formData.category} onChange={handleFieldChange}>
                                            <option value="">Select category…</option><option>Rodent Control</option><option>Insect Control</option><option>Termite Control</option><option>Disinfection</option><option>Safety</option><option>Administrative</option><option>General Supplies</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="subCategory" className="form-label">Sub-Category</label>
                                        <select id="subCategory" name="subCategory" className="form-select" value={formData.subCategory} onChange={handleFieldChange}>
                                            <option value="">Select sub-category…</option><option>Gel</option><option>Trap</option><option>Spray</option>
                                        </select>
                                    </div>
                                     <div className="col-md-6">
                                        <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                                        <select id="manufacturer" name="manufacturer" className="form-select" value={formData.manufacturer} onChange={handleFieldChange}>
                                            <option value="">Select manufacturer…</option><option>Bayer</option><option>BASF</option><option>Syngenta</option><option>Rentokil</option><option>Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="supplier" className="form-label">Supplier / Vendor</label>
                                        <select id="supplier" name="supplier" className="form-select" value={formData.supplier} onChange={handleFieldChange}>
                                            <option value="">Select supplier…</option><option>ABC Supply Co.</option><option>Global Pest Supplies</option><option>PestTech Distributors</option><option>Other</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleFieldChange}></textarea>
                                    </div>
                                    <div className="col-12">
                                        <Switch label="Active" name="active" checked={formData.active} onChange={onUpdateFieldHandle} disabled={isSaving} />
                                    </div>
                                </div>
                            </AccordionItem>

                            {/* Chemical & Compliance */}
                            {formData.itemType === 'Chemical' && (
                                <AccordionItem id="chem" title="Chemical & Compliance" className="custom-accordion" isOpen={openAccordions.chem} onToggle={toggleAccordion}>
                                    <div className="row g-3">
                                        <div className="col-md-6"><label htmlFor="epa" className="form-label">EPA / Registration Number</label><input id="epa" name="epa" className="form-control" value={formData.epa} onChange={handleFieldChange} /></div>
                                        <div className="col-md-6"><label htmlFor="activeIng" className="form-label">Active Ingredient(s)</label><input id="activeIng" name="activeIng" className="form-control" value={formData.activeIng} onChange={handleFieldChange} /></div>
                                        <div className="col-md-6"><label htmlFor="concentration" className="form-label">Concentration / Dilution Ratio</label><input id="concentration" name="concentration" className="form-control" value={formData.concentration} onChange={handleFieldChange} /></div>
                                        <div className="col-md-6">
                                            <label htmlFor="formulationType" className="form-label">Formulation Type</label>
                                            <select id="formulationType" name="formulationType" className="form-select" value={formData.formulationType} onChange={handleFieldChange}>
                                                <option value="">Select formulation type…</option>
                                                <option>Liquid</option>
                                                <option>Gel</option>
                                                <option>Dust</option>
                                                <option>Aerosol</option>
                                            </select>
                                        </div>
                                          <div className="col-md-6">
                                            <label htmlFor="hazardClassification" className="form-label">Hazard Classification</label>
                                            <select id="hazardClassification" name="hazardClassification" className="form-select" value={formData.hazardClassification} onChange={handleFieldChange}>
                                                <option value="">Select hazard classification…</option>
                                                <option>Flammable</option>
                                                <option>Toxic</option>
                                                <option>Non-hazardous</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="sds" className="form-label">Safety Data Sheet (SDS)</label>
                                            <input id="sds" name="sds" className="form-control" type="file" accept=".pdf" onChange={handleFileChange} />
                                            <input id="sdsUrl" name="sdsUrl" className="form-control mt-2" placeholder="Or paste URL: https://example.com/sds.pdf" value={formData.sdsUrl} onChange={handleFieldChange} />
                                        </div>
                                        <div className="col-md-6"><label htmlFor="expiry" className="form-label">Expiration Date</label><input id="expiry" name="expiry" className="form-control" type="date" value={formData.expiry} onChange={handleFieldChange} /></div>
                                        <div className="col-12"><Switch label="Batch Tracking Enabled" name="batchEnabled" checked={formData.batchEnabled} onChange={onUpdateFieldHandle} disabled={isSaving} /></div>
                                    </div>
                                </AccordionItem>
                            )}

                            {/* Stock & Units */}
                            <AccordionItem id="stock" title="Stock & Units" className="custom-accordion" isOpen={openAccordions.stock} onToggle={toggleAccordion}>
                                <div className="row g-3">
                                    <div className="col-md-6"><label htmlFor="uom" className="form-label">Unit of Measure</label><select id="uom" name="uom" className="form-select" value={formData.uom} onChange={handleFieldChange}><option value="">Select unit…</option><option>Piece</option><option>Pack</option><option>Box</option><option>Litre</option><option>Gallon</option></select></div>
                                    <div className="col-md-6"><label htmlFor="quantity" className="form-label">Quantity per Unit</label><input id="quantity" name="quantity" className={`form-control`} type="number" value={formData.quantity} onChange={handleFieldChange} /></div>
                                    <div className="col-md-6"><label htmlFor="minStock" className="form-label">Minimum Stock Level</label><input id="minStock" name="minStock" className={`form-control`} type="number" value={formData.minStock} onChange={handleFieldChange} /></div>
                                      {formData.trackStock && (
                                        <>
                                            <div className="col-md-6"><label htmlFor="reorderPoint" className="form-label">Reorder Point</label><input id="reorderPoint" name="reorderPoint" className={`form-control ${errors.reorderPoint ? 'is-invalid' : ''}`} type="number" value={formData.reorderPoint} onChange={handleFieldChange} /></div>
                                            <div className="col-md-6"><label htmlFor="reorderQuantity" className="form-label">Reorder Quantity</label><input id="reorderQuantity" name="reorderQuantity" className={`form-control ${errors.reorderQuantity ? 'is-invalid' : ''}`} type="number" value={formData.reorderQuantity} onChange={handleFieldChange} /></div>
                                        </>
                                    )}
                                    <div className="col-md-6"><label htmlFor="costPerUnit" className="form-label">Cost per Unit</label><input id="costPerUnit" name="costPerUnit" className={`form-control ${errors.costPerUnit ? 'is-invalid' : ''}`} type="number" step="0.01" value={formData.costPerUnit} onChange={handleFieldChange} /></div>
                                    <div className="col-md-6"><label htmlFor="sellingPricePerUnit" className="form-label">Selling Price per Unit</label><input id="sellingPricePerUnit" name="sellingPricePerUnit" className={`form-control ${errors.sellingPricePerUnit ? 'is-invalid' : ''}`} type="number" step="0.01" value={formData.sellingPricePerUnit} onChange={handleFieldChange} /></div>
                                    <div className="col-md-6"><Switch label="Track Stock Level" name="trackStock" checked={formData.trackStock} onChange={onUpdateFieldHandle} disabled={isSaving} /></div>
                                    <div className="col-md-6">
                                            <label htmlFor="warehouseLocation" className="form-label">Warehouse Location</label>
                                            <select id="warehouseLocation" name="warehouseLocation" className="form-select" value={formData.warehouseLocation} onChange={handleFieldChange}>
                                                <option value="">Select warehouse location…</option>
                                                <option>Main Warehouse</option>
                                                <option>Technician Vehicle</option>
                                            </select>
                                    </div>
                                     <div className="col-md-6">
                                            <label htmlFor="storageRequirements" className="form-label">Storage Requirements</label>
                                            <select id="storageRequirements" name="storageRequirements" className="form-select" value={formData.storageRequirements} onChange={handleFieldChange}>
                                                <option value="">Select storage requirements…</option>
                                                <option>Room Temperature</option>
                                                <option>Locked Store</option>
                                            </select>
                                    </div>
                                     <div className="col-md-6"><label htmlFor="barcode" className="form-label">Barcode / QR Code</label>
                                        <input id="barcode" name="barcode" className="form-control"  readOnly={!formData.serialized} 
                                            placeholder={!formData.serialized ? 'Enable "Serialized Item" to use' : 'Enter barcode'} value={formData.barcode} onChange={handleFieldChange} />
                                     </div>
                                     <div className="col-12"><Switch label="Serialized Item" name="serialized" checked={formData.serialized} onChange={onUpdateFieldHandle} disabled={isSaving} /></div>
                            </div>
                            </AccordionItem>

                            {/* Usage & Assignment */}
                            <AccordionItem id="usage" title="Usage & Assignment" className="custom-accordion" isOpen={openAccordions.usage} onToggle={toggleAccordion}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                                        <select id="assignedTo" name="assignedTo" className="form-select" value={formData.assignedTo} onChange={handleFieldChange}>
                                            <option value="">Select…</option><option>Technician</option><option>Vehicle</option><option>Region</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="defaultUsageUnit" className="form-label">Default Usage Unit</label>
                                        <select id="defaultUsageUnit" name="defaultUsageUnit" className="form-select" value={formData.defaultUsageUnit} onChange={handleFieldChange}>
                                            <option value="">Select…</option><option>ml</option><option>g</option><option>pcs</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6"><Switch label="Track Per Site" name="trackPerSite" checked={formData.trackPerSite} onChange={onUpdateFieldHandle} disabled={isSaving} /></div>
                                    <div className="col-md-6"><Switch label="Returnable Item" name="returnable" checked={formData.returnable} onChange={onUpdateFieldHandle} disabled={isSaving} /></div>
                                    <div className="col-md-6"><Switch label="Allow Negative Stock" name="negativeStock" checked={formData.negativeStock} onChange={onUpdateFieldHandle} disabled={isSaving} /></div>
                                </div>
                            </AccordionItem>

                            {/* Admin & Notes */}
                            <AccordionItem id="admin" title="Admin & Notes" className="custom-accordion" isOpen={openAccordions.admin} onToggle={toggleAccordion}>
                                <div className="row g-3">
                                    <div className="col-md-6"><label htmlFor="createdBy" className="form-label">Created By</label><input id="createdBy" name="createdBy" className="form-control" value={formData.createdBy} onChange={handleFieldChange} /></div>
                                    <div className="col-md-6"><label htmlFor="updatedBy" className="form-label">Last Updated By</label><input id="updatedBy" name="updatedBy" className="form-control" value={formData.updatedBy} onChange={handleFieldChange} /></div>
                                    <div className="col-12"><label htmlFor="notes" className="form-label">Notes / Internal Comments</label><textarea id="notes" name="notes" className="form-control" value={formData.notes} onChange={handleFieldChange}></textarea></div>
                                </div>
                            </AccordionItem>
                        </div>

                        {errors.submit && <div className="alert alert-danger mt-3" role="alert">{errors.submit}</div>}

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success" disabled={isSaving}>
                                {isSaving ? 'Saving...' : (formData.id ? 'Save Changes' : 'Add Item')}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`offcanvas-backdrop fade ${isMounted ? 'show' : ''}`} onClick={isSaving ? undefined : onClose}></div>
        </>
    );
};

export default AddEditInventory;