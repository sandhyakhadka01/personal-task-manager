import logo from "../assets/logo.png";

function Sidebar({ filter, onFilterChange }) {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <img
          src={logo}
          alt="Personal Task Manager logo"
          className="sidebar-logo-image"
        />
      </div>

      <nav className="sidebar-menu">

        <button
          className={filter === "All" ? "sidebar-active" : ""}
          onClick={() => onFilterChange("All")}
        >
          🏠 Dashboard
        </button>

        <button
          className={filter === "All" ? "sidebar-active" : ""}
          onClick={() => onFilterChange("All")}
        >
          📋 All Tasks
        </button>

        <button
          className={filter === "Active" ? "sidebar-active" : ""}
          onClick={() => onFilterChange("Active")}
        >
          ⏳ Active
        </button>

        <button
          className={filter === "Completed" ? "sidebar-active" : ""}
          onClick={() => onFilterChange("Completed")}
        >
          ✅ Completed
        </button>

      </nav>

      
    </aside>
  );
}

export default Sidebar;