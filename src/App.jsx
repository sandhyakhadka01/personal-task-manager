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

  function editTask(id, newTitle) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    );
  }

const visibleTasks = tasks.filter((task) => {
  const matchesFilter =
    filter === "All" ||
    (filter === "Active" && !task.completed) ||
    (filter === "Completed" && task.completed);

  const matchesSearch = task.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  return matchesFilter && matchesSearch;
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