import AppRouter from './routes/AppRouter'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from './contexts/AuthContext'

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </ThemeProvider>
  )
}


