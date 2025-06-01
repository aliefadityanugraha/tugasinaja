import AppRouter from './routes/AppRouter'
import { ThemeConfig } from "flowbite-react";

function App() {

  return (
    <>
      <ThemeConfig dark={false} />
      <AppRouter />
    </>
  )
}

export default App
