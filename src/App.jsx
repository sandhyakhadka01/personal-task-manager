import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("personalTaskManagerTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "personalTaskManagerTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function addTask(newTask) {
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  function clearCompletedTasks() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    );
  }

  function editTask(id, newTitle) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    );
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const visibleTasks = tasks
    .filter((task) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Active" && !task.completed) ||
        (filter === "Completed" && task.completed);

      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (!sortByPriority) return 0;

      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return (
        (priorityOrder[a.priority] || 2) -
        (priorityOrder[b.priority] || 2)
      );
    });

  return (
    <div className="app">
      <Header />

      <TaskForm onAddTask={addTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
      />

      <div className="task-stats">
        <span>Total: {totalTasks}</span>
        <span>Completed: {completedTasks}</span>
        <span>Pending: {pendingTasks}</span>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span>Today's Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

     <div className="task-controls">

      <input
        className="search-box"
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button
        className="sort-button"
        onClick={() => setSortByPriority(!sortByPriority)}
      >
        {sortByPriority ? "Normal Order" : "Sort by Priority"}
      </button>

      <button
        className="clear-button"
        onClick={clearCompletedTasks}
      >
        Clear Completed
      </button>

      </div>

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
        hasTasks={tasks.length > 0}
      />

      {showBackToTop && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;