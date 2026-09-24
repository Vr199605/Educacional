import React from 'react';
import { Activity } from '../../types/activity';
import { Network, Sparkles, CheckCircle2 } from 'lucide-react';

interface MapaMentalViewProps {
  activity: Activity;
}

export const MapaMentalView: React.FC<MapaMentalViewProps> = ({ activity }) => {
  const mapa = activity.mapaMental;
  if (!mapa) return null;

  const branchColors = [
    'border-amber-200 bg-amber-50/40 text-amber-900',
    'border-emerald-200 bg-emerald-50/40 text-emerald-900',
    'border-sky-200 bg-sky-50/40 text-sky-900',
    'border-purple-200 bg-purple-50/40 text-purple-900',
    'border-rose-200 bg-rose-50/40 text-rose-900',
    'border-indigo-200 bg-indigo-50/40 text-indigo-900',
  ];

  return (
    <div className="space-y-8">
      {/* Central Concept Node */}
      <div className="mx-auto flex w-fit flex-col items-center justify-center rounded-3xl border-2 border-brand bg-gradient-to-b from-brand to-emerald-700 px-8 py-5 text-center text-white shadow-lg">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-100">
          <Network className="size-3.5" /> Conceito Central
        </span>
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight md:text-2xl">
          {mapa.central || activity.tema}
        </h2>
        <span className="mt-1 text-xs text-emerald-100/90 font-medium">
          {activity.disciplina} • {activity.ano}
        </span>
      </div>

      {/* Mind Map Branches */}
      <div className="grid gap-6 sm:grid-cols-2">
        {mapa.ramos.map((ramo, idx) => {
          const colorClass = branchColors[idx % branchColors.length];

          return (
            <div
              key={idx}
              className={`rounded-2xl border p-6 shadow-2xs transition-all hover:-translate-y-0.5 ${colorClass}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white font-display text-xs font-bold text-zinc-900 shadow-xs">
                  {idx + 1}
                </span>
                <h3 className="font-display text-base font-bold text-zinc-900">
                  {ramo.titulo}
                </h3>
              </div>

              <ul className="space-y-2 text-xs md:text-sm text-zinc-700">
                {ramo.subitens.map((sub, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span className="leading-relaxed">{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Pedagogical Note */}
      <div className="rounded-xl border border-border bg-card p-5 text-center text-xs text-muted-foreground">
        <Sparkles className="mx-auto mb-2 size-4 text-amber-500" />
        <p>
          Dica pedagógica: Utilize este mapa mental como roteiro de revisão no início ou fechamento da aula.
          Peça aos alunos que adicionem ramificações próprias no caderno com exemplos do cotidiano.
        </p>
      </div>
    </div>
  );
};
