import { Activity, ActivityType, SchoolClass, UsageStats } from '../types/activity';

const ACTIVITIES_KEY = 'educreator.activities.v1';
const USAGE_KEY = 'educreator.usage.v1';
const CLASSES_KEY = 'educreator.classes.v1';
const API_KEY_STORAGE = 'educreator.apikey.v1';
const USER_KEY = 'educreator.user.v1';

export const activityLabels: Record<ActivityType, string> = {
  lista: 'Lista de Exercícios',
  prova: 'Prova Estruturada',
  quiz: 'Quiz Gamificado',
  'plano-aula': 'Plano de Aula',
  flashcards: 'Flashcards',
  'mapa-mental': 'Mapa Mental',
  cruzadinha: 'Cruzadinha',
  resumo: 'Resumo / Imagem',
};

export const activityTones: Record<ActivityType, string> = {
  lista: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  prova: 'bg-orange-50 text-orange-700 border-orange-200',
  quiz: 'bg-sky-50 text-sky-700 border-sky-200',
  'plano-aula': 'bg-purple-50 text-purple-700 border-purple-200',
  flashcards: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'mapa-mental': 'bg-amber-50 text-amber-700 border-amber-200',
  cruzadinha: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  resumo: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const activityQuantityLabels: Partial<Record<ActivityType, string>> = {
  lista: 'Quantidade de questões',
  prova: 'Quantidade de questões',
  quiz: 'Quantidade de questões',
  flashcards: 'Quantidade de flashcards',
  cruzadinha: 'Quantidade de palavras',
  'plano-aula': 'Etapas (referência)',
  'mapa-mental': 'Ramos (referência)',
  resumo: 'Seções (referência)',
};

// ==================== ACTIVITIES ====================

export function getActivities(): Activity[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ACTIVITIES_KEY);
    if (!raw) return [];
    const parsed: Activity[] = JSON.parse(raw);
    return parsed.sort((a, b) => b.createdAt - a.createdAt);
  } catch (err) {
    console.error('Error reading activities:', err);
    return [];
  }
}

export function getActivityById(id: string): Activity | undefined {
  const all = getActivities();
  return all.find((a) => a.id === id);
}

export function saveActivity(activity: Activity): void {
  const all = getActivities();
  const index = all.findIndex((a) => a.id === activity.id);
  if (index >= 0) {
    all[index] = activity;
  } else {
    all.unshift(activity);
  }
  try {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Error saving activity to localStorage:', err);
  }
}

export function deleteActivity(id: string): void {
  const all = getActivities();
  const filtered = all.filter((a) => a.id !== id);
  try {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error deleting activity:', err);
  }
}

export function toggleFavorite(id: string): boolean {
  const all = getActivities();
  const item = all.find((a) => a.id === id);
  if (item) {
    item.favorito = !item.favorito;
    try {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(all));
      return item.favorito;
    } catch (err) {
      console.error(err);
    }
  }
  return false;
}

// ==================== USAGE STATS ====================

function getDayAndMonth(date = new Date()) {
  const day = date.toISOString().slice(0, 10);
  const month = day.slice(0, 7);
  return { day, month };
}

export function getUsageStats(): UsageStats {
  const { day, month } = getDayAndMonth();
  if (typeof window === 'undefined') return { today: 0, month: 0, lastAt: null };
  try {
    const raw = window.localStorage.getItem(USAGE_KEY);
    if (!raw) return { today: 0, month: 0, lastAt: null };
    const parsed = JSON.parse(raw);
    return {
      today: parsed.day === day ? parsed.dayCount ?? 0 : 0,
      month: parsed.month === month ? parsed.monthCount ?? 0 : 0,
      lastAt: parsed.lastAt ?? null,
    };
  } catch {
    return { today: 0, month: 0, lastAt: null };
  }
}

export function recordUsage(): UsageStats {
  const { day, month } = getDayAndMonth();
  const current = getUsageStats();
  const updated = {
    day,
    dayCount: current.today + 1,
    month,
    monthCount: current.month + 1,
    lastAt: Date.now(),
  };
  try {
    window.localStorage.setItem(USAGE_KEY, JSON.stringify(updated));
  } catch {}
  return {
    today: updated.dayCount,
    month: updated.monthCount,
    lastAt: updated.lastAt,
  };
}

// ==================== TURMAS / CLASSES ====================

export function getClasses(): SchoolClass[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CLASSES_KEY);
    if (!raw) {
      const defaultClasses: SchoolClass[] = [
        {
          id: 'turma-1',
          nome: '6º Ano A',
          ano: '6º ano — Fundamental II',
          disciplina: 'Matemática',
          numAlunos: 28,
          periodo: 'Manhã',
          atividadesIds: [],
          createdAt: Date.now() - 86400000 * 5,
        },
        {
          id: 'turma-2',
          nome: '9º Ano B',
          ano: '9º ano — Fundamental II',
          disciplina: 'História',
          numAlunos: 32,
          periodo: 'Tarde',
          atividadesIds: [],
          createdAt: Date.now() - 86400000 * 2,
        },
      ];
      localStorage.setItem(CLASSES_KEY, JSON.stringify(defaultClasses));
      return defaultClasses;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveClass(schoolClass: SchoolClass): void {
  const classes = getClasses();
  const index = classes.findIndex((c) => c.id === schoolClass.id);
  if (index >= 0) {
    classes[index] = schoolClass;
  } else {
    classes.push(schoolClass);
  }
  localStorage.setItem(CLASSES_KEY, JSON.stringify(classes));
}

export function deleteClass(id: string): void {
  const classes = getClasses().filter((c) => c.id !== id);
  localStorage.setItem(CLASSES_KEY, JSON.stringify(classes));
}

// ==================== API KEY & AUTH ====================

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(API_KEY_STORAGE) || '';
}

export function setStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (!key) {
    localStorage.removeItem(API_KEY_STORAGE);
  } else {
    localStorage.setItem(API_KEY_STORAGE, key.trim());
  }
}

export interface UserProfile {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export function getCurrentUser(): UserProfile {
  if (typeof window === 'undefined') {
    return { email: 'professor@escola.gov.br', name: 'Professor(a)', isLoggedIn: true };
  }
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      const defaultUser = {
        email: 'professor.educador@escola.com.br',
        name: 'Professor(a) Convidado',
        isLoggedIn: true,
      };
      localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch {
    return { email: 'professor@escola.com.br', name: 'Professor(a)', isLoggedIn: true };
  }
}

export function setCurrentUser(user: UserProfile): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logoutUser(): void {
  localStorage.removeItem(USER_KEY);
}

// ==================== FORMAT HELPERS ====================

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'agora mesmo';
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
}
