import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Coins, Sparkles, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';

interface RewardModalProps {
  isOpen: boolean;
  scorePercent: number; // e.g. 100
  earnedStars: number;
  earnedCoins: number;
  onNextLesson: () => void;
  onBackToRoadmap: () => void;
  onRetry: () => void;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  isOpen,
  scorePercent = 100,
  earnedStars = 30,
  earnedCoins = 50,
  onNextLesson,
  onBackToRoadmap,
  onRetry,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti bursts
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 300);
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Circular gauge parameters
  const radius = 64;
  const circ = 2 * Math.PI * radius;
  const strokeOffset = circ - (scorePercent / 100) * circ;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-4 border-amber-300 bg-gradient-to-b from-white via-amber-50/40 to-sky-50 p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-56 rounded-full bg-amber-400/20 blur-3xl" />

        {/* Golden Trophy / Badge */}
        <div className="relative mx-auto mb-4 flex size-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-lg shadow-amber-400/30">
          <div className="grid size-full place-items-center rounded-2xl bg-gradient-to-b from-yellow-300 to-amber-500 text-white">
            <Trophy className="size-12 drop-shadow-md animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          {/* Sparkles pill badge */}
          <span className="absolute -bottom-2 rounded-full border-2 border-white bg-amber-600 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
            Mestre das Formas
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
          Lição Concluída com Sucesso!
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-semibold text-zinc-600">
          Você demonstrou raciocínio afiado e conquistou novas insígnias!
        </p>

        {/* Animated Circular Gauge - 100% Precision */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="relative grid size-36 place-items-center">
            <svg className="size-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="14"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#rewardGrad)"
                strokeWidth="14"
                strokeDasharray={circ}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="rewardGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute text-center">
              <span className="font-display text-3xl font-black text-zinc-900 tracking-tight">
                {scorePercent}%
              </span>
              <span className="block text-[10px] font-black uppercase tracking-wider text-emerald-600">
                Precisão Total
              </span>
            </div>
          </div>
        </div>

        {/* Reward Pills (Stars & Coins) */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-2xl border-2 border-amber-300 bg-amber-100/80 px-4 py-2 text-sm font-black text-amber-900 shadow-xs">
            <Star className="size-5 fill-amber-500 text-amber-500" />
            <span>+{earnedStars} Estrelas</span>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border-2 border-yellow-300 bg-yellow-100/80 px-4 py-2 text-sm font-black text-yellow-900 shadow-xs">
            <Coins className="size-5 text-yellow-700" />
            <span>+{earnedCoins} Moedas</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onNextLesson}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 px-6 font-display text-sm font-black text-white border-b-4 border-b-emerald-700 shadow-md transition hover:bg-emerald-600 active:translate-y-1 active:border-b-0"
          >
            <span>Próxima Lição da Trilha</span>
            <ArrowRight className="size-4" />
          </button>

          <button
            type="button"
            onClick={onBackToRoadmap}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-zinc-200 bg-white py-2.5 px-4 font-display text-xs font-bold text-zinc-700 shadow-2xs hover:bg-zinc-100"
          >
            <span>Voltar ao Mapa de Fases</span>
          </button>
        </div>
      </div>
    </div>
  );
};
