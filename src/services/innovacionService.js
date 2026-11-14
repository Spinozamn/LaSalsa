import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/v1/admin/recursos'

export async function getRecursos(pagina = 1) {
  const res = await axios.get(`${BASE_URL}?per_page=50&page=${pagina}`)
  return res.data?.data?.data || res.data?.data || []
}

export async function getRecursoById(id) {
  const res = await axios.get(`${BASE_URL}/${id}`)
  return res.data?.data || res.data
}
