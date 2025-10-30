import React, { useState, useEffect } from 'react';
import { api, getUserId, getErrorMessage } from '../components/SupabaseHelper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins, Play, User, Key, AlertCircle, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adLoading, setAdLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = getUserId();
  const token = localStorage.getItem('sb_access_token');

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const rows = await api(`/rest/v1/wallets?user_id=eq.${userId}&select=gold,daily_ad_count,daily_ad_reset_at`);
      
      if (rows && rows.length > 0) {
        setWallet(rows[0]);
      } else {
        setWallet({ gold: 0, daily_ad_count: 0, daily_ad_reset_at: new Date().toISOString() });
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleWatchAd = async () => {
    setError('');
    setSuccess('');
    setAdLoading(true);

    try {
      await api('/rest/v1/rpc/record_ad_view', {
        method: 'POST',
        body: {}
      });

      setSuccess('🎉 ¡+100 oro! ¡Botín conseguido!');
      
      // Refrescar wallet después de 1 segundo
      setTimeout(() => {
        fetchWallet();
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setAdLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const adsRemaining = wallet ? Math.max(0, 20 - wallet.daily_ad_count) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-amber-400">Tablero del Capitán</h1>
        <p className="text-slate-300">Gestiona tu tesoro y recursos</p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive" className="bg-red-900/50 border-red-500/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-900/50 border-green-500/50">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-300">{success}</AlertDescription>
        </Alert>
      )}

      {/* Main Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Oro Card */}
        <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 border-amber-600/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-400">
              <Coins className="w-6 h-6" />
              Tesoro Actual
            </CardTitle>
            <CardDescription className="text-slate-300">
              Tu riqueza acumulada
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-16 w-32 bg-slate-700" />
            ) : (
              <div className="text-5xl font-bold text-amber-300">
                {wallet?.gold?.toLocaleString() || 0}
                <span className="text-2xl ml-2 text-amber-500">oro</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Anuncios Card */}
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-600/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Play className="w-6 h-6" />
              Anuncios Disponibles
            </CardTitle>
            <CardDescription className="text-slate-300">
              Gana oro viendo anuncios (100 oro cada uno)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <Skeleton className="h-12 w-full bg-slate-700" />
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-300">
                    {adsRemaining}
                  </span>
                  <span className="text-xl text-slate-400">/ 20 restantes hoy</span>
                </div>

                <Button
                  onClick={handleWatchAd}
                  disabled={adLoading || adsRemaining === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700"
                >
                  {adLoading ? (
                    <span>Cargando...</span>
                  ) : adsRemaining === 0 ? (
                    <span>Límite alcanzado</span>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Ver Anuncio (+100 oro)
                    </>
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Debug Info */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-sm text-slate-400">Debug Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-4 h-4" />
            <span className="text-slate-500">User ID:</span>
            <span className="text-amber-400">{userId?.substring(0, 8)}...</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Key className="w-4 h-4" />
            <span className="text-slate-500">Token:</span>
            <span className="text-blue-400">{token?.substring(0, 10)}...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


import React, { useEffect, useState } from 'react'
import { api } from '../components/SupabaseHelper'

export default function Dashboard() {
  const [wallet, setWallet] = useState(null)
  const [parcels, setParcels] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchAll() {
    const me = await api('/auth/v2/user')
    const uid = me?.user?.id
    if (!uid) throw new Error('No autenticado')

    const rows = await api(`/rest/v1/wallets?user_id=eq.${uid}&select=gold,daily_ad_count`)
    setWallet(rows?.[0] || { gold: 0, daily_ad_count: 0 })

    const mine = await api(`/rest/v1/parcels?owner_user_id=eq.${uid}&select=geohash,influence,base_yield_per_hour,last_activity_at&id=not.is.null&order=last_activity_at.desc`)
    setParcels(mine || [])
  }

  async function handleAd() {
    try {
      const res = await api('/rest/v1/rpc/record_ad_view', { method: 'POST', body: {} })
      alert(`+${res} de oro por anuncio`)
      await fetchAll()
    } catch (e) {
      if (String(e.message).includes('AD_LIMIT')) {
        alert('Límite diario alcanzado')
      } else {
        alert('Error: ' + e.message)
      }
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      try { await fetchAll() } finally { setLoading(false) }
    })()
  }, [])

  if (loading) return <div style={{ padding: 20 }}>Cargando…</div>

  return (
    <div style={{ maxWidth: 720, margin: '20px auto' }}>
      <h1>Tablero Pirata</h1>
      <section style={{ padding: 12, background: '#f3f3f3', borderRadius: 8 }}>
        <div><b>Oro:</b> {wallet?.gold ?? 0}</div>
        <div><b>Anuncios hoy:</b> {wallet?.daily_ad_count ?? 0} / 20</div>
        <button onClick={handleAd} style={{ marginTop: 8 }}>Ver anuncio (+100 oro)</button>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Mis parcelas</h2>
        {parcels.length === 0 ? (
          <div>Sin parcelas aún.</div>
        ) : (
          <ul>
            {parcels.map((p, i) => (
              <li key={i}>
                {p.geohash} — inf {p.influence} — {p.base_yield_per_hour}/h — {new Date(p.last_activity_at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
