import React from 'react';

interface PrintHeaderProps {
  titulo: string;
  disciplina: string;
  ano: string;
  type: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ titulo, disciplina, ano, type }) => {
  return (
    <div className="mb-6 rounded-lg border border-border bg-card p-5 text-sm print:mb-8 print:border-2 print:border-black print:p-4">
      <div className="mb-4 flex flex-col justify-between border-b border-border pb-3 sm:flex-row sm:items-center print:border-black">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand print:text-black">
            {type.toUpperCase()} • {disciplina.toUpperCase()}
          </span>
          <h2 className="font-display text-lg font-bold text-foreground print:text-black">{titulo}</h2>
        </div>
        <div className="mt-2 text-right text-xs text-muted-foreground sm:mt-0 print:text-black">
          <span className="font-semibold">{ano}</span>
        </div>
      </div>

      {/* Official School Header Fields */}
      <div className="grid grid-cols-1 gap-y-3 gap-x-6 text-xs sm:grid-cols-2 md:grid-cols-12 print:grid-cols-12">
        <div className="sm:col-span-2 md:col-span-8 print:col-span-8">
          <span className="font-medium text-muted-foreground print:text-black">Escola:</span>{' '}
          <span className="inline-block min-w-[200px] border-b border-dotted border-border print:min-w-[280px] print:border-black">
            &nbsp;
          </span>
        </div>
        <div className="sm:col-span-1 md:col-span-4 print:col-span-4 text-right print:text-right">
          <span className="font-medium text-muted-foreground print:text-black">Data:</span>{' '}
          <span className="inline-block min-w-[90px] border-b border-dotted border-border print:border-black">
            ____/____/________
          </span>
        </div>

        <div className="sm:col-span-2 md:col-span-7 print:col-span-7">
          <span className="font-medium text-muted-foreground print:text-black">Aluno(a):</span>{' '}
          <span className="inline-block min-w-[220px] border-b border-dotted border-border print:min-w-[260px] print:border-black">
            &nbsp;
          </span>
        </div>

        <div className="sm:col-span-1 md:col-span-2 print:col-span-2">
          <span className="font-medium text-muted-foreground print:text-black">Turma:</span>{' '}
          <span className="inline-block min-w-[50px] border-b border-dotted border-border print:border-black">
            _________
          </span>
        </div>

        <div className="sm:col-span-1 md:col-span-3 print:col-span-3 text-right print:text-right">
          <span className="font-medium text-muted-foreground print:text-black">Nota:</span>{' '}
          <span className="inline-block min-w-[60px] border-b border-dotted border-border print:border-black">
            ________
          </span>
        </div>
      </div>
    </div>
  );
};
