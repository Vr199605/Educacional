import React, { useState } from 'react';
import { setCurrentUser } from '../services/activityStore';
import { Sparkles, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthProps {
  onNavigate: (path: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = email.trim() || 'professor.educador@escola.com.br';
    const finalName = name.trim() || 'Professor(a)';

    setCurrentUser({
      email: finalEmail,
      name: finalName,
      isLoggedIn: true,
    });

    onNavigate('/');
  };

  const handleQuickDemo = () => {
    setCurrentUser({
      email: 'professor.educador@escola.com.br',
      name: 'Professor(a) Convidado',
      isLoggedIn: true,
    });
    onNavigate('/');
  };

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        {/* Brand Logo */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-sm">
            <GraduationCap className="size-6" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            EduCreator AI
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Acesso à plataforma para professores e educadores
          </p>
        </div>

        {/* Quick Demo Access Button */}
        <button
          onClick={handleQuickDemo}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-3 px-4 font-display text-xs md:text-sm font-semibold text-white shadow-sm ring-1 ring-brand/20 transition hover:bg-brand-700 active:scale-98"
        >
          <Sparkles className="size-4" />
          <span>Acesso Rápido (1 Clique — Sem Senha)</span>
          <ArrowRight className="size-4" />
        </button>

        <div className="relative mb-6 text-center text-xs">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative bg-card px-3 text-muted-foreground">
            ou personalize seu perfil
          </span>
        </div>

        {/* Custom Profile Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="mb-1 block font-semibold text-foreground">Seu Nome ou Título</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Profª Carolina Silva"
              className="w-full rounded-xl border border-border bg-background p-2.5 text-xs focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-foreground">Seu E-mail Institucional</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="professor@escola.gov.br"
              className="w-full rounded-xl border border-border bg-background p-2.5 text-xs focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl border border-border bg-muted/60 py-2.5 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            Salvar e Entrar
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground border-t border-border pt-4">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          <span>Seus materiais e dados ficam salvos com segurança no seu navegador</span>
        </div>
      </div>
    </div>
  );
};
