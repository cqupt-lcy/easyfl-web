// import DashboardPage from '../pages/DashboardPage'
// import HistoryPage from '../pages/HistoryPage'
import DashBoard from '../pages/DashBoard'
import TaskPage from '../pages/TaskPage'
import WelcomePage from '../pages/WelcomePage'
// import NotFoundPage from '../pages/NotFoundPage'

const routes = [
  {
    path: '/dashboard',
    element: <DashBoard />
  },
  {
    path: '/history',
    element: <WelcomePage />
  },
  {
     path: '/task/:taskId',
     element: <TaskPage />
  },
  {
    path: '*',
    element: <DashBoard />
  }
]

export default routes