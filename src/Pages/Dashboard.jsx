// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { api } from '../components/SupabaseHelper'

export default function Dashboard() {
  const [gold, setGold] = useState(0)
  const [adsToday, setAdsToday] = useState(0)
  const [message, setMessage] = useState('')

  // Al cargar, obtiene el oro actual
  useEffect(() => {
    const loadWallet = async () => {
      try {
        const data = await api('/rest/v1/wallets?select=*')
        if (Array.isArray(data) && data.length > 0) setGold(data[0].gold_amount)
      } catch (err) {
        console.error(err)
        setMessage('No se pudo cargar la billetera')
      }
    }
    loadWallet()
  }, [])

  // Registrar un anuncio visto
  const handleAd = async () => {
    setMessage('Viendo anuncio...')
    try {
      const data = await api('/rest/v1/rpc/record_ad_view', { method: 'POST' })
      if (data?.gold_amount !== undefined) {
        setGold(data.gold_amount)
        setAdsToday((prev) => prev + 1)
        setMessage('+100 oro obtenido')
      } else {
        setMessage('Ya alcanzaste el límite de anuncios hoy')
      }
    } catch (err) {
      setMessage('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Tablero del Pirata</h2>
      <p>Bienvenido a tu barco. Aquí puedes ver tu progreso y recolectar oro viendo anuncios.</p>

      <div style={{
        border: '1px solid #ccc',
        padding: 16,
        borderRadius: 8,
        maxWidth: 400,
        marginTop: 16
      }}>
        <p><strong>Oro actual:</strong> {gold} 🪙</p>
        <p><strong>Anuncios vistos hoy:</strong> {adsToday}/20</p>

        <button
          onClick={handleAd}
          style={{
            padding: 10,
            background: '#f5b301',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Ver anuncio (+100 oro)
        </button>

        {message && (
          <p style={{
            marginTop: 10,
            color: message.startsWith('Error') ? 'red' : 'green'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
