function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <button onClick={() => onFilterChange("All")}>
        All
      </button>

      <button onClick={() => onFilterChange("Active")}>
        Active
      </button>

      <button onClick={() => onFilterChange("Completed")}>
        Completed
      </button>
    </div>
  );
}

export default FilterBar;