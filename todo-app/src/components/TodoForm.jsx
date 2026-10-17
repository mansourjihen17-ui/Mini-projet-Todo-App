import { useState } from 'react'

function TodoForm({ inputRef, onAdd }) {
  const [texte, setTexte] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedText = texte.trim()
    if (!trimmedText) {
      inputRef.current?.focus()
      return
    }

    onAdd(trimmedText)
    setTexte('')
    inputRef.current?.focus()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">
        Nouvelle tâche
      </label>
      <input
        id="new-task"
        ref={inputRef}
        type="text"
        value={texte}
        onChange={(event) => setTexte(event.target.value)}
        placeholder="Nouvelle tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>
  )
}

export default TodoForm
