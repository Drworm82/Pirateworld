// src/Pages/Parcels.jsx
import React, { useState } from 'react'
import { api } from '../components/SupabaseHelper'

export default function Parcels() {
  const [prefix, setPrefix] = useState('')
  const [list, setList] = useState([])
  const [message, setMessage] = useState('')

  const handleClaim = async () => {
    setMessage('Reclamando...')
    try {
      await api(`/rest/v1/rpc/claim_parcel`, {
        method: 'POST',
        body: { p_geohash: prefix }
      })
      setMessage('Parcela reclamada con éxito')
    } catch (err) {
      setMessage('Error: ' + err.message)
    }
  }

  const handleList = async () => {
    setMessage('Listando...')
    try {
      const data = await api(`/rest/v1/rpc/list_parcels_by_geohash_prefix`, {
        method: 'POST',
        body: { p_prefix: prefix, p_limit: 50 }
      })
      setList(data)
      setMessage('')
    } catch (err) {
      setMessage('Error: ' + err.message)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Parcelas (islas)</h2>
      <p>Ingresa un prefijo (por ejemplo: <code>cdmx_</code>)</p>
      <input
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
        placeholder="Prefijo de geohash"
        style={{ padding: 8, width: '100%', maxWidth: 300 }}
      />

      <div style={{ marginTop: 10 }}>
        <button
          onClick={handleClaim}
          style={{ marginRight: 10, padding: 8 }}
        >
          Reclamar parcela
        </button>
        <button onClick={handleList} style={{ padding: 8 }}>
          Listar parcelas
        </button>
      </div>

      {message && (
        <p style={{ marginTop: 10, color: message.startsWith('Error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}

      {list.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultados:</h3>
          <ul>
            {list.map((p) => (
              <li key={p.id}>
                {p.geohash} – {p.rarity} – {p.influence}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
