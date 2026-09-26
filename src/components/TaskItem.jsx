import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  function handleSave() {
    if (!editTitle.trim()) return;

    onEdit(task.id, editTitle.trim());
    setIsEditing(false);
  }

  function getDayName(dateString) {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-area">
          <input
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <>
          <div className="task-info">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />

            <div>
              <h3>{task.title}</h3>

              <div className="task-details">
                <span>{task.category}</span>
                <span>•</span>
                <span>
                  {getDayName(task.date)}, {formatDate(task.date)}
                </span>
                <span>•</span>
                <span>{task.timeOfDay}</span>
              </div>
            </div>
          </div>

          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>

            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;