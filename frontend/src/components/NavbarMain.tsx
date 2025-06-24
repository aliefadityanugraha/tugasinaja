import { Link } from 'react-router-dom'

export default function NavbarMain() {
  return (
    <>
      <Link to="/">Beranda</Link>
    
      <Link to="/tasks">Tugas</Link>
    
      <Link to="/portfolios">Portofolio</Link>
    </>
  )
}
