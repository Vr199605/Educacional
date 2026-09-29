// Dados mockados estruturados para os módulos LearnSmart (Professor e Aluno)

export interface ClassScheduleItem {
  id: string;
  materia: string;
  turma: string;
  tema: string;
  diaSemana: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex';
  horaInicio: string; // Ex: "08:00"
  horaFim: string; // Ex: "09:30"
  sala: string;
  cor: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'indigo';
  status: 'concluida' | 'em_andamento' | 'agendada';
}

export const MOCK_SCHEDULE: ClassScheduleItem[] = [
  {
    id: 'sch-1',
    materia: 'Matemática',
    turma: '9º Ano B',
    tema: 'Geometria Espacial & Volume',
    diaSemana: 'Seg',
    horaInicio: '08:00',
    horaFim: '09:30',
    sala: 'Sala 14 - Bloco A',
    cor: 'blue',
    status: 'concluida',
  },
  {
    id: 'sch-2',
    materia: 'Ciências',
    turma: '7º Ano A',
    tema: 'Ecossistemas e Cadeias Alimentares',
    diaSemana: 'Seg',
    horaInicio: '10:00',
    horaFim: '11:30',
    sala: 'Laboratório 2',
    cor: 'emerald',
    status: 'concluida',
  },
  {
    id: 'sch-3',
    materia: 'História',
    turma: '8º Ano C',
    tema: 'Revolução Industrial & Trabalho',
    diaSemana: 'Ter',
    horaInicio: '08:30',
    horaFim: '10:00',
    sala: 'Sala 09',
    cor: 'amber',
    status: 'concluida',
  },
  {
    id: 'sch-4',
    materia: 'Português',
    turma: '6º Ano A',
    tema: 'Gêneros Textuais & Contos',
    diaSemana: 'Ter',
    horaInicio: '14:00',
    horaFim: '15:30',
    sala: 'Sala 04',
    cor: 'purple',
    status: 'em_andamento',
  },
  {
    id: 'sch-5',
    materia: 'Matemática',
    turma: '8º Ano B',
    tema: 'Frações Equivalentes e Porcentagem',
    diaSemana: 'Qua',
    horaInicio: '09:00',
    horaFim: '10:30',
    sala: 'Sala 14',
    cor: 'blue',
    status: 'agendada',
  },
  {
    id: 'sch-6',
    materia: 'Artes',
    turma: '7º Ano B',
    tema: 'Perspectiva e Cores Primárias',
    diaSemana: 'Qua',
    horaInicio: '11:00',
    horaFim: '12:30',
    sala: 'Ateliê Escolar',
    cor: 'rose',
    status: 'agendada',
  },
  {
    id: 'sch-7',
    materia: 'Física / Ciências',
    turma: '9º Ano A',
    tema: 'Leis de Newton e Dinâmica',
    diaSemana: 'Qui',
    horaInicio: '10:00',
    horaFim: '11:30',
    sala: 'Laboratório 1',
    cor: 'indigo',
    status: 'agendada',
  },
  {
    id: 'sch-8',
    materia: 'Matemática',
    turma: '6º Ano B',
    tema: 'Operações Fundamentais com Figuras',
    diaSemana: 'Sex',
    horaInicio: '14:30',
    horaFim: '16:00',
    sala: 'Sala 05',
    cor: 'blue',
    status: 'agendada',
  },
];

export const MOCK_PERFORMANCE_BARS = [
  { turma: '6º Ano A', media: 88, entregas: 95 },
  { turma: '6º Ano B', media: 79, entregas: 84 },
  { turma: '7º Ano A', media: 92, entregas: 98 },
  { turma: '8º Ano B', media: 85, entregas: 91 },
  { turma: '9º Ano A', media: 96, entregas: 97 },
  { turma: '9º Ano B', media: 91, entregas: 93 },
];

export const MOCK_PROGRESS_DOUGHNUT = {
  average: 96,
  breakdown: [
    { label: 'Excelente (90–100%)', percentage: 68, color: '#10b981', count: 85 },
    { label: 'Bom (75–89%)', percentage: 22, color: '#0ea5e9', count: 28 },
    { label: 'Em Recuperação (<75%)', percentage: 10, color: '#f59e0b', count: 12 },
  ],
};

export const MOCK_ENGAGEMENT_TIMELINE = [
  { dia: 'Seg', horas: 3.8, atividades: 42 },
  { dia: 'Ter', horas: 4.5, atividades: 58 },
  { dia: 'Qua', horas: 5.2, atividades: 71 },
  { dia: 'Qui', horas: 4.9, atividades: 64 },
  { dia: 'Sex', horas: 6.1, atividades: 89 },
  { dia: 'Sáb', horas: 2.3, atividades: 31 },
  { dia: 'Dom', horas: 1.8, atividades: 20 },
];

// Dados das Fases da Trilha do Aluno (Duolingo-style)
export interface StudentStage {
  id: number;
  titulo: string;
  subtitulo: string;
  icone: string;
  cor: string;
  status: 'concluida' | 'ativa' | 'bloqueada';
  estrelas: number; // 0 a 3
  pontos: number;
}

export const MOCK_STUDENT_STAGES: StudentStage[] = [
  {
    id: 1,
    titulo: 'Reino dos Números',
    subtitulo: 'Contagem divertida e pares',
    icone: '🔢',
    cor: '#10b981',
    status: 'concluida',
    estrelas: 3,
    pontos: 150,
  },
  {
    id: 2,
    titulo: 'Mundo das Formas',
    subtitulo: 'Triângulos, quadrados e círculos',
    icone: '🔺',
    cor: '#3b82f6',
    status: 'concluida',
    estrelas: 3,
    pontos: 180,
  },
  {
    id: 3,
    titulo: 'Desafio das Frações',
    subtitulo: 'Partes de uma figura colorida',
    icone: '🍰',
    cor: '#f59e0b',
    status: 'ativa',
    estrelas: 0,
    pontos: 200,
  },
  {
    id: 4,
    titulo: 'Mistério das Medidas',
    subtitulo: 'Pesos, tamanhos e réguas',
    icone: '📏',
    cor: '#8b5cf6',
    status: 'bloqueada',
    estrelas: 0,
    pontos: 220,
  },
  {
    id: 5,
    titulo: 'Grande Desafio do Mestre',
    subtitulo: 'Batalha final de raciocínio rápido',
    icone: '🏆',
    cor: '#ec4899',
    status: 'bloqueada',
    estrelas: 0,
    pontos: 350,
  },
];
