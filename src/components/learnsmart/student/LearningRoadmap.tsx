import React from 'react';
import { MOCK_STUDENT_STAGES, StudentStage } from '../mockData';
import { Star, Lock, CheckCircle2, Play, Sparkles, Trophy } from 'lucide-react';

interface LearningRoadmapProps {
  stages?: StudentStage[];
  onSelectStage: (stage: StudentStage) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({
  stages = MOCK_STUDENT_STAGES,
  onSelectStage,
}) => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center py-8 px-4">
      {/* Roadmap Header Card */}
      <div className="mb-8 w-full rounded-3xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 p-6 text-white text-center shadow-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-xs">
          <Sparkles className="size-3.5 text-amber-300" />
          Trilha do Conhecimento
        </span>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-black tracking-tight">
          Aventura Matemática & Lógica
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-indigo-100 font-medium">
          Complete cada ilha para desbloquear os próximos capítulos e conquistar medalhas!
        </p>
      </div>

      {/* Winding Vertical Roadmap (Duolingo-style zigzag) */}
      <div className="relative flex w-full flex-col items-center space-y-8">
        {/* Connecting dashed line in background */}
        <div className="absolute top-10 bottom-10 w-2.5 rounded-full bg-zinc-200 border-2 border-dashed border-zinc-300 -z-0" />

        {stages.map((stage, idx) => {
          // Calculate slight zigzag offsets: 0, -40px, 40px, -30px, 30px
          const offsetClass =
            idx % 4 === 1
              ? 'sm:-translate-x-12'
              : idx % 4 === 2
              ? 'sm:translate-x-12'
              : idx % 4 === 3
              ? 'sm:-translate-x-8'
              : 'sm:translate-x-0';

          const isCompleted = stage.status === 'concluida';
          const isActive = stage.status === 'ativa';
          const isLocked = stage.status === 'bloqueada';

          return (
            <div
              key={stage.id}
              className={`relative z-10 flex flex-col items-center transition-all ${offsetClass}`}
            >
              {/* Central Node Circle */}
              <div className="relative">
                {/* Active Pulsing Ring */}
                {isActive && (
                  <span className="absolute -inset-3 rounded-full bg-amber-400/30 animate-ping" />
                )}

                <button
                  type="button"
                  onClick={() => !isLocked && onSelectStage(stage)}
                  disabled={isLocked}
                  className={`group relative flex size-20 sm:size-24 flex-col items-center justify-center rounded-3xl border-b-4 p-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-b-emerald-700 text-white shadow-md active:translate-y-1 active:border-b-0 hover:bg-emerald-600'
                      : isActive
                      ? 'bg-amber-400 border-b-amber-600 text-amber-950 shadow-xl ring-4 ring-amber-300/80 active:translate-y-1 active:border-b-0 scale-105'
                      : 'bg-zinc-200 border-b-zinc-400 text-zinc-400 cursor-not-allowed opacity-80'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl drop-shadow-xs transition-transform group-hover:scale-110">
                    {stage.icone}
                  </span>

                  {/* Status Overlay Icon */}
                  {isCompleted && (
                    <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-white text-emerald-600 shadow-sm border border-emerald-200">
                      <CheckCircle2 className="size-4 fill-emerald-500 text-white" />
                    </span>
                  )}

                  {isLocked && (
                    <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-zinc-300 text-zinc-600 shadow-sm border border-zinc-200">
                      <Lock className="size-3.5" />
                    </span>
                  )}
                </button>
              </div>

              {/* Node Card Info / Stars */}
              <div className="mt-3 flex flex-col items-center text-center">
                {/* Stars for completed stage */}
                {isCompleted && (
                  <div className="mb-1 flex items-center gap-1">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`size-4 ${
                          s <= stage.estrelas
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Title & subtitle */}
                <h3 className="font-display text-sm sm:text-base font-extrabold text-zinc-900">
                  {stage.titulo}
                </h3>
                <span className="text-xs text-zinc-500 font-medium">
                  {stage.subtitulo}
                </span>

                {/* Active Stage CTA Button */}
                {isActive && (
                  <button
                    type="button"
                    onClick={() => onSelectStage(stage)}
                    className="mt-2.5 inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-5 py-2 font-display text-xs font-black text-amber-950 border-b-3 border-b-amber-600 shadow-md hover:bg-amber-500 active:translate-y-0.5 active:border-b-0 animate-bounce"
                    style={{ animationDuration: '2.5s' }}
                  >
                    <Play className="size-3.5 fill-amber-950" />
                    <span>JOGAR AGORA!</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
