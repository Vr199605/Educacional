import React, { useState } from 'react';
import { StudentTopBar } from './StudentTopBar';
import { LearningRoadmap } from './LearningRoadmap';
import { InteractiveChallenge, MOCK_CHALLENGES } from './InteractiveChallenge';
import { RewardModal } from './RewardModal';
import { StudentStage, MOCK_STUDENT_STAGES } from '../mockData';
import { Map, Gamepad2, Sparkles, BookOpen } from 'lucide-react';

interface StudentViewProps {
  onSwitchToTeacher: () => void;
  onSwitchToEduCreator: () => void;
}

export const StudentView: React.FC<StudentViewProps> = ({
  onSwitchToTeacher,
  onSwitchToEduCreator,
}) => {
  const [viewState, setViewState] = useState<'roadmap' | 'challenge'>('challenge');
  const [activeStage, setActiveStage] = useState<StudentStage>(MOCK_STUDENT_STAGES[2]); // Desafio das Frações
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(120);
  const [coins, setCoins] = useState(450);
  const [isRewardOpen, setIsRewardOpen] = useState(false);

  const totalChallenges = MOCK_CHALLENGES.length; // 3 challenges in this lesson

  const handleStartStage = (stage: StudentStage) => {
    setActiveStage(stage);
    setChallengeIdx(0);
    setViewState('challenge');
  };

  const handleCompleteChallenges = () => {
    setIsRewardOpen(true);
  };

  const handleRewardNext = () => {
    setIsRewardOpen(false);
    setStars((prev) => prev + 30);
    setCoins((prev) => prev + 50);
    setViewState('roadmap');
  };

  const handleRewardBackToRoadmap = () => {
    setIsRewardOpen(false);
    setStars((prev) => prev + 30);
    setCoins((prev) => prev + 50);
    setViewState('roadmap');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffbeb] via-[#f0f9ff] to-[#f8fafc] font-sans text-zinc-900 pb-16">
      {/* Student Top Bar when in challenge mode */}
      {viewState === 'challenge' ? (
        <StudentTopBar
          title={activeStage.titulo}
          currentStep={challengeIdx + 1}
          totalSteps={totalChallenges}
          stars={stars}
          coins={coins}
          timeRemaining="03:45"
          onExit={() => setViewState('roadmap')}
        />
      ) : (
        /* Top Navigation when in Roadmap mode */
        <header className="sticky top-0 z-30 flex items-center justify-between border-b-2 border-indigo-200/80 bg-white/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-gradient-to-tr from-amber-400 to-indigo-600 text-white font-black shadow-md">
              🎒
            </div>
            <div>
              <span className="font-display text-base font-extrabold text-zinc-900 block leading-tight">
                Espaço Aventura do Aluno
              </span>
              <span className="text-[11px] font-bold text-indigo-600">
                LearnSmart Gamificado
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-2xl bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-900 shadow-2xs">
              <span>⭐ {stars}</span>
              <span>•</span>
              <span>🪙 {coins}</span>
            </div>

            <button
              type="button"
              onClick={onSwitchToTeacher}
              className="rounded-2xl border-2 border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 shadow-2xs"
            >
              Visão do Professor
            </button>
          </div>
        </header>
      )}

      {/* Main Body */}
      <main className="p-4 sm:p-6 md:p-8">
        {viewState === 'challenge' ? (
          <InteractiveChallenge
            challengeIndex={challengeIdx}
            totalChallenges={totalChallenges}
            onNext={() => setChallengeIdx((prev) => prev + 1)}
            onComplete={handleCompleteChallenges}
          />
        ) : (
          <LearningRoadmap
            stages={MOCK_STUDENT_STAGES}
            onSelectStage={handleStartStage}
          />
        )}
      </main>

      {/* Floating Bottom Navigator for Quick Exploration */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full border-2 border-zinc-300 bg-white/95 p-1.5 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setViewState('roadmap')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition ${
            viewState === 'roadmap'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <Map className="size-4" />
          <span>Trilha de Fases</span>
        </button>

        <button
          type="button"
          onClick={() => setViewState('challenge')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition ${
            viewState === 'challenge'
              ? 'bg-amber-500 text-amber-950 shadow-xs'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <Gamepad2 className="size-4" />
          <span>Desafio Ativo</span>
        </button>
      </div>

      {/* Reward & Success Modal */}
      <RewardModal
        isOpen={isRewardOpen}
        scorePercent={100}
        earnedStars={30}
        earnedCoins={50}
        onNextLesson={handleRewardNext}
        onBackToRoadmap={handleRewardBackToRoadmap}
        onRetry={() => {
          setIsRewardOpen(false);
          setChallengeIdx(0);
        }}
      />
    </div>
  );
};
