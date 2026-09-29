import React, { useState } from 'react';
import { MOCK_SCHEDULE, ClassScheduleItem } from '../mockData';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  Filter,
  Plus,
  Play,
  BookOpen,
} from 'lucide-react';

interface LessonPlanningCalendarProps {
  onStartLesson?: (lesson: ClassScheduleItem) => void;
}

export const LessonPlanningCalendar: React.FC<LessonPlanningCalendarProps> = ({
  onStartLesson,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('todos');
  const [activeLessonModal, setActiveLessonModal] = useState<ClassScheduleItem | null>(null);

  const days: { key: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex'; label: string; date: string }[] = [
    { key: 'Seg', label: 'Segunda-feira', date: '28 Set' },
    { key: 'Ter', label: 'Terça-feira', date: '29 Set' },
    { key: 'Qua', label: 'Quarta-feira', date: '30 Set' },
    { key: 'Qui', label: 'Quinta-feira', date: '01 Out' },
    { key: 'Sex', label: 'Sexta-feira', date: '02 Out' },
  ];

  const hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  const colorStyles: Record<
    ClassScheduleItem['cor'],
    { bg: string; border: string; text: string; badge: string }
  > = {
    blue: {
      bg: 'bg-blue-50/90 hover:bg-blue-100/90',
      border: 'border-blue-200',
      text: 'text-blue-900',
      badge: 'bg-blue-200 text-blue-800',
    },
    emerald: {
      bg: 'bg-emerald-50/90 hover:bg-emerald-100/90',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      badge: 'bg-emerald-200 text-emerald-800',
    },
    amber: {
      bg: 'bg-amber-50/90 hover:bg-amber-100/90',
      border: 'border-amber-200',
      text: 'text-amber-900',
      badge: 'bg-amber-200 text-amber-800',
    },
    purple: {
      bg: 'bg-purple-50/90 hover:bg-purple-100/90',
      border: 'border-purple-200',
      text: 'text-purple-900',
      badge: 'bg-purple-200 text-purple-800',
    },
    rose: {
      bg: 'bg-rose-50/90 hover:bg-rose-100/90',
      border: 'border-rose-200',
      text: 'text-rose-900',
      badge: 'bg-rose-200 text-rose-800',
    },
    indigo: {
      bg: 'bg-indigo-50/90 hover:bg-indigo-100/90',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      badge: 'bg-indigo-200 text-indigo-800',
    },
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
            <CalendarIcon className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-zinc-900">
              Grade Semanal de Aulas & Planejamento
            </h2>
            <p className="text-xs text-zinc-500">
              Semana de 28 de Setembro a 02 de Outubro • Horário Escolar (08h às 18h)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1">
            <button
              type="button"
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-white hover:text-zinc-900 shadow-2xs"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-3 text-xs font-bold text-zinc-700">Semana Atual</span>
            <button
              type="button"
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-white hover:text-zinc-900 shadow-2xs"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            <Plus className="size-3.5" />
            <span>Adicionar Aula</span>
          </button>
        </div>
      </div>

      {/* Weekly Grid Desktop & Responsive */}
      <div className="overflow-x-auto rounded-3xl border border-zinc-200/90 bg-white shadow-sm">
        <div className="min-w-[760px]">
          {/* Day Columns Header */}
          <div className="grid grid-cols-6 border-b border-zinc-200 bg-zinc-50/70 text-center text-xs font-semibold text-zinc-600">
            <div className="p-3.5 border-r border-zinc-200/80 font-mono text-[11px] text-zinc-400">
              Horário
            </div>
            {days.map((d) => (
              <div
                key={d.key}
                className="p-3.5 border-r border-zinc-200/80 last:border-r-0"
              >
                <span className="block font-bold text-zinc-900 text-xs sm:text-sm">
                  {d.label}
                </span>
                <span className="text-[10px] text-zinc-400 font-normal">{d.date}</span>
              </div>
            ))}
          </div>

          {/* Time Rows and Cells */}
          <div className="divide-y divide-zinc-100">
            {hours.slice(0, -1).map((h, hIdx) => {
              const nextH = hours[hIdx + 1];

              return (
                <div key={h} className="grid grid-cols-6 min-h-[72px]">
                  {/* Hour Legend */}
                  <div className="border-r border-zinc-200/80 p-2 text-center text-[11px] font-mono text-zinc-400 bg-zinc-50/30 flex flex-col justify-start">
                    <span>{h}</span>
                  </div>

                  {/* Day slots */}
                  {days.map((day) => {
                    const lessonsHere = MOCK_SCHEDULE.filter((s) => {
                      if (s.diaSemana !== day.key) return false;
                      const startHour = parseInt(s.horaInicio.split(':')[0]);
                      const rowHour = parseInt(h.split(':')[0]);
                      return startHour === rowHour;
                    });

                    return (
                      <div
                        key={day.key}
                        className="relative border-r border-zinc-100 p-1.5 last:border-r-0 hover:bg-zinc-50/40 transition-colors"
                      >
                        {lessonsHere.map((item) => {
                          const style = colorStyles[item.cor];

                          return (
                            <div
                              key={item.id}
                              onClick={() => setActiveLessonModal(item)}
                              className={`group cursor-pointer rounded-2xl border p-2.5 shadow-2xs transition-all hover:scale-[1.02] hover:shadow-md ${style.bg} ${style.border}`}
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span
                                  className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${style.badge}`}
                                >
                                  {item.materia}
                                </span>
                                <span className="text-[10px] font-mono font-semibold text-zinc-500">
                                  {item.turma}
                                </span>
                              </div>

                              <p
                                className={`font-display text-xs font-bold leading-tight ${style.text} line-clamp-2`}
                              >
                                {item.tema}
                              </p>

                              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="size-3" />
                                  {item.horaInicio} - {item.horaFim}
                                </span>
                                {item.status === 'concluida' ? (
                                  <span className="flex items-center gap-0.5 text-emerald-600 font-semibold">
                                    <CheckCircle2 className="size-3" />
                                    OK
                                  </span>
                                ) : item.status === 'em_andamento' ? (
                                  <span className="rounded bg-amber-200 px-1 py-0.2 text-[9px] font-bold text-amber-800">
                                    Agora
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lesson Details Modal */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
              <div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  {activeLessonModal.materia} • {activeLessonModal.turma}
                </span>
                <h3 className="font-display text-lg font-bold text-zinc-900 mt-1">
                  {activeLessonModal.tema}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLessonModal(null)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-indigo-600" />
                <span>
                  Horário: <strong>{activeLessonModal.horaInicio} às {activeLessonModal.horaFim}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-emerald-600" />
                <span>Local: <strong>{activeLessonModal.sala}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-amber-600" />
                <span>
                  Status:{' '}
                  <strong className="capitalize">
                    {activeLessonModal.status.replace('_', ' ')}
                  </strong>
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-100 pt-4">
              <button
                type="button"
                onClick={() => setActiveLessonModal(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onStartLesson) onStartLesson(activeLessonModal);
                  setActiveLessonModal(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                <Play className="size-3.5 fill-white" />
                <span>Iniciar Aula Interativa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
