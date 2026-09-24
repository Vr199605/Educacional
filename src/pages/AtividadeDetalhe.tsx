import React, { useState, useEffect } from 'react';
import {
  getActivityById,
  deleteActivity,
  toggleFavorite,
  activityLabels,
} from '../services/activityStore';
import { Activity } from '../types/activity';
import {
  ArrowLeft,
  Star,
  Printer,
  Trash2,
  CheckCircle2,
  Copy,
  Check,
  Share2,
} from 'lucide-react';
import { ProvaView } from '../components/activities/ProvaView';
import { QuizView } from '../components/activities/QuizView';
import { PlanoAulaView } from '../components/activities/PlanoAulaView';
import { FlashcardsView } from '../components/activities/FlashcardsView';
import { MapaMentalView } from '../components/activities/MapaMentalView';
import { CruzadinhaView } from '../components/activities/CruzadinhaView';
import { ResumoView } from '../components/activities/ResumoView';

interface AtividadeDetalheProps {
  id: string;
  onNavigate: (path: string, params?: Record<string, any>) => void;
}

export const AtividadeDetalhe: React.FC<AtividadeDetalheProps> = ({ id, onNavigate }) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const act = getActivityById(id);
    setActivity(act || null);
  }, [id]);

  if (!activity) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground">Atividade não encontrada.</p>
        <button
          onClick={() => onNavigate('/')}
          className="mt-4 inline-block text-xs font-semibold text-brand hover:underline"
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    const isFav = toggleFavorite(activity.id);
    setActivity({ ...activity, favorito: isFav });
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza de que deseja excluir permanentemente esta atividade?')) {
      deleteActivity(activity.id);
      onNavigate('/biblioteca');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let text = `${activity.titulo}\nDisciplina: ${activity.disciplina} | Ano: ${activity.ano}\n\n`;
    if (activity.introducao) {
      text += `${activity.introducao}\n\n`;
    }

    if (activity.questoes && activity.questoes.length > 0) {
      activity.questoes.forEach((q, idx) => {
        text += `${idx + 1}. ${q.enunciado}\n`;
        if (q.alternativas) {
          q.alternativas.forEach((alt) => (text += `   ${alt}\n`));
        }
        if (showAnswers) {
          text += `   >> Resposta: ${q.resposta}\n`;
          if (q.resolucaoPassoAPasso) {
            text += `   >> Passo 1 (Interpretação): ${q.resolucaoPassoAPasso.passo1Interpretacao}\n`;
            text += `   >> Passo 2 (Desenvolvimento): ${q.resolucaoPassoAPasso.passo2Desenvolvimento}\n`;
            text += `   >> Passo 3 (Conclusão): ${q.resolucaoPassoAPasso.passo3Conclusao}\n`;
            text += `   >> Resposta Esperada: ${q.resolucaoPassoAPasso.respostaEsperada}\n`;
          }
        }
        text += '\n';
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const countItems = (act: Activity): number => {
    if (act.flashcards?.length) return act.flashcards.length;
    if (act.mapaMental?.ramos?.length) return act.mapaMental.ramos.length;
    if (act.cruzadinha?.palavras?.length) return act.cruzadinha.palavras.length;
    if (act.resumo?.secoes?.length) return act.resumo.secoes.length;
    if (act.planoAula?.cronograma?.length) return act.planoAula.cronograma.length;
    return act.questoes?.length || 0;
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:px-12">
      {/* Top Action Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span>Voltar</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Favorite */}
          <button
            onClick={handleFavoriteToggle}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-brand/40"
          >
            <Star
              className={`size-3.5 ${
                activity.favorito ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
              }`}
            />
            <span>{activity.favorito ? 'Favoritado' : 'Favoritar'}</span>
          </button>

          {/* Toggle Gabarito */}
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              showAnswers
                ? 'border-brand bg-brand/10 text-brand font-semibold'
                : 'border-border bg-card text-foreground hover:border-brand/40'
            }`}
          >
            <CheckCircle2 className="size-3.5" />
            <span>{showAnswers ? 'Ocultar gabarito' : 'Mostrar gabarito'}</span>
          </button>

          {/* Copy Clean Text */}
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-brand/40"
          >
            {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-brand/40"
          >
            <Printer className="size-3.5" />
            <span>Imprimir</span>
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-destructive hover:border-destructive/40"
          >
            <Trash2 className="size-3.5" />
            <span>Excluir</span>
          </button>
        </div>
      </div>

      {/* Main Article Document Container */}
      <article className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm ring-1 ring-black/5 print:border-none print:shadow-none print:ring-0">
        {/* Top green brand accent stripe */}
        <div className="h-1.5 bg-brand" />

        <div className="p-8 md:p-12 print:p-0">
          {/* Document Header */}
          <header className="mb-8 border-b border-border pb-6 print:hidden">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
              {activityLabels[activity.type]}
            </span>
            <h1 className="mb-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {activity.titulo}
            </h1>

            {/* 4-column metadata pills */}
            <div className="grid grid-cols-2 gap-4 text-xs md:grid-cols-4">
              <div className="rounded-lg bg-muted/30 p-2.5">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Disciplina
                </span>
                <span className="font-semibold text-foreground">{activity.disciplina}</span>
              </div>
              <div className="rounded-lg bg-muted/30 p-2.5">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Ano Escolar
                </span>
                <span className="font-semibold text-foreground">{activity.ano}</span>
              </div>
              <div className="rounded-lg bg-muted/30 p-2.5">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Dificuldade
                </span>
                <span className="font-semibold text-foreground capitalize">{activity.dificuldade}</span>
              </div>
              <div className="rounded-lg bg-muted/30 p-2.5">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                  Quantidade
                </span>
                <span className="font-semibold text-foreground">{countItems(activity)} itens</span>
              </div>
            </div>
          </header>

          {/* DYNAMIC VIEW BY ACTIVITY TYPE */}
          {activity.type === 'prova' || activity.type === 'lista' ? (
            <ProvaView activity={activity} showAnswers={showAnswers} />
          ) : activity.type === 'quiz' ? (
            <QuizView activity={activity} />
          ) : activity.type === 'plano-aula' ? (
            <PlanoAulaView activity={activity} />
          ) : activity.type === 'flashcards' ? (
            <FlashcardsView activity={activity} showAnswers={showAnswers} />
          ) : activity.type === 'mapa-mental' ? (
            <MapaMentalView activity={activity} />
          ) : activity.type === 'cruzadinha' ? (
            <CruzadinhaView activity={activity} showAnswers={showAnswers} />
          ) : activity.type === 'resumo' ? (
            <ResumoView activity={activity} />
          ) : (
            <ProvaView activity={activity} showAnswers={showAnswers} />
          )}
        </div>
      </article>
    </div>
  );
};
