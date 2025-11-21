import React from 'react'
import { useParams } from 'react-router-dom'

export default function UsuarioDetallePage() {
  const params = useParams()
  return (
    <div className="container py-4">
      <h3>Detalle de usuario</h3>
      <p>Mostrando detalle para el usuario con id: {params.id}</p>
      <p>Reemplaza este contenido con los campos y acciones necesarias para editar o ver al usuario.</p>
    </div>
  )
}
