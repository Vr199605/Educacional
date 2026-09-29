import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Smile,
  Plus,
  CheckCheck,
  User,
  Users,
  Bell,
  MoreVertical,
  CheckCircle2,
  X,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  initials: string;
  isGroup?: boolean;
  unreadCount?: number;
  lastMessage: string;
  lastTime: string;
  online?: boolean;
  messages: ChatMessage[];
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Coordenação Pedagógica (Profª Renata)',
    role: 'Gestão Escolar',
    avatarBg: 'from-amber-500 to-orange-600',
    initials: 'CP',
    isGroup: false,
    unreadCount: 2,
    lastMessage: 'Ricardo, os relatórios do Simulado BNCC foram homologados!',
    lastTime: '10:42',
    online: true,
    messages: [
      {
        id: 'm1',
        sender: 'them',
        text: 'Olá Ricardo! Bom dia. Você já conseguiu fechar as notas do 9º B?',
        time: '09:15',
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Bom dia Renata! Sim, acabei de consolidar no LearnSmart. 92% da turma atingiu as habilidades esperadas.',
        time: '09:30',
      },
      {
        id: 'm3',
        sender: 'them',
        text: 'Excelente! Ricardo, os relatórios do Simulado BNCC foram homologados!',
        time: '10:42',
      },
    ],
  },
  {
    id: 'conv-2',
    name: 'Mural de Avisos - 9º Ano B',
    role: 'Turma (32 alunos)',
    avatarBg: 'from-indigo-500 to-purple-600',
    initials: '9B',
    isGroup: true,
    unreadCount: 0,
    lastMessage: 'Lembrete: entrega da lista de Equações Quadráticas amanhã até 23h59.',
    lastTime: 'Ontem',
    online: true,
    messages: [
      {
        id: 'm4',
        sender: 'me',
        text: 'Pessoal, o material complementar e as questões resolvidas passo a passo já estão disponíveis no portal.',
        time: 'Ontem 14:00',
      },
      {
        id: 'm5',
        sender: 'me',
        text: 'Lembrete: entrega da lista de Equações Quadráticas amanhã até 23h59.',
        time: 'Ontem 14:05',
      },
    ],
  },
  {
    id: 'conv-3',
    name: 'Maria Santos (Mãe do Lucas Santos)',
    role: 'Responsável - 9º Ano B',
    avatarBg: 'from-emerald-500 to-teal-600',
    initials: 'MS',
    isGroup: false,
    unreadCount: 0,
    lastMessage: 'Muito obrigada pelo retorno, professor! Vamos incentivá-lo na revisão.',
    lastTime: '26 Set',
    online: false,
    messages: [
      {
        id: 'm6',
        sender: 'them',
        text: 'Boa tarde, Professor Ricardo. O Lucas comentou que teve dúvida na resolução da questão discursiva.',
        time: '26 Set 15:20',
      },
      {
        id: 'm7',
        sender: 'me',
        text: 'Olá Sra. Maria! Expliquei o passo a passo com diagramas hoje na aula e enviei o reforço com IA.',
        time: '26 Set 16:10',
      },
      {
        id: 'm8',
        sender: 'them',
        text: 'Muito obrigada pelo retorno, professor! Vamos incentivá-lo na revisão.',
        time: '26 Set 16:45',
      },
    ],
  },
  {
    id: 'conv-4',
    name: 'Prof. Marcos Vinicius',
    role: 'Professor de Ciências',
    avatarBg: 'from-blue-500 to-cyan-600',
    initials: 'MV',
    isGroup: false,
    unreadCount: 0,
    lastMessage: 'Vamos criar aquela prova interdisciplinar pelo EduCreator na sexta?',
    lastTime: '24 Set',
    online: false,
    messages: [
      {
        id: 'm9',
        sender: 'them',
        text: 'Vamos criar aquela prova interdisciplinar pelo EduCreator na sexta?',
        time: '24 Set 11:15',
      },
    ],
  },
];

