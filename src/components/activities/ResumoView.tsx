import React from 'react';
import { Activity } from '../../types/activity';
import { BookOpen, CheckCircle, Lightbulb, Image as ImageIcon } from 'lucide-react';

interface ResumoViewProps {
  activity: Activity;
}

export const ResumoView: React.FC<ResumoViewProps> = ({ activity }) => {
  const resumo = activity.resumo;
  if (!resumo) return null;

  return (
    <div className="space-y-8">
      {/* Introduction banner */}
      {activity.introducao && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
            Resumo Sintético & Material Visual
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold text-foreground">
            {activity.titulo}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">{activity.introducao}</p>
        </div>
      )}

      {/* Sections with Images and text */}
      <div className="space-y-8">
        {resumo.secoes.map((sec, idx) => (
          <div
            key={idx}
            className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-2xs md:grid-cols-[1fr_240px] md:items-start"
          >
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-rose-100 font-display text-xs font-bold text-rose-700">
                  {idx + 1}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {sec.titulo}
                </h3>
              </div>

              <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                {sec.conteudo}
              </p>

              {sec.destaque && (
                <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-950 font-medium">
                  {sec.destaque}
                </div>
              )}
            </div>

            {/* Illustration */}
            <div className="overflow-hidden rounded-xl border border-border bg-muted/40 shadow-xs">
              {sec.imagem ? (
                <img
                  src={sec.imagem}
                  alt={sec.titulo}
                  className="aspect-video w-full object-cover md:aspect-square"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to placeholder if external image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="grid aspect-square place-items-center p-6 text-center text-muted-foreground">
                  <ImageIcon className="size-8 opacity-40" />
                  <span className="mt-2 text-[11px]">Ilustração Temática</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Key Takeaways */}
      {resumo.pontosChave && resumo.pontosChave.length > 0 && (
        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-6 shadow-2xs">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="size-4.5 text-brand" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand">
              Pontos-Chave & Conclusões Essenciais
            </h3>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2 text-xs md:text-sm text-zinc-800">
            {resumo.pontosChave.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="size-4 shrink-0 text-brand mt-0.5" />
                <span className="leading-snug">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Study Tips */}
      {resumo.dicasEstudo && resumo.dicasEstudo.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 text-xs text-amber-950">
          <div className="mb-2 flex items-center gap-1.5 font-bold text-amber-900">
            <Lightbulb className="size-4 text-amber-600" />
            <span>Dicas Didáticas de Estudo para os Alunos</span>
          </div>
          <ul className="list-inside list-disc space-y-1 text-zinc-700 pl-1">
            {resumo.dicasEstudo.map((dica, i) => (
              <li key={i}>{dica}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
