import { Activity, ActivityType, DifficultyLevel, Question } from '../types/activity';
import { activityLabels } from './activityStore';

export interface GenerationParams {
  type: ActivityType;
  disciplina: string;
  tema: string;
  subtema?: string;
  ano: string;
  dificuldade: DifficultyLevel;
  quantidade: number;
  objetivo?: string;
  contexto?: string;
  promptLivre?: string;
}

// Exemplos de habilidades da BNCC por disciplina
const BNCC_MAP: Record<string, string[]> = {
  Matemática: ['EF06MA01', 'EF07MA04', 'EF08MA06', 'EF09MA08', 'EM13MAT101'],
  Português: ['EF06LP01', 'EF07LP03', 'EF08LP05', 'EF09LP09', 'EM13LP01'],
  História: ['EF06HI02', 'EF07HI05', 'EF08HI08', 'EF09HI11', 'EM13CHS102'],
  Geografia: ['EF06GE03', 'EF07GE06', 'EF08GE09', 'EF09GE12', 'EM13CHS201'],
  Ciências: ['EF06CI02', 'EF07CI05', 'EF08CI07', 'EF09CI10', 'EM13CNT201'],
  Física: ['EM13CNT101', 'EM13CNT103', 'EM13CNT301'],
  Química: ['EM13CNT104', 'EM13CNT202', 'EM13CNT303'],
  Biologia: ['EM13CNT205', 'EM13CNT304', 'EM13CNT305'],
  Inglês: ['EF06LI01', 'EF07LI04', 'EF08LI07', 'EF09LI12', 'EM13LGG101'],
};

function getBNCCCode(disciplina: string, idx: number): string {
  const codes = BNCC_MAP[disciplina] || ['BNCC-GERAL01', 'BNCC-GERAL02'];
  return codes[idx % codes.length];
}

