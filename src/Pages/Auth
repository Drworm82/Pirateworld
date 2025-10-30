import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, setSession, getErrorMessage } from '../components/SupabaseHelper'

export default function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await api('/auth/v1/signup', { method: 'POST', body: { email, password } })
        const loginData = await api('/auth/v1/token?grant_type=password', {
          method: 'POST', body: { email, password }
        })
        setSession(loginData)
        navigate('/Dashboard')
      } else {
        const data = await api('/auth/v1/token?grant_type=password', {
          method: 'POST', body: { email, password }
        })
        setSession(data)
        navigate('/Dashboard')
      }
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 54px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        width: 380, padding: 20, border: '1px solid #ddd', borderRadius: 8
      }}>
        <h1 style={{ marginTop: 0 }}>Piratas del Código</h1>
        <p style={{ color: '#666', marginTop: -8 }}>
          {isSignUp ? '¡Únete a la tripulación!' : '¡Zarpa hacia la aventura!'}
        </p>

        {error && (
          <div style={{
            background: '#fee', border: '1px solid #f99', padding: 10,
            borderRadius: 6, color: '#900', marginBottom: 12
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleAuth}>
          <div style={{ marginBottom: 10 }}>
            <label>Email</label><br />
            <input
              type="email"
              placeholder="capitan@barco.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Contraseña</label><br />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%', padding: 8 }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: 10,
              background: '#f5b301', border: 'none', borderRadius: 6,
              fontWeight: 700, cursor: 'pointer'
            }}
          >
            {loading ? 'Navegando…' : (isSignUp ? 'Registrarse' : 'Entrar')}
          </button>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError('') }}
              style={{ background: 'none', border: 'none', color: '#f5b301', cursor: 'pointer' }}
            >
              {isSignUp ? '¿Ya tienes cuenta? Entra aquí' : '¿Nuevo pirata? Regístrate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
