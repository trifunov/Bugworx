const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      <i className="bx bx-search-alt search-icon"></i>
    </div>
  );
};

export default SearchBar;
