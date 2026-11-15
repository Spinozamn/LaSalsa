import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecursos, getRecursoById } from '../services/innovacionService'
import { getUsuarioActual, logout } from '../services/authService'
import RecursoCard from './RecursoCard'
import RecursoDetailModal from './RecursoDetailModal'

export default function DashboardView() {
  const navigate = useNavigate()
  const [usuario] = useState(() => getUsuarioActual())
  const [recursos, setRecursos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [recursoSeleccionado, setRecursoSeleccionado] = useState(null)

  const verDetalle = useCallback((item) => {
    setRecursoSeleccionado(item)
    getRecursoById(item.id)
      .then((data) => {
        setRecursoSeleccionado((prev) => (prev && prev.id === item.id ? { ...prev, ...data } : prev))
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    let activo = true
    getRecursos()
      .then((data) => {
        if (activo) {
          setRecursos(data)
          setCargando(false)
        }
      })
      .catch(() => {
        if (activo) {
          setError('Error al cargar datos')
          setCargando(false)
        }
      })

    return () => {
      activo = false
    }
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="dashboard-contenedor">
      <header className="navbar-admin">
        <span className="navbar-titulo-app">LaSalsa</span>
        <div className="navbar-usuario-zona">
          <span className="usuario-nombre">{usuario?.email || 'admin@thesauce.test'}</span>
          <button
            type="button"
            className="btn-logout"
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      </header>

      <main className="dashboard-cuerpo">
        {cargando && (
          <div className="estado-cargando">
            <div className="spinner"></div>
          </div>
        )}

        {error && !cargando && (
          <div className="alerta-error">
            <p>{error}</p>
            <button
              type="button"
              className="btn-reintentar"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        )}

        {!cargando && !error && (
          <div className="recursos-grid">
            {recursos.map((item) => (
              <RecursoCard
                key={item.id}
                item={item}
                onVerDetalle={verDetalle}
              />
            ))}
          </div>
        )}

        {recursoSeleccionado && (
          <RecursoDetailModal
            detalle={recursoSeleccionado}
            onClose={() => setRecursoSeleccionado(null)}
          />
        )}
      </main>
    </div>
  )
}
