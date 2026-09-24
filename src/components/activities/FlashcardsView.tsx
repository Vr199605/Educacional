import React, { useState } from 'react';
import { Activity } from '../../types/activity';
import { ChevronLeft, ChevronRight, RotateCw, Lightbulb, Grid, CreditCard } from 'lucide-react';

interface FlashcardsViewProps {
  activity: Activity;
  showAnswers: boolean;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ activity, showAnswers }) => {
  const cards = activity.flashcards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');

  if (cards.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum flashcard disponível.</p>;
  }

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
            Estudo Ativo & Repetição Espaçada
          </span>
          <h2 className="font-display text-xl font-bold text-foreground">
            {cards.length} Flashcards Pedagógicos
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'single' ? 'grid' : 'single')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
          >
            {viewMode === 'single' ? (
              <>
                <Grid className="size-3.5" />
                <span>Ver Todos em Grade</span>
              </>
            ) : (
              <>
                <CreditCard className="size-3.5" />
                <span>Modo Carrossel 3D</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SINGLE 3D CAROUSEL MODE */}
      {viewMode === 'single' && (
        <div className="mx-auto max-w-xl">
          <div
            className="perspective-1000 relative h-80 w-full cursor-pointer select-none"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`transform-style-3d relative h-full w-full rounded-2xl shadow-md transition-transform duration-500 ${
                isFlipped || showAnswers ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF THE CARD */}
              <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50/40 p-8 text-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-bold text-indigo-700">
                    Frente • #{currentIndex + 1} de {cards.length}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <RotateCw className="size-3" /> Clique para virar
                  </span>
                </div>

                <div className="my-auto text-center">
                  <h3 className="font-display text-xl font-semibold leading-relaxed md:text-2xl text-zinc-900">
                    {currentCard.frente}
                  </h3>
                </div>

                {currentCard.dica && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-600">
                    <Lightbulb className="size-3.5" />
                    <span>Dica: {currentCard.dica}</span>
                  </div>
                )}
              </div>

              {/* BACK OF THE CARD */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-white to-emerald-50/50 p-8 text-foreground shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
                    Verso (Resposta) • #{currentIndex + 1}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <RotateCw className="size-3" /> Clique para voltar
                  </span>
                </div>

                <div className="my-auto text-center">
                  <p className="font-display text-lg font-medium leading-relaxed md:text-xl text-emerald-950">
                    {currentCard.verso}
                  </p>
                </div>

                <div className="text-center text-[10px] uppercase tracking-wider text-muted-foreground">
                  {activity.disciplina} • {activity.ano}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-2xs hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
              Anterior
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-indigo-700"
            >
              <RotateCw className="size-3.5" />
              Virar Cartão
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-2xs hover:bg-muted"
            >
              Próximo
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* GRID VIEW MODE */}
      {viewMode === 'grid' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-2xs"
            >
              <div className="border-b border-border bg-indigo-50/60 p-4">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Cartão #{i + 1} • Frente
                </span>
                <p className="text-sm font-semibold text-foreground leading-snug">{c.frente}</p>
                {c.dica && (
                  <p className="mt-2 text-xs italic text-zinc-500">
                    Dica: {c.dica}
                  </p>
                )}
              </div>
              <div className={`p-4 ${showAnswers ? '' : 'bg-muted/30'}`}>
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Verso
                </span>
                <p className={`text-sm text-foreground ${showAnswers ? '' : 'blur-xs select-none'}`}>
                  {c.verso}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
