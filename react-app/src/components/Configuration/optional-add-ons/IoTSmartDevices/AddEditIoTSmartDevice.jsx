import React from 'react';

const DEVICE_TYPES = [
  'Smart Trap',
  'Motion Sensor',
  'Temperature / Humidity Sensor',
  'CO2 Monitor',
  'Bait Station Monitor',
  'Door / Entry Sensor',
  'Camera / Image Sensor',
  'UV Light Trap',
  'Air Quality Sensor',
  'Gateway / Hub',
  'Other',
];

const PROTOCOLS = ['Wi-Fi', 'Bluetooth', 'Zigbee', 'Z-Wave', 'LoRaWAN', 'NB-IoT', 'Cellular (4G/LTE)', 'Ethernet', 'Other'];

const ALERT_MODES = ['None', 'On Detection', 'On Threshold Breach', 'On Battery Low', 'On Offline', 'Scheduled Report'];

const DEVICE_STATUSES = ['Active', 'Inactive', 'Maintenance', 'Offline', 'Decommissioned'];

const DATA_INTERVALS = ['Real-time', 'Every 5 minutes', 'Every 15 minutes', 'Hourly', 'Every 6 hours', 'Daily'];

const AddEditIoTSmartDevice = ({ isOpen, onClose, onSave, formData, onUpdateFieldHandle, isSaving }) => {
  if (!isOpen) return null;

  const isEditing = formData && formData.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onUpdateFieldHandle(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <>
      <div className='offcanvas offcanvas-end show' style={{ width: '520px' }} tabIndex='-1'>
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title'>{isEditing ? 'Edit IoT Device' : 'Add New IoT Device'}</h5>
          <button type='button' className='btn-close text-reset' onClick={onClose} aria-label='Close' disabled={isSaving} />
        </div>
        <div className='offcanvas-body'>
          <form onSubmit={handleSubmit}>
            {/* Device Name */}
            <div className='mb-3'>
              <label className='form-label'>
                Device Name <span className='text-danger'>*</span>
              </label>
              <input
                name='name'
                className='form-control'
                placeholder='e.g. Trap Sensor — Unit A12'
                required
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            {/* Device Type */}
            <div className='mb-3'>
              <label className='form-label'>Device Type</label>
              <select name='deviceType' className='form-select' value={formData.deviceType || 'Smart Trap'} onChange={handleChange}>
                {DEVICE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Manufacturer / Model */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Manufacturer</label>
                <input
                  name='manufacturer'
                  className='form-control'
                  placeholder='e.g. Anticimex'
                  value={formData.manufacturer || ''}
                  onChange={handleChange}
                />
              </div>
              <div className='col-6'>
                <label className='form-label'>Model</label>
                <input name='model' className='form-control' placeholder='e.g. SMART Trap Pro' value={formData.model || ''} onChange={handleChange} />
              </div>
            </div>

            {/* Serial Number / Device ID */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Serial Number</label>
                <input
                  name='serialNumber'
                  className='form-control'
                  placeholder='e.g. SN-20241234'
                  value={formData.serialNumber || ''}
                  onChange={handleChange}
                />
              </div>
              <div className='col-6'>
                <label className='form-label'>Device ID / MAC Address</label>
                <input
                  name='deviceId'
                  className='form-control'
                  placeholder='e.g. AA:BB:CC:DD:EE:FF'
                  value={formData.deviceId || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Communication Protocol */}
            <div className='mb-3'>
              <label className='form-label'>Communication Protocol</label>
              <select name='protocol' className='form-select' value={formData.protocol || 'Wi-Fi'} onChange={handleChange}>
                {PROTOCOLS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* API / Integration Endpoint */}
            <div className='mb-3'>
              <label className='form-label'>API / Integration Endpoint</label>
              <input
                name='apiEndpoint'
                className='form-control'
                placeholder='e.g. https://api.provider.com/devices/trap-a12'
                value={formData.apiEndpoint || ''}
                onChange={handleChange}
              />
              <div className='form-text'>REST API URL or webhook endpoint provided by the device platform.</div>
            </div>

            {/* API Key / Token */}
            <div className='mb-3'>
              <label className='form-label'>API Key / Access Token</label>
              <input
                name='apiKey'
                type='password'
                className='form-control'
                placeholder='Enter API key or bearer token'
                value={formData.apiKey || ''}
                onChange={handleChange}
                autoComplete='new-password'
              />
            </div>

            {/* Assigned Location */}
            <div className='mb-3'>
              <label className='form-label'>Assigned Location / Zone</label>
              <input
                name='assignedLocation'
                className='form-control'
                placeholder='e.g. Client Site — Warehouse Zone B'
                value={formData.assignedLocation || ''}
                onChange={handleChange}
              />
            </div>

            {/* Installation Date */}
            <div className='row mb-3'>
              <div className='col-6'>
                <label className='form-label'>Installation Date</label>
                <input name='installationDate' type='date' className='form-control' value={formData.installationDate || ''} onChange={handleChange} />
              </div>
              <div className='col-6'>
                <label className='form-label'>Next Maintenance Date</label>
                <input name='maintenanceDate' type='date' className='form-control' value={formData.maintenanceDate || ''} onChange={handleChange} />
              </div>
            </div>

            {/* Data Reporting Interval */}
            <div className='mb-3'>
              <label className='form-label'>Data Reporting Interval</label>
              <select name='dataInterval' className='form-select' value={formData.dataInterval || 'Hourly'} onChange={handleChange}>
                {DATA_INTERVALS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Alert Mode */}
            <div className='mb-3'>
              <label className='form-label'>Alert / Notification Mode</label>
              <select name='alertMode' className='form-select' value={formData.alertMode || 'On Detection'} onChange={handleChange}>
                {ALERT_MODES.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Alert Recipients */}
            <div className='mb-3'>
              <label className='form-label'>Alert Recipients</label>
              <input
                name='alertRecipients'
                className='form-control'
                placeholder='e.g. supervisor@company.com, tech-team@company.com'
                value={formData.alertRecipients || ''}
                onChange={handleChange}
              />
              <div className='form-text'>Comma-separated email addresses or phone numbers.</div>
            </div>

            {/* Device Status */}
            <div className='mb-3'>
              <label className='form-label'>Device Status</label>
              <select name='status' className='form-select' value={formData.status || 'Active'} onChange={handleChange}>
                {DEVICE_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className='mb-3'>
              <label className='form-label'>Notes</label>
              <textarea
                name='notes'
                className='form-control'
                rows={3}
                placeholder='Additional notes about this device, known issues, or configuration details...'
                value={formData.notes || ''}
                onChange={handleChange}
              />
            </div>

            {/* Switches */}
            <div className='mb-4'>
              <div className='form-check form-switch mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='iot-send-alerts'
                  name='sendAlerts'
                  checked={formData.sendAlerts === true}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='iot-send-alerts'>
                  Send Alerts When Triggered
                </label>
              </div>
              <div className='form-check form-switch mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='iot-log-data'
                  name='logData'
                  checked={formData.logData !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='iot-log-data'>
                  Log Sensor Data
                </label>
              </div>
              <div className='form-check form-switch mb-2'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='iot-active'
                  name='active'
                  checked={formData.active !== false}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='iot-active'>
                  Active
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className='d-flex justify-content-end gap-2 border-top pt-3'>
              <button type='button' className='btn btn-light' onClick={onClose} disabled={isSaving}>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary' disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className='spinner-border spinner-border-sm me-1' role='status' aria-hidden='true' />
                    Saving...
                  </>
                ) : isEditing ? (
                  'Save Changes'
                ) : (
                  'Add Device'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='offcanvas-backdrop fade show' onClick={!isSaving ? onClose : undefined} />
    </>
  );
};

export default AddEditIoTSmartDevice;
