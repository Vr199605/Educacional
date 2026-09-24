import React from 'react';
import { Activity } from '../../types/activity';
import { BookOpen, Target, Clock, Layers, Sparkles, CheckCircle, HeartHandshake } from 'lucide-react';

interface PlanoAulaViewProps {
  activity: Activity;
}

export const PlanoAulaView: React.FC<PlanoAulaViewProps> = ({ activity }) => {
  const plano = activity.planoAula;
  if (!plano) return null;

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50/80 to-purple-100/30 p-6 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-purple-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-700">
              Plano de Aula Alinhado à BNCC
            </span>
            <span className="text-xs text-muted-foreground">{activity.disciplina} • {activity.ano}</span>
          </div>
          {plano.duracao && (
            <div className="flex items-center gap-1.5 rounded-lg border border-purple-200 bg-white px-3 py-1 text-xs font-semibold text-purple-900 shadow-2xs">
              <Clock className="size-3.5 text-purple-600" />
              <span>Duração Estimada: {plano.duracao}</span>
            </div>
          )}
        </div>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {activity.titulo}
        </h2>
        {activity.introducao && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{activity.introducao}</p>
        )}
      </div>

      {/* BNCC Competencies / Skills */}
      {plano.habilidadesBNCC && plano.habilidadesBNCC.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-2xs">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-4 text-purple-600" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-purple-900">
              Códigos e Habilidades da BNCC
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {plano.habilidadesBNCC.map((code, idx) => (
              <span
                key={idx}
                className="rounded-md border border-purple-200 bg-purple-50 px-3 py-1 font-mono text-xs font-semibold text-purple-800"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 2-Columns: Objetivos e Conteúdo */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
          <div className="mb-4 flex items-center gap-2">
            <Target className="size-4.5 text-purple-600" />
            <h3 className="font-display text-sm font-bold text-foreground">Objetivos de Aprendizagem</h3>
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm text-zinc-700">
            {plano.objetivos.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
          <div className="mb-4 flex items-center gap-2">
            <Layers className="size-4.5 text-purple-600" />
            <h3 className="font-display text-sm font-bold text-foreground">Conteúdo Programático</h3>
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm text-zinc-700">
            {plano.conteudo.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-purple-100 text-[10px] font-bold text-purple-700 mt-0.5">
                  •
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Metodologia & Desenvolvimento */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
        <div className="mb-3 flex items-center gap-2">
          <BookOpen className="size-4.5 text-purple-600" />
          <h3 className="font-display text-sm font-bold text-foreground">Metodologia e Procedimentos Didáticos</h3>
        </div>
        <p className="whitespace-pre-line text-xs md:text-sm leading-relaxed text-zinc-700">
          {plano.metodologia}
        </p>
      </div>

      {/* Cronograma da Aula */}
      {plano.cronograma && plano.cronograma.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-foreground">
              Cronograma Passo a Passo da Aula
            </h3>
            <span className="text-[11px] text-muted-foreground">Distribuição do tempo em sala</span>
          </div>

          <div className="divide-y divide-border">
            {plano.cronograma.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-foreground">{item.etapa}</h4>
                    {item.descricao && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.descricao}</p>
                    )}
                  </div>
                </div>
                <span className="w-fit rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-purple-900 sm:self-center">
                  {item.tempo}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recursos e Avaliação */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
          <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Recursos Didáticos Necessários
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-xs md:text-sm text-zinc-700">
            {plano.recursos.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
          <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Critérios de Avaliação Formativa
          </h3>
          <p className="text-xs md:text-sm leading-relaxed text-zinc-700">{plano.avaliacao}</p>
        </div>
      </div>

      {/* Adaptações Inclusivas se existirem */}
      {plano.adaptacoesInclusivas && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-900">
            <HeartHandshake className="size-4 text-emerald-700" />
            <span>Adaptações Pedagógicas e Acessibilidade</span>
          </div>
          <p className="text-xs leading-relaxed text-emerald-950/80">
            {plano.adaptacoesInclusivas}
          </p>
        </div>
      )}
    </div>
  );
};
