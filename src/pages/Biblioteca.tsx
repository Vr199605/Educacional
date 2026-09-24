import React, { useState, useEffect, useMemo } from 'react';
import {
  getActivities,
  activityLabels,
  activityTones,
  formatRelativeTime,
} from '../services/activityStore';
import { Activity, ActivityType } from '../types/activity';
import { Search, Sparkles, Clock, BookOpen, Layers } from 'lucide-react';

interface BibliotecaProps {
  initialSearch?: string;
  onNavigate: (path: string, params?: Record<string, any>) => void;
}

const FILTER_TYPES: ('todos' | ActivityType)[] = [
  'todos',
  'lista',
  'prova',
  'quiz',
  'plano-aula',
  'flashcards',
  'mapa-mental',
  'cruzadinha',
  'resumo',
];

export const Biblioteca: React.FC<BibliotecaProps> = ({ initialSearch = '', onNavigate }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState<'todos' | ActivityType>('todos');

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return activities.filter((act) => {
      const matchType = selectedType === 'todos' || act.type === selectedType;
      const matchQuery =
        !q ||
        act.titulo.toLowerCase().includes(q) ||
        act.disciplina.toLowerCase().includes(q) ||
        act.tema.toLowerCase().includes(q) ||
        (act.subtema && act.subtema.toLowerCase().includes(q));

      return matchType && matchQuery;
    });
  }, [activities, search, selectedType]);

  const countItems = (act: Activity): number => {
    if (act.flashcards?.length) return act.flashcards.length;
    if (act.mapaMental?.ramos?.length) return act.mapaMental.ramos.length;
    if (act.cruzadinha?.palavras?.length) return act.cruzadinha.palavras.length;
    if (act.resumo?.secoes?.length) return act.resumo.secoes.length;
    if (act.planoAula?.cronograma?.length) return act.planoAula.cronograma.length;
    return act.questoes?.length || 0;
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-12">
      {/* Header and Search */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Biblioteca
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Seus materiais didáticos
          </h1>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, disciplina, tema..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-xs placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-2xs"
          />
        </div>
      </header>

      {/* Filter Tabs by Type */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTER_TYPES.map((t) => {
          const isActive = selectedType === t;
          return (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? 'border-brand bg-brand text-brand-foreground shadow-2xs'
                  : 'border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground'
              }`}
            >
              {t === 'todos' ? 'Todos' : activityLabels[t]}
            </button>
          );
        })}
      </div>

      {/* Grid of Materials */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <BookOpen className="mx-auto mb-3 size-8 text-muted-foreground opacity-40" />
          <p className="text-sm text-muted-foreground">Nenhuma atividade encontrada com os filtros selecionados.</p>
          <button
            onClick={() => onNavigate('/nova-atividade')}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            <Sparkles className="size-3.5" />
            <span>Criar material agora</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((act) => (
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
                  {act.disciplina}
                </span>
                <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-brand">
                  {act.titulo}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border/50">
                  <span>
                    {countItems(act)} itens • {act.ano.split('—')[0].trim()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {formatRelativeTime(act.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
