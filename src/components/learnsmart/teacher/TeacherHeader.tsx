import React from 'react';
import { Search, HelpCircle, Download, Plus, Bell } from 'lucide-react';

export type CentralTab = 'relatorios' | 'planejamento' | 'conteudos';

interface TeacherHeaderProps {
  activeTab: CentralTab | null;
  onTabChange: (tab: CentralTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNewLesson: () => void;
  onExport: () => void;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onNewLesson,
  onExport,
}) => {
  const tabs: { id: CentralTab; label: string }[] = [
    { id: 'relatorios', label: 'Relatórios & Analytics' },
    { id: 'planejamento', label: 'Planejamento de Aulas' },
    { id: 'conteudos', label: 'Conteúdos Didáticos' },
  ];

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/90 bg-white/80 px-6 py-4 backdrop-blur-md">
      {/* Central Quick Tabs */}
      <div className="flex items-center rounded-2xl border border-zinc-200/90 bg-zinc-100/70 p-1 shadow-2xs">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                isActive
                  ? 'bg-white text-zinc-900 shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Right Area: Search, Help, Actions */}
      <div className="flex flex-1 items-center justify-end gap-3 max-w-xl">
        {/* Global Search */}
        <div className="relative w-full max-w-xs hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-zinc-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar turmas, alunos, relatórios..."
            className="w-full rounded-2xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs placeholder:text-zinc-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 shadow-2xs"
          />
        </div>

        {/* Notifications & Help */}
        <button
          type="button"
          title="Ajuda & Suporte"
          className="rounded-xl border border-zinc-200 bg-white p-2 text-zinc-500 shadow-2xs hover:bg-zinc-50 hover:text-zinc-900"
        >
          <HelpCircle className="size-4.5" />
        </button>

        {/* Primary Action Buttons */}
        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-zinc-900"
        >
          <Download className="size-3.5 text-zinc-500" />
          <span className="hidden sm:inline">Exportar</span>
        </button>

        <button
          type="button"
          onClick={onNewLesson}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-95"
        >
          <Plus className="size-4" />
          <span>Nova Aula</span>
        </button>
      </div>
    </header>
  );
};
