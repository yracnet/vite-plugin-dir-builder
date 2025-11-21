import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

export default function RolesLayout() {
  return (
    <div>
      <div className="mb-3">
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link as={Link} to="." >Inicio</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="lista" >Lista de roles</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="permisos" >Permisos</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Outlet />
    </div>
  )
}
