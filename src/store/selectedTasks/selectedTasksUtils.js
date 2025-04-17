//不需要保存
const STORAGE_KEY = 'selectedTasks'
export const saveToLocalStorage = (selectedTasks) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedTasks))
}
export const loadFromLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}
