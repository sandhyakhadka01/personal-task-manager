import { useState, useEffect } from "react";

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
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div>
      <Header />

      <TaskForm onAddTask={addTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
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