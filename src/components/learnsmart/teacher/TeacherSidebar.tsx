import React from 'react';
import {
  Lightbulb,
  LayoutDashboard,
  Users,
  CalendarDays,
  CheckSquare,
  Share2,
  TrendingUp,
  MessageSquare,
  Settings,
  Sparkles,
} from 'lucide-react';

export type TeacherNavTab =
  | 'dashboard'
  | 'alunos'
  | 'calendario'
  | 'tarefas'
  | 'compartilhados'
  | 'estatisticas'
  | 'mensagens'
  | 'configuracoes';

interface TeacherSidebarProps {
  activeTab: TeacherNavTab;
  onSelectTab: (tab: TeacherNavTab) => void;
  onSwitchToEduCreator: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({
  activeTab,
  onSelectTab,
  onSwitchToEduCreator,
}) => {
  const menuItems: { id: TeacherNavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alunos', label: 'Alunos / Turmas', icon: Users },
    { id: 'calendario', label: 'Calendário & Planejamento', icon: CalendarDays },
    { id: 'tarefas', label: 'Tarefas & Avaliações', icon: CheckSquare },
    { id: 'compartilhados', label: 'Compartilhados', icon: Share2 },
    { id: 'estatisticas', label: 'Estatísticas', icon: TrendingUp },
    { id: 'mensagens', label: 'Mensagens', icon: MessageSquare },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-zinc-200/90 bg-white/90 backdrop-blur-md md:flex print:hidden">
      <div className="flex h-full flex-col p-6">
        {/* LearnSmart Logo */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-indigo-600 text-white shadow-md shadow-amber-500/20">
              <Lightbulb className="size-5 fill-white stroke-amber-100" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-zinc-900 block leading-tight">
                LearnSmart
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                Teacher Hub
              </span>
            </div>
          </div>
        </div>

        {/* Quick Link to EduCreator Creation Platform */}
        <button
          type="button"
          onClick={onSwitchToEduCreator}
          className="mb-6 flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 text-left transition hover:bg-emerald-100/70 shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-emerald-600 shrink-0" />
            <div>
              <span className="block text-xs font-bold text-emerald-950">
                Criador de Provas IA
              </span>
              <span className="text-[10px] text-emerald-700">EduCreator BNCC</span>
            </div>
          </div>
          <span className="rounded-md bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
            Abrir
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1 overflow-y-auto pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900'
                }`}
              >
                <Icon className={`size-4.5 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile Card Footer */}
        <div className="mt-auto border-t border-zinc-200/80 pt-4">
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-2.5">
            <div className="relative">
              <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 font-display text-xs font-bold text-white shadow-2xs">
                RM
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-zinc-900">
                Prof. Ricardo Mendes
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span>Ativo agora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
