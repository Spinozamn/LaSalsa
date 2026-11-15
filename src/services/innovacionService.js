import apiClient from './apiClient'

export async function getRecursos() {
  const respuesta = await apiClient.get('/recursos', {
    params: {
      per_page: 50
    }
  })
  if (respuesta.status === 200 && respuesta.data.success) {
    return respuesta.data.data.data || []
  }
  throw new Error('Respuesta inesperada del servidor')
}

export async function getRecursoById(id) {
  const respuesta = await apiClient.get(`/recursos/${id}`)
  if (respuesta.status === 200 && respuesta.data.success) {
    return respuesta.data.data
  }
  throw new Error('No se encontro el recurso solicitado')
}

export default {
  getRecursos,
  getRecursoById
}
