import React from 'react';
import { Activity } from '../../types/activity';
import { PrintHeader } from '../common/PrintHeader';
import { DiscursiveResolutionView } from './DiscursiveResolutionView';
import { CheckCircle2 } from 'lucide-react';

interface ProvaViewProps {
  activity: Activity;
  showAnswers: boolean;
}

export const ProvaView: React.FC<ProvaViewProps> = ({ activity, showAnswers }) => {
  const questoes = activity.questoes || [];

  return (
    <div className="space-y-6">
      {/* Official School Assessment Header */}
      <PrintHeader
        titulo={activity.titulo}
        disciplina={activity.disciplina}
        ano={activity.ano}
        type={activity.type === 'prova' ? 'Avaliação Escolar' : 'Lista de Exercícios'}
      />

      {activity.introducao && (
        <div className="rounded-lg bg-muted/40 p-4 text-xs italic text-muted-foreground print:bg-transparent print:p-0 print:text-black">
          <p>{activity.introducao}</p>
        </div>
      )}

      {/* Questions List */}
      <ol className="space-y-8 print:space-y-6">
        {questoes.map((q, idx) => {
          const isDiscursive = q.tipo === 'dissertativa' || (!q.alternativas || q.alternativas.length === 0);

          return (
            <li
              key={q.id || idx}
              className="rounded-xl border border-border/60 bg-card p-6 shadow-2xs transition print:border-none print:p-0 print:shadow-none"
            >
              {/* Question Statement */}
              <div className="mb-4 flex items-start gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 font-display text-xs font-bold text-brand print:border print:border-black print:bg-transparent print:text-black">
                  {q.numero || idx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground print:hidden">
                      {isDiscursive ? 'Questão Discursiva' : 'Múltipla Escolha'}
                    </span>
                    {q.habilidade && (
                      <span className="text-[10px] font-mono text-muted-foreground print:hidden">
                        BNCC: {q.habilidade}
                      </span>
                    )}
                  </div>
                  <p className="text-pretty text-sm font-medium leading-relaxed text-foreground md:text-base print:text-black">
                    {q.enunciado}
                  </p>
                </div>
              </div>

              {/* Multiple Choice Alternatives */}
              {!isDiscursive && q.alternativas && (
                <ul className="ml-10 space-y-2.5 print:ml-8 print:space-y-1.5">
                  {q.alternativas.map((alt, altIdx) => {
                    const letter = String.fromCharCode(65 + altIdx);
                    const isCorrect =
                      showAnswers &&
                      (q.resposta === letter ||
                        q.resposta?.toUpperCase().startsWith(letter) ||
                        alt.toUpperCase().startsWith(`${letter})`));

                    return (
                      <li
                        key={altIdx}
                        className={`flex items-start gap-3 rounded-lg border px-3.5 py-2.5 text-xs transition md:text-sm print:border-none print:py-1 ${
                          isCorrect
                            ? 'border-brand bg-brand/5 font-medium text-brand-700 shadow-2xs'
                            : 'border-border bg-background/50 text-foreground'
                        }`}
                      >
                        <span
                          className={`grid size-5.5 shrink-0 place-items-center rounded-full text-xs font-semibold print:border print:border-black ${
                            isCorrect
                              ? 'bg-brand text-brand-foreground'
                              : 'border border-border text-muted-foreground print:text-black'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="flex-1 leading-normal">{alt.replace(/^[A-E]\)\s*/, '')}</span>
                        {isCorrect && <CheckCircle2 className="size-4 shrink-0 text-brand print:hidden" />}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Discursive Ruled Lines (for student answer on paper) */}
              {isDiscursive && (
                <div className="ml-10 mt-3 print:ml-8">
                  <div className="mb-1 text-[11px] font-semibold text-muted-foreground print:text-black">
                    Resposta do Aluno:
                  </div>
                  <div
                    className="ruled-lines w-full rounded-md border border-border/80 p-2 print:border-black"
                    style={{ height: `${(q.linhasResposta || 6) * 28}px` }}
                  />
                </div>
              )}

              {/* MULTIPLE CHOICE EXPLANATION WHEN GABARITO IS ACTIVE */}
              {showAnswers && !isDiscursive && (
                <div className="ml-10 mt-4 rounded-lg border border-dashed border-brand/30 bg-brand/5 p-3.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-brand">
                    <CheckCircle2 className="size-3.5" />
                    <span>Gabarito Oficial: Alternativa {q.resposta}</span>
                  </div>
                  {q.comentario && <p className="mt-1 text-zinc-700 leading-relaxed">{q.comentario}</p>}
                </div>
              )}

              {/* DISCURSIVE STEP-BY-STEP PEDAGOGICAL RESOLUTION */}
              {showAnswers && isDiscursive && q.resolucaoPassoAPasso && (
                <div className="ml-10 mt-4 print:ml-0">
                  <DiscursiveResolutionView
                    resolucao={q.resolucaoPassoAPasso}
                    habilidade={q.habilidade}
                    competencia={q.competencia}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Consolidate Gabarito Table */}
      {showAnswers && (
        <section className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm print:break-before-page">
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-brand">
            Gabarito Consolidado & Orientações de Correção
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-3">Item</th>
                  <th className="py-2.5 px-3">Tipo</th>
                  <th className="py-2.5 px-3">Resposta / Critério</th>
                  <th className="py-2.5 px-3">Habilidade BNCC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {questoes.map((q, i) => (
                  <tr key={i} className="hover:bg-muted/20">
                    <td className="py-2.5 px-3 font-bold text-foreground">Questão {q.numero || i + 1}</td>
                    <td className="py-2.5 px-3 text-muted-foreground capitalize">
                      {q.tipo === 'dissertativa' ? 'Discursiva' : 'Múltipla Escolha'}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-foreground">
                      {q.tipo === 'dissertativa'
                        ? 'Ver resolução didática detalhada passo a passo'
                        : `Alternativa ${q.resposta}`}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-muted-foreground">{q.habilidade || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
