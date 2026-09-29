import React from 'react';
import { Sparkles, LayoutDashboard, Gamepad2, Layers } from 'lucide-react';

export type PlatformViewMode = 'educreator' | 'teacher' | 'student';

interface ViewSwitcherProps {
  currentMode: PlatformViewMode;
  onModeChange: (mode: PlatformViewMode) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  currentMode,
  onModeChange,
}) => {
  const modes: {
    id: PlatformViewMode;
    label: string;
    shortLabel: string;
    icone: string;
    color: string;
  }[] = [
    {
      id: 'educreator',
      label: 'Criador BNCC (EduCreator)',
      shortLabel: 'Criador IA',
      icone: '🎓',
      color: 'bg-emerald-600 text-white',
    },
    {
      id: 'teacher',
      label: 'Painel Professor (LearnSmart)',
      shortLabel: 'Professor',
      icone: '👨‍🏫',
      color: 'bg-indigo-600 text-white',
    },
    {
      id: 'student',
      label: 'Visão do Aluno (Gamificado)',
      shortLabel: 'Aluno',
      icone: '🎒',
      color: 'bg-amber-500 text-amber-950 font-black',
    },
  ];

  return (
    <aside
      aria-label="Alternador de Visão da Plataforma"
      className="fixed top-3 right-4 z-50 flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white/95 p-1 shadow-lg backdrop-blur-md transition-all hover:shadow-xl print:hidden"
    >
      <span className="hidden lg:flex items-center gap-1 pl-2.5 pr-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
        <Layers className="size-3.5 text-zinc-500" />
        Visão:
      </span>

      <div className="flex items-center gap-1">
        {modes.map((m) => {
          const isActive = currentMode === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onModeChange(m.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? `${m.color} shadow-sm scale-102`
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              <span className="text-sm">{m.icone}</span>
              <span className="hidden sm:inline">{m.label}</span>
              <span className="sm:hidden">{m.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
