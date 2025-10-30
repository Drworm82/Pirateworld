import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { isAuthenticated, logout } from './components/SupabaseHelper';
import { Button } from '@/components/ui/button';
import { Anchor, LayoutDashboard, Flag, Map, LogOut, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigationItems = [
  {
    title: 'Tablero',
    path: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Crew',
    path: 'Crew',
    icon: Flag,
  },
  {
    title: 'Parcelas',
    path: 'Parcels',
    icon: Map,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Si no está autenticado y no está en la página de Auth, redirigir
  React.useEffect(() => {
    if (!isAuthenticated() && currentPageName !== 'Auth') {
      navigate(createPageUrl('Auth'));
    }
  }, [currentPageName, navigate]);

  // Si está en Auth y ya está autenticado, redirigir al Dashboard
  React.useEffect(() => {
    if (isAuthenticated() && currentPageName === 'Auth') {
      navigate(createPageUrl('Dashboard'));
    }
  }, [currentPageName, navigate]);

  const handleLogout = () => {
    logout();
    navigate(createPageUrl('Auth'));
  };

  // Si está en la página de Auth, no mostrar el layout
  if (currentPageName === 'Auth') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600')] bg-cover bg-center opacity-5 fixed" />

      {/* Header */}
      <header className="relative z-10 bg-slate-900/80 backdrop-blur-lg border-b border-amber-600/30 sticky top-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Dashboard')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
                <Anchor className="w-6 h-6 text-slate-900" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-amber-400">Piratas del Código</h1>
                <p className="text-xs text-slate-400">Conquista los mares digitales</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === createPageUrl(item.path);
                return (
                  <Link
                    key={item.path}
                    to={createPageUrl(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-amber-600 text-slate-900 font-semibold shadow-lg shadow-amber-600/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-amber-400'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                );
              })}
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="ml-4 border-red-500/50 text-red-400 hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" className="border-amber-600/30">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-slate-900 border-slate-800">
                <div className="flex flex-col gap-4 mt-8">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === createPageUrl(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={createPageUrl(item.path)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-amber-600 text-slate-900 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-amber-400'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.title}
                      </Link>
                    );
                  })}
                  
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    variant="outline"
                    className="mt-4 border-red-500/50 text-red-400 hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Salir
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-0 container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 backdrop-blur-lg border-t border-amber-600/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>⚓ Piratas del Código - Construido con Base44 & Supabase</p>
            <p className="flex items-center gap-2">
              <Anchor className="w-4 h-4" />
              ¡Que la brújula te guíe!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
