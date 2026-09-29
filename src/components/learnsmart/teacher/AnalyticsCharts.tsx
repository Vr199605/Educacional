import React, { useState } from 'react';
import {
  MOCK_PERFORMANCE_BARS,
  MOCK_PROGRESS_DOUGHNUT,
  MOCK_ENGAGEMENT_TIMELINE,
} from '../mockData';
import {
  TrendingUp,
  RefreshCw,
  Clock,
  Play,
  Edit3,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

interface AnalyticsChartsProps {
  onStartLesson?: () => void;
  onGoToCalendar?: () => void;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  onStartLesson,
  onGoToCalendar,
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // SVG Trend Line calculation for Card 1
  const barChartWidth = 480;
  const barChartHeight = 180;
  const numItems = MOCK_PERFORMANCE_BARS.length;
  const stepX = barChartWidth / (numItems + 1);

  const trendPoints = MOCK_PERFORMANCE_BARS.map((item, idx) => {
    const x = stepX * (idx + 1);
    const y = barChartHeight - (item.media / 100) * (barChartHeight - 30) - 15;
    return { x, y, media: item.media, turma: item.turma };
  });

  const pathD = trendPoints.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  // Doughnut Chart parameters for Card 2
  const circleRadius = 58;
  const circumference = 2 * Math.PI * circleRadius;
  const avgProgress = MOCK_PROGRESS_DOUGHNUT.average; // 96
  const strokeOffset = circumference - (avgProgress / 100) * circumference;

  // Timeline Area chart parameters for Card 3
  const timelinePoints = MOCK_ENGAGEMENT_TIMELINE.map((item, idx) => {
    const x = (idx / (MOCK_ENGAGEMENT_TIMELINE.length - 1)) * 320;
    const y = 140 - (item.horas / 7) * 110;
    return { x, y, ...item };
  });

  const areaD = `${timelinePoints.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  )} L 320 140 L 0 140 Z`;

  const lineD = timelinePoints.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  return (
    <div className="space-y-6">
      {/* 2x2 Grid of Main Analytics Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CARD 1: Gráfico de Barras com Linha de Tendência Comparativa */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold text-zinc-900">
                  Desempenho & Entregas por Turma
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Automatically updates
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Comparativo da média das avaliações e taxa de conclusão das atividades
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-zinc-600">
                <span className="size-2.5 rounded-sm bg-indigo-500" /> Média
              </span>
              <span className="flex items-center gap-1 text-zinc-600">
                <span className="size-2.5 rounded-sm bg-emerald-400" /> Entregas
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <span className="size-2 rounded-full bg-amber-500" /> Tendência
              </span>
            </div>
          </div>

          {/* SVG Bar & Trend Chart Container */}
          <div className="relative h-56 w-full pt-4">
            <svg
              viewBox={`0 0 ${barChartWidth} ${barChartHeight}`}
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Background grid lines */}
              {[25, 50, 75, 100].map((val) => {
                const y = barChartHeight - (val / 100) * (barChartHeight - 30) - 15;
                return (
                  <g key={val}>
                    <line
                      x1="0"
                      y1={y}
                      x2={barChartWidth}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y={y - 3}
                      fill="#94a3b8"
                      fontSize="9"
                      className="select-none font-mono"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {MOCK_PERFORMANCE_BARS.map((item, idx) => {
                const centerX = stepX * (idx + 1);
                const barW = 12;
                const mediaH = (item.media / 100) * (barChartHeight - 40);
                const entregaH = (item.entregas / 100) * (barChartHeight - 40);

                const isHovered = hoveredBar === idx;

                return (
                  <g
                    key={idx}
                    className="cursor-pointer transition-opacity"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Media Bar */}
                    <rect
                      x={centerX - barW - 1.5}
                      y={barChartHeight - mediaH - 12}
                      width={barW}
                      height={mediaH}
                      rx="3"
                      fill={isHovered ? '#4338ca' : '#6366f1'}
                    />

                    {/* Entregas Bar */}
                    <rect
                      x={centerX + 1.5}
                      y={barChartHeight - entregaH - 12}
                      width={barW}
                      height={entregaH}
                      rx="3"
                      fill={isHovered ? '#059669' : '#34d399'}
                    />

                    {/* Class label */}
                    <text
                      x={centerX}
                      y={barChartHeight + 3}
                      textAnchor="middle"
                      fill={isHovered ? '#1e1b4b' : '#64748b'}
                      fontSize="9.5"
                      fontWeight={isHovered ? 'bold' : 'normal'}
                    >
                      {item.turma}
                    </text>
                  </g>
                );
              })}

              {/* Overlay Curved Trend Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />

              {/* Trend points dots */}
              {trendPoints.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  className="transition hover:r-5 cursor-pointer"
                />
              ))}
            </svg>

            {/* Hover Tooltip */}
            {hoveredBar !== null && (
              <div
                className="pointer-events-none absolute -top-1 rounded-xl border border-zinc-200 bg-zinc-900/90 px-3 py-1.5 text-[11px] text-white shadow-xl backdrop-blur-xs"
                style={{
                  left: `${((hoveredBar + 1) / (numItems + 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <p className="font-bold text-amber-300">
                  {MOCK_PERFORMANCE_BARS[hoveredBar].turma}
                </p>
                <p>Média: {MOCK_PERFORMANCE_BARS[hoveredBar].media}%</p>
                <p className="text-emerald-300">
                  Entregas: {MOCK_PERFORMANCE_BARS[hoveredBar].entregas}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CARD 2: Indicador Circular (Radial/Doughnut) de Progresso Médio (96%) */}
        <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-base font-bold text-zinc-900">
                Progresso Médio & Distribuição
              </span>
              <p className="text-xs text-zinc-500 mt-0.5">
                Classificação dos alunos por faixas de aproveitamento
              </p>
            </div>
            <div className="grid size-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="size-4.5" />
            </div>
          </div>

          <div className="my-auto flex flex-col items-center gap-6 py-3 sm:flex-row sm:justify-around">
            {/* Circular Gauge */}
            <div className="relative grid size-36 place-items-center">
              <svg className="size-full -rotate-90" viewBox="0 0 140 140">
                {/* Background Ring */}
                <circle
                  cx="70"
                  cy="70"
                  r={circleRadius}
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Secondary slices (Background segments) */}
                <circle
                  cx="70"
                  cy="70"
                  r={circleRadius}
                  stroke="#f59e0b"
                  strokeWidth="12"
                  strokeDasharray={`${circumference * 0.1} ${circumference}`}
                  strokeDashoffset={-circumference * 0.9}
                  fill="none"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={circleRadius}
                  stroke="#0ea5e9"
                  strokeWidth="12"
                  strokeDasharray={`${circumference * 0.22} ${circumference}`}
                  strokeDashoffset={-circumference * 0.68}
                  fill="none"
                />
                {/* Main Progress Ring (Emerald) */}
                <circle
                  cx="70"
                  cy="70"
                  r={circleRadius}
                  stroke="url(#radialGradient)"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="radialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute text-center">
                <span className="font-display text-3xl font-extrabold tracking-tight text-zinc-900">
                  {avgProgress}%
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                  Geral
                </span>
              </div>
            </div>

            {/* Detailed Legend Breakdown */}
            <div className="w-full sm:max-w-xs space-y-3">
              {MOCK_PROGRESS_DOUGHNUT.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/70 p-2.5 transition hover:bg-zinc-100/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-3 rounded-md shrink-0 shadow-2xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span className="block text-xs font-semibold text-zinc-800">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {item.count} estudantes cadastrados
                      </span>
                    </div>
                  </div>
                  <span className="font-display text-sm font-bold text-zinc-900">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 3: Gráfico de Linhas/Área com Engajamento Temporal */}
        <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="font-display text-base font-bold text-zinc-900">
                Engajamento & Produtividade Semanal
              </span>
              <p className="text-xs text-zinc-500 mt-0.5">
                Horas ativas e volume de materiais resolvidos ao longo dos dias
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
              <TrendingUp className="size-3.5" />
              <span>+18.4% esta semana</span>
            </div>
          </div>

          <div className="relative h-44 w-full pt-2">
            <svg
              viewBox="0 0 320 140"
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area */}
              <path d={areaD} fill="url(#areaGrad)" />

              {/* Area Border Line */}
              <path
                d={lineD}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Points */}
              {timelinePoints.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#ffffff"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  className="cursor-pointer transition-transform hover:scale-150"
                  onMouseEnter={() => setHoveredDay(idx)}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}

              {/* Horizontal labels */}
              {timelinePoints.map((p, idx) => (
                <text
                  key={idx}
                  x={p.x}
                  y="155"
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="9"
                  fontWeight={hoveredDay === idx ? 'bold' : 'normal'}
                >
                  {p.dia}
                </text>
              ))}
            </svg>

            {hoveredDay !== null && (
              <div
                className="pointer-events-none absolute top-1 rounded-xl border border-zinc-200 bg-zinc-900/90 px-3 py-1 text-[11px] text-white shadow-xl backdrop-blur-xs"
                style={{
                  left: `${(hoveredDay / (MOCK_ENGAGEMENT_TIMELINE.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className="font-bold text-indigo-300">
                  {MOCK_ENGAGEMENT_TIMELINE[hoveredDay].dia}
                </span>
                <p>{MOCK_ENGAGEMENT_TIMELINE[hoveredDay].horas}h de estudo</p>
                <p className="text-emerald-300">
                  {MOCK_ENGAGEMENT_TIMELINE[hoveredDay].atividades} tarefas feitas
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CARD 4: Card de Resumo de Planejamento ("Streamlined Lesson Planning") */}
        <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-white via-indigo-50/20 to-emerald-50/30 p-6 shadow-sm transition hover:shadow-md">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Streamlined Lesson Planning
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="size-4" /> Pronto para aula
              </span>
            </div>

            <div className="mt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Próxima Aula Agendada
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight text-zinc-900 mt-0.5">
                Geometria Espacial & Volume dos Sólidos
              </h3>
              <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                Revisão interativa com demonstração de prismas e cilindros + quiz de fixação BNCC.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-zinc-200/70 bg-white/80 p-3 shadow-2xs">
                <span className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold">
                  <Users className="size-3.5 text-indigo-600" /> Turma
                </span>
                <span className="mt-1 block font-bold text-zinc-900 text-sm">9º Ano B</span>
                <span className="text-[10px] text-zinc-500">32 estudantes</span>
              </div>

              <div className="rounded-2xl border border-zinc-200/70 bg-white/80 p-3 shadow-2xs">
                <span className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold">
                  <Clock className="size-3.5 text-amber-500" /> Horário
                </span>
                <span className="mt-1 block font-bold text-zinc-900 text-sm">Hoje • 14:30</span>
                <span className="text-[10px] text-zinc-500">Duração: 90 min</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/70 pt-4">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                RM
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-800">Prof. Ricardo Mendes</p>
                <p className="text-[10px] text-zinc-400">Coordenador Pedagógico</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onGoToCalendar}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50"
              >
                <Edit3 className="size-3.5 text-zinc-500" />
                <span>Planejamento</span>
              </button>
              <button
                type="button"
                onClick={onStartLesson}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-95"
              >
                <Play className="size-3.5 fill-white" />
                <span>Iniciar Aula</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
