import React from 'react';
import { ArrowLeft, Clock, Star, Coins, Volume2, Sparkles } from 'lucide-react';

interface StudentTopBarProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  stars: number;
  coins: number;
  timeRemaining: string;
  onExit: () => void;
}

export const StudentTopBar: React.FC<StudentTopBarProps> = ({
  title,
  currentStep,
  totalSteps,
  stars,
  coins,
  timeRemaining,
  onExit,
}) => {
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-3 border-b-2 border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-sky-50 px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between gap-3">
        {/* Exit / Back button */}
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1.5 rounded-2xl border-2 border-zinc-200 bg-white px-3 py-1.5 text-xs font-extrabold text-zinc-700 shadow-xs transition hover:bg-zinc-100 active:translate-y-0.5"
        >
          <ArrowLeft className="size-4 text-zinc-500" />
          <span className="hidden sm:inline">Trilha de Fases</span>
        </button>

        {/* Title & Step */}
        <div className="text-center flex-1 min-w-0">
          <span className="block truncate font-display text-sm sm:text-base font-extrabold text-zinc-900">
            {title}
          </span>
          <span className="text-[11px] font-bold text-amber-700">
            Desafio {currentStep} de {totalSteps}
          </span>
        </div>

        {/* Gamification Stats: Timer, Stars, Coins */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Timer */}
          <div className="flex items-center gap-1 rounded-2xl border-2 border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-extrabold text-sky-800 shadow-2xs">
            <Clock className="size-3.5 text-sky-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{timeRemaining}</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 rounded-2xl border-2 border-amber-200 bg-amber-100/80 px-2.5 py-1 text-xs font-extrabold text-amber-900 shadow-2xs">
            <Star className="size-3.5 fill-amber-500 text-amber-500" />
            <span>{stars}</span>
          </div>

          {/* Coins */}
          <div className="hidden sm:flex items-center gap-1 rounded-2xl border-2 border-yellow-300 bg-yellow-100/80 px-2.5 py-1 text-xs font-extrabold text-yellow-900 shadow-2xs">
            <Coins className="size-3.5 text-yellow-700" />
            <span>{coins}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar with rounded playful pill */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-200/80 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
        <div className="absolute right-2 top-0 bottom-0 flex items-center">
          <Sparkles className="size-2.5 text-white animate-pulse" />
        </div>
      </div>
    </header>
  );
};
