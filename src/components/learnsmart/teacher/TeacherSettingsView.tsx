import React, { useState } from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  Cpu,
  Save,
  CheckCircle2,
  Sparkles,
  School,
  Mail,
  BookOpen,
  Lock,
} from 'lucide-react';

export const TeacherSettingsView: React.FC = () => {
  const [name, setName] = useState('Prof. Ricardo Mendes');
  const [email, setEmail] = useState('ricardo.mendes@escola.gov.br');
  const [school, setSchool] = useState('Colégio Estadual Modelo');
  const [discipline, setDiscipline] = useState('Matemática & Ciências Exatas');

  // Preferences
  const [autoBncc, setAutoBncc] = useState(true);
  const [stepByStepSolutions, setStepByStepSolutions] = useState(true);
  const [notifySubmissions, setNotifySubmissions] = useState(true);
  const [notifyAttention, setNotifyAttention] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [gradingScale, setGradingScale] = useState<'decimal' | 'conceito'>('decimal');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Configurações e preferências salvas com sucesso!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Settings className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-zinc-900">
                Configurações da Conta & Plataforma
              </h2>
              <p className="text-xs text-zinc-500">
                Personalize seus dados de educador, preferências pedagógicas e automações de IA.
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition"
          >
            <Save className="size-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm text-center">
            <div className="relative mx-auto mb-4 size-24">
              <div className="grid size-24 place-items-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-2xl font-black text-white shadow-md">
                RM
              </div>
              <span className="absolute bottom-1 right-1 size-5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <h3 className="font-display text-base font-bold text-zinc-900">{name}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">{discipline}</p>
            <span className="mt-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-700">
              Professor Titular
            </span>

            <div className="mt-6 border-t border-zinc-100 pt-4 text-left space-y-3 text-xs text-zinc-600">
              <div className="flex items-center gap-2.5">
                <School className="size-4 text-zinc-400 shrink-0" />
                <span className="truncate">{school}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 text-zinc-400 shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen className="size-4 text-zinc-400 shrink-0" />
                <span>4 Turmas Ativas (124 alunos)</span>
              </div>
            </div>
          </div>

          {/* Fixed AI Key Status */}
          <div className="rounded-3xl border border-emerald-200/90 bg-emerald-50/60 p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="grid size-8 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Cpu className="size-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Motor IA Gemini</h4>
                <span className="text-[10px] font-semibold text-emerald-700">Conectado & Operacional</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              O motor Google Gemini com resolução passo a passo está configurado de forma segura e permanente no servidor da plataforma.
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/80 p-2.5 border border-emerald-200/70 text-[11px] font-medium text-emerald-900">
              <Lock className="size-3.5 text-emerald-600 shrink-0" />
              <span>Chave criptografada e protegida</span>
            </div>
          </div>
        </div>

        {/* Right Columns: Settings Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Educator Information */}
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <User className="size-4 text-indigo-600" />
              <h3 className="font-display text-sm font-bold text-zinc-900">
                Dados Pessoais & Institucionais
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-2.5 text-zinc-800 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">E-mail Institucional</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-2.5 text-zinc-800 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Escola / Unidade</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-2.5 text-zinc-800 focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Componente Curricular</label>
                <input
                  type="text"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-2.5 text-zinc-800 focus:border-indigo-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Pedagogical AI Options */}
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <Sparkles className="size-4 text-indigo-600" />
              <h3 className="font-display text-sm font-bold text-zinc-900">
                Parâmetros de Correção & Inteligência Artificial
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              {/* Step by step */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-zinc-50/70 border border-zinc-200/70">
                <div>
                  <p className="font-bold text-zinc-900">Resoluções Passo a Passo em Questões Discursivas</p>
                  <p className="text-[11px] text-zinc-500">
                    Apresenta respostas didáticas com raciocínio detalhado, cálculos intermediários e justificativa pedagógica.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStepByStepSolutions(!stepByStepSolutions)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    stepByStepSolutions ? 'bg-indigo-600' : 'bg-zinc-300'
                  }`}
                >
                  <span
                    className={`inline-block size-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                      stepByStepSolutions ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* BNCC Auto-tagging */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-zinc-50/70 border border-zinc-200/70">
                <div>
                  <p className="font-bold text-zinc-900">Vincular Código BNCC Automaticamente</p>
                  <p className="text-[11px] text-zinc-500">
                    Mapeia cada questão gerada com os códigos da BNCC para relatórios curriculares.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutoBncc(!autoBncc)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    autoBncc ? 'bg-indigo-600' : 'bg-zinc-300'
                  }`}
                >
                  <span
                    className={`inline-block size-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                      autoBncc ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Grading scale */}
              <div className="p-3 rounded-2xl bg-zinc-50/70 border border-zinc-200/70">
                <p className="font-bold text-zinc-900 mb-1.5">Escala de Avaliação Padrão</p>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-700">
                    <input
                      type="radio"
                      name="gradingScale"
                      checked={gradingScale === 'decimal'}
                      onChange={() => setGradingScale('decimal')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Numérica (0.0 a 10.0)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-zinc-700">
                    <input
                      type="radio"
                      name="gradingScale"
                      checked={gradingScale === 'conceito'}
                      onChange={() => setGradingScale('conceito')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Conceitos (A, B, C, D)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
              <Bell className="size-4 text-indigo-600" />
              <h3 className="font-display text-sm font-bold text-zinc-900">
                Alertas & Notificações
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer">
                <div>
                  <span className="font-semibold text-zinc-800">Notificar novas entregas de tarefas</span>
                  <p className="text-[11px] text-zinc-400">Receba alertas em tempo real quando um aluno enviar</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifySubmissions}
                  onChange={(e) => setNotifySubmissions(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 size-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer">
                <div>
                  <span className="font-semibold text-zinc-800">Alerta de alunos que necessitam de reforço</span>
                  <p className="text-[11px] text-zinc-400">Avisa quando a média ou frequência cair abaixo de 75%</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyAttention}
                  onChange={(e) => setNotifyAttention(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 size-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-50 cursor-pointer">
                <div>
                  <span className="font-semibold text-zinc-800">Relatório consolidado semanal por e-mail</span>
                  <p className="text-[11px] text-zinc-400">Receba o resumo de desempenho toda sexta-feira às 18h</p>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 size-4"
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
