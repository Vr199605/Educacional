import React, { useState, useEffect } from 'react';
import {
  ListChecks,
  ClipboardCheck,
  Zap,
  BookOpen,
  Layers,
  Network,
  Grid3X3,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  MoreVertical,
  Clock,
  BookMarked,
} from 'lucide-react';
import {
  getActivities,
  activityLabels,
  activityTones,
  formatRelativeTime,
} from '../services/activityStore';
import { Activity, ActivityType } from '../types/activity';

interface HomeProps {
  onNavigate: (path: string, params?: Record<string, any>) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [prompt, setPrompt] = useState('');
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const list = getActivities();
    setRecentActivities(list.slice(0, 6));
  }, []);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onNavigate('/nova-atividade', { prompt: prompt.trim() });
    }
  };

  const tools: { type: ActivityType; label: string; icon: React.FC<{ className?: string }>; tone: string }[] = [
    { type: 'lista', label: 'Lista de Exercícios', icon: ListChecks, tone: 'bg-emerald-50 text-emerald-700' },
    { type: 'prova', label: 'Prova Estruturada', icon: ClipboardCheck, tone: 'bg-orange-50 text-orange-700' },
    { type: 'quiz', label: 'Quiz Gamificado', icon: Zap, tone: 'bg-sky-50 text-sky-700' },
    { type: 'plano-aula', label: 'Plano de Aula', icon: BookOpen, tone: 'bg-purple-50 text-purple-700' },
    { type: 'flashcards', label: 'Flashcards', icon: Layers, tone: 'bg-indigo-50 text-indigo-700' },
    { type: 'mapa-mental', label: 'Mapa Mental', icon: Network, tone: 'bg-amber-50 text-amber-700' },
    { type: 'cruzadinha', label: 'Cruzadinha', icon: Grid3X3, tone: 'bg-zinc-100 text-zinc-700' },
    { type: 'resumo', label: 'Resumo / Imagem', icon: ImageIcon, tone: 'bg-rose-50 text-rose-700' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:px-12">
      {/* PROMPT HERO SECTION */}
      <header className="mb-16">
        <h1 className="mb-6 text-balance font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
          O que vamos preparar para seus alunos hoje?
        </h1>

        <form onSubmit={handlePromptSubmit} className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-brand/10 opacity-0 blur-sm transition-opacity group-focus-within:opacity-100" />
          <div className="relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-black/5 transition-all focus-within:ring-2 focus-within:ring-brand/40">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-32 w-full resize-none border-none bg-transparent p-6 text-base md:text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-0 leading-relaxed"
              placeholder="Descreva a atividade... (ex: 'Uma prova de frações para o 6º ano com 10 questões e resolução passo a passo detalhada nas discursivas')"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background/50 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  BNCC: Alinhado
                </span>
                <span className="rounded bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Resolução Passo a Passo
                </span>
                <span className="rounded bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Contextualizado
                </span>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm ring-1 ring-brand/20 transition hover:bg-brand-700 active:scale-95"
              >
                <Sparkles className="size-4 shrink-0" />
                <span>Gerar Material</span>
              </button>
            </div>
          </div>
        </form>
      </header>

      {/* CREATION TOOLS GRID */}
      <section className="mb-16">
        <h2 className="mb-6 font-display text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
          Ferramentas de Criação
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.type}
                onClick={() => onNavigate('/nova-atividade', { type: tool.type })}
                className="group flex flex-col items-start rounded-2xl border border-border/80 bg-card p-5 text-left shadow-2xs transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-sm"
              >
                <div className={`mb-4 grid size-9 place-items-center rounded-xl ${tool.tone}`}>
                  <Icon className="size-4.5" />
                </div>
                <span className="font-display text-sm font-semibold text-foreground group-hover:text-brand">
                  {tool.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* RECENT ACTIVITIES */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Trabalhos Recentes
          </h2>
          <button
            onClick={() => onNavigate('/biblioteca')}
            className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            <span>Ver biblioteca</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        {recentActivities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
            <BookMarked className="mx-auto mb-3 size-8 text-muted-foreground opacity-40" />
            <p className="mx-auto max-w-sm text-sm text-muted-foreground">
              Você ainda não criou nenhuma atividade. Comece agora — descreva o que precisa acima ou escolha uma ferramenta.
            </p>
            <button
              onClick={() => onNavigate('/nova-atividade')}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm hover:bg-brand-700"
            >
              <Sparkles className="size-4" />
              <span>Criar primeira atividade</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => onNavigate(`/atividade/${act.id}`, { id: act.id })}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-2xs transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
              >
                <div className="grid aspect-video place-items-center bg-gradient-to-br from-muted to-background p-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {activityLabels[act.type]}
                  </span>
                </div>
                <div className="p-4">
                  <span
                    className={`mb-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      activityTones[act.type]
                    }`}
                  >
                    {activityLabels[act.type]} • {act.disciplina}
                  </span>
                  <h3 className="mb-3 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-brand">
                    {act.titulo}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {formatRelativeTime(act.createdAt)}
                    </span>
                    <MoreVertical className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
