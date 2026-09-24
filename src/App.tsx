import React, { useState, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { Home } from './pages/Home';
import { NovaAtividade } from './pages/NovaAtividade';
import { AtividadeDetalhe } from './pages/AtividadeDetalhe';
import { Biblioteca } from './pages/Biblioteca';
import { Favoritos } from './pages/Favoritos';
import { Turmas } from './pages/Turmas';
import { Auth } from './pages/Auth';
import { getActivities, saveActivity } from './services/activityStore';
import { generateTemplateActivity } from './services/templateGenerator';
import { Activity, ActivityType } from './types/activity';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [navParams, setNavParams] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Pre-populate sample activities on very first launch so the library isn't completely empty
  useEffect(() => {
    const existing = getActivities();
    if (existing.length === 0) {
      const sampleProva = generateTemplateActivity({
        type: 'prova',
        disciplina: 'Matemática',
        tema: 'Operações com Frações e Decimais',
        subtema: 'Problemas contextualizados e cálculo de porcentagem',
        ano: '6º ano — Fundamental II',
        dificuldade: 'medio',
        quantidade: 5,
        objetivo: 'Resolver problemas do cotidiano envolvendo cálculo fracionário com resolução passo a passo',
      });

      const act1: Activity = {
        id: 'act-sample-prova',
        type: 'prova',
        titulo: sampleProva.titulo || 'Prova Estruturada — Operações com Frações',
        disciplina: 'Matemática',
        tema: 'Operações com Frações e Decimais',
        ano: '6º ano — Fundamental II',
        dificuldade: 'medio',
        introducao: sampleProva.introducao,
        questoes: sampleProva.questoes || [],
        gabarito: sampleProva.gabarito,
        createdAt: Date.now() - 3600000 * 2,
        favorito: true,
      };

      const sampleCruzadinha = generateTemplateActivity({
        type: 'cruzadinha',
        disciplina: 'História',
        tema: 'Revolução Francesa e Cidadania',
        ano: '8º ano — Fundamental II',
        dificuldade: 'medio',
        quantidade: 6,
      });

      const act2: Activity = {
        id: 'act-sample-cruzadinha',
        type: 'cruzadinha',
        titulo: sampleCruzadinha.titulo || 'Cruzadinha — Revolução Francesa',
        disciplina: 'História',
        tema: 'Revolução Francesa e Cidadania',
        ano: '8º ano — Fundamental II',
        dificuldade: 'medio',
        introducao: sampleCruzadinha.introducao,
        questoes: [],
        cruzadinha: sampleCruzadinha.cruzadinha || null,
        createdAt: Date.now() - 3600000 * 6,
        favorito: false,
      };

      const samplePlano = generateTemplateActivity({
        type: 'plano-aula',
        disciplina: 'Ciências',
        tema: 'Ciclo da Água e Mudanças Climáticas',
        ano: '7º ano — Fundamental II',
        dificuldade: 'medio',
        quantidade: 4,
      });

      const act3: Activity = {
        id: 'act-sample-plano',
        type: 'plano-aula',
        titulo: samplePlano.titulo || 'Plano de Aula — Ciclo da Água',
        disciplina: 'Ciências',
        tema: 'Ciclo da Água e Mudanças Climáticas',
        ano: '7º ano — Fundamental II',
        dificuldade: 'medio',
        introducao: samplePlano.introducao,
        questoes: [],
        planoAula: samplePlano.planoAula || null,
        createdAt: Date.now() - 3600000 * 24,
        favorito: true,
      };

      saveActivity(act1);
      saveActivity(act2);
      saveActivity(act3);
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string, params: Record<string, any> = {}) => {
    setCurrentPath(path);
    setNavParams(params);
    window.history.pushState({}, '', path);
    window.scrollTo(0, 0);
  };

  // Determine current route
  const renderContent = () => {
    if (currentPath === '/auth') {
      return <Auth onNavigate={handleNavigate} />;
    }

    if (currentPath === '/nova-atividade') {
      return (
        <NovaAtividade
          initialType={navParams.type as ActivityType}
          initialPrompt={navParams.prompt as string}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath.startsWith('/atividade/')) {
      const id = navParams.id || currentPath.replace('/atividade/', '');
      return <AtividadeDetalhe id={id} onNavigate={handleNavigate} />;
    }

    if (currentPath === '/biblioteca') {
      return (
        <Biblioteca
          initialSearch={navParams.search || searchQuery}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentPath === '/favoritos') {
      return <Favoritos onNavigate={handleNavigate} />;
    }

    if (currentPath === '/turmas') {
      return <Turmas onNavigate={handleNavigate} />;
    }

    // Default: Home
    return <Home onNavigate={handleNavigate} />;
  };

  return (
    <AppShell
      currentPath={currentPath}
      onNavigate={handleNavigate}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {renderContent()}
    </AppShell>
  );
};
export default App;
