import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export interface StudentItem {
  id: string;
  nome: string;
  turma: string;
  avatar: string;
  presenca: number; // e.g. 98
  media: number; // e.g. 9.2
  tarefasEntregues: number;
  tarefasTotal: number;
  status: 'destaque' | 'regular' | 'atencao';
  email: string;
}

export const MOCK_STUDENTS: StudentItem[] = [
  {
    id: 'std-1',
    nome: 'Ana Clara Albuquerque',
    turma: '9º Ano B',
    avatar: 'AC',
    presenca: 98,
    media: 9.6,
    tarefasEntregues: 18,
    tarefasTotal: 18,
    status: 'destaque',
    email: 'ana.albuquerque@escola.com',
  },
  {
    id: 'std-2',
    nome: 'Bernardo Souza Lima',
    turma: '9º Ano B',
    avatar: 'BS',
    presenca: 95,
    media: 8.8,
    tarefasEntregues: 17,
    tarefasTotal: 18,
    status: 'regular',
    email: 'bernardo.souza@escola.com',
  },
  {
    id: 'std-3',
    nome: 'Camila Fernandes Costa',
    turma: '8º Ano B',
    avatar: 'CF',
    presenca: 100,
    media: 9.9,
    tarefasEntregues: 16,
    tarefasTotal: 16,
    status: 'destaque',
    email: 'camila.fernandes@escola.com',
  },
  {
    id: 'std-4',
    nome: 'Daniel Ribeiro Dias',
    turma: '9º Ano B',
    avatar: 'DR',
    presenca: 84,
    media: 6.8,
    tarefasEntregues: 12,
    tarefasTotal: 18,
    status: 'atencao',
    email: 'daniel.dias@escola.com',
  },
  {
    id: 'std-5',
    nome: 'Eduarda Martins Ramos',
    turma: '6º Ano A',
    avatar: 'EM',
    presenca: 96,
    media: 8.9,
    tarefasEntregues: 14,
    tarefasTotal: 15,
    status: 'regular',
    email: 'eduarda.martins@escola.com',
  },
  {
    id: 'std-6',
    nome: 'Felipe Augusto Rocha',
    turma: '7º Ano A',
    avatar: 'FR',
    presenca: 92,
    media: 7.5,
    tarefasEntregues: 13,
    tarefasTotal: 16,
    status: 'regular',
    email: 'felipe.rocha@escola.com',
  },
  {
    id: 'std-7',
    nome: 'Gabriela Vasconcelos',
    turma: '9º Ano B',
    avatar: 'GV',
    presenca: 97,
    media: 9.4,
    tarefasEntregues: 18,
    tarefasTotal: 18,
    status: 'destaque',
    email: 'gabriela.v@escola.com',
  },
  {
    id: 'std-8',
    nome: 'Heitor Nogueira Leite',
    turma: '8º Ano B',
    avatar: 'HN',
    presenca: 79,
    media: 6.2,
    tarefasEntregues: 10,
    tarefasTotal: 16,
    status: 'atencao',
    email: 'heitor.leite@escola.com',
  },
];

interface StudentsClassDirectoryProps {
  onSendMessage?: (student: StudentItem) => void;
}

