import { programTypes, programStatuses } from '../../../data/mockData';

const AddEditProgram = ({ isOpen, formData, errors, isSaving, onUpdateField, onClose, onSave }) => {
	if (!isOpen) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave();
	};

	return (
		<>
			<div
				className={`offcanvas offcanvas-end show`}
				tabIndex="-1"
				style={{ width: '720px', maxWidth: '95vw' }}
			>
				<div className="offcanvas-header">
					<h5 className="offcanvas-title">
						{formData.id && formData.id !== 0 ? 'Edit Program' : 'Add Program'}
					</h5>
					<button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
				</div>
				<div className="offcanvas-body offcanvas-scrollable">
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="programName" className="form-label">Program Name</label>
							<input
								type="text"
								className={`form-control ${errors.name ? 'is-invalid' : ''}`}
								id="programName"
								value={formData.name || ''}
								onChange={(e) => onUpdateField('name', e.target.value)}
								disabled={isSaving}
							/>
							{errors.name && <div className="invalid-feedback">{errors.name}</div>}
						</div>

						<div className="mb-3">
							<label htmlFor="serviceAddressId" className="form-label">Service Address ID</label>
							<input
								type="number"
								className={`form-control ${errors.serviceAddressId ? 'is-invalid' : ''}`}
								id="serviceAddressId"
								value={formData.serviceAddressId ?? ''}
								onChange={(e) => onUpdateField('serviceAddressId', e.target.value === '' ? '' : Number(e.target.value))}
								disabled={isSaving}
								placeholder="e.g. 1"
								min="0"
							/>
							{errors.serviceAddressId && <div className="invalid-feedback">{errors.serviceAddressId}</div>}
							<small className="text-muted">Enter the related service address ID.</small>
						</div>

						<div className="row">
							<div className="col-md-6 mb-3">
								<label htmlFor="programTypeId" className="form-label">Program Type</label>
								<select
									className="form-select"
									id="programTypeId"
									value={formData.programTypeId ?? ''}
									onChange={(e) => onUpdateField('programTypeId', e.target.value ? Number(e.target.value) : '')}
									disabled={isSaving}
								>
									<option value="">Select type...</option>
									{programTypes.map(type => (
										<option key={type.id} value={type.id}>{type.label}</option>
									))}
								</select>
							</div>
							<div className="col-md-6 mb-3">
								<label htmlFor="statusId" className="form-label">Status</label>
								<select
									className="form-select"
									id="statusId"
									value={formData.statusId ?? ''}
									onChange={(e) => onUpdateField('statusId', e.target.value ? Number(e.target.value) : '')}
									disabled={isSaving}
								>
									<option value="">Select status...</option>
									{programStatuses.map(status => (
										<option key={status.id} value={status.id}>{status.label}</option>
									))}
								</select>
							</div>
						</div>

						<div className="row">
							<div className="col-md-4 mb-3">
								<label htmlFor="startDate" className="form-label">Start Date</label>
								<input
									type="date"
									className="form-control"
									id="startDate"
									value={formData.startDate || ''}
									onChange={(e) => onUpdateField('startDate', e.target.value)}
									disabled={isSaving}
								/>
							</div>
							<div className="col-md-4 mb-3">
								<label htmlFor="endDate" className="form-label">End Date</label>
								<input
									type="date"
									className="form-control"
									id="endDate"
									value={formData.endDate || ''}
									onChange={(e) => onUpdateField('endDate', e.target.value)}
									disabled={isSaving}
								/>
							</div>
							<div className="col-md-4 mb-3">
								<label htmlFor="renewalDate" className="form-label">Renewal Date</label>
								<input
									type="date"
									className="form-control"
									id="renewalDate"
									value={formData.renewalDate || ''}
									onChange={(e) => onUpdateField('renewalDate', e.target.value)}
									disabled={isSaving}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6 mb-3">
								<label htmlFor="contractDuration" className="form-label">Contract Duration</label>
								<select
									className="form-select"
									id="contractDuration"
									value={formData.contractDuration || ''}
									onChange={(e) => onUpdateField('contractDuration', e.target.value)}
									disabled={isSaving}
								>
									<option value="">Select duration...</option>
									<option value="12 months">12 months</option>
									<option value="24 months">24 months</option>
									<option value="36 months">36 months</option>
								</select>
							</div>
							<div className="col-md-6 mb-3">
								<label htmlFor="programCategory" className="form-label">Program Category</label>
								<select
									className="form-select"
									id="programCategory"
									value={formData.programCategory || ''}
									onChange={(e) => onUpdateField('programCategory', e.target.value)}
									disabled={isSaving}
								>
									<option value="">Select category...</option>
									<option value="Contractual">Contractual</option>
									<option value="Prepaid">Prepaid</option>
									<option value="On-Demand">On-Demand</option>
								</select>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="accountManager" className="form-label">Account Manager</label>
							<input
								type="text"
								className="form-control"
								id="accountManager"
								value={formData.accountManager || ''}
								onChange={(e) => onUpdateField('accountManager', e.target.value)}
								disabled={isSaving}
								placeholder="e.g. Manager A"
							/>
						</div>

						<h6 className="mt-4 mb-3 text-uppercase text-muted" style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
							Compliance (optional)
						</h6>

						<div className="mb-3">
							<label htmlFor="termsAndConditions" className="form-label">Terms &amp; Conditions</label>
							<textarea
								className="form-control"
								id="termsAndConditions"
								rows="2"
								value={formData.termsAndConditions || ''}
								onChange={(e) => onUpdateField('termsAndConditions', e.target.value)}
								disabled={isSaving}
							></textarea>
						</div>

						<div className="mb-3">
							<label htmlFor="regulatoryRequirements" className="form-label">Regulatory Requirements</label>
							<textarea
								className="form-control"
								id="regulatoryRequirements"
								rows="2"
								value={formData.regulatoryRequirements || ''}
								onChange={(e) => onUpdateField('regulatoryRequirements', e.target.value)}
								disabled={isSaving}
							></textarea>
						</div>

						{errors.submit && (
							<div className="alert alert-danger" role="alert">
								{errors.submit}
							</div>
						)}

						<div className="d-flex gap-2">
							<button type="submit" className="btn btn-success" disabled={isSaving}>
								{isSaving ? (
									<>
										<span className="spinner-border spinner-border-sm me-2"></span>
										Saving...
									</>
								) : (
									formData.id && formData.id !== 0 ? 'Save Program' : 'Add Program'
								)}
							</button>
							<button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="offcanvas-backdrop fade show" onClick={onClose}></div>
		</>
	);
};

export default AddEditProgram;

