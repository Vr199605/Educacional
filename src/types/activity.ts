export type ActivityType =
  | 'lista'
  | 'prova'
  | 'quiz'
  | 'plano-aula'
  | 'flashcards'
  | 'mapa-mental'
  | 'cruzadinha'
  | 'resumo';

export type DifficultyLevel = 'facil' | 'medio' | 'dificil';

export interface DiscursiveStep {
  passo: number;
  titulo: string;
  conteudo: string;
  dicaDidatica?: string;
}

export interface DiscursiveSolution {
  passo1Interpretacao: string;
  passo2Desenvolvimento: string;
  passosDetalhados?: DiscursiveStep[];
  passo3Conclusao: string;
  respostaEsperada: string;
  criteriosCorrecao: {
    notaIntegral: string;
    notaParcial: string;
    errosComuns: string;
  };
}

export interface Question {
  id?: string | number;
  numero: number;
  tipo?: 'multipla-escolha' | 'dissertativa';
  enunciado: string;
  alternativas?: string[];
  resposta: string;
  comentario?: string;
  resolucaoPassoAPasso?: DiscursiveSolution;
  competencia?: string;
  habilidade?: string;
  linhasResposta?: number;
}

export interface LessonPlanScheduleItem {
  etapa: string;
  tempo: string;
  descricao?: string;
}

export interface LessonPlan {
  tema?: string;
  disciplina?: string;
  ano?: string;
  duracao?: string;
  objetivos: string[];
  conteudo: string[];
  metodologia: string;
  recursos: string[];
  avaliacao: string;
  cronograma: LessonPlanScheduleItem[];
  habilidadesBNCC?: string[];
  adaptacoesInclusivas?: string;
}

export interface Flashcard {
  frente: string;
  verso: string;
  dica?: string;
  categoria?: string;
}

export interface MindMapBranch {
  titulo: string;
  subitens: string[];
}

export interface MindMap {
  central: string;
  ramos: MindMapBranch[];
}

export interface CrosswordWord {
  palavra: string;
  dica: string;
  numero?: number;
  direcao?: 'horizontal' | 'vertical';
  row?: number;
  col?: number;
}

export interface Crossword {
  palavras: CrosswordWord[];
}

export interface SummarySection {
  titulo: string;
  conteudo: string;
  imagem?: string;
  destaque?: string;
}

export interface Summary {
  secoes: SummarySection[];
  pontosChave: string[];
  dicasEstudo?: string[];
}

export interface Activity {
  id: string;
  type: ActivityType;
  titulo: string;
  disciplina: string;
  tema: string;
  subtema?: string;
  ano: string;
  dificuldade: DifficultyLevel;
  objetivo?: string;
  contexto?: string;
  introducao?: string;
  questoes: Question[];
  gabarito?: string;
  planoAula?: LessonPlan | null;
  flashcards?: Flashcard[] | null;
  mapaMental?: MindMap | null;
  cruzadinha?: Crossword | null;
  resumo?: Summary | null;
  favorito?: boolean;
  createdAt: number;
  turmaId?: string;
}

export interface SchoolClass {
  id: string;
  nome: string;
  ano: string;
  disciplina: string;
  numAlunos: number;
  periodo: string;
  atividadesIds: string[];
  createdAt: number;
}

export interface UsageStats {
  today: number;
  month: number;
  lastAt: number | null;
}
