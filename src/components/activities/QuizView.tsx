import React, { useState } from 'react';
import { Activity } from '../../types/activity';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  activity: Activity;
}

export const QuizView: React.FC<QuizViewProps> = ({ activity }) => {
  const questoes = activity.questoes || [];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx: number, letter: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: letter,
    }));
  };

  const handleFinish = () => {
    setSubmitted(true);
    // Celebrate with confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  // Calculate score
  const totalQuestions = questoes.length;
  let correctCount = 0;
  questoes.forEach((q, idx) => {
    const chosen = selectedAnswers[idx];
    const correct = q.resposta?.trim().toUpperCase();
    if (chosen && correct && (chosen === correct || correct.startsWith(chosen))) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / (totalQuestions || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Quiz Banner & Score Header */}
      <div className="overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-indigo-50/50 p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-sky-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                Modo Interativo
              </span>
              <span className="text-xs text-muted-foreground">{activity.disciplina} • {activity.ano}</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {activity.titulo}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Responda às questões clicando na alternativa desejada e veja sua pontuação em tempo real.
            </p>
          </div>

          {submitted && (
            <div className="flex items-center gap-3 rounded-xl border border-sky-300 bg-white p-4 shadow-sm">
              <div className="grid size-12 place-items-center rounded-full bg-sky-100 text-sky-600">
                <Trophy className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Resultado Final
                </span>
                <p className="font-display text-lg font-bold text-foreground">
                  {correctCount} de {totalQuestions} ({percentage}%)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {questoes.map((q, idx) => {
          const chosen = selectedAnswers[idx];
          const correctLetter = q.resposta?.trim().toUpperCase();

          return (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-6 shadow-2xs transition hover:border-sky-300/60"
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sky-100 font-display text-xs font-bold text-sky-700">
                  {idx + 1}
                </span>
                <p className="font-medium text-sm md:text-base leading-relaxed text-foreground">
                  {q.enunciado}
                </p>
              </div>

              {/* Alternatives */}
              <div className="ml-10 space-y-2.5">
                {(q.alternativas || []).map((alt, altIdx) => {
                  const letter = String.fromCharCode(65 + altIdx);
                  const isSelected = chosen === letter;
                  const isCorrect = correctLetter === letter || correctLetter?.startsWith(letter);

                  let btnStyle = 'border-border bg-background hover:bg-muted/60 text-foreground';
                  if (isSelected && !submitted) {
                    btnStyle = 'border-sky-500 bg-sky-50 text-sky-900 font-medium ring-2 ring-sky-500/20';
                  } else if (submitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-2 ring-emerald-500/30';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through opacity-80';
                    }
                  }

                  return (
                    <button
                      key={altIdx}
                      type="button"
                      onClick={() => handleSelect(idx, letter)}
                      disabled={submitted}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-xs md:text-sm transition ${btnStyle}`}
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                          submitted && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : submitted && isSelected && !isCorrect
                            ? 'bg-rose-500 text-white'
                            : isSelected
                            ? 'bg-sky-600 text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 pt-0.5 leading-normal">{alt.replace(/^[A-E]\)\s*/, '')}</span>

                      {submitted && isCorrect && <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="size-5 shrink-0 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Comment */}
              {submitted && (
                <div className="ml-10 mt-4 rounded-lg border border-border bg-muted/30 p-3.5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Explicação: </span>
                  {q.comentario || `A alternativa correta é a letra ${correctLetter}.`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
        <span className="text-xs text-muted-foreground">
          {Object.keys(selectedAnswers).length} de {totalQuestions} respondidas
        </span>

        <div className="flex items-center gap-3">
          {submitted ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
            >
              <RotateCcw className="size-3.5" />
              Tentar Novamente
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-50"
            >
              <Sparkles className="size-4" />
              Finalizar e Ver Gabarito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