export const StudentsClassDirectory: React.FC<StudentsClassDirectoryProps> = ({
  onSendMessage,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('9º Ano B');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [studentsList, setStudentsList] = useState<StudentItem[]>(MOCK_STUDENTS);

  const classes = ['todas', '6º Ano A', '7º Ano A', '8º Ano B', '9º Ano B'];

  const filteredStudents = studentsList.filter((std) => {
    const matchClass = selectedClass === 'todas' || std.turma === selectedClass;
    const matchSearch =
      !searchQuery ||
      std.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.turma.toLowerCase().includes(searchQuery.toLowerCase());

    return matchClass && matchSearch;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const initials = newStudentName
      .split(' ')
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('');

    const newStd: StudentItem = {
      id: 'std-' + Date.now(),
      nome: newStudentName.trim(),
      turma: newStudentClass,
      avatar: initials || 'AL',
      presenca: 100,
      media: 10.0,
      tarefasEntregues: 0,
      tarefasTotal: 0,
      status: 'destaque',
      email: newStudentEmail || `${newStudentName.toLowerCase().replace(/\s+/g, '.')}@escola.com`,
    };

    setStudentsList([newStd, ...studentsList]);
    setIsAddModalOpen(false);
    setNewStudentName('');
    setNewStudentEmail('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Total de Estudantes
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-display text-2xl font-black text-zinc-900">
              {studentsList.length}
            </span>
            <span className="text-xs font-bold text-emerald-600">4 Turmas Ativas</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div className="h-full bg-indigo-600 w-full rounded-full" />
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Frequência Média
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-display text-2xl font-black text-zinc-900">94.8%</span>
            <span className="text-xs font-bold text-emerald-600">+1.2% este mês</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div className="h-full bg-emerald-500 w-[94.8%] rounded-full" />
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Média Geral das Turmas
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-display text-2xl font-black text-zinc-900">8.6 / 10</span>
            <span className="text-xs font-bold text-indigo-600">Acima da meta</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div className="h-full bg-amber-500 w-[86%] rounded-full" />
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Acompanhamento & Apoio
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-display text-2xl font-black text-amber-600">2 alunos</span>
            <span className="text-xs font-bold text-amber-700">Reforço pedagógico</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div className="h-full bg-amber-400 w-1/4 rounded-full" />
          </div>
        </div>
      </div>

      {/* Directory Filter & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <div>
          <h2 className="font-display text-lg font-bold text-zinc-900">
            Diretório de Alunos & Gestão de Turmas
          </h2>
          <p className="text-xs text-zinc-500">
            Consulte fichas individuais, frequência, médias e envie comunicados diretos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Class selector pills */}
          <div className="flex items-center rounded-2xl border border-zinc-200 bg-zinc-100/70 p-1">
            {classes.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setSelectedClass(cls)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  selectedClass === cls
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {cls === 'todas' ? 'Todas as Turmas' : cls}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 active:scale-95"
          >
            <Plus className="size-4" />
            <span>Adicionar Aluno</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-4 top-3.5 size-4 text-zinc-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar por nome do estudante, turma ou e-mail..."
          className="w-full rounded-2xl border border-zinc-200/90 bg-white py-3 pl-11 pr-4 text-xs placeholder:text-zinc-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 shadow-2xs"
        />
      </div>

      {/* Students Table / Grid */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50/70 font-semibold text-zinc-500">
              <tr>
                <th className="py-3.5 px-6">Estudante</th>
                <th className="py-3.5 px-4">Turma</th>
                <th className="py-3.5 px-4">Frequência</th>
                <th className="py-3.5 px-4">Média Geral</th>
                <th className="py-3.5 px-4">Tarefas Entregues</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredStudents.map((std) => (
                <tr
                  key={std.id}
                  className="transition hover:bg-zinc-50/70 cursor-pointer"
                  onClick={() => setSelectedStudent(std)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 font-display text-xs font-bold text-white shadow-2xs">
                        {std.avatar}
                      </div>
                      <div>
                        <span className="font-display font-bold text-zinc-900 block text-xs sm:text-sm">
                          {std.nome}
                        </span>
                        <span className="text-[11px] text-zinc-400">{std.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-zinc-700">
                    <span className="rounded-lg bg-zinc-100 px-2 py-1 text-[11px] font-bold">
                      {std.turma}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-zinc-800">
                    <span
                      className={
                        std.presenca >= 95
                          ? 'text-emerald-600'
                          : std.presenca >= 85
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }
                    >
                      {std.presenca}%
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-sm text-zinc-900">
                        {std.media}
                      </span>
                      <span className="text-[10px] text-zinc-400">/ 10</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-700">
                        {std.tarefasEntregues}/{std.tarefasTotal}
                      </span>
                      <div className="h-1.5 w-16 rounded-full bg-zinc-100 overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${(std.tarefasEntregues / (std.tarefasTotal || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {std.status === 'destaque' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        <Award className="size-3" />
                        Destaque
                      </span>
                    ) : std.status === 'atencao' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                        <AlertCircle className="size-3" />
                        Apoio Pedagógico
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-bold text-zinc-700">
                        <CheckCircle2 className="size-3 text-zinc-500" />
                        Regular
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => {
                          if (onSendMessage) onSendMessage(std);
                          setSelectedStudent(std);
                        }}
                        title="Enviar Mensagem / Notificação"
                        className="rounded-xl border border-zinc-200 bg-white p-2 text-zinc-600 hover:bg-zinc-50 hover:text-indigo-600 shadow-2xs"
                      >
                        <Mail className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(std)}
                        className="rounded-xl bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-200"
                      >
                        Ficha
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Inspection Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-indigo-600 text-white font-display font-extrabold text-base shadow-sm">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-zinc-900">
                    {selectedStudent.nome}
                  </h3>
                  <p className="text-xs text-zinc-500">{selectedStudent.email} • {selectedStudent.turma}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                ✕
              </button>
            </div>

            <div className="my-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Média Geral
                </span>
                <p className="font-display text-xl font-black text-indigo-600 mt-1">
                  {selectedStudent.media}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Frequência
                </span>
                <p className="font-display text-xl font-black text-emerald-600 mt-1">
                  {selectedStudent.presenca}%
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Entregas
                </span>
                <p className="font-display text-xl font-black text-zinc-900 mt-1">
                  {selectedStudent.tarefasEntregues}/{selectedStudent.tarefasTotal}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-600">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4">
                <span className="font-bold text-indigo-900 block mb-1">
                  Parecer Pedagógico do Trimestre
                </span>
                <p className="leading-relaxed text-zinc-700">
                  Estudante altamente participativo nas atividades de geometria e raciocínio lógico. Demonstra facilidade em resolução de problemas e cooperação constante com os colegas de grupo.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-100 pt-4 mt-5">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-xl px-4 py-2 font-semibold text-zinc-600 hover:bg-zinc-100 text-xs"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onSendMessage) onSendMessage(selectedStudent);
                  setSelectedStudent(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                <Mail className="size-3.5" />
                <span>Enviar Comunicado</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-display text-lg font-bold text-zinc-900">Cadastrar Novo Aluno</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Adicione o estudante à base de dados para acompanhamento de tarefas e frequência.
            </p>

            <form onSubmit={handleAddStudent} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ex: Gabriel Albuquerque Silva"
                  className="w-full rounded-xl border border-zinc-200 p-2.5 focus:border-indigo-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Turma</label>
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-2.5 bg-white"
                >
                  <option>6º Ano A</option>
                  <option>7º Ano A</option>
                  <option>8º Ano B</option>
                  <option>9º Ano B</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">E-mail do Responsável / Aluno</label>
                <input
                  type="email"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  placeholder="gabriel@escola.com"
                  className="w-full rounded-xl border border-zinc-200 p-2.5 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl px-4 py-2 font-semibold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                >
                  Salvar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
