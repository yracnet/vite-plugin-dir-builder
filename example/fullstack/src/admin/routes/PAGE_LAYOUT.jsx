import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function AdminLayout() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Administración</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/admin/dashboard">Panel</Nav.Link>
            <Nav.Link as={Link} to="/admin/usuarios">Usuarios</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  )
}
