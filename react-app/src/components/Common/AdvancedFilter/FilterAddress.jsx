import { useState, useRef, useEffect } from 'react';

/**
 * Address filter section
 */
const FilterAddress = ({ filters, onUpdateFilter }) => {
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // US States list
  const US_STATES = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStateDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleState = (state) => {
    const currentStates = filters.state || [];
    const newStates = currentStates.includes(state)
      ? currentStates.filter(s => s !== state)
      : [...currentStates, state];
    onUpdateFilter('state', newStates);
  };

  const selectedCount = (filters.state || []).length;

  return (
    <div className="mb-4">
      <h6 className="text-uppercase font-size-12 text-muted mb-3">Address</h6>
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Address Line 1"
            value={filters.addressLine1}
            onChange={(e) => onUpdateFilter('addressLine1', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={filters.city}
            onChange={(e) => onUpdateFilter('city', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Postal Code / Zip"
            value={filters.postalCode}
            onChange={(e) => onUpdateFilter('postalCode', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <div ref={dropdownRef} className="position-relative">
            <div
              className="form-control d-flex align-items-center justify-content-between"
              onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
              style={{ cursor: 'pointer' }}
            >
              <span className={selectedCount === 0 ? 'text-muted' : ''}>
                {selectedCount === 0 ? 'Select States' : `${selectedCount} selected`}
              </span>
              <i className={`mdi mdi-chevron-${isStateDropdownOpen ? 'up' : 'down'} font-size-16`}></i>
            </div>

            {isStateDropdownOpen && (
              <div
                className="dropdown-menu show w-100"
                style={{
                  position: 'absolute',
                  inset: 'auto auto auto 0px',
                  margin: '0px',
                  transform: 'translate(0px, 4px)',
                  maxHeight: '250px',
                  overflowY: 'auto',
                  zIndex: 1050
                }}
              >
                <div className="p-2">
                  <div className="row g-2">
                    {US_STATES.map(state => (
                      <div key={state} className="col-6">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`state-${state}`}
                            checked={(filters.state || []).includes(state)}
                            onChange={() => toggleState(state)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`state-${state}`}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                          >
                            {state}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAddress;
