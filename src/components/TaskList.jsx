import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Add your first task to get started.</p>
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