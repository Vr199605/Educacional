import React, { useState } from 'react';
import {
  Share2,
  Download,
  Star,
  Users,
  Search,
  BookOpen,
  Sparkles,
  CheckCircle,
  Copy,
  ThumbsUp,
} from 'lucide-react';

export interface SharedResource {
  id: string;
  titulo: string;
  autor: string;
  escola: string;
  disciplina: string;
  ano: string;
  tipo: string;
  downloads: number;
  avaliacao: number;
  tags: string[];
}

export const MOCK_SHARED_RESOURCES: SharedResource[] = [
  {
    id: 'res-1',
    titulo: 'Banco Completo de Questões BNCC: Frações e Porcentagem',
    autor: 'Profª Mariana Silveira',
    escola: 'Colégio Estadual Dom Pedro II',
    disciplina: 'Matemática',
    ano: '6º ao 8º Ano',
    tipo: 'Prova Estruturada',
    downloads: 248,
    avaliacao: 4.9,
    tags: ['EF06MA01', 'EF07MA04', 'Discursivas'],
  },
  {
    id: 'res-2',
    titulo: 'Roteiro de Aula Prática: Ecossistemas e Biodiversidade',
    autor: 'Prof. Carlos Eduardo Vaz',
    escola: 'Escola Municipal Paulo Freire',
    disciplina: 'Ciências',
    ano: '7º Ano',
    tipo: 'Plano de Aula',
    downloads: 182,
    avaliacao: 4.8,
    tags: ['Metodologia Ativa', 'Laboratório', 'BNCC'],
  },
  {
    id: 'res-3',
    titulo: 'Cruzadinha & Quiz Histórico: Era Vargas e Cidadania',
    autor: 'Profª Tatiana Becker',
    escola: 'Instituto Federal de Educação',
    disciplina: 'História',
    ano: '9º Ano',
    tipo: 'Passatempo & Quiz',
    downloads: 310,
    avaliacao: 5.0,
    tags: ['Gamificação', 'Interativo', 'EF09HI11'],
  },
  {
    id: 'res-4',
    titulo: 'Flashcards de Vocabulário & Gramática Essencial',
    autor: 'Prof. Lucas Fontes',
    escola: 'Escola Modelo Bilíngue',
    disciplina: 'Inglês',
    ano: 'Ensino Médio',
    tipo: 'Flashcards 3D',
    downloads: 145,
    avaliacao: 4.7,
    tags: ['Repetição Espaçada', 'Vocabulário'],
  },
];

interface SharedResourcesHubProps {
  onUseResource?: (res: SharedResource) => void;
}

export const SharedResourcesHub: React.FC<SharedResourcesHubProps> = ({
  onUseResource,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [toast, setToast] = useState<string | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Recursos' },
    { id: 'Matemática', label: 'Matemática' },
    { id: 'Ciências', label: 'Ciências' },
    { id: 'História', label: 'História' },
    { id: 'Inglês', label: 'Línguas' },
  ];

  const filtered = MOCK_SHARED_RESOURCES.filter((res) => {
    const matchCat = selectedCategory === 'todos' || res.disciplina === selectedCategory;
    const matchSearch =
      !search ||
      res.titulo.toLowerCase().includes(search.toLowerCase()) ||
      res.autor.toLowerCase().includes(search.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return matchCat && matchSearch;
  });

  const handleCopy = (res: SharedResource) => {
    setToast(`Material "${res.titulo}" importado para a sua biblioteca local com sucesso!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Rede Colaborativa de Professores
          </span>
          <h2 className="font-display text-xl font-bold text-zinc-900 mt-2">
            Materiais Compartilhados & Recursos Abertos
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Acesse e reutilize avaliações, planos de aula e jogos didáticos compartilhados por outros docentes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setToast('Seus materiais recentes foram disponibilizados na rede de professores!');
            setTimeout(() => setToast(null), 3000);
          }}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 active:scale-95"
        >
          <Share2 className="size-4" />
          <span>Compartilhar Meus Materiais</span>
        </button>
      </div>

      {toast && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 shadow-sm animate-in fade-in">
          <CheckCircle className="size-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Category Pills & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center rounded-2xl border border-zinc-200 bg-white p-1 shadow-2xs">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                selectedCategory === c.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-2.5 size-4 text-zinc-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por tema, BNCC ou autor..."
            className="w-full rounded-2xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-xs placeholder:text-zinc-400 focus:border-indigo-600 focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {item.disciplina} • {item.ano}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  {item.avaliacao}
                </span>
              </div>

              <h3 className="font-display text-base font-bold text-zinc-900 leading-snug">
                {item.titulo}
              </h3>

              <div className="mt-2 text-xs text-zinc-500">
                <span>Por: <strong className="text-zinc-800">{item.autor}</strong></span>
                <span className="block text-[11px] text-zinc-400 mt-0.5">{item.escola}</span>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <Download className="size-3.5" />
                {item.downloads} cópias realizadas
              </span>

              <button
                type="button"
                onClick={() => handleCopy(item)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
              >
                <Copy className="size-3.5" />
                <span>Usar Material</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
