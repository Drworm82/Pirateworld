// Conector genérico a Supabase REST + manejo de sesión en localStorage

export function setSession({ access_token, user }) {
  if (access_token) localStorage.setItem('sb_access_token', access_token)
  if (user?.id) localStorage.setItem('sb_user_id', user.id)
}

export function clearSession() {
  localStorage.removeItem('sb_access_token')
  localStorage.removeItem('sb_user_id')
}

export function getToken() {
  return localStorage.getItem('sb_access_token') || ''
}

export function getUserId() {
  return localStorage.getItem('sb_user_id') || ''
}

export async function api(path, { method = 'GET', body } = {}) {
  const base = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  const url = `${base}${path}`
  const token = getToken()

  const headers = {
    apikey: anon,
    'Content-Type': 'application/json'
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined })
  const text = await res.text()
  let data = null
  try { data = text ? JSON.parse(text) : null } catch { data = text }

  if (!res.ok) {
    const msg = data?.error_description || data?.message || data || res.statusText
    throw new Error(msg)
  }
  return data
}

export function getErrorMessage(err) {
  if (!err) return 'Error desconocido'
  const msg = String(err.message || err)
  if (msg.includes('Invalid login credentials')) return 'Credenciales inválidas'
  if (msg.includes('Email rate limit')) return 'Demasiados intentos. Intenta más tarde.'
  if (msg.includes('Network')) return 'Problema de red. Revisa tu conexión.'
  return msg
}
