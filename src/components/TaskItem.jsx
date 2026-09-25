import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  function handleSave() {
    if (!editTitle.trim()) return;

    onEdit(task.id, editTitle.trim());
    setIsEditing(false);
  }

  return (
    <div>
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />

          <span>
            {task.title} - {task.category}
          </span>

          <button onClick={() => setIsEditing(true)}>Edit</button>

          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;