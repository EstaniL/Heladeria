import { Link, NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget'
import "./NavBar.css"

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink to='/' className="navbar">Heladeria</NavLink>
        <NavLink to='/categoria/postres' className="navbar">Postres</NavLink>
        <NavLink to='/categoria/tortas' className="navbar">Tortas</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

          </Nav>
          <Link to="/cart">
            <CartWidget />
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default NavBar