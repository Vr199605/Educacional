import React from 'react';
import { DiscursiveSolution } from '../../types/activity';
import { BookOpen, CheckCircle2, AlertCircle, Lightbulb, Compass, Award } from 'lucide-react';

interface DiscursiveResolutionViewProps {
  resolucao: DiscursiveSolution;
  habilidade?: string;
  competencia?: string;
}

export const DiscursiveResolutionView: React.FC<DiscursiveResolutionViewProps> = ({
  resolucao,
  habilidade,
  competencia,
}) => {
  if (!resolucao) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-brand/30 bg-gradient-to-b from-brand/[0.04] to-brand/[0.01] p-5 shadow-sm">
      {/* Top Header Badge */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-brand/20 pb-3">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded-md bg-brand text-brand-foreground shadow-sm">
            <Compass className="size-3.5" />
          </div>
          <span className="font-display text-xs font-bold uppercase tracking-wider text-brand">
            Resolução Passo a Passo Didática
          </span>
        </div>
        {habilidade && (
          <span className="rounded bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
            Habilidade BNCC: {habilidade}
          </span>
        )}
      </div>

      <div className="space-y-4 text-xs md:text-sm">
        {/* PASSO 1: INTERPRETAÇÃO */}
        <div className="rounded-lg border border-blue-200/80 bg-blue-50/50 p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
              1
            </span>
            <h4 className="font-semibold text-blue-900">Interpretação e Identificação dos Dados</h4>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-blue-950/90 pl-7">
            {resolucao.passo1Interpretacao}
          </p>
        </div>

        {/* PASSO 2: DESENVOLVIMENTO RACIONAL */}
        <div className="rounded-lg border border-amber-200/80 bg-amber-50/40 p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-amber-600 text-[11px] font-bold text-white">
              2
            </span>
            <h4 className="font-semibold text-amber-900">Desenvolvimento Racional e Raciocínio Lógico</h4>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-amber-950/90 pl-7">
            {resolucao.passo2Desenvolvimento}
          </p>

          {/* Etapas detalhadas se existirem */}
          {resolucao.passosDetalhados && resolucao.passosDetalhados.length > 0 && (
            <div className="mt-3 pl-7 space-y-2">
              {resolucao.passosDetalhados.map((etapa) => (
                <div
                  key={etapa.passo}
                  className="rounded-md border border-amber-200 bg-white/80 p-2.5 text-xs text-amber-900"
                >
                  <p className="font-semibold text-amber-800">
                    Etapa {etapa.passo}: {etapa.titulo}
                  </p>
                  <p className="mt-1 text-zinc-700">{etapa.conteudo}</p>
                  {etapa.dicaDidatica && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                      <Lightbulb className="size-3 shrink-0" />
                      <span>{etapa.dicaDidatica}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PASSO 3: CONCLUSÃO & RESPOSTA ESPERADA MODELO */}
        <div className="rounded-lg border border-emerald-200/90 bg-emerald-50/50 p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
              3
            </span>
            <h4 className="font-semibold text-emerald-950">Conclusão e Resposta Esperada (Gabarito Modelo)</h4>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-emerald-950/90 pl-7 mb-3">
            {resolucao.passo3Conclusao}
          </p>

          {resolucao.respostaEsperada && (
            <div className="ml-7 rounded-md border border-emerald-300 bg-white p-3 shadow-2xs">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                Resposta Modelo Sugerida para o Aluno:
              </span>
              <p className="italic text-zinc-800 leading-relaxed">
                "{resolucao.respostaEsperada}"
              </p>
            </div>
          )}
        </div>

        {/* CRITÉRIOS DE CORREÇÃO / RUBRICA DO PROFESSOR */}
        {resolucao.criteriosCorrecao && (
          <div className="mt-4 rounded-lg border border-border bg-card p-4">
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
              <Award className="size-4 text-brand" />
              <span>Rubrica e Critérios de Correção para o Professor</span>
            </div>
            <div className="grid gap-2 text-xs md:grid-cols-3">
              <div className="rounded-md border border-emerald-100 bg-emerald-50/40 p-2.5">
                <span className="flex items-center gap-1 font-semibold text-emerald-800">
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  Nota Integral (100%)
                </span>
                <p className="mt-1 text-zinc-600 text-[11px] leading-relaxed">
                  {resolucao.criteriosCorrecao.notaIntegral}
                </p>
              </div>

              <div className="rounded-md border border-amber-100 bg-amber-50/40 p-2.5">
                <span className="flex items-center gap-1 font-semibold text-amber-800">
                  <BookOpen className="size-3 text-amber-600" />
                  Nota Parcial (50%–70%)
                </span>
                <p className="mt-1 text-zinc-600 text-[11px] leading-relaxed">
                  {resolucao.criteriosCorrecao.notaParcial}
                </p>
              </div>

              <div className="rounded-md border border-rose-100 bg-rose-50/40 p-2.5">
                <span className="flex items-center gap-1 font-semibold text-rose-800">
                  <AlertCircle className="size-3 text-rose-600" />
                  Erros Comuns / Descontos
                </span>
                <p className="mt-1 text-zinc-600 text-[11px] leading-relaxed">
                  {resolucao.criteriosCorrecao.errosComuns}
                </p>
              </div>
            </div>
          </div>
        )}

        {competencia && (
          <div className="pl-1 pt-1 text-[11px] text-muted-foreground">
            <span className="font-semibold">Competência Geral:</span> {competencia}
          </div>
        )}
      </div>
    </div>
  );
};
