import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getErrorMessage } from '../components/SupabaseHelper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Anchor, Mail, Lock, LogIn, UserPlus, AlertCircle } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Registro
        await api('/auth/v1/signup', {
          method: 'POST',
          body: { email, password }
        });
        
        // Después de registrar, hacer login automático
        const loginData = await api('/auth/v1/token?grant_type=password', {
          method: 'POST',
          body: { email, password }
        });
        
        localStorage.setItem('sb_access_token', loginData.access_token);
        localStorage.setItem('sb_user_id', loginData.user.id);
        
        navigate('/Dashboard');
      } else {
        // Login
        const data = await api('/auth/v1/token?grant_type=password', {
          method: 'POST',
          body: { email, password }
        });
        
        localStorage.setItem('sb_access_token', data.access_token);
        localStorage.setItem('sb_user_id', data.user.id);
        
        navigate('/Dashboard');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-10" />
      
      <Card className="w-full max-w-md relative z-10 bg-slate-800/90 border-amber-600/30 backdrop-blur">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50">
              <Anchor className="w-10 h-10 text-slate-900" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-amber-400">
            Piratas del Código
          </CardTitle>
          <CardDescription className="text-slate-300">
            {isSignUp ? '¡Únete a la tripulación!' : '¡Zarpa hacia la aventura!'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-500/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input
                type="email"
                placeholder="capitan@barco.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Contraseña
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold"
            >
              {loading ? (
                <span>Navegando...</span>
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrarse
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>

            <div className="text-center pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-amber-400 hover:text-amber-300 text-sm"
              >
                {isSignUp
                  ? '¿Ya tienes cuenta? Entra aquí'
                  : '¿Nuevo pirata? Regístrate'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
