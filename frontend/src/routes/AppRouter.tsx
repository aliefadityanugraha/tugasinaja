import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import TaskPage from '../pages/TaskPage'
import PortfolioPage from '../pages/PortfolioPage'
import DetailTaskPage from '../pages/DetailTaskPage'
import LoginPage from '@/pages/LoginPage'
import MainLayouts from '@/layouts/MainLayouts'
import { ProtectedRoute, TeacherOrAdminRoute } from '@/components/ProtectedRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path='/auth/login' element={<LoginPage />} /> */}

        <Route element={<MainLayouts />}>
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/tasks" element={
            <ProtectedRoute>
              <TaskPage />
            </ProtectedRoute>
          } />
          <Route path="/portfolios" element={
            <ProtectedRoute>
              <PortfolioPage />
            </ProtectedRoute>
          } />
          <Route path="/tasks/detail/:id" element={
            <ProtectedRoute>
              <DetailTaskPage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
