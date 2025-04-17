const STORAGE_KEY = 'taskList'
export const saveToLocalStorage = (tasks) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
export const loadFromLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {}
}
