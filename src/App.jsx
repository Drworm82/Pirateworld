import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Index from './Pages/Index.jsx'
import Auth from './Pages/Auth.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Parcels from './Pages/Parcels.jsx'

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 12 }}>Inicio</Link>
        <Link to="/Auth" style={{ marginRight: 12 }}>Auth</Link>
        <Link to="/Dashboard" style={{ marginRight: 12 }}>Dashboard</Link>
        <Link to="/Parcels">Parcelas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Parcels" element={<Parcels />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
