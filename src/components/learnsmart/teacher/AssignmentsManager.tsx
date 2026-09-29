import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export interface AssignmentItem {
  id: string;
  titulo: string;
  disciplina: string;
  turma: string;
  dataEntrega: string;
  status: 'ativa' | 'corrigir' | 'concluida';
  entregas: number;
  totalAlunos: number;
  mediaNota?: number;
  tipo: 'Prova' | 'Lista de Exercícios' | 'Quiz Gamificado' | 'Trabalho';
}

export const MOCK_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'asg-1',
    titulo: 'Prova Bimestral de Geometria Espacial',
    disciplina: 'Matemática',
    turma: '9º Ano B',
    dataEntrega: 'Hoje às 23:59',
    status: 'ativa',
    entregas: 28,
    totalAlunos: 32,
    tipo: 'Prova',
  },
  {
    id: 'asg-2',
    titulo: 'Lista de Exercícios: Frações e Porcentagem',
    disciplina: 'Matemática',
    turma: '8º Ano B',
    dataEntrega: 'Amanhã',
    status: 'ativa',
    entregas: 24,
    totalAlunos: 30,
    tipo: 'Lista de Exercícios',
  },
  {
    id: 'asg-3',
    titulo: 'Quiz Interativo: Cadeias Alimentares & Ecologia',
    disciplina: 'Ciências',
    turma: '7º Ano A',
    dataEntrega: '25 Set',
    status: 'corrigir',
    entregas: 29,
    totalAlunos: 29,
    mediaNota: 9.1,
    tipo: 'Quiz Gamificado',
  },
  {
    id: 'asg-4',
    titulo: 'Interpretação e Análise da Revolução Francesa',
    disciplina: 'História',
    turma: '8º Ano C',
    dataEntrega: '20 Set',
    status: 'concluida',
    entregas: 31,
    totalAlunos: 31,
    mediaNota: 8.7,
    tipo: 'Trabalho',
  },
  {
    id: 'asg-5',
    titulo: 'Gêneros Textuais: Redação de Conto Fantástico',
    disciplina: 'Português',
    turma: '6º Ano A',
    dataEntrega: '18 Set',
    status: 'concluida',
    entregas: 28,
    totalAlunos: 28,
    mediaNota: 9.4,
    tipo: 'Trabalho',
  },
];

interface AssignmentsManagerProps {
  onOpenEduCreator?: () => void;
}

export const AssignmentsManager: React.FC<AssignmentsManagerProps> = ({
  onOpenEduCreator,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<AssignmentItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredTasks = MOCK_ASSIGNMENTS.filter((item) => {
    const matchStatus = filterStatus === 'todas' || item.status === filterStatus;
    const matchSearch =
      !searchQuery ||
      item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.turma.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.disciplina.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner and Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            Controle Avaliativo
          </span>
          <h2 className="font-display text-xl font-bold text-zinc-900 mt-2">
            Tarefas, Avaliações & Entregas
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Acompanhe o status de submissão dos alunos e acesse o gabarito comentado.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenEduCreator && (
            <button
              type="button"
              onClick={onOpenEduCreator}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
            >
              <Sparkles className="size-4" />
              <span>Gerar Nova Prova com IA</span>
            </button>
          )}
        </div>
      </div>

      {notification && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 shadow-sm animate-in fade-in">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center rounded-2xl border border-zinc-200 bg-white p-1 shadow-2xs">
          {[
            { id: 'todas', label: 'Todas as Tarefas' },
            { id: 'ativa', label: 'Em Andamento' },
            { id: 'corrigir', label: 'Para Corrigir' },
            { id: 'concluida', label: 'Concluídas' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                filterStatus === tab.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-2.5 size-4 text-zinc-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrar avaliações..."
            className="w-full rounded-2xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs placeholder:text-zinc-400 focus:border-indigo-600 focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Assignments Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => {
          const percent = Math.round((task.entregas / (task.totalAlunos || 1)) * 100);

          return (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="group flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600">
                    {task.tipo}
                  </span>
                  {task.status === 'ativa' ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                      ● Em Prazo
                    </span>
                  ) : task.status === 'corrigir' ? (
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                      ● Corrigir ({task.entregas})
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      ✓ Concluída
                    </span>
                  )}
                </div>

                <h3 className="font-display text-base font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {task.titulo}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {task.disciplina} • <strong className="text-zinc-800">{task.turma}</strong>
                </p>
              </div>

              <div className="mt-5 space-y-3 pt-3 border-t border-zinc-100 text-xs">
                {/* Submission Progress Bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-zinc-600 mb-1">
                    <span>Entregas: {task.entregas} de {task.totalAlunos}</span>
                    <span className="text-indigo-600">{percent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        percent === 100
                          ? 'bg-emerald-500'
                          : percent >= 70
                          ? 'bg-indigo-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {task.dataEntrega}
                  </span>
                  {task.mediaNota && (
                    <span className="font-bold text-zinc-800">
                      Média: {task.mediaNota} / 10
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  {selectedTask.disciplina} • {selectedTask.turma}
                </span>
                <h3 className="font-display text-lg font-bold text-zinc-900 mt-1">
                  {selectedTask.titulo}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100"
              >
                ✕
              </button>
            </div>

            <div className="my-5 space-y-3 text-xs text-zinc-600">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Submissões</span>
                  <p className="font-display text-lg font-bold text-zinc-900 mt-0.5">
                    {selectedTask.entregas} de {selectedTask.totalAlunos} alunos
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-3">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Prazo Final</span>
                  <p className="font-display text-lg font-bold text-zinc-900 mt-0.5">
                    {selectedTask.dataEntrega}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                <span className="font-bold text-indigo-900 block mb-1">
                  Orientações de Correção com Gabarito Passo a Passo
                </span>
                <p className="leading-relaxed text-zinc-700">
                  Esta atividade possui critérios automáticos de correção alinhados à BNCC e rubrica detalhada para análise das questões dissertativas.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-100 pt-4">
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="rounded-xl px-4 py-2 font-semibold text-zinc-600 hover:bg-zinc-100 text-xs"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  setNotification(`Relatório de notas da tarefa "${selectedTask.titulo}" baixado com sucesso.`);
                  setSelectedTask(null);
                  setTimeout(() => setNotification(null), 3000);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Validar e Lançar Notas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
