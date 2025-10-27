import { useState, useRef, useEffect } from 'react';

const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Search...",
  displayKey = "label",
  valueKey = "value",
  disabled = false,
  error = null,
  searchKeys = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt[valueKey] === value);

  const filteredOptions = options.filter(option => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    // Search in display key
    if (option[displayKey]?.toLowerCase().includes(searchLower)) {
      return true;
    }

    // Search in additional keys if provided
    if (searchKeys.length > 0) {
      return searchKeys.some(key =>
        option[key]?.toString().toLowerCase().includes(searchLower)
      );
    }

    return false;
  });

  const handleSelect = (option) => {
    onChange(option[valueKey]);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <div className={`dropdown ${isOpen ? 'show' : ''}`} style={{ position: 'static' }}>
        <div
          className={`form-control d-flex align-items-center justify-content-between ${error ? 'is-invalid' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={handleInputClick}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer', minHeight: '38px' }}
        >
          <span className={selectedOption ? '' : 'text-muted'}>
            {selectedOption ? selectedOption[displayKey] : placeholder}
          </span>
          <div className="d-flex align-items-center gap-1">
            {value && !disabled && (
              <i
                className="mdi mdi-close font-size-16"
                onClick={handleClear}
                style={{ cursor: 'pointer' }}
              ></i>
            )}
            <i className={`mdi mdi-chevron-${isOpen ? 'up' : 'down'} font-size-16`}></i>
          </div>
        </div>

        {isOpen && !disabled && (
          <div
            className="dropdown-menu show w-100"
            style={{
              position: 'absolute',
              inset: 'auto auto auto 0px',
              margin: '0px',
              transform: 'translate(0px, 38px)',
              maxHeight: '300px',
              overflowY: 'auto'
            }}
          >
            <div className="p-2 border-bottom bg-light">
              <input
                ref={inputRef}
                type="text"
                className="form-control form-control-sm"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {filteredOptions.length === 0 ? (
                <div className="dropdown-item text-muted text-center disabled">
                  No results found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option[valueKey]}
                    className={`dropdown-item ${value === option[valueKey] ? 'active' : ''}`}
                    onClick={() => handleSelect(option)}
                    style={{ cursor: 'pointer' }}
                  >
                    {option[displayKey]}
                    {searchKeys.length > 0 && (
                      <div className="text-muted small">
                        {searchKeys.map(key => option[key]).filter(Boolean).join(' • ')}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default SearchableSelect;
