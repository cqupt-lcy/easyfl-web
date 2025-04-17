const RESULT_KEY = 'taskResults'
export const saveResultsToLocal = (results) => {
      localStorage.setItem(RESULT_KEY, JSON.stringify(results))
}
export const loadResultsFromLocal = () => {
  const data = localStorage.getItem(RESULT_KEY)
  return data ? JSON.parse(data) : {}
}
