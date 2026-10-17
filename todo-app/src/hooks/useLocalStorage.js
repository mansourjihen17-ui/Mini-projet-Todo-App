import { useEffect } from 'react'
import { STORAGE_KEY } from '../tasksReducer.js'

function useLocalStorage(tasks, dispatch) {
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      dispatch({ type: 'storage-ok' })
    } catch {
      dispatch({
        type: 'storage-error',
        message: 'Les tâches ne peuvent pas être enregistrées sur cet appareil.',
      })
    }
  }, [tasks, dispatch])
}

export default useLocalStorage
