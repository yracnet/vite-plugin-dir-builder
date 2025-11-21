import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

export default function ModuloDropdown() {
  return (
    <NavDropdown title="Módulos" className="ms-3">
      <NavDropdown.Item as={NavLink} to="/admin">Admin</NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/portal">Portal</NavDropdown.Item>
      <NavDropdown.Item as={NavLink} to="/auth">Auth</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={NavLink} to="/">Inicio público</NavDropdown.Item>
    </NavDropdown>
  )
}
