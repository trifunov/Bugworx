import React from 'react';
import { useFrequencyTemplates } from './useFrequencyTemplates';

const FrequencyTemplates = () => {
    const { settings, handleChange, save } = useFrequencyTemplates();

    return (
        <div className="card">
            <div className="card-header">Job Settings</div>
            <div className="card-body">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Default Status</label>
                        <select className="form-control" name="defaultStatus" value={settings.defaultStatus} onChange={handleChange}>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Numbering Format</label>
                        <input className="form-control" name="numberingFormat" value={settings.numberingFormat} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>SLA (hours)</label>
                        <input className="form-control" type="number" name="slaHours" value={settings.slaHours} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Escalations</label>
                        <textarea className="form-control" name="escalations" value={settings.escalations} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={save}>Save Job Settings</button>
                </div>
            </div>
        </div>
    );
}

export default FrequencyTemplates;