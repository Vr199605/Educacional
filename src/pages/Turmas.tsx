import React, { useState, useEffect } from 'react';
import { getClasses, saveClass, deleteClass, getActivities } from '../services/activityStore';
import { SchoolClass, Activity } from '../types/activity';
import { Users, Plus, BookOpen, Trash2, Printer, Check, X, GraduationCap } from 'lucide-react';

interface TurmasProps {
  onNavigate: (path: string, params?: Record<string, any>) => void;
}

export const Turmas: React.FC<TurmasProps> = ({ onNavigate }) => {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNome, setNewNome] = useState('');
  const [newAno, setNewAno] = useState('6º ano — Fundamental II');
  const [newDisciplina, setNewDisciplina] = useState('Matemática');
  const [newNumAlunos, setNewNumAlunos] = useState(30);
  const [newPeriodo, setNewPeriodo] = useState('Manhã');

  useEffect(() => {
    setClasses(getClasses());
    setActivities(getActivities());
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNome.trim()) return;

    const newClass: SchoolClass = {
      id: 'turma-' + Date.now(),
      nome: newNome.trim(),
      ano: newAno,
      disciplina: newDisciplina,
      numAlunos: newNumAlunos,
      periodo: newPeriodo,
      atividadesIds: [],
      createdAt: Date.now(),
    };

    saveClass(newClass);
    setClasses(getClasses());
    setIsModalOpen(false);
    setNewNome('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Excluir esta turma?')) {
      deleteClass(id);
      setClasses(getClasses());
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-12">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Gestão Escolar
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Minhas Turmas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize suas salas de aula, atribua materiais didáticos e gerencie cópias de impressão.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          <Plus className="size-4" />
          <span>Cadastrar Nova Turma</span>
        </button>
      </header>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-2xs transition hover:border-brand/40"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">{cls.nome}</h3>
                  <span className="text-[11px] text-muted-foreground">
                    {cls.disciplina} • {cls.periodo}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(cls.id)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="space-y-2 py-3 text-xs text-muted-foreground border-y border-border/60">
              <div className="flex justify-between">
                <span>Ano de Ensino:</span>
                <span className="font-semibold text-foreground">{cls.ano}</span>
              </div>
              <div className="flex justify-between">
                <span>Total de Estudantes:</span>
                <span className="font-semibold text-foreground">{cls.numAlunos} alunos</span>
              </div>
              <div className="flex justify-between">
                <span>Atividades Vinculadas:</span>
                <span className="font-semibold text-foreground">
                  {cls.atividadesIds?.length || 0} materiais
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 pt-2">
              <button
                onClick={() => onNavigate('/biblioteca')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
              >
                <BookOpen className="size-3.5" />
                <span>Vincular Atividade</span>
              </button>

              <button
                onClick={() => onNavigate('/nova-atividade')}
                className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/80"
              >
                Gerar para esta turma
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-foreground">Cadastrar Nova Turma</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-foreground">Nome da Turma</label>
                <input
                  type="text"
                  value={newNome}
                  onChange={(e) => setNewNome(e.target.value)}
                  placeholder="Ex: 7º Ano B, 3º Ano EM Técnico"
                  className="w-full rounded-xl border border-border bg-background p-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-semibold text-foreground">Disciplina</label>
                  <input
                    type="text"
                    value={newDisciplina}
                    onChange={(e) => setNewDisciplina(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background p-2.5 focus:border-brand focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block font-semibold text-foreground">Qtd. de Alunos</label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={newNumAlunos}
                    onChange={(e) => setNewNumAlunos(parseInt(e.target.value) || 1)}
                    className="w-full rounded-xl border border-border bg-background p-2.5 focus:border-brand focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-foreground">Turno</label>
                <select
                  value={newPeriodo}
                  onChange={(e) => setNewPeriodo(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-2.5 focus:border-brand focus:outline-none"
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2 font-medium text-muted-foreground hover:bg-muted"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-700"
                >
                  Cadastrar Turma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
