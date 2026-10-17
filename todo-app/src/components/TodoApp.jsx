import { useMemo, useReducer, useRef, useState } from 'react'
import FilterBar from './FilterBar.jsx'
import TodoForm from './TodoForm.jsx'
import TodoList from './TodoList.jsx'
import { readTasks, tasksReducer } from '../tasksReducer.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

function TodoApp() {
  const [state, dispatch] = useReducer(tasksReducer, undefined, readTasks)
  const [filter, setFilter] = useState('all')
  const inputRef = useRef(null)

  useLocalStorage(state.tasks, dispatch)

  const visibleTasks = useMemo(
    () =>
      state.tasks.filter((task) => {
        if (filter === 'active') return !task.faite
        if (filter === 'completed') return task.faite
        return true
      }),
    [filter, state.tasks],
  )
  const remainingTasks = useMemo(
    () => state.tasks.filter((task) => !task.faite).length,
    [state.tasks],
  )

  function addTask(texte) {
    dispatch({
      type: 'ajouter',
      id: Math.max(0, ...state.tasks.map((task) => task.id)) + 1,
      texte,
    })
  }

  return (
    <main className="page">
      <h1>Todo App</h1>

      <section className="todo-card" aria-labelledby="tasks-heading">
        <h2 id="tasks-heading">Mes tâches</h2>
        <TodoForm inputRef={inputRef} onAdd={addTask} />
        <FilterBar filter={filter} onFilterChange={setFilter} />
        <TodoList
          tasks={visibleTasks}
          onToggle={(id) => dispatch({ type: 'basculer', id })}
          onDelete={(id) => dispatch({ type: 'supprimer', id })}
        />
        <p className="remaining-count">
          {remainingTasks} tâche{remainingTasks === 1 ? '' : 's'} restante
          {remainingTasks === 1 ? '' : 's'}
        </p>
        {state.storageError && (
          <p className="storage-error" role="status">
            {state.storageError}
          </p>
        )}
      </section>
    </main>
  )
}

export default TodoApp
