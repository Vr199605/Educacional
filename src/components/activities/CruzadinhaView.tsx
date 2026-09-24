import React, { useMemo } from 'react';
import { Activity } from '../../types/activity';
import { generateCrosswordGrid } from '../../services/crosswordGenerator';
import { Grid3X3, ArrowRight, ArrowDown, AlertTriangle } from 'lucide-react';

interface CruzadinhaViewProps {
  activity: Activity;
  showAnswers: boolean;
}

export const CruzadinhaView: React.FC<CruzadinhaViewProps> = ({ activity, showAnswers }) => {
  const palavras = activity.cruzadinha?.palavras || [];

  const gridData = useMemo(() => {
    return generateCrosswordGrid(palavras);
  }, [palavras]);

  const horizontais = useMemo(() => {
    return gridData.placed.filter((w) => w.direcao === 'horizontal');
  }, [gridData]);

  const verticais = useMemo(() => {
    return gridData.placed.filter((w) => w.direcao === 'vertical');
  }, [gridData]);

  if (palavras.length === 0 || gridData.rows === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Nenhuma palavra disponível para cruzadinha.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
            Passatempo Pedagógico
          </span>
          <h2 className="font-display text-xl font-bold text-foreground">
            Palavras Cruzadas: {activity.tema}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Grid3X3 className="size-4" />
          <span>
            {gridData.placed.length} palavras na grade ({gridData.rows} x {gridData.cols})
          </span>
        </div>
      </div>

      {/* Crossword 2D Grid Table */}
      <div className="overflow-x-auto py-4">
        <div className="mx-auto flex w-fit flex-col items-center justify-center p-4">
          <div className="grid gap-0.5 rounded-lg border-2 border-zinc-900 bg-zinc-900 p-1 shadow-md print:shadow-none">
            {gridData.cells.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-0.5">
                {row.map((cell, cIdx) => {
                  if (!cell) {
                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="size-8.5 bg-zinc-950 sm:size-9 print:bg-black"
                      />
                    );
                  }

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className="relative grid size-8.5 place-items-center bg-white text-zinc-900 sm:size-9"
                    >
                      {/* Cell Clue Numbers */}
                      {cell.numbers && cell.numbers.length > 0 && (
                        <span className="absolute top-0.5 left-0.5 text-[9px] font-extrabold leading-none text-zinc-700">
                          {cell.numbers.join(',')}
                        </span>
                      )}

                      {/* Letter Reveal when showAnswers is enabled */}
                      <span
                        className={`font-display text-sm font-bold uppercase ${
                          showAnswers ? 'text-brand' : 'text-transparent select-none'
                        }`}
                      >
                        {cell.letter}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clues (Horizontais & Verticais) */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Horizontais */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <ArrowRight className="size-4 text-brand" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand">
              Dicas Horizontais →
            </h3>
          </div>
          <ol className="space-y-3 text-xs md:text-sm">
            {horizontais.map((item) => (
              <li key={item.numero} className="flex items-start gap-2.5">
                <span className="grid size-5.5 shrink-0 place-items-center rounded-md bg-brand/10 font-bold text-brand">
                  {item.numero}
                </span>
                <div className="flex-1">
                  <span className="text-zinc-800 leading-snug">{item.dica}</span>
                  {showAnswers && (
                    <span className="ml-2 font-mono text-xs font-bold text-emerald-700">
                      [{item.palavra}]
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Verticais */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-2xs">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <ArrowDown className="size-4 text-brand" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand">
              Dicas Verticais ↓
            </h3>
          </div>
          <ol className="space-y-3 text-xs md:text-sm">
            {verticais.map((item) => (
              <li key={item.numero} className="flex items-start gap-2.5">
                <span className="grid size-5.5 shrink-0 place-items-center rounded-md bg-brand/10 font-bold text-brand">
                  {item.numero}
                </span>
                <div className="flex-1">
                  <span className="text-zinc-800 leading-snug">{item.dica}</span>
                  {showAnswers && (
                    <span className="ml-2 font-mono text-xs font-bold text-emerald-700">
                      [{item.palavra}]
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Missing words notice if any */}
      {gridData.missing.length > 0 && (
        <div className="flex items-center gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          <AlertTriangle className="size-4 shrink-0 text-amber-600" />
          <span>
            Algumas palavras não puderam ser encaixadas na grade por falta de letras coincidentes:{' '}
            <strong>{gridData.missing.map((w) => w.palavra).join(', ')}</strong>.
          </span>
        </div>
      )}
    </div>
  );
};
