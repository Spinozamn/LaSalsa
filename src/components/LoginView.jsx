import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login, estaAutenticado } from '../services/authService'

export default function LoginView() {
  const navigate = useNavigate()
  const location = useLocation()

  const [identificador, setIdentificador] = useState('admin@thesauce.test')
  const [password, setPassword] = useState('Admin1234#')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (estaAutenticado()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const accesoDenegado = location.state?.accesoDenegado

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)

    try {
      await login(identificador.trim(), password)
      const destino = location.state?.from?.pathname || '/dashboard'
      navigate(destino, { replace: true })
    } catch {
      setError('Credenciales incorrectas')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-pantalla">
      <div className="login-card">
        <h1 className="login-titulo">LaSalsa</h1>

        {accesoDenegado && !error && (
          <div className="alerta-error-login">Inicia sesion para continuar</div>
        )}

        {error && (
          <div className="alerta-error-login">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="login-formulario">
          <input
            type="text"
            className="campo-input"
            placeholder="Usuario o correo"
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
            disabled={cargando}
            required
          />

          <input
            type="password"
            className="campo-input"
            placeholder="Contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cargando}
            required
          />

          <button
            type="submit"
            className="btn-login-submit"
            disabled={cargando}
          >
            {cargando ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
