import React, { useState, useEffect } from 'react';
import { getActivities, activityLabels, activityTones } from '../services/activityStore';
import { Activity } from '../types/activity';
import { Star } from 'lucide-react';

interface FavoritosProps {
  onNavigate: (path: string, params?: Record<string, any>) => void;
}

export const Favoritos: React.FC<FavoritosProps> = ({ onNavigate }) => {
  const [favorites, setFavorites] = useState<Activity[]>([]);

  useEffect(() => {
    const all = getActivities();
    setFavorites(all.filter((a) => a.favorito));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-12">
      <header className="mb-8">
        <span className="mb-1 block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
          Favoritos
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Materiais salvos com estrela
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesse rapidamente suas atividades e provas prediletas.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center text-sm text-muted-foreground">
          <Star className="mx-auto mb-3 size-8 text-amber-400 opacity-60" />
          <p>Você ainda não favoritou nenhuma atividade.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Abra qualquer material gerado e clique no botão "Favoritar" com a estrela para fixá-lo aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((act) => (
            <div
              key={act.id}
              onClick={() => onNavigate(`/atividade/${act.id}`, { id: act.id })}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-2xs transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
            >
              <div className="grid aspect-video place-items-center bg-gradient-to-br from-muted to-background p-4 text-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {activityLabels[act.type]}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      activityTones[act.type]
                    }`}
                  >
                    {act.disciplina}
                  </span>
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                </div>
                <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-brand">
                  {act.titulo}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