export const MessagesCenter: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string>('conv-1');
  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastTarget, setBroadcastTarget] = useState('Todas as Turmas');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: 'Agora',
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedConvId) {
          return {
            ...conv,
            lastMessage: newMsg.text,
            lastTime: 'Agora',
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );

    setInputText('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    const newBroadcastConv: Conversation = {
      id: `conv-bc-${Date.now()}`,
      name: `Comunicado: ${broadcastTarget}`,
      role: 'Aviso Geral Enviado',
      avatarBg: 'from-amber-500 to-rose-600',
      initials: 'AV',
      isGroup: true,
      lastMessage: broadcastMessage,
      lastTime: 'Agora',
      online: true,
      messages: [
        {
          id: `bm-${Date.now()}`,
          sender: 'me',
          text: broadcastMessage,
          time: 'Agora',
        },
      ],
    };

    setConversations((prev) => [newBroadcastConv, ...prev]);
    setSelectedConvId(newBroadcastConv.id);
    setIsBroadcastModalOpen(false);
    setBroadcastMessage('');
    setToastMessage(`Comunicado enviado com sucesso para ${broadcastTarget}!`);
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

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-zinc-200/90 bg-white shadow-sm overflow-hidden min-h-[640px]">
        {/* Left Sidebar: Conversations List */}
        <div className="lg:col-span-5 border-r border-zinc-200/80 flex flex-col bg-zinc-50/50">
          {/* Header & New Broadcast */}
          <div className="p-4 border-b border-zinc-200/80 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="grid size-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MessageSquare className="size-4.5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-zinc-900">Mensagens & Avisos</h3>
                  <p className="text-[11px] text-zinc-500">Comunicação direta com turmas e pais</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-indigo-700 active:scale-95 transition"
              >
                <Plus className="size-3.5" />
                <span>Comunicado</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-2.5 size-3.5 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar conversa ou responsável..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 py-1.5 pl-8 pr-3 text-xs placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedConv.id;
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`w-full p-4 text-left transition flex items-start gap-3 hover:bg-zinc-100/70 ${
                    isSelected ? 'bg-indigo-50/60 border-l-4 border-indigo-600' : ''
                  }`}
                >
                  <div className="relative shrink-0">
                    <div
                      className={`grid size-10 place-items-center rounded-2xl bg-gradient-to-tr ${conv.avatarBg} text-white font-bold text-xs shadow-2xs`}
                    >
                      {conv.initials}
                    </div>
                    {conv.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-xs font-bold text-zinc-900">{conv.name}</p>
                      <span className="text-[10px] text-zinc-400 shrink-0">{conv.lastTime}</span>
                    </div>
                    <p className="text-[11px] font-medium text-zinc-500 mb-0.5">{conv.role}</p>
                    <p className="truncate text-xs text-zinc-600">{conv.lastMessage}</p>
                  </div>

                  {conv.unreadCount ? (
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-2xs">
                      {conv.unreadCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="lg:col-span-7 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-zinc-200/80 flex items-center justify-between bg-zinc-50/30">
            <div className="flex items-center gap-3">
              <div
                className={`grid size-10 place-items-center rounded-2xl bg-gradient-to-tr ${selectedConv.avatarBg} text-white font-bold text-xs shadow-2xs`}
              >
                {selectedConv.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 leading-tight">
                  {selectedConv.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <span>{selectedConv.role}</span>
                  <span>•</span>
                  <span className={selectedConv.online ? 'text-emerald-600 font-semibold' : ''}>
                    {selectedConv.online ? 'Online agora' : 'Disponível'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                title="Mais opções"
                className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              >
                <MoreVertical className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-zinc-50/20">
            {selectedConv.messages.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl p-3.5 text-xs shadow-2xs leading-relaxed ${
                      isMe
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : 'bg-white border border-zinc-200/80 text-zinc-800 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400 px-1">
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="size-3 text-indigo-500" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-zinc-200/80 bg-white flex items-center gap-2"
          >
            <button
              type="button"
              title="Anexar arquivo ou atividade"
              className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
            >
              <Paperclip className="size-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite uma mensagem ou orientação..."
              className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3.5 py-2.5 text-xs placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-2xs hover:bg-indigo-700 disabled:opacity-40 transition"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Broadcast Announcement Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <div className="grid size-8 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <Bell className="size-4" />
                </div>
                <h3 className="font-display text-base font-bold text-zinc-900">
                  Enviar Novo Comunicado
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBroadcastModalOpen(false)}
                className="rounded-xl p-1 text-zinc-400 hover:bg-zinc-100"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Público-alvo / Destinatários</label>
                <select
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 p-2.5 bg-white text-zinc-800 focus:border-indigo-600 focus:outline-none"
                >
                  <option>Todas as Turmas (9º B, 8º B, 7º A, 6º A)</option>
                  <option>Turma 9º Ano B</option>
                  <option>Turma 8º Ano B</option>
                  <option>Turma 7º Ano A</option>
                  <option>Pais & Responsáveis</option>
                  <option>Coordenação Pedagógica</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Conteúdo da Mensagem</label>
                <textarea
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Escreva as instruções, avisos sobre datas de provas ou comunicados importantes..."
                  className="w-full rounded-xl border border-zinc-200 p-3 text-zinc-800 placeholder:text-zinc-400 focus:border-indigo-600 focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="rounded-xl px-4 py-2 font-semibold text-zinc-600 hover:bg-zinc-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 shadow-2xs"
                >
                  Disparar Comunicado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
