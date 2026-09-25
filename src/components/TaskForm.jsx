import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("College");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      title: title.trim(),
      category,
      completed: false,
    });

    setTitle("");
    setCategory("College");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task"
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option>College</option>
        <option>Personal</option>
        <option>Work</option>
        <option>Urgent</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;