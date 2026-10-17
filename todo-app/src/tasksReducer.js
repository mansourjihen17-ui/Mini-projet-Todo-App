export const STORAGE_KEY = 'mini-projet-todo-tasks'

export const initialTasks = [
  { id: 1, texte: 'Revoir useState', faite: true },
  { id: 2, texte: 'Coder le reducer', faite: false },
  { id: 3, texte: 'Ajouter useLocalStorage', faite: false },
]

export function readTasks() {
  try {
    const savedTasks = window.localStorage.getItem(STORAGE_KEY)
    if (savedTasks === null) return { tasks: initialTasks, storageError: '' }

    const parsedTasks = JSON.parse(savedTasks)
    if (!Array.isArray(parsedTasks)) {
      throw new Error('Les tâches enregistrées sont invalides.')
    }

    const tasks = parsedTasks.map((task) => {
      const texte = task.texte ?? task.text
      const faite = task.faite ?? task.completed
      if (
        typeof task.id !== 'number' ||
        typeof texte !== 'string' ||
        typeof faite !== 'boolean'
      ) {
        throw new Error('Les tâches enregistrées sont invalides.')
      }
      return { id: task.id, texte, faite }
    })

    return { tasks, storageError: '' }
  } catch {
    return {
      tasks: initialTasks,
      storageError: 'Impossible de lire les tâches enregistrées.',
    }
  }
}

export function tasksReducer(state, action) {
  switch (action.type) {
    case 'ajouter':
      return {
        ...state,
        tasks: [...state.tasks, { id: action.id, texte: action.texte, faite: false }],
      }
    case 'basculer':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, faite: !task.faite } : task,
        ),
      }
    case 'supprimer':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      }
    case 'storage-error':
      return state.storageError === action.message
        ? state
        : { ...state, storageError: action.message }
    case 'storage-ok':
      return state.storageError ? { ...state, storageError: '' } : state
    default:
      return state
  }
}
