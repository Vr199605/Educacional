import React from 'react';
import {
  TrendingUp,
  BarChart3,
  Award,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Target,
} from 'lucide-react';

export const AdvancedAnalyticsView: React.FC = () => {
  const bnccSkills = [
    { code: 'EF06MA01', desc: 'Operações com frações e decimais', rendimento: 94, status: 'alto' },
    { code: 'EF07MA04', desc: 'Razão, proporção e regra de três', rendimento: 88, status: 'alto' },
    { code: 'EF08MA06', desc: 'Expressões algébricas e variáveis', rendimento: 76, status: 'medio' },
    { code: 'EF09MA08', desc: 'Teorema de Pitágoras e geometria', rendimento: 92, status: 'alto' },
    { code: 'EM13MAT101', desc: 'Análise de funções e taxas de variação', rendimento: 68, status: 'reforco' },
  ];

  const bimestres = [
    { periodo: '1º Bimestre', media: 8.1, participacao: 91 },
    { periodo: '2º Bimestre', media: 8.4, participacao: 93 },
    { periodo: '3º Bimestre (Atual)', media: 8.8, participacao: 96 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              Inteligência Pedagógica
            </span>
            <h2 className="font-display text-xl font-bold text-zinc-900 mt-2">
              Estatísticas & Diagnóstico de Aprendizagem
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Análise detalhada de competências e métricas de evolução curricular.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-700">
              Ano Letivo 2026
            </span>
          </div>
        </div>

        {/* 3 KPI Highlights */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">Taxa de Retenção</span>
              <ArrowUpRight className="size-4 text-emerald-600" />
            </div>
            <p className="font-display text-2xl font-black text-emerald-950 mt-1">96.4%</p>
            <span className="text-[11px] text-emerald-700 font-medium">Meta anual atingida (+2.4%)</span>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">Eficácia de Recuperação</span>
              <ArrowUpRight className="size-4 text-indigo-600" />
            </div>
            <p className="font-display text-2xl font-black text-indigo-950 mt-1">88.5%</p>
            <span className="text-[11px] text-indigo-700 font-medium">Alunos reclassificados para a meta</span>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">Engajamento nas Atividades</span>
              <ArrowUpRight className="size-4 text-amber-600" />
            </div>
            <p className="font-display text-2xl font-black text-amber-950 mt-1">91.2%</p>
            <span className="text-[11px] text-amber-700 font-medium">Participação em sala e tarefas</span>
          </div>
        </div>
      </div>

      {/* BNCC Skills Mastery Table */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-zinc-900">
              Domínio de Habilidades por Código da BNCC
            </h3>
            <p className="text-xs text-zinc-500">
              Taxa de acertos dos alunos nas questões de provas e quizzes categorizados
            </p>
          </div>
          <span className="rounded-xl bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
            5 Habilidades Avaliadas
          </span>
        </div>

        <div className="space-y-4">
          {bnccSkills.map((skill) => (
            <div
              key={skill.code}
              className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-4 transition hover:bg-zinc-100/60"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-lg bg-indigo-100 px-2 py-0.5 font-mono text-xs font-bold text-indigo-800">
                    {skill.code}
                  </span>
                  <span className="text-xs font-bold text-zinc-800">{skill.desc}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-zinc-900">
                    {skill.rendimento}%
                  </span>
                  {skill.status === 'alto' ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                      Excelente
                    </span>
                  ) : skill.status === 'medio' ? (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                      Adequado
                    </span>
                  ) : (
                    <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-800 flex items-center gap-1">
                      <AlertTriangle className="size-3" />
                      Revisar
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    skill.rendimento >= 85
                      ? 'bg-emerald-500'
                      : skill.rendimento >= 75
                      ? 'bg-indigo-600'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${skill.rendimento}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bimestral Evolution Card */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <h3 className="font-display text-base font-bold text-zinc-900 mb-1">
          Evolução Trimestral do Desempenho
        </h3>
        <p className="text-xs text-zinc-500 mb-6">
          Comparação histórica de médias e engajamento entre os períodos
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {bimestres.map((b, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-5 text-center shadow-2xs"
            >
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                {b.periodo}
              </span>
              <div className="my-3">
                <span className="font-display text-3xl font-black text-zinc-900">
                  {b.media}
                </span>
                <span className="text-xs text-zinc-400"> / 10</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <CheckCircle2 className="size-3" />
                {b.participacao}% presença & tarefas
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
