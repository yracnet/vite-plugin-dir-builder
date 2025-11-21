import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import ModuloDropdown from '../../ui/moduloDropdown'

export default function PublicSiteLayout() {
  return (
    <>
      <Navbar bg="warning" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Public Site</Navbar.Brand>
          <ModuloDropdown />
        </Container>
      </Navbar>
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  )
}
