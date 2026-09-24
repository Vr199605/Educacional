import React, { useState, useEffect } from 'react';
import {
  House,
  Library,
  Star,
  Users,
  Search,
  Sparkles,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { getCurrentUser, UserProfile } from '../../services/activityStore';

interface AppShellProps {
  currentPath: string;
  onNavigate: (path: string, params?: Record<string, any>) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentPath,
  onNavigate,
  searchQuery = '',
  onSearchChange,
  children,
}) => {
  const [user, setUser] = useState<UserProfile>(getCurrentUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const navItems = [
    { path: '/', label: 'Início', icon: House },
    { path: '/biblioteca', label: 'Biblioteca', icon: Library },
    { path: '/favoritos', label: 'Favoritos', icon: Star },
    { path: '/turmas', label: 'Minhas Turmas', icon: Users },
  ];

  const handleNav = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localSearch);
    }
    if (currentPath !== '/biblioteca') {
      onNavigate('/biblioteca', { search: localSearch });
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      {/* DESKTOP SIDEBAR */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-background/80 backdrop-blur-md md:flex print:hidden">
        <div className="flex h-full flex-col p-6">
          {/* Logo Header */}
          <div
            onClick={() => handleNav('/')}
            className="mb-8 flex cursor-pointer items-center gap-2.5 transition opacity-90 hover:opacity-100"
          >
            <div className="grid size-8.5 place-items-center rounded-xl bg-brand text-brand-foreground shadow-sm">
              <span className="font-display text-lg font-bold">E</span>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              EduCreator
            </span>
          </div>

          {/* New Activity CTA */}
          <button
            onClick={() => handleNav('/nova-atividade')}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-3 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm ring-1 ring-brand/20 transition hover:bg-brand-700 active:scale-98"
          >
            <Sparkles className="size-4" />
            <span>Nova atividade</span>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand/10 text-brand font-semibold shadow-2xs'
                      : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  <Icon className={`size-4.5 shrink-0 ${isActive ? 'text-brand' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Area (Search & User Profile) */}
          <div className="mt-auto space-y-4 border-t border-border pt-6">
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 size-3.5 text-muted-foreground" />
              <input
                type="search"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder="Buscar atividades..."
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-xs placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </form>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-1 pt-2">
              <div className="grid size-8 place-items-center rounded-full bg-brand/15 font-display text-xs font-bold text-brand outline outline-1 -outline-offset-1 outline-black/5">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">{user.email}</p>
                <p className="text-[10px] uppercase font-bold tracking-wider text-brand">
                  Plano Educador PRO
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNav('/auth')}
                title="Trocar usuário / Sair"
                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md md:hidden print:hidden">
        <div onClick={() => handleNav('/')} className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-lg bg-brand text-brand-foreground font-bold text-sm">
            E
          </div>
          <span className="font-display font-bold text-base tracking-tight">EduCreator</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleNav('/nova-atividade')}
            className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-2xs"
          >
            <Sparkles className="size-3.5" />
            <span>Criar</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 z-50 flex flex-col bg-background/95 p-6 backdrop-blur-md md:hidden print:hidden">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-brand/10 text-brand font-bold' : 'text-zinc-700'
                  }`}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-6 border-t border-border">
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">{user.email}</span>
              <button
                onClick={() => handleNav('/auth')}
                className="text-xs font-semibold text-destructive"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
