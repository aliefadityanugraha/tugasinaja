import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export default function NavbarMain() {
  return (
    <Navbar className='bg-gray-200'>
      <NavbarBrand as={Link} href="/">
        <img src="/vite.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black">Flowbite React</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="#">
          <Link to="/">Beranda</Link>
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          <Link to="/tasks">Tugas</Link>
        </NavbarLink>
        <NavbarLink as={Link} href="#">
          <Link to="/portfolios">Portofolio</Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
