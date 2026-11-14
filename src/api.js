import apiClient from './services/apiClient'
import { login, logout, getUsuarioActual, estaAutenticado } from './services/authService'
import { getRecursos, getRecursoById } from './services/innovacionService'

export {
  apiClient,
  login,
  logout,
  getUsuarioActual,
  estaAutenticado,
  getRecursos,
  getRecursoById
}

export default {
  apiClient,
  login,
  logout,
  getUsuarioActual,
  estaAutenticado,
  getRecursos,
  getRecursoById
}
