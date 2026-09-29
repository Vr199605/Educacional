import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, HelpCircle, Volume2 } from 'lucide-react';

export interface ChallengeItem {
  id: number;
  pergunta: string;
  subtexto: string;
  imagemTipo: 'pizza_fracao' | 'formas_geometria' | 'barras_divisao';
  alternativas: { id: string; texto: string; icone?: string; correta: boolean }[];
  explicacao: string;
}

export const MOCK_CHALLENGES: ChallengeItem[] = [
  {
    id: 1,
    pergunta: 'Quantas partes coloridas de azul formam esta figura?',
    subtexto: 'Toque nas fatias azuis para contar ou escolha a fração equivalente abaixo:',
    imagemTipo: 'pizza_fracao',
    alternativas: [
      { id: 'a', texto: '3/4 (Três quartos)', icone: '🍰', correta: true },
      { id: 'b', texto: '1/2 (Metade)', icone: '🌓', correta: false },
      { id: 'c', texto: '2/4 (Dois quartos)', icone: '🍕', correta: false },
      { id: 'd', texto: '1/4 (Um quarto)', icone: '🔷', correta: false },
    ],
    explicacao: 'Muito bem! A pizza geométrica possui 4 partes no total e 3 delas estão pintadas de azul (3/4)!',
  },
  {
    id: 2,
    pergunta: 'Qual dessas formas geométricas possui exatamente 5 lados e 5 vértices?',
    subtexto: 'Observe os ângulos e selecione a figura certa:',
    imagemTipo: 'formas_geometria',
    alternativas: [
      { id: 'a', texto: 'Pentágono Dourado', icone: '⭐', correta: true },
      { id: 'b', texto: 'Triângulo Azul', icone: '🔺', correta: false },
      { id: 'c', texto: 'Quadrado Verde', icone: '🟩', correta: false },
      { id: 'd', texto: 'Círculo Rosa', icone: '🟣', correta: false },
    ],
    explicacao: 'Excelente raciocínio! O pentágono é o polígono que possui 5 lados e 5 vértices.',
  },
  {
    id: 3,
    pergunta: 'Se juntarmos 2 barras coloridas de 1/4, quanto teremos do bloco inteiro?',
    subtexto: 'Veja o encaixe visual das barras coloridas:',
    imagemTipo: 'barras_divisao',
    alternativas: [
      { id: 'a', texto: '2/4 ou 1/2 (A metade exata)', icone: '📏', correta: true },
      { id: 'b', texto: '3/4 do total', icone: '🟦', correta: false },
      { id: 'c', texto: '4/4 (Bloco inteiro)', icone: '🧱', correta: false },
      { id: 'd', texto: '1/3 do total', icone: '🟨', correta: false },
    ],
    explicacao: 'Incrível! 1/4 + 1/4 = 2/4, que simplificado é exatamente 1/2 (a metade do bloco)!',
  },
];

interface InteractiveChallengeProps {
  challengeIndex: number;
  onNext: () => void;
  onComplete: () => void;
  totalChallenges: number;
}

