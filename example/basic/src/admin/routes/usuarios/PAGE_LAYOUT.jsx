import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

export default function UsuariosLayout() {
  return (
    <div>
      <h3>Modulo de Usuarios</h3>
      <div className="mb-3">
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link as={Link} to="." >Inicio</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="lista" >Lista de usuarios</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="detalle/1" >Detalle (ejemplo)</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Outlet />
    </div>
  )
}
