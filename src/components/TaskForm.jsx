import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("College");
  const [date, setDate] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("Morning");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !date) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      category,
      date,
      timeOfDay,
      priority,
      completed: false,
    };

    onAddTask(newTask);

    setTitle("");
    setDate("");
    setTimeOfDay("Morning");
    setPriority("Medium");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
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

      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <select
        value={timeOfDay}
        onChange={(event) => setTimeOfDay(event.target.value)}
      >
        <option>🌅Morning</option>
        <option>🌇Evening</option>
        <option>🌙Night</option>
      </select>

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;