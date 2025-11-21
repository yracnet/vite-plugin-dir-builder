import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import ModuloDropdown from '../../ui/moduloDropdown'

export default function PortalLayout() {
  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Portal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="." >Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="configuracion" >Configuración</Nav.Link>
            <Nav.Link as={NavLink} to="roles" >Roles</Nav.Link>
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
