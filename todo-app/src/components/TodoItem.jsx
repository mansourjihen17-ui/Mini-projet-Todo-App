function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-row">
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.faite}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.faite ? 'task-text is-complete' : 'task-text'}>
          {task.texte}
        </span>
      </label>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Supprimer ${task.texte}`}
      >
        Supprimer
      </button>
    </li>
  )
}

export default TodoItem
