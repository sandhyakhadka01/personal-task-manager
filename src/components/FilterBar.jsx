function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <button
        className={filter === "All" ? "active" : ""}
        onClick={() => onFilterChange("All")}
      >
        All
      </button>

      <button
        className={filter === "Active" ? "active" : ""}
        onClick={() => onFilterChange("Active")}
      >
        Active
      </button>

      <button
        className={filter === "Completed" ? "active" : ""}
        onClick={() => onFilterChange("Completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterBar;