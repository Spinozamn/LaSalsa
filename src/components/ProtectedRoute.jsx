import { Navigate, useLocation } from 'react-router-dom'
import { estaAutenticado } from '../services/authService'

export default function ProtectedRoute({ children }) {
  const location = useLocation()

  if (!estaAutenticado()) {
    return <Navigate to="/login" replace state={{ from: location, accesoDenegado: true }} />
  }

  return children
}