export function generateTemplateActivity(params: GenerationParams): Partial<Activity> {
  const { type, disciplina, tema, subtema, ano, dificuldade, quantidade, objetivo, contexto } = params;

  const topicName = tema || 'Conteúdo Programático';
  const fullTopic = subtema ? `${topicName} — ${subtema}` : topicName;
  const title = `${activityLabels[type]} — ${fullTopic}`;
  const intro = `Atividade desenvolvida para a disciplina de ${disciplina} (${ano}), com foco temático em "${fullTopic}". Elaborada com base nas competências gerais da Educação Básica da BNCC, promovendo raciocínio crítico, fixação de conceitos e contextualização prática. ${
    objetivo ? `Objetivo pedagógico: ${objetivo}.` : ''
  }`;

  // 1. QUESTÕES (LISTA, PROVA, QUIZ)
  if (type === 'lista' || type === 'prova' || type === 'quiz') {
    const questoes: Question[] = [];
    const count = Math.max(1, Math.min(quantidade || 10, 20));

    for (let i = 1; i <= count; i++) {
      const isDiscursive = type === 'prova' ? i % 3 === 0 : type === 'lista' ? i % 2 === 0 : false;
      const bncc = getBNCCCode(disciplina, i);

      if (isDiscursive) {
        // QUESTÃO DISCURSIVA COM RESOLUÇÃO PASSO A PASSO DIDÁTICA E IMPECÁVEL
        questoes.push({
          id: `q-${i}`,
          numero: i,
          tipo: 'dissertativa',
          enunciado: `[Questão Discursiva / Aplicação Prática] Com base nos princípios estudados sobre ${fullTopic} em ${disciplina}, analise como esse conceito se manifesta em situações reais do cotidiano e explique os desdobramentos lógicos que justificam a relação causa-efeito envolvida.`,
          linhasResposta: 6,
          resposta: `Resolução estruturada com interpretação de premissas, desenvolvimento reflexivo fundamentado na teoria de ${topicName} e conclusão articulada.`,
          comentario: `O objetivo desta questão é avaliar a capacidade de argumentação fundamentada e a apropriação dos termos técnicos da disciplina de ${disciplina}.`,
          competencia: 'Pensamento científico, crítico e criativo (Competência Geral 2 da BNCC)',
          habilidade: bncc,
          resolucaoPassoAPasso: {
            passo1Interpretacao: `1. Identificação do Problema e Conceitos-Chave:
O estudante deve reconhecer no enunciado a exigência de relacionar o conceito de "${fullTopic}" com uma situação real. Elementos fundamentais a serem destacados: as propriedades centrais do tema, o contexto em que ele opera e as variáveis que interagem para produzir o resultado.`,
            passo2Desenvolvimento: `2. Raciocínio Lógico e Desenvolvimento Argumentativo:
- Premissa Teórica: Explicitar com clareza a definição de ${topicName}, utilizando vocabulário conceitual correto (definições, fórmulas ou marcos históricos dependendo da área).
- Análise Contextualizada: Demonstrar como a teoria atua na prática, apresentando um caso concreto ou experimento que evidencie a transformação ou o fenômeno.
- Justificativa Causa-Efeito: Explicar por que determinados fatores geram a consequência observada, sem saltos lógicos.`,
            passosDetalhados: [
              {
                passo: 1,
                titulo: 'Leitura e Mapeamento de Dados',
                conteudo: `Localizar no tema as palavras-chave essenciais de ${disciplina} e delimitar o escopo da resposta.`,
                dicaDidatica: 'Oriente os alunos a sublinharem o verbo de comando (analise, justifique, compare).',
              },
              {
                passo: 2,
                titulo: 'Construção da Relação Causal',
                conteudo: `Estabelecer a ponte direta entre a regra/conceito teórico e a situação cotidiana analisada.`,
                dicaDidatica: 'Estruture o parágrafo pelo modelo: Afirmação central → Justificativa teórica → Exemplo prático.',
              },
              {
                passo: 3,
                titulo: 'Síntese Conclusiva',
                conteudo: `Finalizar amarrando a conclusão à pergunta inicial, demonstrando domínio pleno da habilidade ${bncc}.`,
                dicaDidatica: 'A conclusão deve ser direta e recapitular a resposta com precisão.',
              },
            ],
            passo3Conclusao: `3. Conclusão e Resposta Esperada:
O estudante conclui que o fenômeno em "${fullTopic}" depende diretamente da interação das variáveis analisadas, evidenciando uma visão crítica e alinhada à realidade. A resposta deve ser coerente, com coesão textual e precisão conceitual.`,
            respostaEsperada: `Resposta Modelo: O estudo de ${fullTopic} demonstra que os conceitos de ${disciplina} fornecem ferramentas analíticas para compreender fenômenos reais. Ao analisar o caso proposto, verifica-se que as causas fundamentais determinam as consequências observadas devido à interação lógica entre os elementos estudados, comprovando a relevância prática desse conhecimento.`,
            criteriosCorrecao: {
              notaIntegral: '100% da pontuação: Identificou corretamente os conceitos, explicou a causa e efeito com vocabulário técnico e apresentou conclusão clara e articulada.',
              notaParcial: '50% a 70% da pontuação: Compreendeu o tema geral e citou exemplos pertinentes, porém cometeu imprecisões conceituais ou não aprofundou a relação causa-efeito.',
              errosComuns: 'Apenas parafrasear o enunciado, apresentar senso comum sem base científica/teórica da disciplina, ou omitir a conclusão fundamentada.',
            },
          },
        });
      } else {
        // QUESTÃO DE MÚLTIPLA ESCOLHA
        const alternativas = [
          `Apresenta uma correlação direta entre os princípios de ${topicName} e suas leis basilares.`,
          `Descreve um modelo que contraria as evidências observadas na disciplina de ${disciplina}.`,
          `Considera apenas fatores secundários, negligenciando a causa fundamental do fenômeno.`,
          `Limita-se a uma perspectiva puramente descritiva, sem embasamento nos parâmetros da BNCC.`,
        ];

        questoes.push({
          id: `q-${i}`,
          numero: i,
          tipo: 'multipla-escolha',
          enunciado: `Sobre o estudo de "${fullTopic}" no contexto de ${disciplina} (${ano}), assinale a alternativa que apresenta a afirmação conceitual correta:`,
          alternativas: alternativas.map((alt, altIdx) => `${String.fromCharCode(65 + altIdx)}) ${alt}`),
          resposta: 'A',
          comentario: `A alternativa A é a única correta porque sintetiza fielmente a definição consolidada de ${topicName}, enquanto as demais opções contêm distorções conceituais ou desconsideram os postulados da área.`,
          competencia: 'Compreensão e aplicação de conceitos fundamentais',
          habilidade: bncc,
        });
      }
    }

    const gabaritoConsolidado = questoes
      .map((q) => `${q.numero}. ${q.resposta} (${q.tipo === 'dissertativa' ? 'Discursiva - ver resolução' : 'Múltipla escolha'})`)
      .join(' | ');

    return {
      titulo: title,
      introducao: intro,
      questoes,
      gabarito: gabaritoConsolidado,
    };
  }

  // 2. PLANO DE AULA
  if (type === 'plano-aula') {
    return {
      titulo: title,
      introducao: intro,
      questoes: [],
      planoAula: {
        tema: fullTopic,
        disciplina,
        ano,
        duracao: '2 aulas (100 minutos)',
        habilidadesBNCC: [getBNCCCode(disciplina, 1), getBNCCCode(disciplina, 2), 'CG01', 'CG02'],
        objetivos: [
          `Compreender os fundamentos e dimensões essenciais de ${topicName}.`,
          `Analisar criticamente problemas contextualizados envolvendo ${fullTopic}.`,
          `Desenvolver autonomia no uso de instrumentos e metodologias próprias de ${disciplina}.`,
          `Aplicar o raciocínio investigativo para propor soluções sustentadas e fundamentadas.`,
        ],
        conteudo: [
          `Introdução histórica e conceitual de ${topicName}.`,
          `Propriedades fundamentais, definições e terminologias técnicas.`,
          `Estudo de casos e aplicações práticas no cotidiano contemporâneo.`,
          `Exercícios de fixação e reflexão guiada em pequenos grupos.`,
        ],
        metodologia: `Abordagem ativa e dialógica baseada na Aprendizagem Baseada em Problemas (ABP). A aula se inicia com uma pergunta provocadora sobre "${fullTopic}", seguida de debate inicial, exposição dialogada dos conceitos estruturantes, trabalho em duplas para resolução de desafio prático e fechamento colaborativo com síntese coletiva no quadro.`,
        recursos: [
          'Quadro branco e marcadores coloridos.',
          'Projetor multimídia para exibição de esquemas e infográficos didáticos.',
          'Folhas de exercícios impressas com questões objetivas e discursivas.',
          'Material didático de apoio alinhado à BNCC.',
        ],
        avaliacao: `Avaliação formativa e contínua durante todas as etapas da aula: observação do engajamento nas discussões em grupo, análise do raciocínio registrado na folha de atividades e checagem final da autoavaliação dos estudantes.`,
        cronograma: [
          {
            etapa: 'Acolhida & Pergunta Disparadora',
            tempo: '15 min',
            descricao: `Apresentação de situação-problema cotidiana relacionada a ${topicName} para levantar conhecimentos prévios.`,
          },
          {
            etapa: 'Exploração Dialogada do Conteúdo',
            tempo: '30 min',
            descricao: `Apresentação dos conceitos essenciais, fórmulas/marcos e esquematização participativa com a turma.`,
          },
          {
            etapa: 'Atividade Prática em Pares',
            tempo: '35 min',
            descricao: `Resolução de desafios e questões estruturadas com mediação pedagógica do professor.`,
          },
          {
            etapa: 'Síntese, Gabarito e Encerramento',
            tempo: '20 min',
            descricao: `Socialização das respostas, esclarecimento de dúvidas e conexão com a próxima aula.`,
          },
        ],
        adaptacoesInclusivas: `Disponibilização de materiais com suporte visual ampliado e textos em tópicos para estudantes com necessidades pedagógicas específicas; mediação com monitoria entre pares.`,
      },
    };
  }

  // 3. FLASHCARDS
  if (type === 'flashcards') {
    const flashcardsCount = Math.max(4, Math.min(quantidade || 8, 16));
    const flashcards = [];

    const concepts = [
      {
        frente: `O que define fundamentalmente "${topicName}" em ${disciplina}?`,
        verso: `É o conjunto de princípios e relações estruturantes que caracterizam o comportamento desse fenômeno na área de ${disciplina}.`,
        dica: `Lembre-se das características essenciais abordadas na introdução da disciplina.`,
      },
      {
        frente: `Qual a importância de estudar "${fullTopic}" no dia a dia?`,
        verso: `Permite interpretar criticamente dados do cotidiano, tomar decisões fundamentadas e compreender o funcionamento do mundo contemporâneo.`,
        dica: `Pense na aplicação prática do conceito em situações cotidianas.`,
      },
      {
        frente: `Quais são os principais fatores ou variáveis que influenciam ${topicName}?`,
        verso: `As variáveis intrínsecas ao sistema e os fatores externos do ambiente que determinam sua intensidade e manifestação.`,
        dica: `Analise as condições de contorno e dependências causais.`,
      },
      {
        frente: `Como a BNCC orienta o desenvolvimento dessa competência?`,
        verso: `Através da investigação científica, argumentação embasada e resolução de situações-problema autênticas.`,
        dica: `Foco em competências gerais e habilidades práticas.`,
      },
      {
        frente: `Qual o erro mais comum cometido ao analisar ${topicName}?`,
        verso: `Confundir a correlação superficial de fatores com uma relação de causa e efeito comprovada.`,
        dica: `Causalidade requer demonstração teórica e empírica sólida.`,
      },
      {
        frente: `Qual fórmula, regra ou marco temporal é o núcleo de ${fullTopic}?`,
        verso: `O postulado principal estabelece a proporção e as condições de equilíbrio necessárias para a ocorrência do fenômeno.`,
        dica: `Revise a síntese conceitual do tema.`,
      },
    ];

    for (let i = 0; i < flashcardsCount; i++) {
      const base = concepts[i % concepts.length];
      flashcards.push({
        frente: i >= concepts.length ? `[Conceito #${i + 1}] ${base.frente}` : base.frente,
        verso: base.verso,
        dica: base.dica,
        categoria: disciplina,
      });
    }

    return {
      titulo: title,
      introducao: intro,
      questoes: [],
      flashcards,
    };
  }

  // 4. MAPA MENTAL
  if (type === 'mapa-mental') {
    return {
      titulo: title,
      introducao: intro,
      questoes: [],
      mapaMental: {
        central: fullTopic,
        ramos: [
          {
            titulo: '1. Fundamentos & Definições',
            subitens: [
              `Conceito inicial e origem do termo em ${disciplina}`,
              'Terminologias técnicas e parâmetros fundamentais',
              'Classificação e categorias principais',
            ],
          },
          {
            titulo: '2. Mecanismos & Funcionamento',
            subitens: [
              'Processos de causa, efeito e transformação',
              'Leis e princípios que regem o sistema',
              'Relação com outras áreas do conhecimento',
            ],
          },
          {
            titulo: '3. Aplicações no Cotidiano',
            subitens: [
              'Exemplos práticos do dia a dia do estudante',
              'Casos de estudo e manifestações observáveis',
              'Tecnologias e inovações baseadas no conceito',
            ],
          },
          {
            titulo: '4. Alinhamento BNCC & Desafios',
            subitens: [
              `Habilidade central: ${getBNCCCode(disciplina, 1)}`,
              'Questões para reflexão crítica em sala',
              'Propostas investigativas para aprofundamento',
            ],
          },
        ],
      },
    };
  }

  // 5. CRUZADINHA
  if (type === 'cruzadinha') {
    // Lista de palavras temáticas com dicas pedagógicas inteligentes
    const defaultWords = [
      { palavra: 'CONCEITO', dica: 'Ideia central ou representação mental de um objeto ou tema.' },
      { palavra: 'HIPOTESE', dica: 'Suposição formulada como base para raciocínio ou investigação científica.' },
      { palavra: 'ANALISE', dica: 'Exame detalhado de cada parte de um todo para conhecer sua natureza.' },
      { palavra: 'TEORIA', dica: 'Conjunto coerente de princípios que explicam determinada classe de fenômenos.' },
      { palavra: 'EVIDENCIA', dica: 'Fato ou sinal que demonstra com clareza a veracidade de uma proposição.' },
      { palavra: 'METODO', dica: 'Caminho organizado e sistemático para alcançar um objetivo de estudo.' },
      { palavra: 'SISTEMA', dica: 'Conjunto de elementos conectados que funcionam de maneira articulada.' },
      { palavra: 'PRATICA', dica: 'Aplicação concreta de preceitos e regras teóricas.' },
    ];

    const wordsCount = Math.max(4, Math.min(quantidade || 8, 12));
    const palavras = defaultWords.slice(0, wordsCount);

    return {
      titulo: title,
      introducao: intro,
      questoes: [],
      cruzadinha: {
        palavras,
      },
    };
  }

  // 6. RESUMO / IMAGEM
  if (type === 'resumo') {
    return {
      titulo: title,
      introducao: intro,
      questoes: [],
      resumo: {
        secoes: [
          {
            titulo: 'Visão Geral e Contextualização',
            conteudo: `O estudo de ${fullTopic} é fundamental para a formação acadêmica em ${disciplina}. Ele permite compreender a organização lógica dos fatos e processos que estruturam nossa realidade, servindo de base sólida para os conteúdos subsequentes do currículo escolar.`,
            imagem: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
            destaque: `Conceito-chave: ${topicName} é a base de sustentação dos fenômenos em ${disciplina}.`,
          },
          {
            titulo: 'Estrutura Conceitual e Mecanismos',
            conteudo: `Para dominar este conteúdo, é necessário atentar para a relação entre variáveis internas e condições do meio. A compreensão adequada exige diferenciar causas imediatas de desdobramentos estruturais a médio e longo prazo.`,
            imagem: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
            destaque: 'Atenção aos detalhes na interpretação das evidências.',
          },
          {
            titulo: 'Impacto Social e Aplicações Reais',
            conteudo: `Longe de ser apenas teoria abstrata, ${fullTopic} conecta-se diretamente com decisões éticas, cidadania e avanços tecnológicos. Ao relacionar teoria e prática, os alunos adquirem visão crítica e capacidade de intervenção responsável na sociedade.`,
            imagem: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
            destaque: 'Conexão viva com os Objetivos de Desenvolvimento Sustentável e a BNCC.',
          },
        ],
        pontosChave: [
          `Definição clara e fundamentada de ${topicName}.`,
          `Mecanismos de causa e efeito amplamente testados em ${disciplina}.`,
          `Vocabulário técnico específico e terminologias da área.`,
          `Aplicação em questões do cotidiano e no ENEM/Vestibulares.`,
        ],
        dicasEstudo: [
          'Elabore um mapa conceitual com as próprias palavras após a leitura.',
          'Pratique a resolução passo a passo das questões discursivas para fixar a argumentação.',
          'Explique o conceito em voz alta para um colega para testar seu domínio do vocabulário.',
        ],
      },
    };
  }

  // Fallback
  return {
    titulo: title,
    introducao: intro,
    questoes: [],
  };
}
