import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function PortalLayout() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Portal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/portal/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/portal/configuracion">Configuración</Nav.Link>
            <Nav.Link as={Link} to="/portal/roles">Roles</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  )
}
