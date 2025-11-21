import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import ModuloDropdown from '../../ui/moduloDropdown'

export default function AdminLayout() {
  return (
    <>
      <Navbar bg="danger" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Administración</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="." >Inicio</Nav.Link>
            <Nav.Link as={Link} to="dashboard" >Panel</Nav.Link>
            <Nav.Link as={Link} to="usuarios" >Usuarios</Nav.Link>
          </Nav>
          <ModuloDropdown />
        </Container>
      </Navbar>
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  )
}
