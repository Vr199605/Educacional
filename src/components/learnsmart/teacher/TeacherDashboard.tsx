import React, { useState } from 'react';
import { TeacherSidebar, TeacherNavTab } from './TeacherSidebar';
import { TeacherHeader, CentralTab } from './TeacherHeader';
import { AnalyticsCharts } from './AnalyticsCharts';
import { LessonPlanningCalendar } from './LessonPlanningCalendar';
import { StudentsClassDirectory } from './StudentsClassDirectory';
import { AssignmentsManager } from './AssignmentsManager';
import { SharedResourcesHub } from './SharedResourcesHub';
import { AdvancedAnalyticsView } from './AdvancedAnalyticsView';
import { MessagesCenter } from './MessagesCenter';
import { TeacherSettingsView } from './TeacherSettingsView';
import { ClassScheduleItem } from '../mockData';
import { CheckCircle } from 'lucide-react';

interface TeacherDashboardProps {
  onSwitchToEduCreator: () => void;
  onLaunchStudentQuiz?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onSwitchToEduCreator,
  onLaunchStudentQuiz,
}) => {
  const [navTab, setNavTab] = useState<TeacherNavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLessonModalOpen, setIsNewLessonModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Synchronize header central tabs with the active navigation tab
  const getActiveCentralTab = (): CentralTab | null => {
    if (navTab === 'dashboard' || navTab === 'estatisticas') return 'relatorios';
    if (navTab === 'calendario') return 'planejamento';
    if (navTab === 'compartilhados') return 'conteudos';
    return null;
  };

  const handleCentralTabChange = (tab: CentralTab) => {
    if (tab === 'relatorios') setNavTab('dashboard');
    if (tab === 'planejamento') setNavTab('calendario');
    if (tab === 'conteudos') setNavTab('compartilhados');
  };

  const handleExport = () => {
    setNotification('Relatório pedagógico consolidado exportado com sucesso em PDF!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStartLesson = (lesson?: ClassScheduleItem) => {
    if (onLaunchStudentQuiz) {
      onLaunchStudentQuiz();
    } else {
      setNotification(`Iniciando módulo interativo para a turma ${lesson?.turma || '9º Ano B'}...`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-zinc-900">
      {/* Sidebar with all 8 functional options */}
      <TeacherSidebar
        activeTab={navTab}
        onSelectTab={(tab) => setNavTab(tab)}
        onSwitchToEduCreator={onSwitchToEduCreator}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Superior Header */}
        <TeacherHeader
          activeTab={getActiveCentralTab()}
          onTabChange={handleCentralTabChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewLesson={() => setIsNewLessonModalOpen(true)}
          onExport={handleExport}
        />

        {/* Notification Toast */}
        {notification && (
          <div className="mx-6 mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="size-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content Views - 100% mapped to each sidebar option */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {navTab === 'dashboard' && (
            <AnalyticsCharts
              onStartLesson={() => handleStartLesson()}
              onGoToCalendar={() => setNavTab('calendario')}
            />
          )}

          {navTab === 'alunos' && (
            <StudentsClassDirectory
              onSendMessage={() => setNavTab('mensagens')}
            />
          )}

          {navTab === 'calendario' && (
            <LessonPlanningCalendar onStartLesson={handleStartLesson} />
          )}

          {navTab === 'tarefas' && (
            <AssignmentsManager onOpenEduCreator={onSwitchToEduCreator} />
          )}

          {navTab === 'compartilhados' && (
            <SharedResourcesHub onUseResource={() => setNavTab('tarefas')} />
          )}

          {navTab === 'estatisticas' && (
            <AdvancedAnalyticsView />
          )}

          {navTab === 'mensagens' && (
            <MessagesCenter />
          )}

          {navTab === 'configuracoes' && (
            <TeacherSettingsView />
          )}
        </main>
      </div>

      {/* New Lesson Modal */}
      {isNewLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="font-display text-lg font-bold text-zinc-900">Agendar Nova Aula</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Adicione uma nova sessão ao seu calendário semanal de planejamento.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsNewLessonModalOpen(false);
                setNotification('Aula agendada com sucesso no calendário semanal!');
                setTimeout(() => setNotification(null), 3000);
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Título / Tema</label>
                <input
                  type="text"
                  placeholder="Ex: Introdução à Álgebra e Equações"
                  className="w-full rounded-xl border border-zinc-200 p-2.5 focus:border-indigo-600 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Turma</label>
                  <select className="w-full rounded-xl border border-zinc-200 p-2.5 bg-white">
                    <option>6º Ano A</option>
                    <option>7º Ano B</option>
                    <option>8º Ano C</option>
                    <option>9º Ano B</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-zinc-700 mb-1">Dia</label>
                  <select className="w-full rounded-xl border border-zinc-200 p-2.5 bg-white">
                    <option>Segunda-feira</option>
                    <option>Terça-feira</option>
                    <option>Quarta-feira</option>
                    <option>Quinta-feira</option>
                    <option>Sexta-feira</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsNewLessonModalOpen(false)}
                  className="rounded-xl px-4 py-2 font-semibold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Salvar Aula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
