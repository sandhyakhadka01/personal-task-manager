import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  hasTasks = false,
}) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            {hasTasks ? "🔍" : "✨"}
          </div>

          <h3>
            {hasTasks
              ? "No matching tasks"
              : "Your task list is empty"}
          </h3>

          <p>
            {hasTasks
              ? "Try changing your search or filter."
              : "Add your first task and start getting things done."}
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;