import apiClient from './apiClient'

export async function login(identificador, password) {
  const respuesta = await apiClient.post('/login', {
    email: identificador,
    usuario: identificador,
    password
  })
  if (respuesta.status === 200 && respuesta.data.success) {
    const { token, administrador } = respuesta.data.data
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(administrador))
    return { token, administrador }
  }
  throw new Error(respuesta.data?.message || 'Error de autenticacion')
}

export async function logout() {
  try {
    await apiClient.post('/logout')
  } catch {
  } finally {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }
}

export function getUsuarioActual() {
  const data = localStorage.getItem('auth_user')
  if (!data) return null
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}

export function estaAutenticado() {
  return Boolean(localStorage.getItem('auth_token'))
}

export default {
  login,
  logout,
  getUsuarioActual,
  estaAutenticado
}