export const InteractiveChallenge: React.FC<InteractiveChallengeProps> = ({
  challengeIndex,
  onNext,
  onComplete,
  totalChallenges,
}) => {
  const challenge = MOCK_CHALLENGES[challengeIndex % MOCK_CHALLENGES.length];
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  const handleSelect = (altId: string) => {
    if (isAnswered) return;
    setSelectedAlt(altId);
    const chosen = challenge.alternativas.find((a) => a.id === altId);
    const correct = chosen?.correta ?? false;
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleContinue = () => {
    setSelectedAlt(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (challengeIndex + 1 >= totalChallenges) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 py-4">
      {/* Question Header Card */}
      <div className="rounded-3xl border-2 border-amber-200/90 bg-white p-6 text-center shadow-md">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-800">
          <Sparkles className="size-3.5 text-amber-600" />
          Desafio Interativo
        </span>
        <h2 className="mt-2 font-display text-xl sm:text-2xl font-extrabold text-zinc-900 leading-snug">
          {challenge.pergunta}
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-500">
          {challenge.subtexto}
        </p>
      </div>

      {/* Central Tactile Illustrated Area (Geometric Shapes) */}
      <div className="flex flex-col items-center justify-center rounded-3xl border-3 border-dashed border-sky-300 bg-gradient-to-b from-sky-50/70 to-indigo-50/50 p-6 sm:p-8 shadow-inner">
        {challenge.imagemTipo === 'pizza_fracao' && (
          <div className="relative flex flex-col items-center">
            {/* Interactive SVG Pizza / Circle divided in 4 slices */}
            <svg
              viewBox="0 0 200 200"
              className="size-48 sm:size-56 drop-shadow-lg cursor-pointer transition-transform hover:scale-105"
            >
              {/* Slice 1 (Blue - Active) */}
              <path
                d="M 100 100 L 100 10 A 90 90 0 0 1 190 100 Z"
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="4"
                className="transition-opacity hover:opacity-85"
                onClick={() => setActiveSlice(1)}
              />
              {/* Slice 2 (Blue - Active) */}
              <path
                d="M 100 100 L 190 100 A 90 90 0 0 1 100 190 Z"
                fill="#0ea5e9"
                stroke="#0284c7"
                strokeWidth="4"
                className="transition-opacity hover:opacity-85"
                onClick={() => setActiveSlice(2)}
              />
              {/* Slice 3 (Blue - Active) */}
              <path
                d="M 100 100 L 100 190 A 90 90 0 0 1 10 100 Z"
                fill="#0284c7"
                stroke="#0369a1"
                strokeWidth="4"
                className="transition-opacity hover:opacity-85"
                onClick={() => setActiveSlice(3)}
              />
              {/* Slice 4 (White / Empty) */}
              <path
                d="M 100 100 L 10 100 A 90 90 0 0 1 100 10 Z"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="4"
                className="transition-opacity hover:opacity-85"
                onClick={() => setActiveSlice(4)}
              />
              <circle cx="100" cy="100" r="8" fill="#0f172a" />
            </svg>

            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-1.5 text-xs font-extrabold text-sky-900 shadow-xs border border-sky-200">
              <span>🟦 3 partes azuis</span>
              <span>•</span>
              <span className="text-zinc-400">⬜ 1 parte vazia</span>
            </div>
          </div>
        )}

        {challenge.imagemTipo === 'formas_geometria' && (
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 py-2">
            {/* Pentagon */}
            <div className="flex flex-col items-center gap-2 transition-transform hover:scale-110 cursor-pointer">
              <div className="grid size-20 sm:size-24 place-items-center rounded-2xl bg-amber-400 border-b-4 border-amber-600 text-white shadow-md">
                <span className="text-3xl font-extrabold">⬟</span>
              </div>
              <span className="text-[11px] font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                5 lados
              </span>
            </div>

            {/* Triangle */}
            <div className="flex flex-col items-center gap-2 transition-transform hover:scale-110 cursor-pointer">
              <div className="grid size-18 sm:size-20 place-items-center rounded-2xl bg-sky-400 border-b-4 border-sky-600 text-white shadow-md">
                <span className="text-3xl font-extrabold">▲</span>
              </div>
              <span className="text-[11px] font-extrabold text-sky-900 bg-sky-100 px-2 py-0.5 rounded-full">
                3 lados
              </span>
            </div>

            {/* Square */}
            <div className="flex flex-col items-center gap-2 transition-transform hover:scale-110 cursor-pointer">
              <div className="grid size-18 sm:size-20 place-items-center rounded-2xl bg-emerald-400 border-b-4 border-emerald-600 text-white shadow-md">
                <span className="text-3xl font-extrabold">■</span>
              </div>
              <span className="text-[11px] font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">
                4 lados
              </span>
            </div>
          </div>
        )}

        {challenge.imagemTipo === 'barras_divisao' && (
          <div className="w-full max-w-sm space-y-3">
            <div className="rounded-2xl border-2 border-indigo-200 bg-white p-3 text-center">
              <span className="text-xs font-extrabold text-indigo-900 mb-2 block">
                Bloco de Referência Inteiro (1.0)
              </span>
              <div className="h-6 w-full rounded-xl bg-zinc-200" />
            </div>

            <div className="grid grid-cols-4 gap-1.5 rounded-2xl border-2 border-indigo-300 bg-indigo-100/50 p-3 text-center">
              <div className="h-8 rounded-xl bg-emerald-400 border-b-3 border-emerald-600 flex items-center justify-center text-xs font-black text-emerald-950">
                1/4
              </div>
              <div className="h-8 rounded-xl bg-emerald-400 border-b-3 border-emerald-600 flex items-center justify-center text-xs font-black text-emerald-950">
                1/4
              </div>
              <div className="h-8 rounded-xl bg-zinc-200 border-dashed border-2 border-zinc-300 flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                1/4
              </div>
              <div className="h-8 rounded-xl bg-zinc-200 border-dashed border-2 border-zinc-300 flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                1/4
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tactile Big Alternative Buttons (Duolingo 3D style) */}
      <div className="grid gap-3 sm:grid-cols-2">
        {challenge.alternativas.map((alt) => {
          const isSelected = selectedAlt === alt.id;
          let btnStyle =
            'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/80 text-zinc-800 border-b-4 active:border-b-0 active:translate-y-1';

          if (isAnswered) {
            if (alt.correta) {
              btnStyle =
                'border-emerald-500 bg-emerald-100 text-emerald-950 border-b-4 border-b-emerald-600 shadow-md';
            } else if (isSelected && !alt.correta) {
              btnStyle =
                'border-rose-400 bg-rose-100 text-rose-950 border-b-4 border-b-rose-600 line-through opacity-70';
            }
          } else if (isSelected) {
            btnStyle =
              'border-sky-500 bg-sky-50 text-sky-950 border-b-4 border-b-sky-600 ring-2 ring-sky-300';
          }

          return (
            <button
              key={alt.id}
              type="button"
              onClick={() => handleSelect(alt.id)}
              disabled={isAnswered}
              className={`flex items-center gap-3.5 rounded-2xl border-2 p-4 text-left font-display text-sm sm:text-base font-bold transition-all ${btnStyle}`}
            >
              {alt.icone && <span className="text-2xl shrink-0">{alt.icone}</span>}
              <span className="flex-1 leading-snug">{alt.texto}</span>
              {isAnswered && alt.correta && (
                <CheckCircle2 className="size-5.5 text-emerald-600 shrink-0" />
              )}
              {isAnswered && isSelected && !alt.correta && (
                <XCircle className="size-5.5 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Bar & Continue Action */}
      {isAnswered && (
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border-2 p-5 animate-in fade-in slide-in-from-bottom-2 ${
            isCorrect
              ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
              : 'border-rose-300 bg-rose-50 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`grid size-11 place-items-center rounded-2xl text-white font-extrabold ${
                isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            >
              {isCorrect ? '🎉' : '💡'}
            </div>
            <div>
              <h4 className="font-display font-extrabold text-base">
                {isCorrect ? 'Excelente! Resposta Certa!' : 'Quase lá! Veja a dica:'}
              </h4>
              <p className="text-xs text-zinc-600 mt-0.5">{challenge.explicacao}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-display text-sm font-extrabold text-white border-b-4 active:border-b-0 active:translate-y-1 shadow-md ${
              isCorrect
                ? 'bg-emerald-600 border-b-emerald-800 hover:bg-emerald-700'
                : 'bg-zinc-800 border-b-zinc-950 hover:bg-zinc-900'
            }`}
          >
            <span>{challengeIndex + 1 >= totalChallenges ? 'Ver Recompensa! 🏆' : 'Continuar ➔'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
