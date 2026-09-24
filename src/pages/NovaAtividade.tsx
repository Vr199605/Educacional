import React, { useState, useEffect } from 'react';
import {
  ActivityType,
  DifficultyLevel,
  Activity,
} from '../types/activity';
import {
  activityLabels,
  activityQuantityLabels,
  saveActivity,
  recordUsage,
  getUsageStats,
} from '../services/activityStore';
import { generateActivityWithAI } from '../services/geminiService';
import { Sparkles, Loader2, Gauge, AlertCircle, CheckCircle2 } from 'lucide-react';

interface NovaAtividadeProps {
  initialType?: ActivityType;
  initialPrompt?: string;
  onNavigate: (path: string, params?: Record<string, any>) => void;
}

const DISCIPLINAS = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Ciências',
  'Física',
  'Química',
  'Biologia',
  'Inglês',
  'Educação Física',
  'Artes',
  'Filosofia',
  'Sociologia',
];

const ANOS_ESCOLARES = [
  '1º ano — Fundamental I',
  '2º ano — Fundamental I',
  '3º ano — Fundamental I',
  '4º ano — Fundamental I',
  '5º ano — Fundamental I',
  '6º ano — Fundamental II',
  '7º ano — Fundamental II',
  '8º ano — Fundamental II',
  '9º ano — Fundamental II',
  '1º ano — Ensino Médio',
  '2º ano — Ensino Médio',
  '3º ano — Ensino Médio',
];

const TYPES: ActivityType[] = [
  'lista',
  'prova',
  'quiz',
  'plano-aula',
  'flashcards',
  'mapa-mental',
  'cruzadinha',
  'resumo',
];

export const NovaAtividade: React.FC<NovaAtividadeProps> = ({
  initialType = 'lista',
  initialPrompt = '',
  onNavigate,
}) => {
  const [type, setType] = useState<ActivityType>(initialType);
  const [disciplina, setDisciplina] = useState('Matemática');
  const [ano, setAno] = useState(ANOS_ESCOLARES[7]); // 8º ano default
  const [tema, setTema] = useState('');
  const [subtema, setSubtema] = useState('');
  const [dificuldade, setDificuldade] = useState<DifficultyLevel>('medio');
  const [quantidade, setQuantidade] = useState(10);
  const [objetivo, setObjetivo] = useState('');
  const [contexto, setContexto] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [usageStats, setUsageStats] = useState(getUsageStats());

  useEffect(() => {
    setUsageStats(getUsageStats());
    if (initialPrompt && !tema) {
      // Extract tentative topic from initial prompt if not set
      const clean = initialPrompt.slice(0, 50);
      setTema(clean);
    }
  }, [initialPrompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema.trim() && !contexto.trim()) {
      setErrorMsg('Por favor, informe o tema da atividade.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const generated = await generateActivityWithAI({
        type,
        disciplina,
        tema: tema.trim() || 'Tema Geral',
        subtema: subtema.trim() || undefined,
        ano,
        dificuldade,
        quantidade,
        objetivo: objetivo.trim() || undefined,
        contexto: contexto.trim() || undefined,
      });

      const newId = 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
      const fullActivity: Activity = {
        id: newId,
        type,
        titulo: generated.titulo || `${activityLabels[type]} — ${tema || 'Geral'}`,
        disciplina,
        tema: tema.trim() || 'Geral',
        subtema: subtema.trim() || undefined,
        ano,
        dificuldade,
        objetivo: objetivo.trim() || undefined,
        contexto: contexto.trim() || undefined,
        introducao: generated.introducao,
        questoes: generated.questoes || [],
        gabarito: generated.gabarito,
        planoAula: generated.planoAula || null,
        flashcards: generated.flashcards || null,
        mapaMental: generated.mapaMental || null,
        cruzadinha: generated.cruzadinha || null,
        resumo: generated.resumo || null,
        createdAt: Date.now(),
      };

      saveActivity(fullActivity);
      const updatedUsage = recordUsage();
      setUsageStats(updatedUsage);

      // Navigate to the created activity
      onNavigate(`/atividade/${newId}`, { id: newId });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Falha ao gerar material com inteligência artificial.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs md:text-sm placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition';

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:px-12">
      {/* Header */}
      <header className="mb-8">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-brand">
          Nova Atividade
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Descreva o material e a IA cuida do resto.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Gere atividades contextualizadas, com alinhamento BNCC e gabarito passo a passo sem falhas.
        </p>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type selector */}
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Tipo de Material
          </label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  type === t
                    ? 'border-brand bg-brand text-brand-foreground shadow-2xs'
                    : 'border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground'
                }`}
              >
                {activityLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Disciplina & Ano */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Disciplina
            </label>
            <select
              value={disciplina}
              onChange={(e) => setDisciplina(e.target.value)}
              className={inputClass}
            >
              {DISCIPLINAS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Ano Escolar
            </label>
            <select
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className={inputClass}
            >
              {ANOS_ESCOLARES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tema & Subtema */}
        <div>
          <label className="mb-1.5 flex items-baseline justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Tema Principal
            </span>
            <span className="text-[10px] text-muted-foreground">
              Ex: Frações, Revolução Francesa, Fotossíntese
            </span>
          </label>
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Digite o tema central da aula ou avaliação"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Subtema (opcional)
          </label>
          <input
            type="text"
            value={subtema}
            onChange={(e) => setSubtema(e.target.value)}
            placeholder="Ex: Operações com denominadores diferentes, Causas econômicas..."
            className={inputClass}
          />
        </div>

        {/* Dificuldade & Quantidade */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Nível de Dificuldade
            </label>
            <div className="flex rounded-xl border border-border bg-card p-1">
              {(['facil', 'medio', 'dificil'] as DifficultyLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDificuldade(level)}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition ${
                    dificuldade === level
                      ? 'bg-brand text-brand-foreground shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {level === 'facil' ? 'Fácil' : level === 'medio' ? 'Médio' : 'Difícil'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {activityQuantityLabels[type] || 'Quantidade de itens'}
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Objetivo Pedagógico */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Objetivo da Aula (opcional)
          </label>
          <input
            type="text"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            placeholder="Ex: Compreender a regra dos sinais e aplicar em problemas práticos"
            className={inputClass}
          />
        </div>

        {/* Contexto Adicional / Instruções Livres */}
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Contexto Adicional & Instruções Livres
          </label>
          <textarea
            value={contexto}
            onChange={(e) => setContexto(e.target.value)}
            rows={3}
            placeholder="Ex: Foco em interpretação de texto, incluir questões discursivas contextualizadas com o cotidiano e resolução passo a passo bem didática..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* AI Engine & Usage Stats Info Box */}
        <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground mb-1">
            <Sparkles className="size-4 text-brand" />
            <span>Motor Pedagógico EduCreator AI</span>
          </div>
          <p>
            As atividades são formuladas de acordo com as diretrizes curriculares nacionais da BNCC.
            Nas questões discursivas, o sistema elabora uma resolução passo a passo minuciosa (interpretação, desenvolvimento e gabarito modelo) com critérios claros de pontuação.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border pt-3 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Gauge className="size-3.5 text-brand" />
              <strong className="text-foreground">{usageStats.today}</strong> gerados hoje
            </span>
            <span>
              <strong className="text-foreground">{usageStats.month}</strong> neste mês
            </span>
            {usageStats.lastAt && (
              <span>
                Última geração às{' '}
                {new Date(usageStats.lastAt).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-xs font-medium text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="rounded-xl px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm ring-1 ring-brand/20 transition hover:bg-brand-700 active:scale-95 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Gerando com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                <span>Gerar atividade</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
