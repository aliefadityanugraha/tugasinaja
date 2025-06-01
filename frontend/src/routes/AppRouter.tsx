import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import TaskPage from '../pages/TaskPage'
import PortfolioPage from '../pages/PortfolioPage'
import AddTaskForm from '../pages/AddTaskForm'


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/portfolios" element={<PortfolioPage />} />
        <Route path="/add-task" element={<AddTaskForm />} />
      </Routes>
    </Router>
  )
}