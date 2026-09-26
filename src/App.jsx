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

  useEffect(() => {
  localStorage.setItem(
    "personalTaskManagerTasks",
    JSON.stringify(tasks)
  );
}, [tasks]);

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

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;